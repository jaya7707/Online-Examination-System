
pipeline {
    agent any

    tools {
        jdk 'JDK25'
        maven 'Maven3'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                bat 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }

        stage('Package') {
            steps {
                bat 'mvn package -DskipTests'
                archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            }
        }

        stage('Docker Build') {
            steps {
                bat '"C:\\Users\\Jaaya\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" version'
                bat '"C:\\Users\\Jaaya\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t online-exam-portal:%BUILD_NUMBER% -t online-exam-portal:latest .'
            }
        }

        stage('Docker Deploy') {
            steps {
                bat '"C:\\Users\\Jaaya\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" rm -f online-exam-container 2>nul'
                bat '"C:\\Users\\Jaaya\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" run -d --name online-exam-container -p 8081:80 online-exam-portal:latest'
            }
        }
    }
}
