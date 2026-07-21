import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility, { passive: true });

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <>
            <button onClick={scrollToTop} className={isVisible ? "backtotop inview" : "backtotop"} aria-label="Back to top">
                <ChevronUp strokeWidth={1} />
            </button>
        </>
    );
};

export default BackToTop;
