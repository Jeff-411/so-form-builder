const setText_names = (key) => {
  // prettier-ignore
  switch (key) {
    case 'Preferences': return 'Preferences'
    
    case 'fonts': return 'Fonts'
    case 'fontScale': return 'Scale'
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

const addTip = (key) => {
  // prettier-ignore
  switch (key) {
    case 'fonts': return true
    case 'ctrlTriggerBg': return true
  }
}

export { setText_names, addTip }
