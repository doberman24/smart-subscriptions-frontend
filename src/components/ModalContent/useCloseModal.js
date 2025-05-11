import { useEffect, useState } from "react";

export const useCloseModal = (defaultValue = false) => {
 const [vision, setVision] = useState(defaultValue);

    useEffect(() => {
        setTimeout(() => setVision(true), 0);
    }, []);

    const close = (closeModal) => {
        setVision(false); 
        setTimeout(() => {
            if (closeModal)
            closeModal();
        }, 100);
    }

    return {vision, setVision, close};
}