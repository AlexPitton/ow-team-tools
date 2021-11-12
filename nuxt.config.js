export default {
    loading: '~/components/common/LoadingScreen.vue',
    // Global page headers
    head: {
        title: 'ow-team-tools',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS
    css: [
        {
            src: '~/assets/styles/styles.scss', lang: 'scss'
        }
    ],

    // Plugins to run before rendering pages
    plugins: [],

    // Auto import components
    components: true,

    // Modules for dev and build recommended
    buildModules: [
        '@nuxtjs/svg-sprite'
    ],

    svgSprite: {
        input: '~/assets/icons',
        output: '~/assets/sprite',
    },

    // Modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/style-resources'
    ],

    styleResources: {
        scss: [
            './assets/styles/settings/settings.scss'
        ]
    },

    axios: {
        baseURL: process.env.API_URL
    },

    // Build Configuration
    build: {},

    auth: {
        strategies: {
            local: {
                token: {
                    property: 'jwt',
                    type: 'Bearer'
                },
                user: {
                    property: false,
                    autoFetch: true
                },
                endpoints: {
                    login: {
                        url: `${process.env.API_URL}/auth/local`,
                        method: 'post',
                    },
                    user: {
                        url: `${process.env.API_URL}/users/me`,
                        method: 'get',
                    },
                    logout: false
                }
            }
        }
    },

    router: {
        middleware: ['auth']
    }
}
