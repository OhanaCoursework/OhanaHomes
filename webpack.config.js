module.exports = {
    // ...
    module: {
      rules: [
        // ...
      ],
    },
    resolve: {
      extensions: ['.js'],
      // add the following line:
      mainFields: ['main', 'module', 'browser'],
    },
    // ...
  };
  