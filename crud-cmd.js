const { exec } = require('child_process');

const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name');
  process.exit(1);
}

const commands = [
  `nest g module ${moduleName} --no-spec`,
  `nest g service ${moduleName} --no-spec`,
  `nest g controller ${moduleName} --no-spec`
];

commands.forEach(cmd => {
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing ${cmd}: ${stderr}`);
      process.exit(1);
    }
    console.log(stdout);
  });
});
