function isAdmin(currentUser) {
  return currentUser && currentUser.roles.admin;
}

module.exports = {
  isAdmin: isAdmin
}
