
import react, { useState, useEffect } from 'react'
import * as ReactBootStrap from "react-bootstrap"
import './ETF_table.css'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ETF_table = () => { 
    /* Fetching the weights from the back-end and getting the user's email */
    const email=  useLocation().state.email;
    {/*const [getMessage, setGetMessage] = useState({})*/}
    const [getMessage, setGetMessage] = useState({
        weights: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    })
    useEffect(() => {
      var fullurl='http://127.0.0.1:5000/portfolios/pushWeights/' + email;
      axios.get(fullurl).then(response => {
          console.log("SUCCESS")
          console.log(response.data);
          setGetMessage(response.data)
        }).catch(error => {
          console.log(error)
        })
    }, [])
 /* This defines the ETF table */   
const ETF = [
    {'ticker': "QCLN", description:"Tracks the First Trust NASDAQ Clean Edge Green Energy (alternative energy) Index.", weight: 0},
    {'ticker' : 'SOXX', description : 'The iShares Semiconductor ETF tracks the investment results of an index composed of U.S.listed equities in the semiconductor sector.',weight: 1}, 
                { 'ticker' : 'PTF' , description :'Comprised of stocks of various companies based in the technology sector of the market. Invests all of its assets in domestic securities, and holds some big names in the tech sector, i.e., Apple and IBM', weight: 2},
                { 'ticker' : 'LIT' , description :'Invests in the full lithium cycle, from mining and refining the metal,through battery production. Seeks to provide investment results that correspond generally to the price and yield performance of the Solactive Global Lithium Index.', weight:3},
                { 'ticker' : 'PTH' , description :'Tracks the Dorsey Wright Healthcare Technical Leaders Index.', weight: 4},
                { 'ticker' : 'FINX' , description :'Seeks to invest in companies on the leading edge of the emerging financian technology sector,including industries like insurance, investing, and fundraising. ',weight: 5},
                { 'ticker' : 'IPO' , description :'Tracks the Renaissance IPO Index designed to hold a portfolio of the largest, most liquid, newly-listed U.S. IPOs. ', weight: 6},
                 { 'ticker' : 'PSJ' , description :'Seeks to replicate a benchmark that is comprised of various software companies. Primarily invests in medium cap companies. ', weight: 7},
                  { 'ticker' : 'IWY' , description :'Provides exposure to large U.S. companies whose earnings are expected to grow at an above-average rate relative to the market.', weight: 8},
                   { 'ticker' : 'KCE' , description :'Seeks to provide exposure to the capital markets segment of the S&P TMI, which comprises the following sub-industries: Asset Management & Custody Banks, Diversified Capital Markets, Financial Exchanges & Data, and Investment Banking & Brokerage', weight:9},
                    { 'ticker' : 'XWEB' , description :'Tracks the the S&P Internet Select Industry Index, which includes sub-industies such as Internet & Direct Marketing Retail, Internet Services & Infrastructure', weight: 10},
                     { 'ticker' : 'FDIS' , description :'Tracks the Fidelity MSCI Consumer Discretionary Index ETFoffering targeted exposure to the U.S. consumer discretionary sector, i.e., hotel operators, cruise line companies, etc. ', weight: 11},
                       {'ticker': "GAMR", description:"Tracks an equity index of global firms that support, create or use video games. Stocks are assigned to pure-play, non-pure-play or conglomerate baskets, and weighted equally within each.", weight: 12},
                      { 'ticker' : 'PALL' , description :'First in the space that focuses on palladium exposure in an ETF. The fund tracks the movements in palladium spot price.',weight: 13},
                       { 'ticker' : 'IAI' , description :'Tracks the investment results of the Dow Jones U.S. Select Investment Services Index, composed of U.S. investment services sector equities. ', weight: 14},
                       {'ticker': "IMCG", description:"seeks to track the investment results of an index composed of mid-capitalization U.S. equities that exhibit growth characteristics", weight: 15}, 
                       { 'ticker' : 'IHI' , description :'Tracks an index of medical devices U.S. equitiesproviding exposure to U.S. companies that manufacture and distribute medical devices', weight: 16},
                        { 'ticker' : 'ITB' , description :'Exposure to U.S. companies that manufacture residential homes, providing targeted accessto domestic home construction stocks',weight: 17},
                        { 'ticker' : 'PSCH' , description :'Based on the S&P SmallCap600 Capped Health Care Index. Provides exposure to common stocks in the health care sector, including health care related products, biotechnology, and pharmaceuticals', weight:18},
                        { 'ticker' : 'RTH' , description :'RTH tracks a market-cap-weighted index of the 25 largest US-listed companies that derive most of their revenue from retail.',weight: 19},
                        { 'ticker' : 'SOCL' , description :'Tracks the Solactive Social Media Total Return Index, featuring companies that provide social networking, file sharing, and other web-based media. ',weight: 20},
                        { 'ticker' : 'BOTZ' , description :'Seeks to invest in companies that potentially stand to benefit from increased adoption and utilization of robotics and artificial intelligence (AI), including those involved with industrial robotics and automation, non-industrial robots, and autonomous vehicles.',weight: 21},
                        { 'ticker' : 'PTNQ' , description :'PTNQ tracks an index that holds the NASDAQ-100 securities and/or 3-month US T-bills according to momentum.',weight: 22},
                        {'ticker': "BBC", description:"Tracks the LifeSci Biotechnology Clinical Trials Index, which tracks the performance of select clinical trials stage biotechnology companies.", weight: 23},
                        {'ticker': "ERTH", description:"Fund that seeks to track the investment results of MSCI Global Environment Select Index. The Fund generally will invest at least 90% of its total assets in the securities that comprise the Underlying Index. The Underlying Index is designed to maximize exposure to six themes that impact the environment.", weight: 24}

]
    const renderETF=(ETF,index)=> {
    return(
        <tr key={index}>
            <td>{ETF.ticker}</td>
            <td>{ETF.description}</td>
            <td>{Math.round(getMessage.weights[ETF.weight]*100*1000,3)/1000}</td>
        </tr>
        )
    }

    return(
            <div className="rowcontain">
            <div className="colcontain">
            <div className="tb">
            <div className="table">
            <ReactBootStrap.Table style={{background: "#F1F1F1"}}>
                {/* Defining a table */}
            <thead>
                <tr>
                <th>Ticker</th>
                <th>Description</th>
                <th>% of Portfolio </th>
                </tr>
            </thead>
            <tbody>
                {/* Filling in the values of the table from the dictionary */}
                {ETF.map(renderETF)}
            </tbody>
            </ReactBootStrap.Table> 
            </div> 
            </div> 
            </div>
            </div> 
    
            );
}
export default ETF_table;
