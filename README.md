## Requirement

-   `node` >= 12
-   `yarn`

### install `yarn` via `npm`

```bash
npm i -g yarn
```

## Available Scripts

In the project directory, you can run:

### `yarn`

Install dependency

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Api proxy on development environment [http://localhost:3000/api](http://localhost:3000/api) => [http://localhost:8000/api](http://localhost:8000/api).\
See at `package.json -> proxy`

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
