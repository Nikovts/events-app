import React from "react";
import "./Events.css";
import Event from "./Event";
import Paginate from "../Paginate/Paginate";
import { useState, useEffect } from 'react';
import { get } from "../servises/requester";

function Events () {
  const [events, setEvents] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [payload, setPayload] = useState({
    size: 12,
    page: 1,
    keyword: "",
    segmentName: "",
  })
  const [id, setId] = useState(null)
  const segmentOptions = [
    { value: '',
      name: 'All'},
    { value: 'Music',
      name: 'Music'},
    { value: 'Sports',
      name: 'Sports'},
    { value: 'Arts & Theatre',
      name: 'Arts & Theatre'}
  ]

  function paginate (pageNumber) {
    setCurrentPage(pageNumber);
  };

  function firstPage() {
    setCurrentPage(1);
  };

  function lastPage () {
    setCurrentPage(totalPages);
 };

  function setCurrentPage (page){
    setPayload({
      ...payload,
       page: page,
    })
  };

  function getEvents() {
    setIsRequestPending(true);
    get(payload)
    .then((events) => {
      if (!events._embedded) {
        setEvents([])
      } else {
        const newEvents = events._embedded.events;
        const newTotalPages = events.page.totalPages;

        setEvents(newEvents);
        setTotalPages(newTotalPages);
      }
    })
    .finally(() =>{
      setIsRequestPending(false);
    });
  };

  function categoryHandleChange(e) {
    const newValue = e.target.value;
    setPayload({
      ...payload,
      segmentName: newValue,
    });
  };

  useEffect(() => {
    getEvents();
  },[payload.segmentName, payload.page])

  useEffect(() => {
    let toId;
    clearTimeout(id);
    toId = setTimeout(() => {

      if (searchWord !== payload.keyword) {
        getEvents();
        setSearchWord(payload.keyword);
      }

      setId(null)
    }, 1500);

    setId(toId);
  },[payload.keyword])

  function searchOnchangeHandler(e) {
    const newValue = e.target.value;

    setPayload(prevState => ({
      ...prevState,
      keyword: newValue,
    }))
  };

  return !isRequestPending ? (
    <div className="events">
      <h1>{payload.segmentName === '' ? 'All' : payload.segmentName} Events</h1>
        <div className="search">
          <input
            type="text"
            value={payload.keyword}
            onChange={searchOnchangeHandler}
            className="search-input"
            placeholder="Search by keyword"
          />
          <Paginate
            totalPages={totalPages}
            paginate={paginate}
            firstPage={firstPage}
            lastPage={lastPage}
            currentPage={payload.page}
          />
          <div className="select-category">
            <span className="select-label">Choose a category</span>
            <select
              value={payload.segmentName}
              onChange={categoryHandleChange}
            >
              {segmentOptions.map((option) => (
                <option key={option.name} value={option.value}>{option.name}</option>
              ))}
            </select>
          </div>

        </div>
        {events.length
        ? <div className="event-list">
          {events.map((event) => (
            <Event
              event={event}
              name={event.name}
              date={event.dates.start.localDate}
              image={event.images[0].url}
              time={event.dates.start.localTime}
              location={event._embedded && event._embedded.venues[0].city.name ? event._embedded.venues[0].city.name  : ''}
              key={event.id}
            />
          ))}
        </div>
        : <h3 className="no-data">No events found with keyword "{payload.keyword}" </h3>}
      </div>
    ) : (
      <div className="loading">Loading...</div>
  );

}
export default Events;
