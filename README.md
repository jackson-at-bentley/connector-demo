### When running on the `framework` branch

In `connector-framework`:

```
git clone https://github.com/jackson-at-bentley/connector-framework
git checkout coverage
npm install
npm run build
npm link
```

In `connector-demo`:

```
git checkout framework
npm install
npm link @itwin/connector-framework
npm run compile
npm run add -- unit.json
```
