import { setLabelsAndLegends, setSpecial } from './formHelpers.js'

export const addForm = (user, formTitle, specialInputs, hasTip) => {
  const obj = user

  const addFormControl = (obj, group) => {
    for (const [key, value] of Object.entries(obj)) {
      let control = null
      let typeOfInput = ''

      // If this item's an object, make the recursive call to create a new form group.
      if (typeof value === 'object') control = addFormGroup(key, value)
      // Otherwise, check for special inputs and add a standard or special
      // form control as required.
      else {
        specialInputs.includes(key)
          ? addControl_special()
          : addControl_standard()
      }

      function addControl_standard() {
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
        control.querySelector('label').prepend(setLabelsAndLegends(key))

        // Set the control's input
        const input = control.querySelector('input')
        input.name = key
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

      function addControl_special() {
        // Get the correct template for the special input.
        let formControl = document.getElementById(`formControl_${key}`)
        control = formControl.content.cloneNode(true)

        switch (key) {
          case 'fontWeight':
            // INPUT TYPE: select (HTML element)
            const select = control.querySelector('select')
            select.name = key
            select.value = value
            break
          case 'layout':
            // INPUT TYPE: radio
            const inputOptions = setSpecial(key)
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

                for (let j = 0; j < words.length; j++)
                  labelText += words[j] + ' '

                labels[i].innerText = labelText.trim()
              }
            }
            break
          default:
            console.log(`SPECIAL => UNKNOWN KEY: ${key}`)
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
