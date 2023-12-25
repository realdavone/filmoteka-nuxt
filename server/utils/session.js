import { getServerSession } from '#auth'
import { authOptions } from '~/server/api/auth/[...].js'

export const getAuthSession = async (event) =>
	await getServerSession(event, authOptions)
