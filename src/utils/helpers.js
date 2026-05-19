// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Sleep/delay
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry function
export const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await sleep(delay);
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

// Clone object
export const cloneDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Merge objects
export const mergeObjects = (target, source) => {
  return { ...target, ...source };
};
