import { defaultUserVars } from './userVars.js'

export const handleLocalStorage = () => {
  //
  localStorage.clear() // <-- DEBUG: UNCOMMENT THIS LINE TO CLEAR LOCAL STORAGE

  let user = null
  // Check if user object exists in local storage
  if (localStorage.getItem('user') === null) {
    // If not, create it and save it to local storage
    user = defaultUserVars

    localStorage.setItem('user', JSON.stringify(user))

    return user
  } else {
    // If it does, load it from local storage
    user = JSON.parse(localStorage.getItem('user'))

    return user
  }
}
