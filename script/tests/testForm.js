import { getUser } from '../variables/store.js'

const user = getUser()

export const test_styleMessages = () => {
  let messages = document.querySelectorAll('.message')
  messages.forEach((message) => {
    message.style.fontSize = `${user.fonts.fontScale}rem`
    message.style.fontWeight = user.fonts.fontWeight
    // if (user.fonts.fontWeight === 1) message.style.fontWeight = 400
    // if (user.fonts.fontWeight === 2) message.style.fontWeight = 600
    // if (user.fonts.fontWeight === 3) message.style.fontWeight = 900

    message.style.color = user.fonts.textColors.normal
  })
}
