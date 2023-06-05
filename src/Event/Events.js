import React from "react";
import "./Events.css";
import Event from "./Event";
import Paginate from "../Paginate/Paginate";
import { useState, useEffect } from 'react';
// import {changeHandlerFactory} from "../servises/extraFunctions";
import { get } from "../servises/requester";

// function Posts () {
//     return(
//         <div className="Posts">
//             <Post imageURL="./logo.svg" imageAlt="ALT" description="dhfhfhhfhfhhfhfhh" author="Nik"/>
//         </div>
//     )
// }

function Events () {
  const [events, setEvents] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [payload, setPayload] = useState({
    size: 20,
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
    getEvents();
  }
  function getEvents() {
    setIsRequestPending(true);
    get(payload)
    .then((events) => {
      console.log(events._embedded.events);
      if (!events._embedded) {
        setEvents([])
      } else {
        const newEvents = events._embedded.events;
        const newTotal = events.page.totalElements;
        const newTotalPages = events.page.totalPages;

        setEvents(newEvents);
        setTotal(newTotal);
        setTotalPages(newTotalPages);
      }
    })
    .finally(() =>{
      setIsRequestPending(false);
    });
  }
  useEffect(() => {
    console.log('kkkk');
    getEvents()
  },[])

  function categoryHandleChange(e) {
    const newValue = e.target.value;
    setPayload({
      ...payload,
      segmentName: newValue,
    });
    getEvents();

  };

  useEffect(() => {
    let toId;
    clearTimeout(id);
    toId = setTimeout(() => {

      if (searchWord !== payload.keyword) {
        console.log(payload, searchWord );
        getEvents();
        setSearchWord(payload.keyword);
      }

      setId(null)
    }, 1500);

    setId(toId);
  },[payload])

  function searchOnchangeHandler(e) {
    const newValue = e.target.value;

    setPayload(prevState => ({
      ...prevState,
      keyword: newValue,
    }))
  };
  // render() {
  //   const {isRequestPending, events, segmentOptions } = this.state;

    return !isRequestPending ? (
      <div className="Events">
        <h1>All Events</h1>
          <div className="Search">
          <input
            type="text"
            value={payload.keyword}
            onChange={searchOnchangeHandler}
            className="Search-input"
            placeholder="Search by keyword"
          />
          <Paginate
            totalPages={totalPages}
            paginate={paginate}
            firstPage={firstPage}
            lastPage={lastPage}
            currentPage={payload.page}
          />
          <div className="Select-category">
            <span className="Select-label">Choose a category</span>
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
        ? <div className="Event-list">
          {events.map((event) => (
            <Event
              key={event.id}
              imageURL={event.images[0].url}
              imageAlt={event.name}
              name={event.name}
              date={event.dates.start.localDate}
              time={event.dates.start.localTime}
            />
          ))}
        </div>
        : <h3 className="No-data">No events found with keyword "{payload.keyword}" </h3>}
      </div>
    ) : (
      <div className="Loading">Loading...</div>
    );
  // }
}
export default Events;