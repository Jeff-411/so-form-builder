import { config } from './variables/config.js'
import { addControl_standard } from './formControls/addStandard.js'
import { addControl_special } from './formControls/addSpecial.js'

export const addForm = (user, formTitle, specialInputs, hasTip) => {
  const obj = user

  const addFormControl = (obj, group) => {
    for (const [key, value] of Object.entries(obj)) {
      let control = null

      const addControl = () => {
        if (specialInputs.includes(key)) {
          control = document
            .getElementById(`formControl_${key}`)
            .content.cloneNode(true)

          addControl_special(user, key, value, control)
        } else {
          control = config.template_standard(value).content.cloneNode(true)
          addControl_standard(key, value, control)
        }
      }

      typeof value === 'object'
        ? (control = addFormGroup(key, value)) // RECURSION: addFormGroup()
        : addControl()

      document.get
      group.querySelector('fieldset').appendChild(control)
    }
  }

  const addFormGroup = (key, obj) => {
    // Create a form group
    const group = document.querySelector('#formGroup').content.cloneNode(true)
    group.querySelector('fieldset').id = key

    // Set the form group's legend
    key === formTitle
      ? (group.querySelector('legend').textContent = key)
      : (group.querySelector('legend').textContent =
          config.labelsAndLegends(key))

    // Add a tip to selected form groups
    hasTip.includes(key)
      ? group
          .querySelector('.group--tip-content')
          .appendChild(
            document
              .querySelector(`#formControlTip_${key}`)
              .content.cloneNode(true)
          )
      : null

    // Add form-controls to the form group
    addFormControl(obj, group)
    return group
  }

  'content' in document.createElement('template')
    ? document
        .querySelector('#form_content')
        .appendChild(addFormGroup(formTitle, obj))
    : console.log('Error, browser version does not support templates')
}
