// Layout types
export const LAYOUT_TYPES = {
  DEFAULT: "default", // Header + Footer
  MINIMAL: "minimal", // Header only
  AUTH: "auth", // Auth pages
  PROTECTED: "protected", // Auth protected with Header + Footer
  FULL: "full", // Full screen, no header/footer
  BIRTHDAY: "birthday", // Birthday page layout
};

// Theme constants
export const THEME_COLORS = {
  PRIMARY: "#3B82F6",
  PRIMARY_DARK: "#1D4ED8",
  SECONDARY: "#6366F1",
  SUCCESS: "#10B981",
  ERROR: "#EF4444",
  WARNING: "#F59E0B",
  NEUTRAL: "#6B7280",
};

// Animation variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

// Status codes
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
