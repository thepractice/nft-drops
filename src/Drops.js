import React, { useEffect, useState } from "react";
import "./App.css";
import { dropData } from "./data";

const HomePageHeader = () => {
  return (
    <header className="header">
      <h2>Upcoming NFT Drops</h2>
    </header>
  );
};





const Drop = ({ name, creator, collectionName, date, url, minPrice, marketplace, category }) => {

  const calculateTimeLeft = (date) => {
    let year = new Date().getFullYear();
    const difference = +new Date(date) - +new Date();
    let timeLeft = {}
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <tr>
      <td>
        <h5><a href={url}>{name}</a></h5>
      </td>
      <td>
        <h5>{marketplace}</h5>
      </td>
      <td>
        <h4>{minPrice}</h4>
      </td>
      <td>
        <p>{date}</p>
      </td>
      <td>
        <p>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</p>
      </td>
    </tr>
  );
};

export const Drops = () => {
  return (
    <>
      <HomePageHeader />
      <div className="drop-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Marketplace</th>
              <th>Min Price</th>
              <th>Date</th>
              <th>Time remaining</th>
            </tr>
          </thead>
          <tbody>
            {dropData.map((drop, key) => {
              return (
                <Drop 
                  key = {key}
                  name = {drop.name}
                  creator = {drop.creator} 
                  collectionName = {drop.collectionName} 
                  date = {drop.date} 
                  url = {drop.url}
                  minPrice = {drop.minPrice} 
                  marketplace = {drop.marketplace} 
                  category = {drop.category} 
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
