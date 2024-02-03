import { ReactNode, createContext, useState } from "react";

export type UniversalContextProps = {
    sizeBrush: number;
    handleChangeSizeBrush: (value:number) => void;
}

const UniversalContext = createContext<UniversalContextProps>({
    sizeBrush             : 1,
    handleChangeSizeBrush : ()=>{},
});

function UniversalProvider({children}:{children:ReactNode}){
    const [sizeBrush, setSizeBrush] = useState<number>(1);

    const handleChangeSizeBrush = (value:number)=>{
        setSizeBrush(prev => prev + value);
    };
    return(
        <UniversalContext.Provider value={{sizeBrush, handleChangeSizeBrush}}>
            {children}
        </UniversalContext.Provider>
    );
}

export {UniversalContext, UniversalProvider};