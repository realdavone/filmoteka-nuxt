const apiFetch = async (url, options = {}) => {
	const runtimeConfig = useRuntimeConfig()

	const res = await $fetch(url, {
		baseURL: runtimeConfig.tmdbBaseUrl,
		headers: {
			Authorization: `Bearer ${runtimeConfig.tmdbApiKey}`
		},
		...options
	})

	return res
}

export default apiFetch
