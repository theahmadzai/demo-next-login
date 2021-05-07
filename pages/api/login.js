import { sign } from '../../utils/token'
import users from '../../users.json'

export default (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username & Password are required.' })
    }

    const user = users.find(user => user.username == username && user.password == password)

    if (!user) {
      return res.status(403).json({ message: 'Invalid login credentials.' })
    }

    const token = sign(username)

    return res.status(200).json({ token })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
