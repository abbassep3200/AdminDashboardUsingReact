import { RouterProvider } from "react-router-dom";
import Login from "./features/identity/components/login";
import Register from "./features/identity/components/register";
import router from "./router";
import "./core/i18n";
import { useAppContext } from "./contexts/app/app-context";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
    const { theme } = useAppContext();
    useEffect(() => {
        const head = document.head;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `/css/${theme}.css`;
        head.appendChild(link);

        return () => {
            head.removeChild(link);
        };
    }, [theme]);
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer rtl />
        </>
    );
}

export default App;
