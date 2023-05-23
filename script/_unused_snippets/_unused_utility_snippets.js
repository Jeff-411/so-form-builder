// Tested - Ok
// Useage - Type: "node snippets.js" in terminal to run

// NOTE: Colors must be in hex format _only_! (no rgb, rgba, etc.)
let user = {
  fonts: {
    fontScale: 2.5,
    fontWeight: 600,
    textColors: {
      normal: ['#000000', 'color'],
      accent: ['#ff0000', 'color'],
    },
  },
  selectLayout: {
    layout: [0, 'radio'],
  },
  customLayout: {
    // Control bar
    ctrlBarWidth_px: 20,
    ctrlBarPrimaryHeight_px: 10,

    // Control bar content
    triggerTopPanesHeight: 10,
    triggerNavpaneHeight: 80,
    triggerLeftRailHeight: 10,
    triggerUserBg: '#ff0000',
    triggerTopPanesBg: '#0000ff',
    triggerNavpaneBg: '#00ff00',
    triggerLeftRailBg: '#f500d4',
  },
}

// Snippets
const getNumObjects = (obj) => {
  let count = 0
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      count++
      count += getNumObjects(value)
    }
  }
  return count
}
// console.log(`getNumObjects`, getNumObjects(user))

const getNumValues = (obj) => {
  let count = 0
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      count += getNumValues(value)
    } else {
      count++
    }
  }
  return count
}
// console.log(`getNumValues`, getNumValues(user))

const walkObject1_recursive = (obj) => {
  // TheHippo -  https://stackoverflow.com/questions/722668/traverse-all-the-nodes-of-a-json-object-tree-with-javascript

  //called with every property and its value
  function process(key, value) {
    console.log(key + ' : ' + value)
  }

  function traverse(obj, func) {
    for (var i in obj) {
      func.apply(this, [i, obj[i]])
      if (obj[i] !== null && typeof obj[i] == 'object') {
        //going one step down in the object tree!!
        traverse(obj[i], func)
      }
    }
  }

  traverse(obj, process)
}
// walkObject1_recursive(user)

const walkObject2_recursive_complex = () => {
  // clozach -  https://stackoverflow.com/questions/15690706/recursively-looping-through-an-object-to-build-a-property-list/53620876#53620876
  //            Note: Info about handling "null" is provided in the comments!
  // Array.isArray(value) - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

  // This function turns an object into an array of strings,
  // where each string is a path to a property within the object.
  function propertiesToArray(obj) {
    // Checks if a value is an object
    const isObject = (val) =>
      val && typeof val === 'object' && !Array.isArray(val)

    // Adds a delimiter between two strings
    const addDelimiter = (a, b) => (a ? `${a}.${b}` : b)

    // Recursively gets all the paths to the properties of the object
    const paths = (obj = {}, head = '') => {
      return Object.entries(obj).reduce((product, [key, value]) => {
        let fullPath = addDelimiter(head, key)
        return isObject(value)
          ? product.concat(paths(value, fullPath))
          : product.concat(fullPath)
      }, [])
    }

    return paths(obj)
  }
  const result = propertiesToArray(user)
  console.log(`typeof result`, typeof result)
  console.log(result)
}
walkObject2_recursive_complex()

const convertObjectToArray = (obj) => {
  // https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/

  const entries = Object.entries(obj)

  console.log(entries)
}
// convertObjectToArray(user)
