const service = require('./service')

exports.registUser = (req, res) => {
  const { name, age } = req.body
  const user = service.checkAndAddUser({ name, age })
  res.send(user)
}