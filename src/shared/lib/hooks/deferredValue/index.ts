import {useEffect, useState} from "react";

export default function useDeferredValue<T>(value:T, delay:number) {
    const [deferredValue, setDeferredValue] = useState<T>(value);
    useEffect(()=>{
        const timeId = setTimeout(()=>setDeferredValue(value), delay);
        return ()=>clearTimeout(timeId);
    },[value])

    return deferredValue;
}