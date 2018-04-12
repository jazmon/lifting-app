// import type { ReduxState } from 'redux/modules';

// Action types

export const FOO = 'FOO';
export type WorkoutState = {
  foo: string;
};

// Actions
export function fooBar() {
  return {
    type: FOO,
  };
}

const initialState: WorkoutState = {
  foo: 'bar',
};
// Reducer
export default function reducer(
  state: WorkoutState = initialState,
  action: any,
): WorkoutState {
  switch (action.type) {
    case FOO:
      return {
        ...state,
        foo: 'baz',
      };
    default:
      return state;
  }
}
