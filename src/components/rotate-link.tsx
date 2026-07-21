"use client";

import React, { useEffect, useRef } from "react";

import SplitText from "gsap/SplitText";

interface RotateLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: string;
}

const RotateLink = ({ children, ...props }: RotateLink) => {
    const spanEl = useRef(null as HTMLAnchorElement | null);

    useEffect(() => {
        if (!spanEl.current) return;
        spanEl.current.querySelectorAll("span").forEach((spanEl) => {
            const split = SplitText.create(spanEl, { type: "chars", tag: "span" });
            (split.chars as HTMLSpanElement[]).forEach((char, index) => {
                char.classList.add("char");
                char.style.setProperty("--char-index", (split.chars.length - index).toString());
            });
        });
    }, [spanEl]);

    return (
        <a ref={spanEl} {...props} className={`rotate-text ${props.className || ""}`}>
            <span>{children}</span>
            <span>{children}</span>
        </a>
    );
};

export default RotateLink;
