import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  // Cho phép Vite sử dụng process.env (mặc định nó sẽ không hiểu và phải dùng import.meta.env)
  define: {
    'process.env': process.env,
  },
  plugins: [react(), svgr()],
  // base: './'
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
})
