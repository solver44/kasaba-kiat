const states = {
  show: true,
};

const propertiesReducer = (state = states, action) => {
  switch (action.type) {
    case "SET_SIDEBAR_SHOW":
      return {
        ...state,
        show: action.payload,
      };
    default:
      return state;
  }
};

export default propertiesReducer;
