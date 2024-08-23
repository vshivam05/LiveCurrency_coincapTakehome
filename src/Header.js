import React, { useEffect, useState } from "react";
import "./App.css";

const Header = () => {
  const [data, setData] = useState([]); // All fetched data
  const [visibleData, setVisibleData] = useState([]); // Data currently visible on the table
  const [itemsToShow, setItemsToShow] = useState(10); // Number of items to show initially and on each click

  const fetchData = async () => {
    try {
      const res = await fetch("https://api.coincap.io/v2/assets");
      const apiData = await res.json();
      console.log(apiData.data[0]);
      setData(apiData.data); // Store all fetched data
      setVisibleData(apiData.data.slice(0, itemsToShow)); // Set visible data up to `itemsToShow` limit
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    // Set up the interval to fetch data every second (1000 ms)
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [itemsToShow]); // Add `itemsToShow` as a dependency

  const handleLoadMore = () => {
    const newItemsToShow = itemsToShow + 10; // Increase the number of items to show by 50
    setItemsToShow(newItemsToShow); // Update state to trigger re-render and show more items
    setVisibleData(data.slice(0, newItemsToShow)); // Update visible data
  };

  return (
    <div>
      {/* Your existing JSX code remains unchanged */}
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Market Cap (24Hr)</th>
              <th scope="col">VWAP (24Hr)</th>
              <th scope="col">Supply</th>
              <th scope="col">Volume</th>
              <th scope="col">Change (24hr)</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.rank}</th>
                  <td>{item.name}</td>
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
        <br />
        {/* Button to load more data */}
        <button className="btn btn-success " type="button" onClick={handleLoadMore}>
          View more
        </button>
      </div>
    </div>
  );
};

export default Header;
