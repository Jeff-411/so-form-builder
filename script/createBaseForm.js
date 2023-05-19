// Scope: The base form handles object, number, string, and color inputs only.
export const createBaseForm = (user) => {
  const obj = user

  // Add a form-control (<label>, <input>, etc.) to the form-group.
  const addFormControl = (obj, group) => {
    // Loop through the main object & any nested objects.
    for (const [key, value] of Object.entries(obj)) {
      let control = null
      let typeOfInput = ''

      typeof value === 'object'
        ? // Handle nested objects (This is the recursive call).
          (control = addFormGroup(key, value))
        : // Add the <label>, <input>, etc. to the current <fieldset>.
          addFormControl()

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

        // Set the formControl template to the correct input type.
        let formControl = document.getElementById(`formControl_${typeOfInput}`)
        control = formControl.content.cloneNode(true)

        control
          .querySelector('label')
          .prepend(key.charAt(0).toUpperCase() + key.slice(1))

        // Set the input
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
            input.step = 10
            break
          case 'ctrlBarPrimaryHeight_rem':
            input.step = 0.25
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
    group.querySelector('legend').textContent =
      key.charAt(0).toUpperCase() + key.slice(1)

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
