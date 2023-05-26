export const addTemplates = () => {
  // List of template files to add to the DOM
  const templateFileNames = [
    'formControl_color.html',
    'formControl_fontWeight.html',
    'formControl_layout.html',
    'formControl_number.html',
    'formControl_text.html',
    'formControlTip_ctrlTriggerBg.html',
    'formControlTip_fonts.html',
    'formGroup.html',
  ]

  const newDiv = document.createElement('div')
  newDiv.id = 'templates'
  newDiv.classList.add('templates')

  // Add all the files in the templateFileNames array to the newDiv
  templateFileNames.forEach((fileName) => {
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
