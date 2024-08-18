export default defineNuxtConfig({
	runtimeConfig: {
		tmdbApiKey: process.env.TMDB_API_KEY,
		tmdbBaseUrl: process.env.TMDB_BASE_URL,
		pocketbaseUrl: process.env.POCKETBASE_URL
	},

	css: ['assets/main.css'],
	devtools: { enabled: true },
	modules: ['@vueuse/nuxt'],
	compatibilityDate: '2024-08-18'
})
