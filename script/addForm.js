import { labels_legends } from './formHelpers.js'

export const addForm = (user, formTitle, specialInputs, hasTip) => {
  const obj = user

  const addFormControl = (obj, group) => {
    let isSpecial = null

    for (const [key, value] of Object.entries(obj)) {
      let control = null
      let typeOfInput = ''

      typeof value === 'object'
        ? (control = addFormGroup(key, value)) // Recurse to next form group
        : addControl()

      function addControl() {
        // Determine the type of input to use.
        if (specialInputs.includes(key)) {
          typeOfInput = key
          isSpecial = true
        } else {
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
          isSpecial = false
        }

        // Get the correct template for the type of input.
        let formControl = document.getElementById(`formControl_${typeOfInput}`)
        control = formControl.content.cloneNode(true)

        // Set the control's label.
        control.querySelector('label').prepend(labels_legends(key))

        // Set the control's input
        if (!isSpecial) {
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
        } else {
          const select = control.querySelector('select')
          select.name = key
          select.value = value
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
    group.querySelector('legend').textContent = labels_legends(key)

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
