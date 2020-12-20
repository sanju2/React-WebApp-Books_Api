import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NavDate(props) {
  const [startDate, setDate] = useState(props.date);
  useEffect(() => setDate(props.date), [props.dateMax, props.date]);

  if (props.content === "search" || props.content === "book") {
    return <></>;
  }

  function plusMinusDays(date, days, type) {
    if (type === "add") {
      return new Date(date.getTime() + days * 1000 * 60 * 60 * 24);
    } else {
      return new Date(date.getTime() - days * 1000 * 60 * 60 * 24);
    }
  }

  function handleDtChng(date) {
    setDate(date);
  }

  function handleDateSelect() {
    let srchDt = startDate.toISOString().substr(0, 10);
    if (props.content === "home") {
      return props.onDateChange(srchDt, props.content);
    }
    return props.onDateChange(srchDt, props.content, props.genreTxt);
  }

  function handleWkJmpClk(e) {
    let newDate;
    if (e.target.dataset.name === "prev") {
      let dateMin = plusMinusDays(props.dateMin, 7, "add");
      if (props.date < dateMin) {
        return null;
      } else {
        newDate = plusMinusDays(props.date, 7, "subtract");
      }
    } else {
      let dateMax = plusMinusDays(props.dateMax, 7, "subtract");
      if (props.date > dateMax) {
        return null;
      } else {
        newDate = plusMinusDays(props.date, 7, "add");
      }
    }
    return props.onDateChange(newDate.toISOString().substr(0, 10));
  }

  return (
    <div className="date-picker">
      <button onClick={handleWkJmpClk} data-name="prev">
        <div className="fas fa-caret-left fa-reg" />
        {" Prev Week"}
      </button>
      <DatePicker
        selected={startDate}
        onChange={handleDtChng}
        minDate={props.dateMin}
        maxDate={props.dateMax}
        peekNextMonth
        onFocus={e => (e.target.readOnly = true)}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <button onClick={handleWkJmpClk} data-name="next">
        {"Next Week "}
        <div className="fas fa-caret-right fa-reg" />
      </button>
      <button className="date-picker__go-btn" onClick={handleDateSelect}>
        GO
      </button>
    </div>
  );
}

export default NavDate;
