module.exports = {
  "extends": [
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  "env": {
    "jest": true,
    "node": true
  },
  "rules": {
    "max-len": [
      "warn",
      {
        "code": 100,
        "tabWidth": 2,
        "comments": 100,
        "ignoreComments": false,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "no-underscore-dangle": "off" // __MONGO_URI__, _id, etc.
  }
}
