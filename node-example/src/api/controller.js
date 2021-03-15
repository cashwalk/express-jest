const service = require('./service')

exports.registUser = (req, res) => {
  const { name, age } = req.body
  const id = service.checkAndAddUser({ name, age })
  res.send({ id, name, age })
}