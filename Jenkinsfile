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

        // stage('Build Docker Image'){
        //     steps{
        //         script{
        //             bat 'docker build -t frontend-react client-side'
        //             bat 'docker build -t backend-node server-side'
        //         }
        //     }
        // }
        stage('Cleanup'){
            steps{
                bat 'docker compose down'
                bat 'docker rmi food-ordering-app-frontend food-ordering-app-backend'
            }
        }
        stage('Start Docker Compose'){
            steps{
                bat 'docker-compose up -d'
            }
        }
    }
}
