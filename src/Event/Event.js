import React from "react";
import "./Event.css";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Event({ event }) {
  const [ticketNumber, setTicketNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [wishList, setWishList] = useState(() => {
    // getting stored value
    const savedList = localStorage.getItem("wishList");
    const initialList = JSON.parse(savedList);
    return initialList || [];
  });
  const [add, setAdd] = useState(false);
  const history = useHistory();
  const ticketLimit = event.accessibilit && event.accessibility.ticketLimit ? event.accessibility.ticketLimit : 10;
  const ticketPrice = event.priceRanges
    ? event.priceRanges[0].min !== 0
      ? event.priceRanges[0].min : event.priceRanges[0].max
    : 0;
  const ticketCurrency =  event.priceRanges ?  event.priceRanges[0].currency : '';

  function changeTicketNumbers(e) {
    const newValue = e.target.value;
    setTicketNumber(newValue);
  }

  useEffect(() => {
    const sum = ticketNumber*ticketPrice;
    setTotal(sum.toFixed(2));
  },[ticketNumber])

  function addToWishList() {
    const tickets = ticketNumber > 1 ? ticketNumber +' tickets' : ticketNumber +' ticket';
    const amount = total + ' ' + ticketCurrency;
    setWishList(
      [
        ...wishList,
        {
          name: event.name,
          date: event.dates.start.localDate,
          tickets,
          amount
        }
      ]
    );
    setAdd(true);
  }

  useEffect(() => {
    // storing input name
    localStorage.setItem("wishList", JSON.stringify(wishList));
    if (add) {
      history.push('/WishList');
    }
  }, [add]);

  function TicketData () {
    if (ticketPrice === 0) {
      return <h4>SOLD OUT</h4>
    }
    return (
      <>
        <h4>
          <small>Ticket price: </small>
          {ticketPrice+' '+ticketCurrency}
        </h4>
          <h5>Number of tickets (1-{ticketLimit}): </h5>
          <input
            type="number"
            id="tickets"
            name="tickets"
            min="1"
            max={ticketLimit}
            value={ticketNumber}
            onChange={changeTicketNumbers}
          />
          <h4>
            <small>Total amount: </small>
            {total+' '+ticketCurrency}
          </h4>
          <button

            onClick={addToWishList}
          >
            Add to Wish list
          </button>
      </>
    )
  }

  return (
    <div className="Event">
      <div className="Event-details">
        <img src={event.images[0].url} alt={event.name}/>
        <div className="Event-data">
          <h4>
            <small>Date: </small>
            {event.dates.start.localDate}
          </h4>
          <h4>
            <small>Time: </small>
            {event.dates.start.localTime ? event.dates.start.localTime.substring(0, 5) : ''}
          </h4>
          <TicketData/>
        </div>
      </div>

      <div>
        <h3 className="Event-name">{event.name}</h3>
        <h4 className="Event-name">
          <small>Location: </small>
          {event._embedded.venues[0].city.name ? event._embedded.venues[0].city.name  : ''}
        </h4>
      </div>
    </div>
  );
}
export default Event;
