import { pwa } from './src/config/pwa'
import { appDescription } from './src/constants/index'

// import { viteCss as vite } from './nuxt.config.vite'

export default defineNuxtConfig({
    ssr: process.env.NODE_ENV !== 'development',
    runtimeConfig: {
        // 只能在服务端使用
        apiSecret: 'tt-secret',

        // public 下的变量可以在客户端和服务端使用
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            // ====use====
            // const config = useRuntimeConfig();
            // const baseURL = config.public.apiBase;
        },
    },
    srcDir: 'src',
    modules: ['@element-plus/nuxt', '@nuxtjs/color-mode', '@pinia/nuxt', '@unocss/nuxt', '@vite-pwa/nuxt', '@vue-macros/nuxt', '@vueuse/nuxt'],

    elementPlus: {
        /** Options */
    },
    vite: {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: '@import "assets/scss/variable.scss";',
            }
          }
        }
      },
    experimental: {
        // 使用generate时，payload js资源包含在sw预缓存清单中
        // 但离线时丢失，禁用提取直到修复
        payloadExtraction: false,
        renderJsonPayloads: true,
        typedPages: true,

        // @ts-expect-error 缺失类型
        inlineSSRStyles: false,
    },

    css: ['@unocss/reset/tailwind-compat.css'],

    colorMode: {
        classSuffix: '',
    },

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        routeRules: {
            '/api/**': {
                // proxy: 'https://php.mmxiaowu.com/api/fetch/**',
                proxy:'https://api.fskins.com/**'
            },
        },
    },

    app: {
        rootId: 'nuxt-root',
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/svg/nuxt.svg' },
                { rel: 'apple-touch-icon', href: '/images/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },

    pwa,

    devtools: {
        enabled: true,
    },

    devServer: {
        port: 7123,
    },

    imports: {
        dirs: [
            // 扫描顶级模块
            'composables',
            // ... 或扫描带有特定名称和文件扩展名的一级嵌套模块
            'composables/*/index.{ts,js,mjs,mts}',
            // ... 或扫描给定目录中的所有模块
            'composables/**'
          ],
        presets: [
            // {
            //     from: 'vue-loading-overlay',
            //     imports: ['useLoading'],
            // },
        ],
    },

    hooks: {
        'prepare:types': ({ references }) => {
            references.push({ types: '@lincy/utils' })
        },
    },

    // vite,
})
