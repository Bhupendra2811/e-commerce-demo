import clsx from "clsx";
import Navbar from "./Navbar";

const GlassPane = ({ children, className }) => {
    return (
        <div
            className={clsx(
                "glass rounded-2xl border-2 border-solid border-gray-200",
                className
            )}
        >
            <Navbar />
            {children}
        </div>
    );
};

export default GlassPane;