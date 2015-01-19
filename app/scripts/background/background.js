var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

var results = {
    profileLinks: [],
    people: []
};

window.go = function (settings) {
    var routine = [
        scraper.start.bind(undefined, settings.scraper, results),
        getBasicInfo.start.bind(undefined, settings.getBasicInfo, results)
    ];

    routine.push(done);

    async.series(routine);

    function done() {
        console.log(results.profileLinks)
    }
};
//var permuter = require('./permuter.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');