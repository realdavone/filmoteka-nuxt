export default defineEventHandler(
	async (event) => {
		const runtimeConfig = useRuntimeConfig()

		const res = await $fetch(
			`https://api.themoviedb.org/3/trending/${event.context.params.type}/day`,
			{
				query: {
					language: 'sk-SK'
				},
				headers: {
					Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
				}
			}
		)

		return res
	},
	{
		maxAge: 60 * 60,
		getKey: (event) => event.context.params.type
	}
)
