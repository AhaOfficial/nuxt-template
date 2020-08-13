
import type { NuxtOptionsHooks } from '@nuxt/types/config/hooks'
const hooks: NuxtOptionsHooks = {
    build: {
        before: (builder, buildOption) => {
            console.log('[LIFECYCLE] build.before')
        },
        compile: (params) => {
            console.log('[LIFECYCLE] build.compile')
        },
        compiled: (params) => {
            console.log('[LIFECYCLE] build.compiled')
        },
        done: (builder) => {
            console.log('[LIFECYCLE] build.done')
        },
        extendRoutes: (routes: any, resolve: any) => {
            console.log('[LIFECYCLE] build.extendRoutes')
        },
        templates: (params) => {
            console.log('[LIFECYCLE] build.templates')
        }
    },
    ready: (nuxt) => {
        console.log('[LIFECYCLE] ready')
    },
    render: {
        before: async (renderer: any, options: any) => {
            console.log('[LIFECYCLE] render.before')
            // console.log('[LIFECYCLE] render.before start')
            // await (() => {
            //     return new Promise((resolve) => {
            //         setTimeout(resolve, 10000)
            //     })
            // })()
            // console.log('[LIFECYCLE] render.before end')
        },
        beforeResponse: (url: string, result: any, context: any) => {
            console.log('[LIFECYCLE] render.beforeResponse')
        },
        done: (render) => {
            console.log('[LIFECYCLE] render.done')
        },
        errorMiddleware: (app) => {
            console.log('[LIFECYCLE] errorMiddleware')
        },
        resourcesLoaded: (resources) => {
            console.log('[LIFECYCLE] resourcesLoaded')
        },
        route: async (url: string, result: any, context: any) => {
            console.log('[LIFECYCLE] render.route')
            // await (() => {
            //     return new Promise((resolve) => {
            //         setTimeout(resolve, 10000)
            //     })
            // })()
            // console.log('[LIFECYCLE] render.route end', url)
        },
        routeDone: (url: string, result: any, context: any) => {
            console.log('[LIFECYCLE] render.routeDone')
        },
        setupMiddleware: (app) => {
            //
            console.log('[LIFECYCLE] setupMiddleware')
        }
    },
    generate: {
        before: () => {
            //
            console.log('[LIFECYCLE] generate.before')
        },
        distCopied: () => {
            //
            console.log('[LIFECYCLE] generate.distCopied')
        }
    },
    modules: {
        before: (moduleContainer: any, options: any) => {
            //
            console.log('[LIFECYCLE] modules.before')
        },
        done: (moduleContainer: any) => {
            //
            console.log('[LIFECYCLE] modules.done')
        }
    },
    components: {
        dirs: (dirs) => {
            console.log('[LIFECYCLE] components.dirs')
        },
        extend: (components) => {
            console.log('[LIFECYCLE] components.extend')
        }
    },
    listen: (server, params) => {
        console.log('[LIFECYCLE] listen')
    },
    close: (nuxt) => {
        console.log('[LIFECYCLE] close')
    },
    error: (error) => {
        console.log('[LIFECYCLE] error')
    },
    "components:dirs": (dirs) => {
        console.log('[LIFECYCLE] components:dirs')
    },
    "components:extend": (components) => {
        console.log('[LIFECYCLE] components:extend')
    }
}