var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

var results = {
    profileLinks: [
        "https://www.linkedin.com/profile/view?id=11088867&authType=OUT_OF_NETWORK&authToken=f4q4&locale=en_US&srchid=3717380161421699983017&srchindex=26&srchtotal=89737&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421699983017%2CVSRPtargetId%3A11088867%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=19163054&authType=OUT_OF_NETWORK&authToken=3Pi2&locale=en_US&srchid=3717380161421700008669&srchindex=31&srchtotal=89721&trk=vsrp_people_res_name_headless&trkInfo=VSRPsearchId%3A3717380161421700008669%2CVSRPtargetId%3A19163054%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=18757&authType=OUT_OF_NETWORK&authToken=ZOal&locale=en_US&srchid=3717380161421700008669&srchindex=32&srchtotal=89721&trk=vsrp_people_res_name_headless&trkInfo=VSRPsearchId%3A3717380161421700008669%2CVSRPtargetId%3A18757%2CVSRPcmpt%3Aprimary"
    ],
    people: []
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 9;

    var routine = [
        //scraper.start.bind(undefined, settings, results),
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