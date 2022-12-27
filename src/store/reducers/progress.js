const states = {
  value: 0,
};

const progressReducer = (state = states, action) => {
  switch (action.type) {
    case "SET_PROGRESS_VALUE":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default progressReducer;
