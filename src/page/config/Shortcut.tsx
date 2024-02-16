export type shortcutAppProps = {
  move: string[];
  brush: string[];
  erasser: string[];
  select: string[];
  rectangle: string[];
  circle: string[];
  star: string[];
  triangle: string[];
  image: string[];
  text: string[];
  red: string[];
  yellow: string[];
  black: string[];
  green: string[];
  blue: string[];
};

const parseJsonShortcut: shortcutAppProps = JSON.parse(
  localStorage.getItem('shortcut') as never,
);

export const shortcutApp: shortcutAppProps = {
  move:
    parseJsonShortcut && parseJsonShortcut.move.length > 0
      ? parseJsonShortcut.move
      : ['m'],
  brush:
    parseJsonShortcut && parseJsonShortcut.brush.length > 0
      ? parseJsonShortcut.brush
      : ['b'],
  erasser:
    parseJsonShortcut && parseJsonShortcut.erasser.length > 0
      ? parseJsonShortcut.erasser
      : ['e'],
  select:
    parseJsonShortcut && parseJsonShortcut.select.length > 0
      ? parseJsonShortcut.select
      : ['s'],
  rectangle:
    parseJsonShortcut && parseJsonShortcut.rectangle.length > 0
      ? parseJsonShortcut.rectangle
      : [],
  circle:
    parseJsonShortcut && parseJsonShortcut.circle.length > 0
      ? parseJsonShortcut.circle
      : [],
  star:
    parseJsonShortcut && parseJsonShortcut.star.length > 0
      ? parseJsonShortcut.star
      : [],
  triangle:
    parseJsonShortcut && parseJsonShortcut.star.length > 0
      ? parseJsonShortcut.star
      : [],
  image:
    parseJsonShortcut && parseJsonShortcut.image.length > 0
      ? parseJsonShortcut.image
      : ['i'],
  text:
    parseJsonShortcut && parseJsonShortcut.text.length > 0
      ? parseJsonShortcut.text
      : ['t'],
  red:
    parseJsonShortcut && parseJsonShortcut.red.length > 0
      ? parseJsonShortcut.red
      : ['2'],
  green:
    parseJsonShortcut && parseJsonShortcut.green.length > 0
      ? parseJsonShortcut.green
      : ['3'],
  blue:
    parseJsonShortcut && parseJsonShortcut.blue.length > 0
      ? parseJsonShortcut.blue
      : ['4'],
  black:
    parseJsonShortcut && parseJsonShortcut.black.length > 0
      ? parseJsonShortcut.black
      : ['1'],
  yellow:
    parseJsonShortcut && parseJsonShortcut.yellow.length > 0
      ? parseJsonShortcut.yellow
      : ['5'],
};
