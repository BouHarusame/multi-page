/**
 * Created by guoguanrong on 2019/3/19.
 */

const projectName = require('./module')

const config = {
  all: {
    pages: {
      client: {
        entry: 'src/pages/client/main.js',
        template: 'public/index.html',
        filename: 'client.html'
      },
      service: {
        entry: 'src/pages/service/main.js',
        template: 'public/index.html',
        filename: 'service.html'
      }
    }
  },
  // 活动1
  client: {
    pages: {
      index: {
        entry: 'src/pages/client/main.js',
        template: 'public/index.html',
        filename: 'client.html'
      }
    }
  },
  // 活动2
  service: {
    pages: {
      index: {
        entry: 'src/pages/service/main.js',
        template: 'public/index.html',
        filename: 'service.html'
      }
    }
  }
}

const configObj = config[projectName.name]
module.exports = configObj
