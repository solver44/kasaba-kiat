const importedRowsReducer = (state = { rows: null }, action) => {
  switch (action.type) {
    case "SET_IMPORTED_ROWS":
      return (state.rows = action.payload);
    default:
      return state;
  }
};

export default importedRowsReducer;
