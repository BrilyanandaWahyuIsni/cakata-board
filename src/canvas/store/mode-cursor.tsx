import { PayloadAction, createSlice } from '@reduxjs/toolkit';
type InitialStateProps = {
  value: string;
};
const initialState: InitialStateProps = {
  value: '',
};

const modeCursor = createSlice({
  name: 'modeCanvas',
  initialState: initialState,
  reducers: {
    setModeCursor(state, payload: PayloadAction<InitialStateProps>) {
      state.value = payload.payload.value;
    },
  },
});

export const { setModeCursor } = modeCursor.actions;
export default modeCursor.reducer;
