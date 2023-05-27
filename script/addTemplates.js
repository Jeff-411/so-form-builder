export const addTemplates = () => {
  // List of template files to add to the DOM
  const templateFileNames1 = [
    'controls_standard.html',
    'controls_special.html',
    'controls_tips.html',
    'group.html',
  ]

  const newDiv = document.createElement('div')
  newDiv.id = 'templates'

  // Add all the files in the templateFileNames array to the newDiv
  templateFileNames1.forEach((fileName) => {
    const path = `./templates/${fileName}`
    fetch(path)
      .then((response) => response.text())
      .then((data) => {
        newDiv.innerHTML += data
      })
  })

  // Add the newDiv to the DOM
  document.querySelector('script').insertAdjacentElement('beforebegin', newDiv)
}
