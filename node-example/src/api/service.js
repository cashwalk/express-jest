exports.checkAndAddUser = ({ name, age }) => {
  if (!name) throw new Error('undefined name')
  if (name.length < 3 || name.length > 5) throw new Error('invalid name size')
  if (age < 1) throw new Error('invalid age range')

  const id = 1
  return id
}