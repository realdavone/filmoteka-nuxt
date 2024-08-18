import PocketBase from 'pocketbase'

export default defineNuxtPlugin(async (nuxtApp) => {
	const runtimeConfig = useRuntimeConfig()

	const pb = new PocketBase(runtimeConfig.pocketbaseUrl)

	const token = useCookie('pocketbase_auth')

	if (token.value) {
		pb.authStore.loadFromCookie(token.value)
	}

	const { setUser } = useAuth()

	setUser(pb.authStore.baseModel)

	nuxtApp.provide('pb', pb)
})
