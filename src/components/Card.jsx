import React from 'react'
import clsx from "clsx";

const Card = ({ className, children }) => {
    return (
        <div
            className={clsx(
                "rounded-3xl bg-white px-10 py-4 drop-shadow-xl",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;