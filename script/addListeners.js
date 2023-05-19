// Add the form's listeners
export const addListeners = (user) => {
  const listeners = {
    addFormListeners: () => {
      const form_userPrefs = document.querySelector('#form_userPrefs')

      form_userPrefs.addEventListener('submit', (e) => {
        e.preventDefault()
        // Get the form data
        const formData = new FormData(form_userPrefs)
        const data = Object.fromEntries(formData)
        console.log('data', data)

        // update user object with form data
        user.fonts.fontScale = Number(data.fontScale)
        user.fonts.fontWeight = Number(data.fontWeight)
        user.fonts.textColors.normal = data.normal
        user.fonts.textColors.accent = data.accent

        user.layout1.ctrlBarWidth_px = Number(data.ctrlBarWidth_px)
        user.layout1.ctrlBarPrimaryHeight_rem = Number(
          data.ctrlBarPrimaryHeight_rem
        )
        user.layout1.triggerTopPanesHeight = Number(data.triggerTopPanesHeight)
        user.layout1.triggerNavpaneHeight = Number(data.triggerNavpaneHeight)
        user.layout1.triggerLeftRailHeight = Number(data.triggerLeftRailHeight)
        user.layout1.triggerUserBg = data.triggerUserBg
        user.layout1.triggerTopPanesBg = data.triggerTopPanesBg
        user.layout1.triggerNavpaneBg = data.triggerNavpaneBg
        user.layout1.triggerLeftRailBg = data.triggerLeftRailBg

        // Save the user object to local storage & reload the page
        localStorage.setItem('user', JSON.stringify(user))
        location.reload()
      })
    },
  }

  listeners.addFormListeners()
}
