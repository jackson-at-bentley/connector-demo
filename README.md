### When running on the `unmodified-framework` branch

In `connector-framework`:

```
git clone https://github.com/iTwin/connector-framework
npm install
npm run build
npm link
```

In `connector-demo`:

```
git checkout unmodified-framework
npm install
npm link @itwin/connector-framework
npm run compile
npm run add -- unit.json
```
