import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateProps = {
  value: boolean;
  change: boolean;
};

const initialState: InitialStateProps = {
  value: false,
  change: false,
};

const showComponentData = createSlice({
  name: 'showComponentClick',
  initialState: initialState,
  reducers: {
    setShowCmp(state, action: PayloadAction<Partial<InitialStateProps>>) {
      state.value = action.payload.value as never;
    },
    rubahDataKomponen(
      state,
      action: PayloadAction<Partial<InitialStateProps>>,
    ) {
      state.change = action.payload.change as never;
    },
  },
});

export const { setShowCmp, rubahDataKomponen } = showComponentData.actions;
export default showComponentData.reducer;
