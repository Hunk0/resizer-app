const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'http://localhost:9000',
    token : "1c3f659e5c9a651ba5887a9f6b98c1f4fc53647c", //generate your own
    options: {
      'sonar.projectName': 'resizer-app-frontend',
      'sonar.projectDescription': 'resizer-app-frontend',
      'sonar.sources': 'src'
    }
  },
  () => process.exit()
)