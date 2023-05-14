import { useEffect, useState } from "react";

export function useWindow(property) {
    const [size, setSize] = useState(window[property]);

    useEffect(() => {

        function handleResize() {
            if (size !== window[property]) {
                setSize(() => window[property]);
            }
        }

        window.addEventListener('resize',handleResize);

        handleResize();

        return () => window.removeEventListener('resize',handleResize);
    },[]);


    return size;
}