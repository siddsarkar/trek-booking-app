import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TrekDetails from "../components/TrekDetails";
const BookTrek = () => {
  const location = useLocation();
  const { trek } = location.state;
  const [fields, setFields] = useState({
    name: "",
    age: "",
    gender: "",
    date: new Date().toISOString().substring(0, 10),
  });

  const onFieldsChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: name === "age" ? +value : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`/mybookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        alert("Trek booked");
      } else {
        alert("Trek already booked");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <TrekDetails trek={trek} />
      <form onSubmit={handleSubmit} className="BookTrek">
        <div>
          <label htmlFor="name">Name&nbsp;</label>
          <input
            required
            value={fields.name}
            onChange={onFieldsChange}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div>
          <label htmlFor="age">Age&nbsp;</label>
          <input
            required
            value={fields.age}
            onChange={onFieldsChange}
            type="number"
            name="age"
            id="age"
          />
        </div>
        <div>
          <label htmlFor="gender">Gender&nbsp;</label>
          <select
            required
            value={fields.gender}
            onChange={onFieldsChange}
            name="gender"
            id="gender"
          >
            <option disabled value="">
              Select a gender
            </option>
            <option value="m">male</option>
            <option value="f">female</option>
          </select>
        </div>
        <div>
          <label htmlFor="date">Date&nbsp;</label>
          <input
            required
            value={fields.date}
            onChange={onFieldsChange}
            type="date"
            name="date"
            id="date"
          />
        </div>
        <div>
          <label></label>
          <button type="submit">Book</button>
        </div>
      </form>
    </>
  );
};

export default BookTrek;
