import { modeCanvas } from '../config/GlobalVariabel';

export type TypeComponenCanvasProps =
  | 'RECT'
  | 'CIRCLE'
  | 'STAR'
  | 'TRIAGLE'
  | 'NO-ACTION';

export type DataRectProps = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
};

export type DataCircleProps = {
  id: string;
  radius: number;
  x: number;
  y: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
  rotation: number;
};

export type LineProps = {
  id: string;
  points: Array<number>;
  stroke: string;
  strokeWidth: number;
  modeCanvas: GlobalCompositeOperation;
};

export type DataComponentProps = DataRectProps | DataCircleProps;

export type ComponenCanvasProps = {
  type: TypeComponenCanvasProps;
  data: DataComponentProps;
};

export type AllSaveDataProps = {
  line: [] | Array<LineProps>;
  componen: [] | Array<ComponenCanvasProps>;
};

export type FreeBrushCanvasProps = {
  drag: modeCanvas;
  sizeBrush: number;
  colorBrush: string;
  handleSendScale: (value: number) => void;
};
