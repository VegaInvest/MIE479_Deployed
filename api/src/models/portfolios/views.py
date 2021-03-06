from flask import (
    Blueprint,
    request,
    session,
    redirect,
    url_for,
    render_template,
    jsonify,
)
import json
from pandas.core.tools.datetimes import to_datetime
from dateutil.relativedelta import relativedelta
from api.src.models.users.user import User
import api.src.models.users.errors as UserErrors
import api.src.models.users.decorators as user_decorators
from api.src.common.database import Database
from api.src.models.portfolios.portfolio import Portfolio
import api.src.models.portfolios.constants as PortfolioConstants
import datetime
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from io import BytesIO
import urllib
import base64
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd
import numpy as np
from sklearn import linear_model
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from scipy.stats.mstats import gmean
from sklearn import metrics
from scipy import stats


portfolio_blueprint = Blueprint("portfolios", __name__)


@portfolio_blueprint.route("/portfolio")
def get_portfolio_page(portfolio_id):  # Renders unique portfolio page
    port = Portfolio.get_by_id(portfolio_id)
    # fig = port.plot_portfolio()
    # canvas = FigureCanvas(fig)
    # img = BytesIO()
    # fig.savefig(img)
    # img.seek(0)
    # plot_data = base64.b64encode(img.read()).decode()

    return render_template(
        "/portfolios/portfolio.jinja2", portfolio=port, plot_url=plot_data
    )


@portfolio_blueprint.route("/editrisk", methods=["GET", "POST"])
# Views form to change portfolio's associated risk aversion parameter
def change_risk(portfolio_id):
    port = Portfolio.get_by_id(portfolio_id)
    if request.method == "POST":
        risk_appetite = request.form["risk_appetite"]
        port.risk_appetite = risk_appetite
        port.save_to_mongo()
        fig = port.runMVO()
        canvas = FigureCanvas(fig)
        img = BytesIO()
        fig.savefig(img)
        img.seek(0)
        plot_data = base64.b64encode(img.read()).decode()
        return render_template(
            "/portfolios/optimal_portfolio.jinja2", portfolio=port, plot_url=plot_data
        )

    return render_template("/portfolios/edit_portfolio.jinja2", portfolio=port)


@portfolio_blueprint.route("/new", methods=["GET", "POST"])
# @user_decorators.requires_login
def create_portfolio():  # Views form to create portfolio associated with active/ loggedin user
    if request.method == "POST":
        risk_appetite = request.get_json().get("risk_appetite")
        email = request.get_json().get("email")
        ermsg = ""
        e = 0
        c = 0
        amount_invest = request.get_json().get("amount_invest")
        goal = request.get_json().get("goal")
        horizon = request.get_json().get("horizon")

        if not str.isnumeric(amount_invest):
            if e == 0:
                msg = "Amount Invested is not a valid type"
                ermsg = msg
            e += 1
        if not str.isnumeric(goal):
            if e == 0:
                msg = "Goal is not a valid type"
                ermsg = ermsg + msg
            e += 1
        if not str.isnumeric(horizon):
            if e == 0:
                msg = "Horizon is not a valid type"
                ermsg = ermsg + msg
            e += 1
        if str.isnumeric(amount_invest) and float(amount_invest) < 0:
            if e == 0:
                msg = "Amount Invested must be greater than $0!"
                ermsg = ermsg + msg
            e += 1
        if str.isnumeric(goal) and float(goal) < 0:
            if e == 0:
                msg = "Goal must be greater than $0!"
                ermsg = ermsg + msg
            e += 1
        if str.isnumeric(horizon) and float(horizon) < 0:
            if e == 0:
                msg = "Horizon must be greater than $0!"
                ermsg = ermsg + msg
            e += 1
        if (
            str.isnumeric(goal)
            and str.isnumeric(amount_invest)
            and float(goal) < float(amount_invest)
        ):
            if e == 0:
                msg = "Goal must be higher than Amount Invested"
                ermsg = ermsg + msg
            e += 1

        if e > 0:
            return jsonify({"Status": ermsg})
        else:
            # start = datetime.datetime.now() actual
            start = datetime.datetime(2018, 1, 2)  # for simulation
            port = Portfolio.run_backtest(amount_invest=amount_invest, goal=goal, horizon=horizon,
                                          email=email, risk_appetite=risk_appetite, start=start, last_updated=PortfolioConstants.END_DATE)
            port.save_to_mongo()
            # X[1][1] is annualized returns
            #X[1][2] is vol
            #X[1][3] is sharpe
            # X[1][-1] is vector of Portfolio value

            # canvas = FigureCanvas(fig)
            # img = BytesIO()
            # fig.savefig(img)
            # img.seek(0)
            # plot_data = base64.b64encode(img.read()).decode()
            print({"Status": "portfolio created!"})
            return jsonify({"Status": "portfolio created!"})
    return jsonify({"Status": "error use POST request"})


