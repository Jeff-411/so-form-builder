export const setInnerText = (key) => {
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
    case 'ctrlBarWidth_px': return 'Width of bar'
    case 'ctrlBarPrimaryHeight_px': return 'Button 1 - Height'
    case 'triggerTopPanesHeight': return 'Button 2 - Height'
    case 'triggerNavpaneHeight': return 'Button 3 - Height'
    case 'triggerLeftRailHeight': return 'Button 4 - Height'
    case 'triggerUserBg': return 'Button 1 - Color'
    case 'triggerTopPanesBg': return 'Button 2 - Color'
    case 'triggerNavpaneBg': return 'Button 3 - Color'
    case 'triggerLeftRailBg': return 'Button 4 - Color'
    default: alert(`UNKNOWN KEY - ${key}`)
  }
}
