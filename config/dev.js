let projectName = process.argv[2] || 'all'
let fs = require('fs')

fs.writeFileSync('./config/module.js', `exports.name = '${projectName}'`)

let exec = require('child_process').execSync
exec('npm run serve', { stdio: 'inherit' })
