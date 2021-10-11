export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
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

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        {
            src: '~/assets/styles/styles.scss', lang: 'scss'
        }
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/svg-sprite'
    ],

    svgSprite: {
        input: '~/assets/icons',
        output: '~/assets/sprite',
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/style-resources'
    ],

    styleResources: {
        scss: [
            './assets/styles/settings/settings.scss'
        ]
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.API_URL
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    //See https://auth.nuxtjs.org/schemes/local.html#options
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
                        url: 'http://37.187.176.42/auth/local',
                        method: 'post',
                    },
                    user: {
                        url: 'http://37.187.176.42/users/me',
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
