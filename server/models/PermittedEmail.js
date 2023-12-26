import mongoose from 'mongoose'

const permittedEmailSchema = new mongoose.Schema({
	email: String
})

export default mongoose.model('PermittedEmail', permittedEmailSchema)
