export default defineCachedEventHandler(
	async (event) => {
		const runtimeConfig = useRuntimeConfig()

		const query = getQuery(event)

		const { id } = event.context.params

		const res = await $fetch(
			`https://api.themoviedb.org/3/tv/${id}/season/${query.s}/episode/${query.e}`,
			{
				headers: { Authorization: `Bearer ${runtimeConfig.tmdbApiKey}` },
				query: { language: 'sk-SK', append_to_response: 'translations' }
			}
		)

		return res
	},
	{
		maxAge: 60 * 60,
		getKey: (event) => {
			const query = getQuery(event)

			return `episode/${event.context.params?.id}/${query.s}/${query.e}`
		}
	}
)
