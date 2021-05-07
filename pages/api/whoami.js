import { getUserFromJwt } from '../../utils/token'

export default async (req, res) => {
  try {
    const user = await getUserFromJwt(req.headers?.authorization)
    return res.status(200).json(user)
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
