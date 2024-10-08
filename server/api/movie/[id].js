export default defineCachedEventHandler(
	async (event) => {
		const runtimeConfig = useRuntimeConfig()

		const { id } = event.context.params

		const res = await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
			query: {
				append_to_response: 'external_ids,translations',
				language: 'sk-SK'
			},
			headers: {
				Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
			}
		})

		return res
	},
	{
		maxAge: 60 * 60,
		getKey: (event) => `movie/${event.context.params.id}`
	}
)
