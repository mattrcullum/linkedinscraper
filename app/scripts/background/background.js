var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');

var results = {
    profileLinks: [
        /* "https://www.linkedin.com/profile/view?id=1457210&authType=OUT_OF_NETWORK&authToken=yZnT&locale=en_US&srchid=3717380161421683040433&srchindex=1&srchtotal=89718&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421683040433%2CVSRPtargetId%3A1457210%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=1644330&authType=OPENLINK&authToken=b0qh&locale=en_US&srchid=3717380161421683040433&srchindex=2&srchtotal=89718&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421683040433%2CVSRPtargetId%3A1644330%2CVSRPcmpt%3Aprimary",
        "https://www.linkedin.com/profile/view?id=480284&authType=OUT_OF_NETWORK&authToken=beyh&locale=en_US&srchid=3717380161421683040433&srchindex=3&srchtotal=89718&trk=vsrp_people_res_name&trkInfo=VSRPsearchId%3A3717380161421683040433%2CVSRPtargetId%3A480284%2CVSRPcmpt%3Aprimary"
        */],
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