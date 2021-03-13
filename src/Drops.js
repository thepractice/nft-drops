import React from "react";
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
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h5>{name}</h5>
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
        </tr>
      </tbody>
    </table>
  );
};

export const Drops = () => {
  return (
    <>
      <HomePageHeader />
      <div className="drop-container">
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
      </div>
    </>
  );
};
