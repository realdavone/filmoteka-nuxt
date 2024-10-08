export default defineNuxtConfig({
				runtimeConfig: {
								tmdbApiKey: process.env.TMDB_API_KEY,
								tmdbBaseUrl: process.env.TMDB_BASE_URL,
								public: {
												pocketbaseUrl: process.env.POCKETBASE_URL
								}
				},

				css: ['assets/main.css'],
				devtools: { enabled: true },
				modules: ['@vueuse/nuxt', '@nuxt/icon'],
				compatibilityDate: '2024-08-18'
})