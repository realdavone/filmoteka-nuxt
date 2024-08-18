import PocketBase from 'pocketbase'

export default defineNuxtPlugin(async (nuxtApp) => {
	const runtimeConfig = useRuntimeConfig()

	const pb = new PocketBase(
		'http://pocketbase-zs0k8o404800w88o8gkoosg8.49.13.160.213.sslip.io'
	)

	const token = useCookie('pocketbase_auth')

	if (token.value) {
		pb.authStore.loadFromCookie(token.value)
	}

	const { setUser } = useAuth()

	setUser(pb.authStore.baseModel)

	nuxtApp.provide('pb', pb)
})
