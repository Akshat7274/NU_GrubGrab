pipeline {
    agent any

    stages {
        stage('Testing') {
            steps {
                bat '''
                cd client-side
                npm i --legacy-peer-deps
                npm test
                cd ../server-side
                npm i --legacy-peer-deps
                npm test
                '''
            }
        }

        stage('Cleanup') {
            steps {
                bat 'docker compose down'
                bat 'docker rmi nugrubgrab-frontend nugrubgrab-backend'
            }
        }

        stage('Start Docker Compose') {
            steps {
                bat 'docker-compose up -d'
            }
        }

        stage('Selenium Testing') {
            steps {
                dir('server-side'){
                    bat 'npm i selenium-webdriver --legacy-peer-deps'
                    bat 'node selenium.js'
                }
            } 
        }
    }

    post {
        success {
            script {
                emailext(
                    subject: 'Jenkins Pipeline Status for NU GrubGrab',
                    body: '''Build has been Successful for the Jenkins job NU GrubGrab!
                    
                    This mail is sent from Jenkins automated server for NU GrubGrab''',
                    to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com, atharv.deogaonkar01@gmail.com'
                )
                echo 'NU GRUBGRAB successfully deployed!'
            }
        }

        failure {
            script {
                emailext(
                    subject: 'Jenkins Pipeline Status for NU GrubGrab',
                    body: '''Build has failed for the Jenkins job NU GrubGrab!
                    
                    This mail is sent from Jenkins automated server for NU GrubGrab''',
                    to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com, atharv.deogaonkar01@gmail.com'
                )
                echo 'NU GRUBGRAB deployment failed!'
            }
        }
    }
}
