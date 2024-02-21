import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TypeComponenCanvasProps } from '../canvas/freeBrushCanvasConfig';

type InitialStateProps = { value: TypeComponenCanvasProps };
const initialState: InitialStateProps = {
  value: 'BRUSH',
};

const modeCanvas = createSlice({
  name: 'modeCanvas',
  initialState: initialState,
  reducers: {
    setModeCanvas(state, action: PayloadAction<InitialStateProps>) {
      state.value = action.payload.value;
    },
  },
});

export const { setModeCanvas } = modeCanvas.actions;
export default modeCanvas.reducer;
