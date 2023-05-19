import { defaultUserVars } from './userVars.js'

// DEBUG - See "DEBUG" in index.js to clear local storage. (~ ln 13)

export const handleLocalStorage = () => {
  let user = null

  // If the user object does not exist in local storage,
  // create it and save it to local storage.
  if (localStorage.getItem('user') === null) {
    user = defaultUserVars
    localStorage.setItem('user', JSON.stringify(user))
  }
  // Otherwise, just load the user object from local storage.
  else user = JSON.parse(localStorage.getItem('user'))

  return user
}
