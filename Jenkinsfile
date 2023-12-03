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

        // stage('Build Docker Image'){
        //     steps{
        //         script{
        //             bat 'docker build -t frontend-react client-side'
        //             bat 'docker build -t backend-node server-side'
        //         }
        //     }
        // }

        stage('Testing'){
            steps{
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

        // stage('Selenium Testing'){
        //     steps{
        //         bat 'cd server-side'
        //         bat 'node selenium.js'
        //     }
        // }
    }

    post{

        always{
            mail bcc: '', body: '''Build has been started for the Jenkins job NU GrubGrab

            This mail is sent from Jenkins automated server for NU GrubGrab''', cc: '', from: '', replyTo: '', subject: 'Jenkins Pipeline Status for NU GrubGrab', to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com'
            echo 'Deployment Begining'
        }

        success{
            
            // stage('Cleanup'){
            //     steps{
            //         bat 'docker compose down'
            //         bat 'docker rmi food-ordering-app-frontend food-ordering-app-backend'
            //     }
            // }
            // stage('Start Docker Compose'){
            //     steps{
            //         bat 'docker-compose up -d'
            //     }
            // }
            steps{ 
                mail bcc: '', body: '''Build has been Succesfull! for the Jenkins job NU GrubGrab

                This mail is sent from Jenkins automated server for NU GrubGrab''', cc: '', from: '', replyTo: '', subject: 'Jenkins Pipeline Status for NU GrubGrab', to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com'
                echo 'NU GRUBGRAB succesfully deployed!'
            }
        }

        failure{
            mail bcc: '', body: '''Build has failed for the Jenkins job NU GrubGrab

            This mail is sent from Jenkins automated server for NU GrubGrab''', cc: '', from: '', replyTo: '', subject: 'Jenkins Pipeline Status for NU GrubGrab', to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com'
            echo 'NU GRUBGRAB deployment failed!'
        }
    }


}
