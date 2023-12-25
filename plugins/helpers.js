export default defineNuxtPlugin(() => {
	return {
		provide: {
			getTranslation: (translations) => {
				const order = { SK: 1, CZ: 2, US: 3 }

				return translations
					?.filter((translation) =>
						Object.keys(order).includes(translation.iso_3166_1)
					)
					.sort((a, b) => order[a.iso_3166_1] - order[b.iso_3166_1])
					.find((translation) => !!translation?.data?.overview)?.data
			},
			getRuntime: (runtimeInMinutes) => {
				const hours = Math.floor(runtimeInMinutes / 60)
				const minutes = runtimeInMinutes % 60

				return `${hours}h ${minutes}m`
			},
			getFormattedDate: (time, options = {}) => {
				if (!time) return

				return new Intl.DateTimeFormat('sk-SK', options).format(new Date(time))
			}
		}
	}
})
