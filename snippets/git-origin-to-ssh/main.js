const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('? project directory? [../../projects]', dir => {
  const basePath = fs.realpathSync(dir || '../../projects');
  console.log('  set to: ' + basePath + "\n");
  const repos = getRepos(basePath);
  renameUrl(repos);
});

function getRepos(basePath) {
  return fs.readdirSync(basePath, {withFileTypes: true})
    .map(dirent => {
      if (!dirent.isDirectory()) {
        return;
      }

      const repo = {};
      repo.name = dirent.name;
      repo.path = path.join(basePath, repo.name);
      repo.gitPath = path.join(basePath, repo.name, '.git');

      if (!fs.existsSync(repo.gitPath) || !fs.lstatSync(repo.gitPath).isDirectory()) {
        return;
      }

      const raw = execSync('git remote -v', {cwd: repo.path}).toString();

      if (!raw) {
        return;
      }

      let lines = raw.split("\n").filter(l => l);

      lines.forEach(line => {
        let parts = line.split("\t");
        if (parts[0] !== 'origin') {
          return;
        }
        let subparts = parts[1].split(' ');
        if (subparts[1] === '(fetch)') {
          repo.fetch = subparts[0];
        }
        if (subparts[1] === '(push)') {
          repo.push = subparts[0];
        }
      });

      if (!repo.fetch || repo.fetch.indexOf('https') === -1) {
        return;
      }

      repo.new = repo.fetch.replace('https://github.com/', 'git@github.com:');

      return repo;
    })
    .filter(repo => repo);
}

function renameUrl(repos, index = 0) {
  const repo = repos[index];
  if (!repo) {
    console.log('all done!');
    process.exit(0);
  }

  console.log("- " + repo.fetch + "\n+ " + repo.new);
  rl.question('? confirm: Yes=[Enter] No=[Ctrl^C]', function () {

    console.log(execSync('git remote set-url origin '+repo.new, {cwd: repo.path}).toString());

    renameUrl(repos, index + 1);
  })
}
