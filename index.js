/** Refs
 *  templates: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
 *  forms: https://stackoverflow.com/questions/73330394/create-html-form-from-any-nested-js-objects
 *           OR same tutorial at another site (site may be worth cheking out)
 *         https://javascript.tutorialink.com/create-html-form-from-any-nested-js-objects/
 
*/
import { getUser } from './script/variables/store.js'
import { addListeners } from './script/helpers/listeners.js'
import { testForm_styleMessages } from './script/helpers/testForm.js'
import { addBaseForm } from './script/baseForm.js'
import { addSpecialInputs } from './script/specialInputs.js'

const user = getUser()

addBaseForm(user)
addListeners(user)

testForm_styleMessages()
