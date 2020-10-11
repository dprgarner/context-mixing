# Context-mixing bug

A minimal repo to demonstrate a bug involving minification in Parcel.

## Seeing the bug

This React app renders two items via React context: a string and a number.

When the app is run in dev mode with:

```
> yarn start
```

the context-consuming component renders both pieces of context separately and correctly. However, when the app is run in production mode with:

```
> yarn prod
```

the two contexts get mixed-up and both render a number.

## Best guess

I think the minifier is picking module names based on a hash of the source code. The two context files `NumberContext.js` and `StringContext.js` have identical source code after they are minified, but they should _not_ be treated as the same file. Each call to `React.createContext` should generate an independent context.

The part of the minified source code corresponding to App.jsx looks like this:

```js
parcelRequire = (function (e, r, t, n) {
  // ...
})(
  {
    // ...
    vmSA: [
      function (require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.default = void 0);
        var e = l(require('react')),
          t = n(require('./NumberContext')),
          r = n(require('./StringContext'));
        // ...
      },
      { react: 'HdMw', './NumberContext': 'ALHm', './StringContext': 'ALHm' },
    ],
    // ...
  },
  {},
  ['c2Qt'],
  null,
);
```

... and it looks like both Context files are mapped to the same file, `ALHm`.
