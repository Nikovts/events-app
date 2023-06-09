import React from "react";
import "./Footer.css";
import Links from "../share/Link/Link";
import menuData from "../servises/menu";

function Footer() {
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
    <footer className="footer">
      <ul>{newList(menuData)}</ul>
    </footer>
  );
}
export default Footer;
