const fs = require('fs-extra');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

Cypress.Commands.add('compareScreenshot', (name, options = {}) => {
  const screenshotsFolder = 'cypress/screenshots';
  const baselinePath = `${screenshotsFolder}/baseline/${name}.png`;
  const currentPath = `${screenshotsFolder}/current/${name}.png`;
  const diffPath = `${screenshotsFolder}/diff/${name}.png`;
  const threshold = options.threshold || 0.1;

  cy.screenshot(`current/${name}`, { capture: 'viewport' });

  cy.readFile(currentPath, null).then(currentBuffer => {
    if (!fs.existsSync(baselinePath)) {
      fs.copySync(currentPath, baselinePath);
      cy.log(`Baseline created for ${name}`);
      return;
    }

    const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
    const img2 = PNG.sync.read(currentBuffer);
    const { width, height } = img1;

    const diff = new PNG({ width, height });
    const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold });

    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    expect(pixelDiff).to.equal(0, `Visual diff found for ${name}. Check diff image.`);
  });
});
