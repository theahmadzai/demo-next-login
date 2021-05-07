const token = require('../token')

describe('Token', () => {
  process.env.AUTH_SECRET = 'blabla'
  const actualUsername = 'javed'
  const actualToken = token.sign(actualUsername)

  test('Sign', async () => {
    expect(actualToken).not.toEqual(null)
  })

  test('Verify', async () => {
    const { username } = await token.verify(actualToken)
    expect(username).toEqual(actualUsername)
  })

  test('GetUserFromJwt', async () => {
    const jwtToken = `Bearer ${actualToken}`
    const { username } = await token.getUserFromJwt(jwtToken)

    expect(username).toEqual(actualUsername)
  })
})
