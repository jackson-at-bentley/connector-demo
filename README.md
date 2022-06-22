### When running on the `unmodified-framework` branch

In `connector-framework`:

```
npm install
npm run build
npm link
```

In `connector-demo`:

```
git checkout unmodified-framework
npm install
npm run compile
npm link @itwin/connector-framework
npm run add -- unit.json
```
