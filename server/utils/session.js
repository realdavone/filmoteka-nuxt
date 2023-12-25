import { getServerSession } from '#auth'
import { authOptions } from '~/server/api/auth/[...].js'

export const getAuthSession = async (event) => {
	const session = event.req.headers.cookie

	console.log(session)

	return await getServerSession(event, authOptions)
}
