/** Refs
 *  templates: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
 *  forms: https://stackoverflow.com/questions/73330394/create-html-form-from-any-nested-js-objects
 *           OR same tutorial at another site (site may be worth cheking out)
 *         https://javascript.tutorialink.com/create-html-form-from-any-nested-js-objects/
 
*/
import { getUser } from './script/variables/store.js'
import { addForm } from './script/addForm.js'
import { addListeners } from './script/addListeners.js'
import { test_styleMessages } from './script/tests/testForm.js'

const user = getUser()
const formTitle = 'Preferences'
const specialInputs = ['fontWeight', 'layout']
const hasTip = ['fonts', 'ctrlTriggerBg']

addForm(user, formTitle, specialInputs, hasTip)
addListeners(user)
test_styleMessages()
