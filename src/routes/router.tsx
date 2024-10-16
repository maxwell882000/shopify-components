import {
    createBrowserRouter,
} from "react-router-dom";
import ApplicationSubmitPage from "../pages/ApplicationSubmitPage.tsx";
import CodeVerificationPage from "../pages/CodeVerificationPage.tsx";
import PhoneLoginPage from "../pages/PhoneLoginPage.tsx";

export const router = createBrowserRouter([
    {
        path: "shopify-components/",
        element: <ApplicationSubmitPage/>
    },
    {
        path: "shopify-components/code",
        element: <CodeVerificationPage/>
    },
    {
        path: "shopify-components/login",
        element: <PhoneLoginPage/>
    },
]);