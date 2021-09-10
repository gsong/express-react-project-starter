import * as React from "react";

import { format } from "date-fns";

import * as apiClient from "./apiClient";

const Events = () => {
  const {
    filteredEvents,
    addEvent,
    deleteEvent,
    setDateFilter,
    setCategoryFilter,
  } = useEvents();

  return (
    <section>
      <h1>Events</h1>
      <DateFilter {...{ setDateFilter }} />
      <CategoryFilter {...{ setCategoryFilter }} />
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
            <button onClick={() => deleteEvent(id)}>Delete</button>
          </li>
        ))}
      </ul>
      <AddEvent {...{ addEvent }} />
    </section>
  );
};

const DateFilter = ({ setDateFilter }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    setDateFilter(event.currentTarget.elements.date.value);
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Date
        <input name="date" type="date" />
      </label>
      <button>Filter by date</button>
      <button type="reset" onClick={() => setDateFilter()}>
        Clear date
      </button>
    </form>
  );
};

const CategoryFilter = ({ setCategoryFilter }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    setCategoryFilter(event.currentTarget.elements.category.value);
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        Category
        <input name="category" />
      </label>
      <button>Filter by category</button>
      <button type="reset" onClick={() => setCategoryFilter()}>
        Clear category
      </button>
    </form>
  );
};

const AddEvent = ({ addEvent }) => {
  const onSubmit = (event) => {
    const form = event.currentTarget;
    const {
      name: { value: name },
      date: { value: date },
      category: { value: category },
    } = form.elements;

    event.preventDefault();
    addEvent({ name, date, category });
    form.reset();
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

const useEvents = () => {
  const [events, setEvents] = React.useState([]);
  const [dateFilter, setDateFilter] = React.useState();
  const [categoryFilter, setCategoryFilter] = React.useState();

  const dateFilteredEvents =
    dateFilter === undefined
      ? events
      : events.filter(
          (event) => format(event.date, "yyyy-MM-dd") === dateFilter,
        );

  const filteredEvents =
    categoryFilter === undefined
      ? dateFilteredEvents
      : dateFilteredEvents.filter((event) =>
          event.category.includes(categoryFilter),
        );

  const getEvents = () => apiClient.getEvents().then(setEvents);
  const addEvent = (event) => apiClient.addEvent(event).then(getEvents);
  const deleteEvent = (id) => apiClient.deleteEvent(id).then(getEvents);

  React.useEffect(() => {
    getEvents();
  }, []);

  return {
    filteredEvents,
    addEvent,
    deleteEvent,
    setDateFilter,
    setCategoryFilter,
  };
};

export default Events;
