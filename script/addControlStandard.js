import { setLabelsAndLegends, getInputSteps } from './formHelpers.js'

export const addControl_standard = (key, value, control) => {
  // Set the control's label.
  control.querySelector('label').prepend(setLabelsAndLegends(key))

  // Set the control's input
  const input = control.querySelector('input')
  input.name = key
  input.value = value
  input.step = getInputSteps(key)
}
