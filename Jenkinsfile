pipeline {

    agent { label 'Jenkins-Agent' }
	
	tools {
    nodejs 'nodejs23'
}


    environment {
        DOCKERHUB_CREDENTIALS = 'docker'
        IMAGE_NAME = 'vinao/your-next-app'
        IMAGE_TAG = 'latest'
    }

  
    stages {
	
	stage("Cleanup Workspace"){
      steps{
        cleanWs()
      }
    }
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/VinoaN/blog-web-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        def app = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                        app.push()
                    }
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name next-app-container ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }
    }
}
