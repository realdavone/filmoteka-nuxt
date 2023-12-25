export default defineNuxtPlugin(async () => {
	const runtimeConfig = useRuntimeConfig()

	const getMovieGenres = async () =>
		await $fetch(`https://api.themoviedb.org/3/genre/movie/list`, {
			query: {
				language: 'sk-SK'
			},
			headers: {
				Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
			}
		})

	const getTvGenres = async () =>
		await $fetch(`https://api.themoviedb.org/3/genre/tv/list`, {
			query: {
				language: 'sk-SK'
			},
			headers: {
				Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
			}
		})

	const [genresMovie, genresTv] = await Promise.allSettled([
		getMovieGenres(),
		getTvGenres()
	])

	useState('genres', () => ({
		movie: genresMovie.value.genres,
		tv: genresTv.value.genres
	}))
})
