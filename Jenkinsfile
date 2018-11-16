properties([
  disableConcurrentBuilds(),
  pipelineTriggers([
    pollSCM('H 0 1 1 1')
  ])
])

node("primary") {
  stage ("Checkout SCM") {
    checkout scm
    sh "mkdir -p jenkins-plumbing"
    dir ("jenkins-plumbing") {
      git([branch: "master", url:'ssh://git@stash:7999/van/jenkins-plumbing.git', credentialsId: '8aa93893-84cc-45fc-a029-a42f21197bb3'])
    }
  }
  def runBuild = load("jenkins-plumbing/standard-build.groovy")
  runBuild()

  // stage ("Sync to GitHub") {
  //   sshagent (credentials: ['ea06cafd-e37d-4b47-b0c9-a32f47c00477']) {
  //     sh "git remote add upstream git@github.com:tinymce/generator-tinymce.git"
  //     sh "git checkout master"
  //     sh "git push upstream master --tags"
  //   }
  // }
}
