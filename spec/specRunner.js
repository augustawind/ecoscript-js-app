import Jasmine from 'jasmine'
const jasmine = new Jasmine()

jasmine.loadConfig({
    "spec_dir": "spec",
    "spec_files": [
        "**/*[sS]pec.js"
    ],
    "helpers": [
        "helpers/**/*.js"
    ],
    "stopSpecOnExpectationFailure": false,
    "random": true
})

jasmine.execute()
