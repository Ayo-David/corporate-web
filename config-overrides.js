const { override } = require("customize-cra");

module.exports = override(
  (config) => {
    // Apply this fix => https://github.com/facebook/create-react-app/issues/9870#issuecomment-719971906
    const oneOf = config.module.rules[1].oneOf
    const rules = oneOf.filter((rule) =>
      rule.test &&
      rule.test.toString().includes('css')
    )
    rules.forEach((rule) => {
      const ruleIndex = oneOf.indexOf(rule)

      const loaderIndex = rule.use.findIndex((loader) =>
        loader.loader &&
        loader.loader.includes('css-loader')
      )
      if (loaderIndex !== -1) {
        config.module
          .rules[1]
          .oneOf[parseInt(ruleIndex)]
          .use[parseInt(loaderIndex)]
          .options.url = false
      }
    })
    return config
  }
);