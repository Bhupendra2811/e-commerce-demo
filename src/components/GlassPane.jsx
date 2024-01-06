import clsx from "clsx";
import Navbar from "./Navbar";

const GlassPane = ({ children, className }) => {
    return (
        <div
            className={clsx(
                "glass rounded-2xl border-2 border-solid border-gray-200 flex flex-col min-h-screen",
                className
            )}
        >
            <Navbar />
            <div className="flex-1 overflow-auto p-6">
                {children}
            </div>
        </div>
    );
};

export default GlassPane;