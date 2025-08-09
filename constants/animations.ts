export const animations = {
  // Spring configurations
  spring: {
    gentle: {
      damping: 20,
      stiffness: 100,
    },
    bouncy: {
      damping: 15,
      stiffness: 200,
    },
    snappy: {
      damping: 25,
      stiffness: 300,
    },
  },

  // Timing configurations
  timing: {
    fast: { duration: 200 },
    normal: { duration: 300 },
    slow: { duration: 500 },
  },

  // Easing curves
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
} as const;
