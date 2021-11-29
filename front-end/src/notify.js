const Pusher = require("pusher");
const axios = require("axios");

export default function notify() {
  console.log(process.env.REACT_APP_PUSHER_APP_ID);
  console.log(process.env.REACT_APP_PUSHER_CLUSTER);
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_ID, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  });
  console.log(pusher);
  var channel = pusher.notify("notifications");
  channel.bind("post_updated", function (data) {
    alert(JSON.stringify(data));
  });
  //   var pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_ID, {
  //     cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  //   });

  // retrieve the socket ID once we're connected
  //   pusher.connection.bind("connected", function () {
  //     // attach the socket ID to all outgoing Axios requests
  //     console.log("In bind");
  //     axios.defaults.headers.common["X-Socket-Id"] = pusher.connection.socket_id;
  //   });

  // request permission to display notifications, if we don't alreay have it
  //   Notification.requestPermission();
  //   pusher.subscribe("notifications").bind("post_updated", function (post) {
  //     console.log("In subscribe");
  //     var notification = new Notification(post);
  //     notification.onclick = function (event) {
  //       window.location.href = "https://localhost:3000/dashboard";
  //       event.preventDefault();
  //       notification.close();
  //     };
  //   });
}
