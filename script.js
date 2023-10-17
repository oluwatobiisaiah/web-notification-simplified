const Notifybtn = document.querySelector(".notify");
// const sendSimpleNotification = () => {

//   if (!("Notification" in window)) {
//     throw new Error("Your browser does not support push notification");
//   }

//   Notification.requestPermission().then((Permission) => {
//     let notificationOptions = {
//       body: "Welcome to Javascript Push Notification",
//       icon: "./image.png",
   
//     };
//     new Notification("movely.com", notificationOptions);
//   });
// };

// Notifybtn.addEventListener("click",requestPermission);

// advanced section
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "service.js",
        {
          scope: "./",
        }
      );
      return registration;
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

const requestPermission = () => {
  if (!("Notification" in window)) {
    throw new Error("Your browser does not support push notification");
  }
  Notification.requestPermission().then(async (permission) => {});
};

const unregisterServiceWorkers = ()=>{
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}

const sendNotification = async () => {
  let notificationOptions = {
    body: "Elon Musk sent you a friend request",
    icon: "./image.png",
    data: {
      requestId: "1234",
      username: "elonmusk"
    },
    actions: [
      {
        action: "accept",
        title: "Accept",
      
      },
      {
        action: "view_profile",
        title: "View Profile",
      },
    ],
    tag: "friend_request",
  };
  const sw = await registerServiceWorker();
  sw.showNotification("Friend Request", notificationOptions);
};

Notifybtn.addEventListener("click", sendNotification);
requestPermission();
// unregisterServiceWorkers()
registerServiceWorker()

