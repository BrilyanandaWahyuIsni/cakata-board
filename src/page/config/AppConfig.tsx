import { modeCanvas } from './GlobalVariabel';

export const modePointerWindows = (value: modeCanvas, size: number) => {
  if (value === 'BRUSH' || value === 'ERASER')
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='${size}' width='${size}' style='fill-rule:evenodd;text-rendering:geometricPrecision;image-rendering:optimizeQuality;clip-rule:evenodd;shape-rendering:geometricPrecision' xml:space='preserve' viewBox='0 0 7.5 7.5'%3E%3Cpath d='M0 3.8a3.7 3.7 0 1 1 7.5 0 3.7 3.7 0 0 1-7.5 0zm.5 0a3.3 3.3 0 1 0 6.6 0 3.3 3.3 0 0 0-6.6 0zm2.9 0c0 .2.2.3.4.3a.4.4 0 1 0-.4-.3z' style='fill:currentColor;stroke:currentColor;stroke-width:.0419595'/%3E%3C/svg%3E") 8 8, pointer`;
  if (value === 'PAN') return 'move';
  else return 'default';
};
