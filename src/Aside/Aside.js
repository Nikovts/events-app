import React from "react";
import "./Aside.css";
import Links from "../share/Link/Link";
import menuData from "../servises/menu";

function Aside() {
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
    <aside className="aside">
      <ul>{newList(menuData)}</ul>
    </aside>
  );
}
export default Aside;
