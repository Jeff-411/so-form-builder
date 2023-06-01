import { config } from '../variables/config.js'

export const setControl_standard = (key, value, control) => {
  // Set the control's label.
  control.querySelector('label').for = key
  control.querySelector('label').innerText = config.displayNames(key)

  // Set the control's input
  const input = control.querySelector('input')
  input.name = key
  input.value = value
  input.step = config.inputSteps(key)
}
