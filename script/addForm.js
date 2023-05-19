/** Refs
 *  templates: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
 *  forms: https://stackoverflow.com/questions/73330394/create-html-form-from-any-nested-js-objects
 *           OR (same tutorial at another site - and site may be worth cheking out)
 *         https://javascript.tutorialink.com/create-html-form-from-any-nested-js-objects/
 
*/
import { handleLocalStorage } from './handleLocalStorage.js'

export const addForm = () => {
  const formGroup = document.querySelector('#formGroup')
  const insertionPoint = document.querySelector('#form_content')
  const user = handleLocalStorage()
  const obj = user

  // CREATE THE FORM
  // Add <lable>s & <input>s to the <fieldset>.
  const addFormControl = (obj, group) => {
    // Loop through the main object & any nested objects.
    for (const [key, value] of Object.entries(obj)) {
      let control = null
      let typeOfInput = ''
      // if (typeof value === 'object') control = addFormGroup(key, value)

      typeof value === 'object'
        ? // Handle nested objects (This is the recursive call).
          (control = addFormGroup(key, value))
        : // Add the <label> & <input> to the current <fieldset>.
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
            alert(`UNKNOWN INPUT TYPE!`)
        }

        // Set the formControl template to the correct input type.
        let formControl = document.getElementById(`formControl_${typeOfInput}`)
        control = formControl.content.cloneNode(true)

        control
          .querySelector('label')
          .prepend(key.charAt(0).toUpperCase() + key.slice(1))
        // end control

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

  // Add a <fieldset> to form.
  const addFormGroup = (key, obj) => {
    // Create a new form group (ie. a <fieldset> container)
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
    insertionPoint.appendChild(addFormGroup('Preferences', obj))
  } else {
    console.log('Error, browser version does not support templates')
  }

  // ADD THE FORM'S LISTENERS
  const listeners = {
    addFormListeners: () => {
      const form_userPrefs = document.querySelector('#form_userPrefs')

      form_userPrefs.addEventListener('submit', (e) => {
        e.preventDefault()
        // Get the form data
        const formData = new FormData(form_userPrefs)
        const data = Object.fromEntries(formData)
        console.log('data', data)

        // update user object with form data
        user.fonts.fontScale = Number(data.fontScale)
        user.fonts.fontWeight = Number(data.fontWeight)
        user.fonts.textColors.normal = data.normal
        user.fonts.textColors.accent = data.accent

        user.layout1.ctrlBarWidth_px = Number(data.ctrlBarWidth_px)
        user.layout1.ctrlBarPrimaryHeight_rem = Number(
          data.ctrlBarPrimaryHeight_rem
        )
        user.layout1.triggerTopPanesHeight = Number(data.triggerTopPanesHeight)
        user.layout1.triggerNavpaneHeight = Number(data.triggerNavpaneHeight)
        user.layout1.triggerLeftRailHeight = Number(data.triggerLeftRailHeight)
        user.layout1.triggerUserBg = data.triggerUserBg
        user.layout1.triggerTopPanesBg = data.triggerTopPanesBg
        user.layout1.triggerNavpaneBg = data.triggerNavpaneBg
        user.layout1.triggerLeftRailBg = data.triggerLeftRailBg

        // Save the user object to local storage & reload the page
        localStorage.setItem('user', JSON.stringify(user))
        location.reload()
      })
    },
  }
  listeners.addFormListeners()

  // TEST THE FORM'S OUTPUT
  const tests = {
    styleMessages: () => {
      let messages = document.querySelectorAll('.message')
      messages.forEach((message) => {
        message.style.fontSize = `${user.fonts.fontScale}rem`
        message.style.fontWeight = user.fonts.fontWeight
        message.style.color = user.fonts.textColors.normal
      })
    },
  }
  // Style some test messages to the user's preferred values.
  tests.styleMessages()
}
