const TOKEN_NAME = 'casGroupTokenAuth'

export default {
  /**
   * Saves the token of the user to keep him logged in.
   * @param {String} token
   */
  save: token => localStorage.setItem(TOKEN_NAME, token),
  /**
   * Gets the token from the storage.
   * @return {string | null}
   */
  get: () => localStorage.getItem(TOKEN_NAME),
  /**
   * Removes the token from the local storage.
   * @return {void}
   */
  remove: () => localStorage.removeItem(TOKEN_NAME)
}
