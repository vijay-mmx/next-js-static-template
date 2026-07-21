import React from "react";

type ButtonProps = {
    text: string;
} & (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string })
);

const Button = ({ text = "", className = "", as, ...props }: ButtonProps) => {
    const baseClass = `primary-btn ${className}`.trim();

    if (as === "a") {
        return (
            <a className={baseClass} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                <span className="primary-btn-text">{text}</span>
                <span className="primary-btn-line primary-btn-top-left"></span>
                <span className="primary-btn-line primary-btn-top-right"></span>
                <span className="primary-btn-line primary-btn-right"></span>
                <span className="primary-btn-line primary-btn-bottom-right"></span>
                <span className="primary-btn-line primary-btn-bottom-left"></span>
                <span className="primary-btn-line primary-btn-left"></span>
            </a>
        );
    }

    return (
        <button className={baseClass} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            <span className="primary-btn-text">{text}</span>
            <span className="primary-btn-line primary-btn-top-left"></span>
            <span className="primary-btn-line primary-btn-top-right"></span>
            <span className="primary-btn-line primary-btn-right"></span>
            <span className="primary-btn-line primary-btn-bottom-right"></span>
            <span className="primary-btn-line primary-btn-bottom-left"></span>
            <span className="primary-btn-line primary-btn-left"></span>
        </button>
    );
};

export default Button;
