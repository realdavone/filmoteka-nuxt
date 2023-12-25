import { getAuthSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
	const session = await getAuthSession(event)

	if (!session) {
		return createError({
			statusCode: 401,
			statusMessage: 'Neautorizovaný prístup'
		})
	}

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
})
