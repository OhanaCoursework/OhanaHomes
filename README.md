# Getting Started with Ohana Homes

### `npm install`

Installs the scripts needed to run the application

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Git Practices

## Branchs must be named in the following format

`<type>/<ticket-number>-<description>`

Where type is one of `feature`,`task`,`bug`,`hotfix` or `epic`
e.g `feature/oh-123-adding-facial-recognition`

## Commit messages

Based on https://www.conventionalcommits.org/en/v1.0.0/#summary.
### Commit message convention:
`<type>: <description>`

Example types include:

`fix:` a commit of the type fix patches a bug in your codebase.
`feat:` a commit of the type feat introduces a new feature to the codebase.
types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends build:, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, and others.
e.g. `fix: correct minor typos in code`,
`feat: allow provided config object to extend other configs`,
`docs: correct spelling of CHANGELOG`
