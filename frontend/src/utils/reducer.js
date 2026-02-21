export const createInitialState = (fields) => ({
  ...fields,
  errors: {},
});

export function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FORM":
      return { ...state, ...action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET_FORM":
      return action.payload;
    default:
      return state;
  }
}
