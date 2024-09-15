import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {router} from "./routes/router.ts";
import {RouterProvider} from "react-router-dom";
import 'react-international-phone/style.css';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {MultiSelectTheme} from "chakra-multiselect";

const theme = extendTheme({
    components: {
        MultiSelect: MultiSelectTheme
    }
})


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={router}/>
        </ChakraProvider>
    </StrictMode>,
)
