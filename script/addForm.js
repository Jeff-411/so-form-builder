import { config } from './variables/config.js'
import { setControl_standard } from './formControls/setConstrolsStandard.js'
import { setControl_special } from './formControls/setControlsSpecial.js'

export const addForm = (user) => {
  const obj = user

  /** Form controls are organized two main categories:
   *    - STANDARD controls include text, number and color inputs.
   *    - SPECIAL controls include all other inputs: radio, range,
   *      select, checkbox, etc.
   *
   *  The code block below:
   *    - first clones the correct template for the control, then
   *    - sets its attributes and values, then
   *    - appends the control to its parent form group (in
   *      this case, its parent <fieldset>).
   */
  const addFormControl_toFieldset = (obj, group) => {
    const helpers = {
      getStandardTemplate_byInputType: (value) => {
        //prettier-ignore
        switch (typeof value) {
          case 'number': return document.getElementById('formControl_number')
          case 'string':
            if (value.slice(0, 1) === '#') return document.getElementById('formControl_color')
            else return document.getElementById('formControl_text')
    
          default: alert(`UNKNOWN INPUT TYPE - ${typeof value}`)
        }
      },
    }

    const appendControl = (control) => {
      document.get
      group.querySelector('fieldset').appendChild(control)
    }

    /** Loop through the user object's key/value pairs recursively, and
     *  check to see if the current obj is a form group or a control.
     *
     *  If it's a form group, re-call addFieldset() to create it.
     *  If it's a form control, process it and append it to its parent group.
     */
    for (const [key, value] of Object.entries(obj)) {
      let control = null

      // If recursion is required, get the next form GROUP.
      if (typeof value === 'object') control = addFieldset(key, value)
      // Otherwise, process the control and append it to its parent group.
      else processControl()

      function processControl() {
        // Handle Special controls
        if (config.specialInputsArr.includes(key)) {
          // Get and clone the special control's template
          control = document
            .getElementById(`formControl_${key}`)
            .content.cloneNode(true)

          // Set the control's attributes and values
          setControl_special(user, key, value, control)
        }
        // Handle Standard controls
        else {
          control = helpers
            .getStandardTemplate_byInputType(value)
            .content.cloneNode(true)

          setControl_standard(key, value, control)
        }

        return 'done'
      }

      appendControl(control)
    }
  }

  /** First add a new form group (i.e. <fieldset>), then
   *  add the fieldset's "Tip" (if required), then
   *  call addFormControl_toFieldset() to add the form control.
   */
  const addFieldset = (key, obj) => {
    // Create a form group
    const group = document.querySelector('#formGroup').content.cloneNode(true)
    group.querySelector('fieldset').id = key

    // Set the form group's legend
    group.querySelector('legend').textContent = config.displayNames(key)

    // Add a tip to selected form groups
    if (config.hasTipArr.includes(key)) {
      const container = group.querySelector('.group--tip-content')
      const tip = document
        .querySelector(`#formControlTip_${key}`)
        .content.cloneNode(true)

      container.appendChild(tip)
    }

    // Add form-control to the form group
    addFormControl_toFieldset(obj, group)
    return group
  }

  // Check for browser support and call addFieldset() if Ok.
  'content' in document.createElement('template')
    ? // The initial call adds the form's title.
      document
        .querySelector('#form_content')
        .appendChild(addFieldset(config.formTitle, obj))
    : alert(
        'Error, your browser version does not support templates.\nPlease try again with a more recent browser.'
      )
}
