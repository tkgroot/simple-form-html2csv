require("bootstrap")
require("./styles.sass")
require("jquery-validation")

const form = $("#submitForm")

form.submit((e) => {
  e.preventDefault()

  // if the form is invalid add the was-validated class and return
  if (!form.valid()) {
    form.addClass("was-validated")
    e.stopPropagation()
    return undefined
  }
  form.removeClass("was-validated")

  // submit formData to the form.php
  // if successful reset form
  $.post("form.php", form.serialize(), (data) => {
    if (data === "Done") {
      form.addClass("d-none")
      $("#alert").removeClass("d-none")
    }
    form[0].reset()
  })
})
