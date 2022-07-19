import React, { useRef, useEffect } from "react"

export const useOutsideClick = (ref, cb, val, parentRef) => {
    var isOut = false
    useEffect(() => {
        
        function handleClickOutside(event) {
            if (parentRef) {
                if (ref.current && !ref.current.contains(event.target) &&
                    parentRef.current && !parentRef.current.contains(event.target)) {
                    cb(val)
                }
            } else {
                if (ref.current && !ref.current.contains(event.target)) {
                    cb(val)
                }

            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, val])
    return [isOut]
}