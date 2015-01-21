var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

window.results = {
    people: []
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 9;

    var routine = [
        scraper.start.bind(undefined, settings, results),
        getBasicInfo.start.bind(undefined, settings, results)
    ];
    routine.push(done);

    async.series(routine);
};

function done() {
    console.table(results)
}

//var permuter = require('./emailPermuter.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');