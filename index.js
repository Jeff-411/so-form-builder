/** Refs
 *  templates: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
 *  forms: https://stackoverflow.com/questions/73330394/create-html-form-from-any-nested-js-objects
 *           OR same tutorial at another site (site may be worth cheking out)
 *         https://javascript.tutorialink.com/create-html-form-from-any-nested-js-objects/
 
*/
import { handleLocalStorage } from './script/handleLocalStorage.js'
import { createBaseForm } from './script/createBaseForm.js'
import { addSpecialInputsToBase } from './script/addSpecialInputsToBase.js'
import { addListeners } from './script/addListeners.js'

// localStorage.clear() // <-- DEBUG: UNCOMMENT THIS LINE TO CLEAR LOCAL STORAGE
const user = handleLocalStorage()

createBaseForm(user)
addListeners(user)

// Test form output
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

tests.styleMessages()
