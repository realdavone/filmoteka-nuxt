import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
	const runtimeConfig = useRuntimeConfig()
	try {
		await mongoose.connect(runtimeConfig.mongoDbUri)

		console.log('Connected to MongoDB')
	} catch (error) {
		console.error(error)
	}
})
