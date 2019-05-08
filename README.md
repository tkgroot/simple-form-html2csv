# simple-form-html2csv

Add a simple input form, styled with bootstrap, submits the form content to the
server´s php file, which stores the submitted formdata in a csv file.

## Install

The project can be installed by running `npm i` to install all required
dependencies. The following npm scripts are available:

<!-- markdownlint-disable M013 -->

| command               | description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| `npm run build:watch` | watches src directory with `nodemon` and run build script on changes  |
| `npm run build`       | build the project                                                     |
| `npm run serve`       | run the webpack-dev-server and serve the src directory to the browser |
| `npm run test`        | executes the selenium-side-runner and fill´s out the signup form      |

<!-- markdownlint-enable M013 -->

Additionally create a `.env` file and add `COMPOSE_PROJECT_NAME=signup` to
identify your container within your docker workflow.

## Development

While development one change use the webpack-dev-server which has some
implications listed below in the caveats section. To test the php files, the
dockerfile creates a lamp instance and mounts the build directory as a volume to
the container. With this configuration the php file can be executed on a server
and the behavior simulated.

### Project Structure

```bash
src/
  assets/       # <-- all images/logos and other assets required
  mixins/       # <-- pug mixins
  modal/        # <-- modal template files
  styles/       # <-- all partial sass files
  _base.pug     # <-- the base template structure
  _footer.pug   # <-- the footer template for all template files
  _header.pug   # <-- the header and navigation template for all files
  form.php      # <-- the form action is defined here
  index.js      # <-- main javascript file for the project and entry point
  index.pug     # <-- index pug template, containing the submit form
  signups.csv   # <-- csv file with header
  styles.sass   # <-- main style sass file
```

### Caveats

The `webpack-dev-server` used by the npm script `serve` cannot handle php files.
Therefore when using the serve script it is not possible to simulate the actual
submit. For this a more complicated workflow is required, which itself has a
caveat ("Everything has it´s price, it seems").

The npm `build:watch` script watches for file changes in the src directory and
executes the `build` script when changes occur. The idea behind this script is,
that it serves the build directory as a volume mounted to the docker container,
run with `docker-compose up -d`. By applying changes to any file in the src
directory the build is ran, which then "updates" the www directory on the docker
machine. Though sometimes changes to javascript files are not copied accordingly
and the docker container has to be restarted by running `docker-compose restart`.

## Tests

Test are run with selenium side-runner and contain a test script to fill-out
the form with valid data and submit it (no more manual submitting the form).

```bash
$> npm test
```

## Contributing

This project wasn´t created with the intention of ever being contributed to. If
there´s still an interest in contributing. Build sth, create a pull-request...
You know the drill.

## Changelog

For detailed listing of the changes made, see [CHANGELOG.md](CHANGELOG.md).
