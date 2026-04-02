pipeline {
  agent any

  tools {
    // Configure this name in Jenkins: Manage Jenkins > Global Tool Configuration > NodeJS
    nodejs 'NodeJS_20'
  }

  options {
    timestamps()
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'node --version'
            sh 'npm --version'
            sh 'npm ci'
          } else {
            bat 'node --version'
            bat 'npm --version'
            bat 'npm ci'
          }
        }
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright install --with-deps'
          } else {
            bat 'npx playwright install'
          }
        }
      }
    }

    stage('Run Playwright Tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright test'
          } else {
            bat 'npx playwright test'
          }
        }
      }
    }
  }

  post {
    always {
      junit allowEmptyResults: true, testResults: 'test-results/results.xml'
      script {
        if (fileExists('allure-results')) {
          // Generate static Allure HTML report in workspace.
          if (isUnix()) {
            sh 'npx allure generate allure-results --clean -o allure-report'
          } else {
            bat 'npx allure generate allure-results --clean -o allure-report'
          }

          // Requires Allure Jenkins plugin. Publishes the report in Jenkins UI.
          // Keep build stable if plugin/tooling is missing.
          try {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
          } catch (err) {
            echo "Allure Jenkins publish skipped: ${err}"
          }
        } else {
          echo 'allure-results folder was not found. Allure report generation skipped.'
        }
      }
      archiveArtifacts artifacts: 'playwright-report/**,test-results/**,allure-results/**,allure-report/**', allowEmptyArchive: true, fingerprint: true
    }
  }
}