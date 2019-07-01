window.addEventListener("DOMContentLoaded", function() {
  main()
})

var UI = (function UI() {
  var API = {}

  API["render"] = function render(template) {
    var root = document.getElementById("root")
    root.innerHTML = ""
    root.appendChild(template)
  }

  API["Fragment"] = function Fragment(childrenArr) {
    var fragment = document.createElement("div")
    childrenArr.forEach(function(child) {
      fragment.appendChild(child)
    })
    return fragment
  }

  return API
})(document)

var GlobalState = (function() {
  var persons = []
  var API = {}
  var sideEffects = []

  function informNodes() {
    sideEffects.forEach(function(sideEffect) => sideEffect())
  }

  API["registerPerson"] = function(username, email) {
    persons.push({
      username: username,
      email: email
    })
    informNodes()
  }

  API["getAllPersons"] = function() {
    return persons.slice()
  }

  API["registerBinding"] = function(callback, shouldInvokeImmediately) {
    if (shouldInvokeImmediately) {
      callback()
    }
    sideEffects.push(callback)
  }

  return API
})()

function PersonList() {
  var personList = document.createElement("div")
  personList.classList.add("personList")

  GlobalState.getAllPersons().forEach(function(person) {
    var currentPerson = document.createElement("span")
    currentPerson.classList.add("personList__person")
    currentPerson.innerText = person.username + " (" + person.email + ")"
    personList.append(currentPerson)
  })

  return personList
}

function Form() {
  var form = document.createElement("form")
  var header = document.createElement("h1")
  var usernameInput = document.createElement("input")
  var emailInput = document.createElement("input")
  var button = document.createElement("button")
  form.classList.add("registrationForm")
  header.textContent = "Hello"
  usernameInput.type = "text"
  usernameInput.placeholder = "Username"
  usernameInput.classList.add("registrationForm__username")
  emailInput.type = "email"
  emailInput.setAttribute("type", "email")
  emailInput.placeholder = "Email"
  emailInput.classList.add("registrationForm__email")
  button.innerText = "Register"
  button.classList.add("registrationForm__submitButton")

  form.onsubmit = function(event) {
    event.preventDefault()
    if (usernameInput.value !== "" || emailInput.value !== "") {
      GlobalState.registerPerson(usernameInput.value, emailInput.value)
    }
  }

  form.append(header, usernameInput, emailInput, button)
  return form
}

function main() {
  GlobalState.registerBinding(() => {
    UI.render(UI.Fragment([Form(), PersonList()]))
  }, true)
}
