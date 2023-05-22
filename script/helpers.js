// Add the form's listeners
const addListeners = (user) => {
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

// Set the text content of labels and labels (for each key)
const labels_legends = (key) => {
  // prettier-ignore
  switch (key) {
    case 'Preferences': 'Preferences'
    
    case 'fonts': return 'Fonts'
    case 'fontScale': return 'Size'
    case 'fontWeight': return 'Weight'
    case 'textColors': return 'Colors'
    case 'normal': return 'Normal'
    case 'accent': return 'Accent'

    case 'layout1': return 'Layout1'
    case 'ctrlBarWidth': return 'Width of bar'
    case 'ctrlTriggerShort': return 'Short button height'
    case 'ctrlTriggerTall': return 'Tall button height'

    case 'ctrlTriggerBg': return 'Colors'
    case 'triggerPrefs': return ''
    case 'triggerTopPanes': return ''
    case 'triggerNavpane': return ''
    case 'triggerLeftRail': return ''
    default: alert(`UNKNOWN KEY - ${key}`)
  }
}

export { addListeners, labels_legends }
