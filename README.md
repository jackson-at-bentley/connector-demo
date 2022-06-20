### When running on the `framework` branch

In `connector-framework`:

```
git clone https://github.com/jackson-at-bentley/connector-framework
npm install
npm run build
npm link
```

In `connector-demo`:

```
npm install
npm run compile
npm link @itwin/connector-framework
npm run add -- unit.json
```
