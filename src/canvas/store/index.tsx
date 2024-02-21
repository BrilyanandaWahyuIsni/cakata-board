import { configureStore } from '@reduxjs/toolkit';
import showClickComponent from './show-clickComponent';
import modeCanvas from './mode-canvas';
import modeCursor from './mode-cursor';

const store = configureStore({
  reducer: {
    showDataComponent: showClickComponent,
    modeCanvas: modeCanvas,
    modeCursor: modeCursor,
  },
});

export type StoreStateProps = ReturnType<typeof store.getState>;
export type StoreDisPatchProps = typeof store.dispatch;
export default store;
