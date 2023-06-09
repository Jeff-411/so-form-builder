import { config } from '../variables/config.js'

export const setControl_special = (user, key, value, control) => {
  switch (key) {
    case 'fontWeight':
      // INPUT TYPE: select (HTML element)
      control.querySelector('span').innerText = config.displayNames(key)
      control.querySelector('select').name = key
      control.querySelector('select').value = value
      break

    case 'layout':
      // INPUT TYPE: radio
      const inputOptions = config.getInputOptions_byControlId(key)
      const inputs = control.querySelectorAll('input')
      const labels = control.querySelectorAll('label')
      for (let i = 0; i < inputOptions.length; i++) {
        let x = inputOptions[i]

        inputs[i].name = key
        inputs[i].id = x
        inputs[i].value = x
        if (user.selectLayout.layout === x) inputs[i].checked = true
        else inputs[i].checked = false

        // Handle labels
        labels[i].for = x
        if (!x.includes('_')) labels[i].innerText = x
        else {
          let words = x.split('_')
          let labelText = ''

          for (let j = 0; j < words.length; j++) labelText += words[j] + ' '

          labels[i].innerText = labelText.trim()
        }
      }
      break
    default:
      console.log(`SPECIAL => UNKNOWN KEY: ${key}`)
  }

  return 'special done'
}