# @portfolio_blueprint.route("/pushPortfolioid/<string:email>", methods=["GET", "POST"])
# # @user_decorators.requires_login
# # Views form to create portfolio associated with active/ loggedin user
# def pushportid(email):
#     email = str(email)
#     if request.method == "GET":
#         port_data = Database.find_one(
#             PortfolioConstants.COLLECTION, {"user_email": email}
#         )
#         Portfolio_ID = port_data["_id"]
#         Portfolio_ID = str(Portfolio_ID)
#         return jsonify({"Portfolio_ID": Portfolio_ID})
#     return jsonify({"Status": "error use POST request"})


# @user_decorators.requires_login
# Views form to create portfolio associated with active/ loggedin user
@portfolio_blueprint.route("/pushWeights/<string:email>", methods=["GET", "POST"])
def pushWeights(email):
    email = str(email)
    if request.method == "GET":
        port_data = Database.find_one(
            PortfolioConstants.COLLECTION, {"user_email": email}
        )
        weights = port_data["curr_weights"]
        weights = np.around(weights, 3)
        weights = weights.tolist()
        # print(weights*100)
        # time_index=time_index.tolist()
        # X[1][1] is annualized returns
        #X[1][2] is vol
        #X[1][3] is sharpe
        # X[1][-1] is vector of Portfolio value
        # X[1][-2] is time vector
        # date in yyyymmdd format, start at 7 periods (months) before required start date

        return jsonify(
            {
                "Status": "Success",
                "weights": weights
            }
        )
    return jsonify({"Status": "error use POST request"})


@portfolio_blueprint.route("/pushParams/<string:email>", methods=["GET", "POST"])
def pushParams(email):
    email = str(email)
    if request.method == "GET":
        port_data = Database.find_one(
            PortfolioConstants.COLLECTION, {"user_email": email}
        )

        last_updated = port_data['last_updated']
        risk_appetite = str(port_data["risk_appetite"])
        horizon = float(port_data["horizon"])
        goal = float(port_data["goal"])
        amount_invest = float(port_data["amount_invest"])
        start = port_data["start"]
        # time diff between present and start in years
        time_difference = int(relativedelta(
            PortfolioConstants.END_DATE, start).years)
        # time diff between present and last updated in months
        time_diff_update = int(relativedelta(
            PortfolioConstants.END_DATE, last_updated).months)

        if time_diff_update > 1:
            port = Portfolio.run_backtest(amount_invest=amount_invest, goal=goal, horizon=horizon,
                                          email=email, risk_appetite=risk_appetite, start=start)
            port.save_to_mongo()
            port_data = Database.find_one(
                PortfolioConstants.COLLECTION, {"user_email": email})

        date_vector = port_data['date_vector']
        ann_returns = float(port_data["ann_returns"])
        ann_vol = float(port_data["ann_vol"])
        sharpe = float(port_data["sharpe"])
        port_val = np.array(port_data["port_val"])

        # rounding
        sharpe = np.round(sharpe, 3)
        returns = np.round(ann_returns, 3)
        vol = np.round(ann_vol, 3)
        portval = np.around(port_val*float(amount_invest), 3)
        lastportval = portval[-1]
        portval = portval.tolist()

        return jsonify(
            {
                "Status": "Success",
                "risk_appetite": risk_appetite,
                "horizon": horizon,
                "goal": goal,
                "amount_invested": amount_invest,
                'sharpe': sharpe,
                'returns': returns,
                'vol': vol,
                'time_difference': time_difference,
                'portval': portval,
                'lastportval': lastportval,
                'date_vector': date_vector
            }
        )
    return jsonify({"Status": "error use POST request"})


# @portfolio_blueprint.route("/pushWeights/<string:email>", methods=["GET", "POST"])
# def pushParams(email):
#     email = str(email)
#     if request.method == "POST":
#         port_data = Database.find_one(
#             PortfolioConstants.COLLECTION, {"user_email": email}
#         )
#         risk_appetite = port_data["risk_appetite"]
#         risk_appetite = str(risk_appetite)
#         horizon = port_data["horizon"]
#         horizon = float(horizon)
#         goal = port_data["goal"]
#         goal = float(goal)
#         print(risk_appetite)
#         return jsonify(
#             {
#                 "Status": "Success",
#                 "risk_appetite": risk_appetite,
#                 "horizon": horizon,
#                 "goal": goal,
#             }
#         )
#     return jsonify({"Status": "error use POST request"})

# @portfolio_blueprint.route("/pushWeights/<string:email>", methods=["GET", "POST"])
# def pushParams(email):
#     email = str(email)
#     if request.method == "POST":
#         port_data = Database.find_one(
#             PortfolioConstants.COLLECTION, {"user_email": email}
#         )
#         risk_appetite = port_data["risk_appetite"]
#         risk_appetite = str(risk_appetite)
#         horizon = port_data["horizon"]
#         horizon = float(horizon)
#         goal = port_data["goal"]
#         goal = float(goal)
#         print(risk_appetite)
#         return jsonify(
#             {
#                 "Status": "Success",
#                 "risk_appetite": risk_appetite,
#                 "horizon": horizon,
#                 "goal": goal,
#             }
#         )
 #   return jsonify({"Status": "error use POST request"})
