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

const Drop = ({
  name,
  creator,
  collectionName,
  date,
  url,
  minPrice,
  marketplace,
  category
}) => {
  const calculateTimeLeft = date => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
        //seconds: ((difference / 1000) % 60).toFixed(1)
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
  });

  const timerComponents = [];
  console.log('timeLeft', timeLeft)
  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      //return;
    }

    timerComponents.push(
      <div key={interval}>
        <div className='top'>
          {timeLeft[interval]}
        </div>
        <div className='bottom'>
          {interval}
        </div>
         
      </div>
    );
  });

  return (
    <tr>
      <td>
        <p>
          <a href={url}>{name}</a>
        </p>
      </td>
      <td>
        <p>{collectionName}</p>
      </td>

      <td>
        <p>{marketplace}</p>
      </td>
      <td>
        <p>${minPrice}</p>
      </td>
      <td>
        <p>{date}</p>
      </td>
      <td className='timer-wrapper'>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </td>
    </tr>
  );
};

export const Drops = () => {
  console.log({ dropData });
  return (
    <>
      <HomePageHeader />
      <div className="drop-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Collection</th>
              <th>Marketplace</th>
              <th>Min Price</th>
              <th>Date</th>
              <th>Time remaining</th>
            </tr>
          </thead>
          <tbody>
            {dropData
              .filter(drop => {
                return +new Date(drop.date) - +new Date() > 0;
              })
              .sort((dropA, dropB) => {
                return +new Date(dropA.date) - +new Date(dropB.date);
              })
              .map((drop, key) => {
                console.log({ drop });
                return (
                  <Drop
                    key={key}
                    name={drop.name}
                    creator={drop.creator}
                    collectionName={drop.collectionName}
                    date={drop.date}
                    url={drop.url}
                    minPrice={drop.minPrice}
                    marketplace={drop.marketplace}
                    category={drop.category}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
