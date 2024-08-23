import React from "react";
import "./App.css";
import  { useEffect, useState } from "react";



const Header = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch("https://api.coincap.io/v2/assets");
      const apiData = await res.json();
      console.log(apiData.data[0]);
      setData(apiData.data);
    } catch (err) {
      console.log("failed to fetch data", err);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up the interval to fetch data every second (1000 ms)
    const intervalId = setInterval(fetchData, 2000);
setData([]);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); 


  return (
    <div>
      <div className="headBorder">
        <img src="https://coincap.io/static/logos/ss-mark-white.svg " alt="" />
        <p>
          Buy, sell, & swap your favorite assets. No KYC. No added fees.
          Decentralized.
        </p>
      </div>

      <div className="Navbar">
        <div className="leftNav">
          <ul>
            <li>Coins</li>
            <li>Exchange</li>
            <li>Swap</li>
          </ul>
        </div>

        <div className="midNav">
          <img src="https://coincap.io/static/logos/black.svg" alt="img" />
        </div>


        <div className="rightNav">
          <ul>
            <li>HUF</li>
            <li>
              <input type="text" />
            </li>
            <li>
              <select name="cars" id="cars">
                <option value="volvo">English</option>
                <option value="saab">Hindi</option>
                <option value="mercedes">French</option>
                <option value="audi">Arabic</option>
              </select>
            </li>

            <li>Setting</li>
          </ul>
        </div>
      </div>

      <div className="hero">
        <ul>
          <li>
            Market Cap <br /> Ft748.26t
          </li>
          <li>
            Exchange Vol <br /> Ft13.17t
          </li>
          <li>
            Assets <br />
            2,298
          </li>
          <li>
            Exchanges
            <br /> 73
          </li>
          <li>
            Market Cap <br /> 7,641
          </li>
          <li>
            BTC Dom Index <br /> 56.8%
          </li>
          <li></li>
        </ul>
      </div>

      <div className="Table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">price</th>
            <th scope="col">Market Cap(24Hr)</th>
            <th scope="col">VWAP (24Hr)	</th>
            <th scope="col">Supply</th>
            <th scope="col">Volume</th>
            <th scope="col">Change(24hr)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <th scope="row">{item.rank}</th>
                <td>{item.name}</td>
                {/* <td>{parseFloat(item.priceUsd).toFixed(2)}</td> */}
                <td>Ft{Math.round(item.priceUsd * 100) / 100}</td>
                <td>Ft{parseFloat(item.marketCapUsd).toFixed(2)}</td>
                <td>Ft{parseFloat(item.vwap24Hr).toFixed(2)}</td>
                <td>Ft{parseFloat(item.supply).toFixed(2)}</td>
                <td>Ft{Math.round(item.volumeUsd24Hr * 100) / 100}</td>
                <td>{parseFloat(item.changePercent24Hr).toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <button type="button">View more</button>
      </div>
    </div>
  );
};

export default Header;
