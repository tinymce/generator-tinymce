# Contributing

Please submit PRs against the master branch of this repo. 
Your GitHub email address will need to be public for our CLA tool.
You will receive an email asking you to sign the CLA before the PR
can be accepted.

# Developing

To test the generator from this source code, run the following from the
checkout of this codebase:

    npm uninstall -g generator-tinymce
    npm install
    npm run prepublishOnly
    npm link

Note that you will need `yarn` installed. We may remove that requirement
in the future. 

Once that's done, you can just run `npm run prepublishOnly && npm link` 
after each change.

To test, go to an empty folder and run `yo tinymce`. 

