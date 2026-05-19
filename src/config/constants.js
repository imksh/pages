// Route paths constants
export const ROUTES = {
  // Public
  HOME: "/",
  LOVE_ME: "/loveMe",
  SNAKE_AND_LADDER: "/snake-and-ladder",
  GALLERY: "/galary",
  KARAN_GALLERY: "/galary/karan-galary",
  PAINT: "/paint",
  LUDO: "/ludo",
  CAMERA: "/camera",
  WONDERS: "/wonders",
  CURRENCY_CONVERTER: "/currency-converter",
  REVEAL: "/reveal",
  REVEAL_KARAN: "/reveal/karan",
  MATCH_GRID: "/match-grid",
  SCAN_QR: "/scan-qr",

  // Countdown
  COUNTDOWN: "/countdown",

  // Private
  PRIVATE_BHAWNA: "/private/bhawna",
  PRIVATE_PAPA_MUMMY: "/private/papa-mummy",

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Protected
  PROFILE: "/profile",
  NOTES: "/notes",

  // Birthday
  BIRTHDAY: "/birthday",
  BIRTHDAY_DETAIL: "/birthday/:id",

  // Error
  NOT_FOUND: "/*",
};

// API endpoints
export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  NOTES: "/api/notes",
  PROFILE: "/api/profile",
  BIRTHDAY: "/api/birthday",
};

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: 0.3,
  HEADER_HEIGHT: "70px",
  SIDEBAR_WIDTH: "250px",
  TOAST_DURATION: 3000,
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: "Pages",
  APP_DESCRIPTION: "Explore amazing interactive projects",
  APP_VERSION: "1.0.0",
};
