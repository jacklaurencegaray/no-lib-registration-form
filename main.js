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

document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    main()
  }
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
  }

  form.append(header, usernameInput, emailInput, button)
  return form
}

function main() {
  UI.render(UI.Fragment([Form()]))
}
