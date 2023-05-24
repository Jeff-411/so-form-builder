export const config = {
  labelsAndLegends: (key) => {
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
  },
  template_standard: (value) => {
    //prettier-ignore
    switch (typeof value) {
      case 'number': return document.getElementById('formControl_number')
      case 'string':
        if (value.slice(0, 1) === '#') return document.getElementById('formControl_color')
        else return document.getElementById('formControl_text')

      default: alert(`UNKNOWN INPUT TYPE - ${typeof value}`)
    }
  },
  inputSteps: (key) => {
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
  },
  formControl_inputOptions: (key) => {
    switch (key) {
      // prettier-ignore
      case 'layout': return ['Outlook_default', 'Custom_layout']
    }
  },
}
