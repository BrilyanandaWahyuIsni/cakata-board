export function keyboardModeCanvas() {
  window.addEventListener('keydown', e => {
    if (e.code === 'KeyP') {
      return 'PAN';
    }
    if (e.code === 'KeyB') {
      return 'BRUSH';
    }
    if (e.code === 'KeyE') {
      return 'ERASER';
    }
  });
  return null;
}
