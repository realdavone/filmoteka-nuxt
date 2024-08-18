export default defineEventHandler(async (s) => {
	const cache = await useStorage('cache').getKeys()

	return cache
})
