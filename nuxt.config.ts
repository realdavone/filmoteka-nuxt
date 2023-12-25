import { resolve } from 'node:path'

export default defineNuxtConfig({
	runtimeConfig: {
		tmdbApiKey: process.env.TMDB_API_KEY,
		tmdbBaseUrl: process.env.TMDB_BASE_URL,
		authJs: {
			secret: process.env.NEXTAUTH_SECRET
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		},
		public: {
			authJs: {
				baseUrl: process.env.NEXTAUTH_URL,
				verifyClientOnEveryRequest: false
			}
		}
	},
	css: ['assets/main.css'],
	devtools: { enabled: true },
	modules: ['@hebilicious/authjs-nuxt', '@vueuse/nuxt'],
	alias: {
		cookie: resolve(__dirname, 'node_modules/cookie')
	}
})
