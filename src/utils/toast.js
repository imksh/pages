import toast from "react-hot-toast";

// Success notification
export const notifySuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: 3000,
    position: "top-right",
    ...options,
  });
};

// Error notification
export const notifyError = (message, options = {}) => {
  return toast.error(message, {
    duration: 3000,
    position: "top-right",
    ...options,
  });
};

// Loading notification
export const notifyLoading = (message, options = {}) => {
  return toast.loading(message, {
    ...options,
  });
};

// Promise notification
export const notifyPromise = (promise, messages = {}, options = {}) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Something went wrong",
    },
    options,
  );
};

// Info notification
export const notifyInfo = (message, options = {}) => {
  return toast(message, {
    duration: 3000,
    position: "top-right",
    icon: "ℹ️",
    ...options,
  });
};
