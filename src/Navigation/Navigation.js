import React from "react";
import "./Navigation.css";
import Links from "../share/Link/Link";
import logo from "../logo192.png";

// import {Link} from 'react-router-dom'

function Navigation() {
  const isLOgin = sessionStorage.getItem("authtoken") !== null;

  let data;
  isLOgin
    ? (data = ["Home", "Event", "Profile", "AllEvents", "Logout", "WishList"])
    : (data = ["Home", "Event", "WishList"]);

  const newList = (data) => {
    return data.map((el, ind) => {
      let url = `/${el.toLowerCase() }`;
      return (
        <Links url={url} key={ind + 1} className="listItem">
          {el}
        </Links>
      );
    });
  };
  return (
    <nav className="Navigation">
      <ul>
        {/* <li className="listItem">
          <img src={logo} alt="my logo" />
        </li> */}
        {newList(data)}
      </ul>
    </nav>
  );
}
export default Navigation;
