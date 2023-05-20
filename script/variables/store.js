import { defaultUserVars } from './userVars.js'

export const getUser = () => {
  let user = null

  // localStorage.clear() // <-- DEBUG: UNCOMMENT THIS LINE TO CLEAR LOCAL STORAGE

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
