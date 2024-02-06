import { TypeComponenCanvasProps } from '../canvas/freeBrushCanvasConfig';

export type modeCanvas = TypeComponenCanvasProps;

export const defaultBrushAdd = 0.6;

export const colorIcon = {
  active: 'orange',
  nonActive: 'green',
};

export const classIcon = {
  active:
    'bg-slate-700 w-10 h-10 p-2 rounded-full flex justify-center items-center hover:bg-slate-500',
  nonActive:
    'bg-orange-700 w-7 h-10 p-2 rounded-full flex justify-center items-center hover:bg-slate-500',
};

export const sizeIcon = {
  size: 26,
};

export const defaultSizeBrush = 1;
