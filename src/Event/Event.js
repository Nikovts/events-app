import React from "react";
import "./Event.css";

function Event({ imageURL, imageAlt, name, date, time }) {

  return (
    <div className="Event">
      <div className="Event-details">
        <img src={imageURL} alt={imageAlt} />
        <div className="Event-data">
          <h4>
            <small>Date: </small>
            {date}
          </h4>
          <h4>
            <small>Time: </small>
            {time ? time.substring(0, 5) : ''}
          </h4>
        </div>
      </div>

      <div>
        <h3 className="description"> {name}</h3>
      </div>
    </div>
  );
}
export default Event;
