import React, { useEffect, useState } from "react";

const Sample = () => {
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
    fetchData();
  }, []);

  return (
    <>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">price</th>
            <th scope="col">Market Cap(24Hr)</th>
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
                <td>Ft{Math.round(item.volumeUsd24Hr * 100) / 100}</td>
                <td>{parseFloat(item.changePercent24Hr).toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <button type="button">View more</button>
    </>
  );
};

export default Sample;
