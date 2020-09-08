const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { Parser } = require('json2csv');

// CHANGEME - Set your package.json paths here
const pathsToPackageJson = [
  path.join(__dirname, 'example', 'my-project', 'package.json'),
  path.join(__dirname, 'example', 'another-project', 'package.json')
];

const results = [];
(async () => {
  await Promise.all(pathsToPackageJson.map(async (packageJsonPath) => {
    return new Promise(async (res) => {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
      const dependencies = packageJson.dependencies || {};
      const devDependencies = packageJson.devDependencies || {};

      for (let [name, rawVersion] of Object.entries(dependencies)) {
        const version = rawVersion.replace('^', '').replace('~', '');
        console.log(`Processing ${packageJson.name}/${name}@${version}`);

        const license = await new Promise((resolve) => {
          exec(`npm v ${name}@${version} license`, (error, stdout, stderr) => {
            const license = (stdout.replace(/\n/g, ''));
            console.log(name, version, license)
            resolve(license);
          });
        });
        const key = `${name}_${version}`;

        const existingIndex = results.findIndex(a => a.key === key);
        if (existingIndex > -1) {
          results[existingIndex].usedBy.push(packageJson.name);
        } else {
          results.push({
            key,
            name,
            version,
            license,
            usedBy: [packageJson.name]
          });
        }
      }

      for (let [name, rawVersion] of Object.entries(devDependencies)) {
        const version = rawVersion.replace('^', '').replace('~', '');
        console.log(`Processing ${packageJson.name}/${name}@${version}`);

        const license = await new Promise((resolve) => {
          exec(`npm v ${name}@${version} license`, (error, stdout, stderr) => {
            const license = (stdout.replace(/\n/g, ''));
            console.log(name, version, license)
            resolve(license);
          });
        });
        const key = `${name}_${version}`;

        const existingIndex = results.findIndex(a => a.key === key);
        if (existingIndex > -1) {
          results[existingIndex].usedBy.push(packageJson.name);
        } else {
          results.push({
            key,
            name,
            version,
            license,
            usedBy: [packageJson.name]
          });
        }
      }
      res();
    });
  }));

  results.sort((a, b) => a.name - b.name);

  const csv = new Parser().parse(results);

  fs.writeFileSync(`${__dirname}/output.csv`, csv);

  process.exit();
})();
