import { getAuthSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()

	const session = await getAuthSession(event)

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

	const playerUrl = session
		? `https://multiembed.mov/?video_id=${res.external_ids?.imdb_id}`
		: null

	return {
		playerUrl,
		...res
	}
})
