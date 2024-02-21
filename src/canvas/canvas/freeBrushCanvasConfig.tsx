export type TypeComponenCanvasProps =
  | 'BRUSH'
  | 'PAN'
  | 'ERASER'
  | 'SHAPES'
  | 'RECT'
  | 'TRIAGLE'
  | 'CIRCLE'
  | 'STAR'
  | 'SELECT'
  | 'TEXT'
  | 'IMAGE'
  | 'SETTING'
  | 'ZOOMIN'
  | 'ZOOMOUT';

export type DataRectProps = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
  rotation: number;
};

export type DataCircleProps = {
  id: string;
  radius: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  stroke: string;
  strokeWidth: number;
  fill: string;
  rotation: number;
};

export type DataShapeProps = {
  id: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  customPoint: Array<number> | [];
  rotation: number;
};

export type DataStarProps = {
  id: string;
  numPoints: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  innerRadius: number;
  outerRadius: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  rotation: number;
};

export type LineProps = {
  id: string;
  points: Array<number>;
  stroke: string;
  strokeWidth: number;
  modeCanvas: GlobalCompositeOperation;
};

export type DataTextProps = {
  id: string;
  text: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  fill: string;
  fontSize: number;
  fontFamily: string;
  stroke: string;
  strokeWidth: number;
  rotation: number;
};

export type DataImageProps = {
  id: string;
  image: HTMLImageElement;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  rotation: number;
};

export type DataComponentProps =
  | DataRectProps
  | DataCircleProps
  | DataShapeProps
  | DataStarProps
  | DataTextProps
  | DataImageProps;

export type ComponenCanvasProps = {
  type: TypeComponenCanvasProps;
  data: DataComponentProps;
};

export type AllSaveDataProps = {
  line: [] | Array<LineProps>;
  componen: [] | Array<ComponenCanvasProps>;
};

export type FreeBrushCanvasProps = {
  sizeBrush: number;
  colorBrush: string;
  lines: LineProps[] | [];
  componentCanvas: ComponenCanvasProps[] | [];
  handleSendScale: (value: number) => void;
};
