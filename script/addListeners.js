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
        user.fonts.fontWeight = data.fontWeight
        user.fonts.textColors.normal = data.normal
        user.fonts.textColors.accent = data.accent

        user.selectLayout.layout = data.layout

        user.customLayout.ctrlBarWidth = Number(data.ctrlBarWidth)
        user.customLayout.ctrlTriggerShort = Number(data.ctrlTriggerShort)
        user.customLayout.ctrlTriggerTall = Number(data.ctrlTriggerTall)
        user.customLayout.ctrlTriggerBg.triggerPrefs = data.triggerPrefs
        user.customLayout.ctrlTriggerBg.triggerTopPanes = data.triggerTopPanes
        user.customLayout.ctrlTriggerBg.triggerNavpane = data.triggerNavpane
        user.customLayout.ctrlTriggerBg.triggerLeftRail = data.triggerLeftRail

        // Save the user object to local storage & reload the page
        localStorage.setItem('user', JSON.stringify(user))
        location.reload()
      })
    },
  }

  listeners.addFormListeners()
}
