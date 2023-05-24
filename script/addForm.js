import { setLabelsAndLegends, getTemplate_standard } from './formHelpers.js'
import { addControl_standard } from './addControlStandard.js'
import { addControl_special } from './addControlSpecial.js'

export const addForm = (user, formTitle, specialInputs, hasTip) => {
  const obj = user

  const addFormControl = (obj, group) => {
    for (const [key, value] of Object.entries(obj)) {
      let control = null

      if (typeof value === 'object') control = addFormGroup(key, value)
      else addControl()

      function addControl() {
        if (specialInputs.includes(key)) {
          control = document
            .getElementById(`formControl_${key}`)
            .content.cloneNode(true)

          addControl_special(user, key, value, control)
        } else {
          control = getTemplate_standard(value).content.cloneNode(true)
          addControl_standard(key, value, control)
        }
      }

      document.get
      group.querySelector('fieldset').appendChild(control)
    }
  }

  const addFormGroup = (key, obj) => {
    // Create a form group
    const formGroup = document.querySelector('#formGroup')
    const group = formGroup.content.cloneNode(true)
    group.querySelector('fieldset').id = key

    // Set the form group's legend
    let legend = group.querySelector('legend')
    if (key === formTitle) legend.textContent = key
    else legend.textContent = setLabelsAndLegends(key)

    // Add a tip to the form group
    if (hasTip.includes(key)) {
      const tipTemplate = document.querySelector(`#template__tip_${key}`)
      const tip = tipTemplate.content.cloneNode(true)
      group.querySelector('.group--tip-content').appendChild(tip)
    }

    // Add form-controls to the form group
    addFormControl(obj, group)
    return group
  }

  if ('content' in document.createElement('template')) {
    const insertionPoint = document.querySelector('#form_content')
    insertionPoint.appendChild(addFormGroup(formTitle, obj))
  } else {
    console.log('Error, browser version does not support templates')
  }
}
