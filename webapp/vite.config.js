import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig( ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.API_URL': JSON.stringify(env.VITE_API_URL)
        },
        plugins: [react()],
        server: {
          port: 8000,
          host: true
        },
        preview: {
          host: true,
          port: 8000
        }, 
      }
  
})