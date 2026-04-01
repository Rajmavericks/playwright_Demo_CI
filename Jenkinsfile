pipeline {
  agent any

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
      archiveArtifacts artifacts: 'playwright-report/**,test-results/**,allure-results/**,allure-report/**', allowEmptyArchive: true, fingerprint: true
    }
  }
}