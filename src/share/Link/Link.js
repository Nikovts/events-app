import React from "react";
import "./Link.css";
import { Link } from "react-router-dom";

function Links({ children, url }) {
  return (
    <Link to={url} className="listItem">
      {children}
    </Link>
  );
}
export default Links;
