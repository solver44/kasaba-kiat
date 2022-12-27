const states = {
  buttonLarge: false,
  buttonOutlined: false,
  inputLarge: false,
  popover2: {
    modifiers: {
      arrow: { enabled: false },
      flip: { enabled: true },
      preventOverflow: { enabled: true },
    },
  },
};

const propertiesReducer = (state = states, action) => {
  switch (action.type) {
    case "SET_PROPERTIES":
      return (state = action.payload);
    case "SET_LARGE":
      return {
        ...state,
        buttonLarge: action.payload,
      };
    case "SET_BUTTON_OUTLINED":
      return {
        ...state,
        buttonOutlined: action.payload,
      };
    case "SET_INPUT_LARGE":
      return {
        ...state,
        inputLarge: action.payload,
      };
    case "SET_POPOVER2_MODIFIERS":
      return {
        ...state,
        popover2: {
          modifiers: action.payload,
        },
      };
    default:
      return state;
  }
};

export default propertiesReducer;
