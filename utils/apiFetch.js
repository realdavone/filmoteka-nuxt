const apiFetch = async (url, options = {}) => {
	const runtimeConfig = useRuntimeConfig()

	const res = await $fetch(url, {
		baseURL: runtimeConfig.tmdbBaseUrl,
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MWIwNjk1ZDZmZDY4NjVhODM5MTcwYjBlMWEwZTJhOSIsInN1YiI6IjYwMDZlYzdiMTEwOGE4MDAzZDk0NjY4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wqMyH_JSuPQBF9Uj9sAbxRrYqEEZPSRKxaif8RPEd8c`
		},
		...options
	})

	return res
}

export default apiFetch
