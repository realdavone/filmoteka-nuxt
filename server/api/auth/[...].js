import GoogleProvider from '@auth/core/providers/google'
import { NuxtAuthHandler } from '#auth'

const runtimeConfig = useRuntimeConfig()

export const authOptions = {
	secret: runtimeConfig.authJs.secret,
	providers: [
		GoogleProvider({
			clientId: runtimeConfig.google.clientId,
			clientSecret: runtimeConfig.google.clientSecret
		})
	],
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error'
	},
	callbacks: {
		async signIn({ profile }) {
			return ['davidkuljovsky@gmail.com'].includes(profile.email)
		}
	}
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
