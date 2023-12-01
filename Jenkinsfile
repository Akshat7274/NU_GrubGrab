pipeline{
    agent any

    stages{
        // stage('Install Dependency - Client'){
        //     steps{
        //         dir('client-side'){
        //             bat 'npm install --legacy-peer-deps'
        //         }

        //     }
        // }

        // stage('Install Dependency - Server'){
        //     steps{
        //         dir('server-side'){
        //             bat 'npm install --legacy-peer-deps'
        //         }

        //     }
        // }

        stage('Build Docker Image'){
            steps{
                script{
                    bat 'docker build -t frontend-react client-side'
                    bat 'docker build -t backend-node server-side'
                }
            }
        }

        stage('Start Docker Compose'){
            steps{
                bat 'docker compose up'
            }
        }
    }
}