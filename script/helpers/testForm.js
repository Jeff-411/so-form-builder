import { handleLocalStorage } from '../variables/store.js'

const user = handleLocalStorage()

export const testForm_styleMessages = () => {
  let messages = document.querySelectorAll('.message')
  messages.forEach((message) => {
    message.style.fontSize = `${user.fonts.fontScale}rem`
    message.style.fontWeight = user.fonts.fontWeight
    message.style.color = user.fonts.textColors.normal
  })
}
