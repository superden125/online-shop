import { store } from "react-notifications-component";

const showNotify = (title, message, type) =>
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      // onScreen: true,
      showIcon: true,
    },
  });

export { showNotify };
