pipeline {
    agent any
    environment {
        CI = 'true'
        RED = '#FF0000'
        YELLOW = '#FFFF00'
        GREEN = '#008000'
    }

    stages {
        stage('Pre-Build') {
            steps {
                slackSend(color: '#008000', message: "Build Started: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", channel: "#kkstream")
            }
        }

        stage('Install dependencies') {
                steps {
                    sh 'sudo yarn'
                }
        }

        stage('Building') {
            steps {
                script {
                    if(env.BRANCH_NAME == "dev" ){
                        sh 'cp .env.production .env'
                        sh 'yarn run build'
                    }
                    if(env.BRANCH_NAME == "feat/token-refresh-refractor" ){
                        sh 'cp .env.production .env'
                        sh 'yarn run build'
                    }
                }
            }
        }   
      
        stage('Test') {
            steps {
                echo "We don't have test now"
            }
        }

        stage('Deliver for development') {
            steps{
                script {
                    if(env.BRANCH_NAME == "dev"){
                        sh 'sudo cp -R ./* ./.env ./.env.* /home/foritech/Projects/KK-BV/KK-BV-Web/'
                    }
                    if(env.BRANCH_NAME == "feat/token-refresh-refractor"){
                        sh 'sudo cp -R ./* ./.env ./.env.* /home/foritech/Projects/KK-BV/KK-BV-Web-testing-token-refresh/'
                    }
                }
            }
        }

		// stage('Delete pm2') {
        //     steps{
        //         script {
        //             if(env.BRANCH_NAME == "qa"){
        //                 sh 'pm2 delete "KK-BV-Web" || true'
        //             }
        //         }
        //     }
        // }

        // stage("Run PM2") {
        //     steps {
        //         script {
        //             if (env.BRANCH_NAME == "qa") {    
        //                 sh "cd /home/foritech/Projects/KK-BV/KK-BV-Web/ && pm2 start npm --name KK-BV-Web -- run dev:dev  && pm2 save"
        //             } 
        //         }
        //     }
        // }

				stage('Remove Docker Image') {
            steps {
                script {
                    if (env.BRANCH_NAME == "qa") { 
                        sh 'sudo docker rmi kk-bv-web-image-qa || true'
                    }
                    if (env.BRANCH_NAME == "dev") { 
                        sh 'sudo docker rmi kk-bv-web-image-dev || true'
                    }
                    if (env.BRANCH_NAME == "feat/token-refresh-refractor") { 
                        sh 'sudo docker rmi kk-bv-web-image-dev-testing-refresh-token || true'
                    }
                }
            }
        }

        stage('Remove Docker Containers') {
            steps {
                script {
                    if (env.BRANCH_NAME == "qa") {   
                        sh 'sudo docker rm -f kk-bv-web-container-qa || true'
                    }
                    if (env.BRANCH_NAME == "dev") {   
                        sh 'sudo docker rm -f kk-bv-web-container-dev || true'
                    }
                    if (env.BRANCH_NAME == "feat/token-refresh-refractor") {   
                        sh 'sudo docker rm -f kk-bv-web-container-dev-testing-refresh-token || true'
                    }
                }
            }
        }

        stage('List Docker Containers') {
            steps {
                script {
                    if (env.BRANCH_NAME == "qa") { 
                        sh 'sudo docker ps --all'
                    }
                    if (env.BRANCH_NAME == "dev") { 
                        sh 'sudo docker ps --all'
                    }
                }    
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    if (env.BRANCH_NAME == "qa") { 
                        sh 'sudo docker build . -t "kk-bv-web-image-qa"'
                    }
                    if (env.BRANCH_NAME == "dev") { 
                        sh 'sudo docker build . -t "kk-bv-web-image-dev"'
                    }
                    if (env.BRANCH_NAME == "feat/token-refresh-refractor") { 
                        sh 'sudo docker build . -t "kk-bv-web-image-dev-testing-refresh-token"'
                    }
                }    
            }
        }

        stage('Build Docker Container') {
            steps {
                script {
                    if (env.BRANCH_NAME == "qa") { 
                        sh 'sudo docker run -d -e NEXT_PUBLIC_FAVICON="https://cus061701-app061701-image.daas.kkv48.com/image/upload/v1629093464/cus061701/app061701/34477123962647157201c75565e01eca.png" --name kk-bv-web-container-qa -p 5008:3000 kk-bv-web-image-qa'
                    }
                    if (env.BRANCH_NAME == "dev") { 
                        sh 'sudo docker run -d -e NEXT_PUBLIC_MEMBER_API_ENDPOINT="https://dev.4idps.com.tw:5012" -e NEXT_PUBLIC_PAYMENT_API_ENDPOINT="https://dev.4idps.com.tw:5013" -e NEXT_PUBLIC_SSO_APPLE_REDIRECT_URL="https://dev.4idps.com.tw:5011/apple/redirect" -e NEXT_PUBLIC_FAVICON="https://lh3.googleusercontent.com/proxy/ySNOwtJCloZo9E5uHFtlxE47s8dHwoIYCeKpWJdpnZ6ddFTMWXjjBPgjFSHeROYWAd8f9p-8delUIA4zX7T6Vd3PhnLs3rfIFFGNXk-RrA4fyowpjutD" --name kk-bv-web-container-dev -p 5015:3000 kk-bv-web-image-dev'
                    }
										if (env.BRANCH_NAME == "feat/token-refresh-refractor") { 
                        sh 'sudo docker run -d -e NEXT_PUBLIC_FAVICON="https://cus061701-app061701-image.daas.kkv48.com/image/upload/v1629093464/cus061701/app061701/34477123962647157201c75565e01eca.png" -e NEXT_PUBLIC_SSO_APPLE_REDIRECT_URL="https://dev.4idps.com.tw:5014/auth/apple/redirect" -e NEXT_PUBLIC_SSO_APPLE_CLIENT_ID="com.sctw.web.blendvision" --name kk-bv-web-container-dev-testing-refresh-token -p 5018:3000 kk-bv-web-image-dev-testing-refresh-token'
                    }
                }    
            }
        }

        stage("Notify Succeed") {
            steps {
                slackSend(color: '#008000', message: "Build Succeed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", channel: "#kkstream")
            }
        }
    }

    post { 
        failure { 
            slackSend(color: '#FF0000', message: "Build Failed: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})", channel: "#kkstream")
        }
    }
}
