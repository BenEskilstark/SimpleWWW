
export const rootReducer = (state, action) => {
  if (state === undefined) state = initState();

  switch (action.type) {
    case 'TURN':
      return {...state, turn: state.turn + 1};
    default:
      return state;
  }
};

export const initState = () => {
  return {
    turn: 0,
  };
}


