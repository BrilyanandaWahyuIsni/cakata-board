import {
  ComponenCanvasProps,
  LineProps,
} from '../canvas/canvas/freeBrushCanvasConfig';

type BaseStrukturProps = {
  lines: LineProps[] | [];
  componentCanvas: ComponenCanvasProps[] | [];
};

export type ReturnBaseStrukturProps = {
  version: string;
  description: string;
  author: string;
  license: string;
  lines: LineProps[] | [];
  ComponentCanvas: ComponenCanvasProps[] | [];
};

const baseData = {
  version: '0.0.1-beta-test',
  description:
    'Projek cakata board adalah proyek untuk membuat papan tulis interaktif dan mudah digunakan. Dilengkapi dengan berbagai macam struktur dasar dan shorcut yang mudah digunakan.',
  author: 'Brilyananda Wahyu Isni',
  license: 'MIT License',
};

export const baseStruktur = ({ lines, componentCanvas }: BaseStrukturProps) => {
  const result = {
    ...baseData,
    lines: lines,
    ComponentCanvas: componentCanvas,
  };
  return result;
};
