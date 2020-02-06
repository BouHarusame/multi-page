let projectName = process.argv[2]
let fs = require('fs')

fs.writeFileSync('./config/module.js', `exports.name = '${projectName}'`)

let exec = require('child_process').execSync
exec('npm run build', { stdio: 'inherit' })
