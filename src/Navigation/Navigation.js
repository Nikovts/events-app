import React from "react";
import "./Navigation.css";
import Links from "../share/Link/Link";
import menuData from "../servises/menu";

function Navigation() {

  const newList = (menuData) => {
    return menuData.map((el, ind) => {
      return (
        <Links url={el.url} key={ind + 1} className="listItem">
          {el.name}
        </Links>
      );
    });
  };
  return (
    <nav className="navigation">
      <ul>
        {newList(menuData)}
      </ul>
    </nav>
  );
}
export default Navigation;
