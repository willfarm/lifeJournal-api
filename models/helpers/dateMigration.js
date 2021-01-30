const { updateBibleStudy } = require("../../controllers/bibleStudy.controller.js");
const BibleStudy = require("../bibleStudy.model.js");



exports.updateBibleStudies = () => {
    BibleStudy.find().then((bibleStudies) => {
        console.log(bibleStudies.count)
    })
}

