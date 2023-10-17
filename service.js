const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription) => {
  const SERVER_URL = "http://localhost:5005/api/save-subscription";
  const response = await fetch(SERVER_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  
  return response.json();
};


self.addEventListener("activate", async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BFHnxkWnIzkpjIqgT_Zwg3IMSTKTU6rZ3ebANISTTIkl0_3xoLRTT6Z9AGSoyz5U1FifuFvvmlVWyxZLItWBRcQ"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
  } catch (err) {
    console.log("Error", err);
  }
});

self.addEventListener("push", function (event) {
  if (event.data) {
    console.log("Push event!! ", JSON.parse(event.data.text()));
    showLocalNotification(
      "Notification ",
      JSON.parse(event.data.text()),
      self.registration
    );
  } else {
    console.log("Push event but no data");
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  switch (event.notification.tag) {
  case "friend_request":{
    switch (event.action) {
      case "accept": {
        console.log("accept request API call.. with ", event.notification.data);
      }
  
      case "view_profile":
        {
          // direct to profile page
          event.waitUntil(
            clients
              .matchAll({
                type: "window",
                includeUncontrolled: true,
              })
              .then((windowClients) => {
                const matchingClient = windowClients.find(
                  (wc) => wc.url === urlToOpen
                );
  
                if (matchingClient) {
                  return matchingClient.focus();
                } else {
                  return clients.openWindow(event.notification.data.username);
                }
              })
          );
        }
  
        break;
      // Handle other actions ...
    }
  }
  }

});

const showLocalNotification = (title, data, swRegistration) => {
  swRegistration.showNotification(title, data);
};
