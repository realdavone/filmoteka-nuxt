export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()

	const query = getQuery(event)

	const res = await $fetch(
		`https://api.themoviedb.org/3/search/${event.context.params.type}`,
		{
			query: {
				query: query.q,
				page: query.page ?? 1,
				language: 'sk-SK'
			},
			headers: {
				Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
			}
		}
	)

	return res
})
