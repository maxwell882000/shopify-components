import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    base: '/shopify-components/', // Replace with your GitHub repository name
    plugins: [react()],
})
