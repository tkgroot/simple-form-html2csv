# Changelog

## v1.1.0

### Features

- expand tests with chrome headless. Enter invalid fields to check if the form
  is submitted or not
- add additional test for the second select field option

### Fixes

- Formfield validation for select field
  The select field has a default value which is not part of the submit process
  and has to be selected by the user in order to correctly validate the form.

## v1.0.0

- create project skeleton
- add webpack.config.js for build pipeline
- add Dockerfile and docker-compose.yml to start the lamp container
- add bootstrap styles to the main sass file
- split pug files into base template and inheritance to the index pug template
- include header and footer as partials
- add mixin for repeated create of input fields
- add csv file with header (names are equal to the submit form's input fields)
- add admin modal for a future login
