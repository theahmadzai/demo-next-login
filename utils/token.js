import jwt from 'jsonwebtoken'

export const sign = username =>
  jwt.sign({ username }, process.env.AUTH_SECRET, { expiresIn: '100d' })

export const verify = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.AUTH_SECRET, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })

export const getUserFromJwt = async jwtToken => {
  if (!jwtToken || !jwtToken.startsWith('Bearer ')) return null

  const token = jwtToken.split('Bearer ')[1].trim()

  return await verify(token).catch(() => null)
}
