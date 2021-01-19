export default {
  success: {
    put: jest.fn(() => ({ promise: () => Promise.resolve(true) })),
  },
  failure: {
    put: () => ({
      promise: () => Promise.reject(),
    }),
  },
};
