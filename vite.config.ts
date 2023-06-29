import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // 一个浏览器兼容的插件、可以根据配置自动帮我们打一些补丁
        legacy({
            targets: [
                'Android > 39',
                'Chrome >= 60',
                'Safari >= 10.1',
                'iOS >= 10.3',
                'Firefox >= 54',
                'Edge >= 15',
                'ie >= 11'
            ],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        })
    ],
    // 设置别名
    resolve: {
        alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
    },
    css: {
        postcss: './postcss.config.js'
    },
    server: {
        host: '0.0.0.0',
        cors: true,
        port: 8001,
        proxy: {
            '/api': {
                target: '',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
