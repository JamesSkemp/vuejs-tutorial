# vuejs-tutorial

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
Out of the box Vue functionality. Automatically fixes issues when it can, and includes context.
```
npm run lint
```

This custom one uses eslint directly, and doesn't automatically fix issues.
```
npm run eslint
```

### Jest testing

```
npm run test
npm run test:coverage
```

For the coverage report:
- % Stmts = percent of statements called
- % Branch = percent of if/switch branches that have been checked
- % Funcs = percent of functions called
- % Lines = percent of lines covered
- Uncovered Line #s = exactly what it sounds like

#### Check for specific issues
```
npm run lint | grep require-returns
```

### Generate Docs
This requires that `npm install --global typedoc http-server`. See https://typedoc.org/.
```
npm run docs
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
