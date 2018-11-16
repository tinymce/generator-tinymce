properties([
  disableConcurrentBuilds(),
  pipelineTriggers([
    pollSCM('H 0 1 1 1')
  ])
])

@NonCPS
def triggerWasUser() {
  // echo currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause).toString()
  if (currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause)) {
    return true
  } else {
    return false
  }
}

@NonCPS
def isBumpTrigger() {
  if (triggerWasGit()) {
    def changeLogSets = currentBuild.changeSets
    for (hudson.scm.ChangeLogSet changeLogSet : changeLogSets ) {
      def commitCount = changeLogSet.size()
      echo 'Number of new commits: ' + commitCount.toString()
      if (commitCount == 1) {
        for (hudson.scm.ChangeLogSet.Entry changeLog : changeLogSet.getLogs() ) {
          def message = changeLog.getMsg()
          if (message ==~ /^Jenkins bump to .*/) {
            return true
          }
        }
      }
    }
  }
  return false
}

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

  if (isBumpTrigger() && !triggerWasUser()) {
    stage ("Sync to GitHub") {
      checkout scm
      sshagent (credentials: ['ea06cafd-e37d-4b47-b0c9-a32f47c00477']) {
        sh '''
          git remote add upstream git@github.com:tinymce/generator-tinymce.git
          git checkout master
          git push upstream master --tags
        '''
      }
      cleanWs()
    }
  }
}
