from apscheduler.schedulers.blocking import BlockingScheduler
import datetime
from dateutil.relativedelta import relativedelta
from numpy import matlib
from urllib.request import urlopen
from zipfile import ZipFile
from io import BytesIO
from scipy import stats
from sklearn import metrics
from scipy.stats.mstats import gmean
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn import linear_model
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from pandas.core.indexes import datetimes
from api.src.models.portfolios.constants import START_DATE
from api.src.models.stocks.stock import Stock
from api.src.models.portfolios.portfolio import Portfolio
import api.src.models.portfolios.constants as PortfolioConstants
from api.src.common.database import Database
import cvxpy as cvx
import datetime
import uuid
import numpy as np
import pandas as pd
import matplotlib
import datetime
import uuid
import pandas as pd
import matplotlib.pyplot as plt
import time
from dateutil.relativedelta import relativedelta

sched = BlockingScheduler()
@sched.scheduled_job('cron', day_of_week='mon-fri', hour=17)
def scheduled_job():
    print("background 2")
    #data maintenance
    end_date = datetime.datetime.today()
    start_date = end_date - datetime.timedelta(days=1)
    Database.initialize()
    if Portfolio.check_collection("rawdata") == False:
        Stock.push_rawData(PortfolioConstants.START_DATE, end_date)
    Stock.update_mongo_daily(start_date, end_date, PortfolioConstants.TICKERS)

@sched.scheduled_job('interval', days=15,next_run_time=datetime.datetime.now())
def timed_job():
    print("background 1")
    Database.initialize()
    last_updated = PortfolioConstants.END_DATE
    if Database.find_one('portfolios',{"risk_appetite":"low", "last_updated" : last_updated})==None:
        start = datetime.datetime(2018, 1, 2)
        end = int(relativedelta(last_updated, start).years)
        outs = Portfolio.multi_period_backtesting(PortfolioConstants.TICKERS, forecast_window=4, lookback=7, estimation_model=linear_model.SGDRegressor(
                    random_state=42, max_iter=5000), alpha=.1, gamma_trans=.1, gamma_risk=100000, date=Portfolio.to_integer(start), end=end*12, risk_appetite="low")
        curr_weights = outs[0][-1]
        ann_returns = outs[1][1]
        ann_vol = outs[1][2]
        sharpe = outs[1][3]
        port_val = outs[1][-1]

        # convert dates to string
        dates = outs[1][-2]
        date_vector = []
        for date in dates:
            ts = pd.to_datetime(str(date))
            date = ts.strftime('%Y-%m-%d')
            date_vector.append(date)

        port = Portfolio(
            email="sample@sample.com",
            risk_appetite='low',
            amount_invest='',
            goal='',
            horizon='',
            curr_weights=curr_weights.tolist(),
            ann_returns=ann_returns,
            ann_vol=ann_vol,
            sharpe=sharpe,
            port_val=port_val.tolist(),
            last_updated=last_updated,
            start=start,
            date_vector=date_vector
        )
        port.save_to_mongo()
sched.start()