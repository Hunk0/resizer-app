const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'http://localhost:9000',
    token : "941f831765997add3e3c843e41f9bd8bf08c4dfa", //generate your own
    options: {
      'sonar.projectName': 'resizer-app-frontend2',
      'sonar.projectDescription': 'resizer-app-frontend2',
      'sonar.sources': 'src'
    }
  },
  () => process.exit()
)