import React, { useState, useEffect } from "react";
import "./CreateEvent.css";
import Event from "../Event/Event";

function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState(null);
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState({
    show: true,
    name: "",
    date: "",
    location: "",
    image: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
  };

  useEffect(() => {
    if (show) {
      setEvent({
        ...event,
        name: name,
        date: date,
        location: location,
        image: picture ? URL.createObjectURL(picture) : null,
      });
      setName("");
      setDate("");
      setLocation("");
      setPicture(null);
    }
  }, [show]);

  return !show ? (
    <div className="create-event">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setShow(false);
            }}
            required
          />
        </label>
        <br />

        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Picture:
          <input type="file" onChange={handlePictureChange} required />
        </label>

        <br />

        <button disabled={show} type="submit">
          Create Event
        </button>
      </form>
    </div>
  ) : (
    <div className="create-event">
      <h1>You have created {event.name} event successfully!</h1>
      <Event
        event={event}
        name={event.name}
        date={event.date}
        location={event.location}
        image={event.image}
      />
    </div>
  );
}

export default CreateEvent;
