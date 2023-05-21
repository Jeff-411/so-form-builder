// import { setText_names, addTip } from './helpers/setText.js'
import { setText_names, addTip } from './helpers/setContent.js'

// Scope: The base form handles object, number, string, and color inputs only.
export const addBaseForm = (user) => {
  const obj = user

  // Add a form-control (<label>, <input>, etc.) to the form-group.
  const addFormControl = (obj, group) => {
    // Loop through the main object & any nested objects.
    for (const [key, value] of Object.entries(obj)) {
      let control = null
      let typeOfInput = ''

      // Recurse: If this is a nested object, get the next form-group.
      if (typeof value === 'object') control = addFormGroup(key, value)
      // Otherwise, add the current form-control to the current form-group
      else addFormControl()

      function addFormControl() {
        // Determine the type of input to use.
        switch (typeof value) {
          case 'number':
            typeOfInput = 'number'
            break
          case 'string':
            if (value.slice(0, 1) === '#') typeOfInput = 'color'
            else typeOfInput = 'text'
            break
          default:
            alert(`UNKNOWN INPUT TYPE - ${typeof value}`)
        }

        // Get the correct template for the type of input.
        let formControl = document.getElementById(`formControl_${typeOfInput}`)
        control = formControl.content.cloneNode(true)

        // Set the control's label.
        control.querySelector('label').prepend(setText_names(key))
        // control.querySelector('label').prepend(setControlContent(key, 'label'))

        // Set the control's input
        const input = control.querySelector('input')
        input.name = key
        input.id = key
        input.value = value

        // Set the step value for the input.
        switch (key) {
          case 'fontScale':
            input.step = 0.5
            break
          case 'fontWeight':
            input.step = 100
            break
          case 'ctrlBarWidth_px':
          case 'triggerTopPanesHeight':
          case 'triggerNavpaneHeight':
          case 'triggerLeftRailHeight':
          case 'ctrlBarPrimaryHeight_px':
            input.step = 10
            break
          default:
            break
        }
      }

      document.get
      group.querySelector('fieldset').appendChild(control)
    }
  }

  // Add a (<fieldset>) form-group to the form.
  const addFormGroup = (key, obj) => {
    // Create a new form group (ie. a <fieldset> container)
    const formGroup = document.querySelector('#formGroup')
    const group = formGroup.content.cloneNode(true)

    // Set the id of the fieldset to the key (e.g. 'fonts' or 'textColors').
    group.querySelector('fieldset').id = key

    // Set the legend of the fieldset from the key (e.g. 'fonts' or 'textColors').
    group.querySelector('legend').textContent = setText_names(key)

    // Append the content of a tip template to the form-group's <section> if applicable.
    if (addTip(key)) {
      const tipTemplate = document.querySelector(`#template__tip_${key}`)
      const tip = tipTemplate.content.cloneNode(true)
      group.querySelector('.tips').appendChild(tip)
    }

    addFormControl(obj, group)
    return group
  }

  // Repeat calls to addFormGroup() until all <fieldset>s added.
  if ('content' in document.createElement('template')) {
    const insertionPoint = document.querySelector('#form_content')
    insertionPoint.appendChild(addFormGroup('Preferences', obj))
  } else {
    console.log('Error, browser version does not support templates')
  }
}
