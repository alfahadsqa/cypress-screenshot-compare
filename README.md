# Cypress Screenshot Compare

🧪 Visually compare Cypress screenshots during tests.

## Install

```bash
npm install cypress-screenshot-compare
```

## Usage

```js
import 'cypress-screenshot-compare';

cy.compareScreenshot('homepage');
```

Baseline images are stored on the first run. Diffs are saved in `/diff`.

## Options

```js
cy.compareScreenshot('header', { threshold: 0.05 });
```

## Why?

Sometimes UIs change without failing tests — this plugin helps detect those visual regressions.

## License

Good SQA
