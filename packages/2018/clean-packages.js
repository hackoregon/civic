/* eslint-disable no-console */
/* eslint-disable no-var */

var fs = require("fs");

var file = JSON.parse(fs.readFileSync("package.json"));

// Remove all of the hackoregon packages, since they aren't
// in the public package registry
Object.keys(file.dependencies).forEach(pkg => {
  if (pkg.startsWith("@hackoregon")) {
    console.log(`Removing ${pkg}`);
    delete file.dependencies[pkg];
  }
});

console.log("New package.json");
console.log(JSON.stringify(file, null, 2));

fs.writeFileSync("package.json", JSON.stringify(file, null, 2));
