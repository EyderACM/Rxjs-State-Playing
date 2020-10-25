import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";

import chatStore from "./messageStore";

const App = () => {
  const [notifications, setNotifications] = useState({});

  useLayoutEffect(() => {
    chatStore.subscribe(setNotifications);
    chatStore.init();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const message = {
      person: "first-message",
      text: event.target[0].value
    };
    chatStore.sendNotification(message);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <input type="submit" value="subir" />
      </form>
      {notifications.data &&
        notifications.data.map((value) => {
          return <h3>{value.text}</h3>;
        })}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));
