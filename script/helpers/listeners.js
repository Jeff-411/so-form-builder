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

        user.layout1.ctrlBarWidth = Number(data.ctrlBarWidth)
        user.layout1.ctrlTriggerShort = Number(data.ctrlTriggerShort)
        user.layout1.ctrlTriggerTall = Number(data.ctrlTriggerTall)

        user.layout1.ctrlTriggerBg.triggerPrefs = data.triggerPrefs
        user.layout1.ctrlTriggerBg.triggerTopPanes = data.triggerTopPanes
        user.layout1.ctrlTriggerBg.triggerNavpane = data.triggerNavpane
        user.layout1.ctrlTriggerBg.triggerLeftRail = data.triggerLeftRail

        // Save the user object to local storage & reload the page
        localStorage.setItem('user', JSON.stringify(user))
        location.reload()
      })
    },
  }

  listeners.addFormListeners()
}
