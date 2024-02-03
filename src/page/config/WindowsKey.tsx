import { modeCanvas } from "./GlobalVariabel";

export function keyboardModeCanvas(){
    window.addEventListener("keydown", (e)=>{
        if(e.code === "KeyP") return modeCanvas[modeCanvas.PAN];
        if(e.code === "KeyB") return modeCanvas[modeCanvas.BRUSH];
        if(e.code === "KeyE") return modeCanvas[modeCanvas.ERASER];
    });
    return null;
}