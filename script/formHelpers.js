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

// Note: Does not handle the form's title or any special inputs
const setLabelsAndLegends = (key) => {
  // prettier-ignore
  switch (key) {

    case 'fonts': return 'Fonts'
    case 'fontScale': return 'Size'
    case 'fontWeight': return 'Weight'
    case 'textColors': return 'Colors'
    case 'normal': return 'Normal'
    case 'accent': return 'Accent'

    case 'selectLayout': return 'Select layout'
    case 'layout': return 'Layout'

    case 'customLayout': return 'Custom Layout'
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

const getTemplate_standard = (value) => {
  //prettier-ignore
  switch (typeof value) {
    case 'number': return document.getElementById('formControl_number')
    case 'string':
      if (value.slice(0, 1) === '#') return document.getElementById('formControl_color')
      else return document.getElementById('formControl_text')

    default: alert(`UNKNOWN INPUT TYPE - ${typeof value}`)
  }
}

const getInputSteps = (key) => {
  switch (key) {
    case 'fontScale':
      return 0.5
    case 'ctrlBarWidth_px':
    case 'triggerTopPanesHeight':
    case 'triggerNavpaneHeight':
    case 'triggerLeftRailHeight':
    case 'ctrlBarPrimaryHeight_px':
      return 10
  }
}

const setSpecial = (key) => {
  switch (key) {
    // prettier-ignore
    case 'layout': return ['Outlook_default', 'Custom_layout']
  }
}

export {
  addListeners,
  setLabelsAndLegends,
  setSpecial,
  getTemplate_standard,
  getInputSteps,
}
