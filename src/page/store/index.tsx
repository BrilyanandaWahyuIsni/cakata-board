import { configureStore } from '@reduxjs/toolkit';
import showClickComponent from './show-clickComponent';
import modeCanvas from './mode-canvas';

const store = configureStore({
  reducer: {
    showDataComponent: showClickComponent,
    modeCanvas: modeCanvas,
  },
});

export type StoreStateProps = ReturnType<typeof store.getState>;
export type StoreDisPatchProps = typeof store.dispatch;
export default store;
