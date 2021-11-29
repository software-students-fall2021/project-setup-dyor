/* eslint-disable no-undef */
console.log("Service Worker Loaded...");

// eslint-disable-next-line no-restricted-globals
addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
    // eslint-disable-next-line no-restricted-globals
    registration.showNotification(data.title, {
    body: "Notified by Traversy Media!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
});