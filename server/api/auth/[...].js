import GoogleProvider from '@auth/core/providers/google'
import { NuxtAuthHandler } from '#auth'
import PermittedEmail from '~/server/models/PermittedEmail'

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
			const permitted = await PermittedEmail.findOne({ email: profile.email })

			return !!permitted
		}
	}
}

export default NuxtAuthHandler(authOptions, runtimeConfig)
