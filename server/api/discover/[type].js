export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()

	const query = getQuery(event)

	const res = await $fetch(
		`https://api.themoviedb.org/3/discover/${event.context.params.type}`,
		{
			query: {
				sort_by: 'popularity.desc',
				page: query.page ?? 1,
				with_genres: query.genre ?? '',
				language: 'sk-SK'
			},
			headers: {
				Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
			}
		}
	)

	return res
})
