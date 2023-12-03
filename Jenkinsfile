pipeline{
    agent any

    // preBuild{
    //         mail 
    //         to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com',
    //         bcc: '',  
    //         cc: '', 
    //         from: '', 
    //         replyTo: '', 
    //         subject: 'Jenkins Build for NU GrubGrab has Started', 
    //         body: '''This mail is sent from Jenkins automated server for NU GrubGrab'''
    // }

    stages{
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
            mail 
            to:'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com',
            bcc:'',  
            cc:'', 
            from:'', 
            replyTo:'', 
            subject: 'Jenkins Build for NU GrubGrab has Begun', 
            body: '''This mail is sent from Jenkins automated server for NU GrubGrab'''
        }

        success{
            // mail 
            // to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com',
            // bcc: '',  
            // cc: '', 
            // from: '', 
            // replyTo: '', 
            // subject: 'Jenkins Build for NU GrubGrab is Succesfully Completed!', 
            // body: '''This mail is sent from Jenkins automated server for NU GrubGrab'''
            echo 'NU GRUBGRAB succesfully deployed!'
        }

        failure{
            // mail 
            // to: 'vaibhavc608@gmail.com, akshat1205aj@gmail.com, gaytrisran03@gmail.com',
            // bcc: '',  
            // cc: '', 
            // from: '', 
            // replyTo: '', 
            // subject: 'Jenkins Build for NU GrubGrab has Failed', 
            // body: '''This mail is sent from Jenkins automated server for NU GrubGrab'''
            echo 'NU GRUBGRAB deployment failed!'
        }
    }


}
