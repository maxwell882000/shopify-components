import {
    createBrowserRouter,
} from "react-router-dom";
import ApplicationSubmitPage from "../pages/ApplicationSubmitPage.tsx";

export const router = createBrowserRouter([
    {
        path: "shopify-components/",
        element: <ApplicationSubmitPage/>
    },
]);