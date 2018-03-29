function login (username, password) {
  // TODO
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('this is a false token'), 2000)
  })
}

export default {
  login
}
