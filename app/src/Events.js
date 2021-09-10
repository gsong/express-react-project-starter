import * as React from "react";

import { format } from "date-fns";

import * as apiClient from "./apiClient";

const Events = ({ selectedUser }) => {
  const {
    filteredEvents,
    addEvent,
    deleteEvent,
    favoriteEvent,
    unfavoriteEvent,
    setDateFilter,
    setCategoryFilter,
    displayFavoritesOnly,
    setDisplayFavoritesOnly,
    user,
  } = useEvents(selectedUser);

  return (
    <section>
      <h1>Events for {user?.username}</h1>
      <DateFilter {...{ setDateFilter }} />
      <CategoryFilter {...{ setCategoryFilter }} />
      <label>
        <input
          type="checkbox"
          defaultChecked={displayFavoritesOnly}
          onChange={(e) => {
            setDisplayFavoritesOnly(e.currentTarget.checked);
          }}
        />{" "}
        Favorited events only
      </label>
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
            {user?.favorites?.includes(id) ? (
              <button
                type="button"
                onClick={() => unfavoriteEvent(selectedUser, id)}
              >
                Unfavorite
              </button>
            ) : (
              <button
                type="button"
                onClick={() => favoriteEvent(selectedUser, id)}
              >
                Favorite
              </button>
            )}
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

const useEvents = (selectedUser) => {
  const [events, setEvents] = React.useState([]);
  const [displayFavoritesOnly, setDisplayFavoritesOnly] = React.useState(false);
  const [dateFilter, setDateFilter] = React.useState();
  const [categoryFilter, setCategoryFilter] = React.useState();
  const [user, setUser] = React.useState();

  const favoriteEvents = displayFavoritesOnly
    ? events.filter((event) => user?.favorites.includes(event.id))
    : events;

  const dateFilteredEvents =
    dateFilter === undefined
      ? favoriteEvents
      : favoriteEvents.filter(
          (event) => format(event.date, "yyyy-MM-dd") === dateFilter,
        );

  const filteredEvents =
    categoryFilter === undefined
      ? dateFilteredEvents
      : dateFilteredEvents.filter((event) =>
          event.category.includes(categoryFilter),
        );

  const getEvents = () => apiClient.getEvents().then(setEvents);
  const getUser = React.useCallback(
    () => apiClient.getUser(selectedUser).then(setUser),
    [selectedUser],
  );
  const addEvent = (event) => apiClient.addEvent(event).then(getEvents);
  const deleteEvent = (id) => apiClient.deleteEvent(id).then(getEvents);
  const favoriteEvent = (userId, eventId) =>
    apiClient.favoriteEvent(userId, eventId).then(getUser);
  const unfavoriteEvent = (userId, eventId) =>
    apiClient.unfavoriteEvent(userId, eventId).then(getUser);

  React.useEffect(() => {
    getEvents();
  }, []);

  React.useEffect(() => {
    selectedUser !== undefined && getUser();
  }, [selectedUser, getUser]);

  return {
    filteredEvents,
    addEvent,
    deleteEvent,
    favoriteEvent,
    unfavoriteEvent,
    setDateFilter,
    setCategoryFilter,
    displayFavoritesOnly,
    setDisplayFavoritesOnly,
    user,
  };
};

export default Events;
