import * as React from "react";

import { format } from "date-fns";

import * as apiClient from "./apiClient";

const Events = () => {
  const [events, setEvents] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState();

  const filteredEvents =
    dateFilter === undefined
      ? events
      : events.filter(
          (event) => format(event.date, "yyyy-MM-dd") === dateFilter,
        );

  const getEvents = () => apiClient.getEvents().then(setEvents);

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <section>
      <SearchByDate {...{ setDateFilter }} />
      <div>{dateFilter}</div>
      <ul>
        {filteredEvents.map(({ id, name, date, category }) => (
          <li key={id}>
            <dl>
              <dt>ID</dt>
              <dd>{id}</dd>
              <dt>Name</dt>
              <dd>{name}</dd>
              <dt>Date</dt>
              <dd>{date.toDateString()}</dd>
              <dt>Category</dt>
              <dd>{category}</dd>
            </dl>
            <button onClick={() => apiClient.deleteEvent(id).then(getEvents)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <AddEventForm {...{ getEvents }} />
    </section>
  );
};

const SearchByDate = ({ setDateFilter }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    setDateFilter(e.currentTarget.elements.date.value);
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Search by date
        <input name="date" type="date" />
      </label>
      <button>Search by date</button>
      <button type="reset" onClick={() => setDateFilter()}>
        Clear date
      </button>
    </form>
  );
};

const AddEventForm = ({ getEvents }) => {
  const onSubmit = (e) => {
    const {
      name: { value: name },
      date: { value: date },
      category: { value: category },
    } = e.currentTarget.elements;

    e.preventDefault();
    apiClient.addEvent({ name, date, category }).then(getEvents);
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Name
        <input name="name" required />
      </label>
      <label>
        Date
        <input name="date" type="date" required />
      </label>
      <label>
        Category
        <input name="category" required />
      </label>
      <button>Add event</button>
    </form>
  );
};

export default Events;
