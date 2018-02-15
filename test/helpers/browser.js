require('babel-register')()

var sinon = require('sinon')

var exposedProperties = ['window', 'navigator', 'document']

var jsdom = require('jsdom')
const { JSDOM } = jsdom
const options = {
  resources: 'usable',
  runScripts: 'dangerously',
  beforeParse: (window) => {
    window.alert = sinon.spy()
  }
}

const { document } = new JSDOM('', options).window

global.document = document
global.window = document.defaultView
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

global.documentRef = document
