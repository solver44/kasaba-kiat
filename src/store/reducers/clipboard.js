const clipboardReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_CLIPBOARD":
      return (state = action.payload);
    default:
      return state;
  }
};

export default clipboardReducer;
