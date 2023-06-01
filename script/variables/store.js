import { defaultUserVars } from './userVars.js'

export const getUser = () => {
  let user = null

  localStorage.clear() // <-- DEBUG: Uncomment to clear storage

  /** If local storage doesn't contain a "user" object,
   *    => return "defaultUserVars"
   *    => add "defaultUserVars" to local storage as "user"
   *
   *  Otherwise => just return the "user" from local storage
   */
  if (localStorage.getItem('user') === null) {
    user = defaultUserVars
    localStorage.setItem('user', JSON.stringify(user))
  } else user = JSON.parse(localStorage.getItem('user'))

  return user
}
