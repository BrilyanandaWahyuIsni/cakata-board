import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  value: boolean;
};

const initialState: InitialStateProps = {
  value: false,
};

const showComponentData = createSlice({
  name: 'showComponentClick',
  initialState: initialState,
  reducers: {
    setShowCmp(state, action: PayloadAction<Partial<InitialStateProps>>) {
      state.value = action.payload.value as never;
    },
  },
});

export const { setShowCmp } = showComponentData.actions;
export default showComponentData.reducer;
