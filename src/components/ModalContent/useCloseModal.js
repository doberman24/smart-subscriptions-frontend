import { useEffect, useState } from "react";

export const useCloseModal = (defaultValue = false) => {
 const [vision, setVision] = useState(defaultValue);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setTimeout(() => setVision(true), 0);
        }
    }, []);

    const close = (closeModal) => {
        if (typeof window !== "undefined") {
            setVision(false); 
            setTimeout(() => {
                if (closeModal)
                closeModal();
            }, 100);
        }
    }

    return {vision, setVision, close};
}