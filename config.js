
const JWT_SECRET = process.env.JWT_SECRET || 'helloworld'
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d'

module.exports = {JWT_EXPIRY, JWT_SECRET}