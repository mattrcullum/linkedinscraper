(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');
var getMissingNames = require('./getMissingNames');
var permuteEmails = require('./permuteEmails');

window.results = {
    people: []
};

window.results = {"people":[{"name":{"full":"John Wallace","first":"John","last":"Wallace"},"profileLink":"https://www.linkedin.com/profile/view?id=1457210&authType=OUT_OF_NETWORK&au…hId%3A3717380161421910678637%2CVSRPtargetId%3A1457210%2CVSRPcmpt%3Aprimary","headline":"Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple Inc.","pastPositions":["Yahoo! Inc.","Sony Computer Entertainment","ONI Systems Inc. purchased by Ciena Corp. in 2003"],"education":["Menlo College"]},{"name":{"full":"Jacob Conway","first":"Jacob","last":"Conway"},"profileLink":"https://www.linkedin.com/profile/view?id=1644330&authType=OPENLINK&authToke…hId%3A3717380161421910678637%2CVSRPtargetId%3A1644330%2CVSRPcmpt%3Aprimary","headline":"Technical Sourcing Recruiter - Wireless Software at Apple","location":"Greater San Diego Area","industry":"Staffing and Recruiting","company":"Apple","currentPosition":"","pastPositions":["Novatel Wireless","TalentWar.net, Inc.","Networked Recruiter"],"education":["Augustana College (SD)"]},{"name":{"full":"Bill Dudney","first":"Bill","last":"Dudney"},"profileLink":"https://www.linkedin.com/profile/view?id=480284&authType=OUT_OF_NETWORK&aut…chId%3A3717380161421910678637%2CVSRPtargetId%3A480284%2CVSRPcmpt%3Aprimary","headline":"Writer of Code at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleGala Factory Software LLCPragmatic Programmers","pastPositions":["Apple Inc.","Dudney.Net","Virtuas Solutions"],"education":["Texas A&M University"]},{"name":{"full":"Corey Carson","first":"Corey","last":"Carson"},"profileLink":"https://www.linkedin.com/profile/view?id=9816373&authType=OUT_OF_NETWORK&au…hId%3A3717380161421910678637%2CVSRPtargetId%3A9816373%2CVSRPcmpt%3Aprimary","headline":"Systems Engineer","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"Apple","pastPositions":["Holcomb's Education Resource","Maize USD 266"],"education":["Pittsburg State University"]},{"name":{"full":"Samantha Kish","first":"Samantha","last":"Kish"},"profileLink":"https://www.linkedin.com/profile/view?id=10254966&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A10254966%2CVSRPcmpt%3Aprimary","headline":"Global Supply Manager - Channel Procurement at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","company":"Apple","currentPosition":"","pastPositions":["Apple","Johns Manville","Honeywell"],"education":["University of Colorado at Denver"]},{"name":{"full":"Dimitri Geier","first":"Dimitri","last":"Geier"},"profileLink":"https://www.linkedin.com/profile/view?id=12063296&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A12063296%2CVSRPcmpt%3Aprimary","headline":"Dimitri Geier is a Senior Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Telecommunications","company":"Apple","currentPosition":"Apple","pastPositions":["Motorola","Nextive Solutions","Warner Music Group"],"education":["Universität zu Köln"]},{"name":{"full":"Matthew Gaddis","first":"Matthew","last":"Gaddis"},"profileLink":"https://www.linkedin.com/profile/view?id=12213953&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A12213953%2CVSRPcmpt%3Aprimary","headline":"UI Engineering Manager at Apple","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple","pastPositions":["Scout Labs","PlayCoed","Self"],"education":["University of Colorado Boulder"]},{"name":{"full":"Tri Vuong","first":"Tri","last":"Vuong"},"profileLink":"https://www.linkedin.com/profile/view?id=14068282&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A14068282%2CVSRPcmpt%3Aprimary","headline":"Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Twitter","YP","Better The World"],"education":["University of Toronto"]},{"name":{"full":"Kshitij Deshpande","first":"Kshitij","last":"Deshpande"},"profileLink":"https://www.linkedin.com/profile/view?id=19292128&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A19292128%2CVSRPcmpt%3Aprimary","headline":"Sr. iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Gracenote (A Sony Company)","Independent iOS Developer","Telestream"],"education":["Wright State University"]},{"name":{"full":"Paul Stuart","first":"Paul","last":"Stuart"},"profileLink":"https://www.linkedin.com/profile/view?id=20546172&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A20546172%2CVSRPcmpt%3Aprimary","headline":"TSE/Escalations|vCloudSuite|vShield|Infrastructure|Network|Fault|Storage at VMware","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"VMwareTime Warner CableApple Retail","pastPositions":["VMware","IBM Global Services"],"education":["Park University"]},{"name":{"full":"Azhar Sikander","first":"Azhar","last":"Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"]},{"name":{"full":"Ranjit Menon","first":"Ranjit","last":"Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421910681011%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"]},{"name":{"full":"Liang Wei","first":"Liang","last":"Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"]},{"name":{"full":"Kristina Gulish","first":"Kristina","last":"Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"]},{"name":{"full":"Sonia Saini","first":"Sonia","last":"Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"]},{"name":{"full":"Michael Turner","first":"Michael","last":"Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"]},{"name":{"full":"George Kalangi","first":"George","last":"Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"]},{"name":{"full":"Mark Gouldsmith","first":"Mark","last":"Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"]},{"name":{"full":"Trevor Sheridan","first":"Trevor","last":"Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[]},{"name":{"full":"Marvin Dela Cruz","first":"Marvin","last":"Dela"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Dept of Real Estate","California Secretary of State","Eclipse/InterlocSolutions"],"education":[]},{"name":{"full":"Azhar Sikander","first":"Azhar","last":"Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"]},{"name":{"full":"Ranjit Menon","first":"Ranjit","last":"Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421910681011%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"]},{"name":{"full":"Liang Wei","first":"Liang","last":"Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"]},{"name":{"full":"Kristina Gulish","first":"Kristina","last":"Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"]},{"name":{"full":"Sonia Saini","first":"Sonia","last":"Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"]},{"name":{"full":"Michael Turner","first":"Michael","last":"Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"]},{"name":{"full":"George Kalangi","first":"George","last":"Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"]},{"name":{"full":"Mark Gouldsmith","first":"Mark","last":"Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"]},{"name":{"full":"Trevor Sheridan","first":"Trevor","last":"Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[]},{"name":{"full":"Marvin Dela Cruz"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software"}]}


window.callTabAction = function (tabId, action, callback, args) {
    var message = {to: 'content', action: action};
    chrome.tabs.sendMessage(tabId, message, callback)
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 20;

    var routine = [
        //scraper.start.bind(undefined, settings, results),
        //getBasicInfo.start.bind(undefined, settings, results),
        //getMissingNames.start.bind(undefined, settings, results),
        permuteEmails.start.bind(undefined, settings, results)
    ];
    routine.push(done);

    async.series(routine);
};

function done() {
    console.table(results)
}

//var permuter = require('./permuteEmails.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');
},{"./getBasicInfo.js":2,"./getMissingNames":3,"./permuteEmails":4,"./scraper.js":5}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/17/15.
 */
var currentWorkingTab;
var isFinished;
var results;
var masterCallback;
var settings;
var i = 0;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {

    results = resultsArg;
    masterCallback = callbackArg;
    settings = settingsArg;

    iterate()
}

function getBasicInfo(person) {
    currentPerson = person;
    currentPerson.company = settings.general.companyName;

    // create the tab with link argument
    chrome.tabs.create({url: person.profileLink}, function (tab) {
        currentWorkingTab = tab;
        chrome.tabs.onUpdated.addListener(tabUpdated)
    });
}

function tabUpdated(tabId, info, tab) {
    if (tabId == currentWorkingTab.id && info.status == "complete") {

        // get the required data from the tab
        callTabAction(currentWorkingTab.id, "getBasicInfo", handleResponse);

        // just to be safe, remove the listener
        chrome.tabs.onUpdated.removeListener(tabUpdated)
    }
}

function handleResponse(response) {

    $.extend(currentPerson, response);

    /*
     var name.full = response.name.full.trim().toLowerCase();
     var headline = response.headline;

     switch (name.full){
     case 'linkedin member':
     }
     */
    // we're done with the tab. remove it
    chrome.tabs.remove(currentWorkingTab.id);

    // decide whether to run again or not
    if (i + 1 != results.people.length) {
        iterate()
    }
    else {
        masterCallback();
    }
}


function iterate() {
    getBasicInfo(results.people[i++]);
}

module.exports = {
    isFinished: function () {
        return isFinished;
    },
    start: init
};

},{}],3:[function(require,module,exports){
/**
 * Created by matthew on 1/21/15.
 */
var settings, results, masterCallback;
var i = -1;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    iterate()
}

function iterate() {
    currentPerson = results.people[++i];
    var currentPersonFullName = currentPerson.name.full;

    if (isNameHidden(currentPersonFullName) || isNameAbbreviated(currentPersonFullName)) {
        getMissingName(function () {
            iterate();
        })
    }
    else if (i + 1 == results.people.length) {
        masterCallback();
    }
    else {
        var fullNameSplit = currentPersonFullName.split('|')[0].split(' ');
        currentPerson.name.first = fullNameSplit[0];
        currentPerson.name.last = fullNameSplit[1];
        iterate()
    }
}

function getMissingName(callback) {
    //debugger;
    var searchText = (
    "site:linkedin.com " +
    currentPerson.headline + ' ' +
    currentPerson.currentPosition + ' ' +
    currentPerson.pastPositions.join(' ') + ' ' +
    currentPerson.education.join(' ') + ' ' +
    currentPerson.company).replace(/\s+/g, " ").replace(/([a-z])([A-Z])/g, '$1 $2');

    var url =
        "http://google.com" +
        "#q=" +
        searchText;
    var tabid;

    chrome.tabs.onUpdated.addListener(tabUpdated);

    function tabUpdated(tabId, info, tab) {

        if (tabId == tabid && info.status == "complete") {
            callTabAction(tabid, "getName", googleResultResponse);
            chrome.tabs.onUpdated.removeListener(tabUpdated);
        }
    }

    function googleResultResponse(name) {
        console.table(name)
        currentPerson.name.last = name;
        chrome.tabs.remove(tabid);
        callback();
    }

    chrome.tabs.create({url: url}, function (tab) {
        tabid = tab.id;
    });
}

function isNameHidden(name) {
    return name.trim().toLowerCase() == "linkedin member"
}

function isNameAbbreviated(name) {
    return name.indexOf('.') != -1
}

module.exports = {
    start: init
}
},{}],4:[function(require,module,exports){
/**
 * Created by matthew on 12/15/14.
 */
/**
 * Created by matthew on 1/21/15.
 */
var settings, results, masterCallback;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    permuteEmails();
}

function permuteEmails() {

    $.each(results.people, function (index, person) {


        var name = person.name;
        try {
            var initial = {
                first: name.first[0],
                last: name.last[0]

            };
        } catch (err) {
            return true;
        }

        results.people[index].possibleEmails = [
            name.first + name.last,
            name.first + '.' + name.last,
            initial.first + name.last,
            initial.first + '.' + name.last,
            name.last + name.first,
            name.last + '.' + name.first,
            name.first,
            name.last,
            initial.first + initial.last
        ].map(function (emailAddress) {
                return emailAddress + settings.general.emailDomain;
            })
    });
    masterCallback();
}

module.exports = {
    start: init
}


},{}],5:[function(require,module,exports){
/**
 * Created by matthew on 12/13/14.
 */
// results

// scrape status
var running = false;

var scrape_tab = 0;

var settings;
var masterCallback;

var isFinished = false;

var status = {};
var results;


function initialize(settingsArg, resultsArg, callbackArg) {
    //initialization
    running = true;
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    start();
}

function start() {
    function getBatch(callback) {
        async.series([
            create_scrape_tab,
            getProfileLinks,
            callback
        ])
    }

    function finish() {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        isFinished = true;
        masterCallback();
    }

    // program control
    function controller() {
        getBatch(function () {
            if (status.done) {
                finish();
            }
            else getBatch(controller)
        })
    }

    controller();
}

// creates a tab we'll use for screen scraping
function create_scrape_tab(callback) {
    if (scrape_tab) {
        callback();
        return;
    }

    var url =
        'http://linkedin.com/' +
        'vsearch/' +
        'p?title=' + settings.general.positionFilter +
        '&f_CC=' + settings.general.CompanyIDs +
        '&openAdvancedForm=true&titleScope=C&locationType=I';

    // create the tab
    chrome.tabs.create({url: url}, function (tab) {
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    });

    // after tab creation return control to the calling function
    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            chrome.tabs.onUpdated.removeListener(waitForTab);
            callback();
        }
    }
}
function getProfileLinks(callback) {
    // ask content script for all the profile links on the page
    callTabAction(scrape_tab, 'scrapeProfileList', processLinkBatch);

    function processLinkBatch(response) {
        if (!response) {
            console.error(chrome.runtime.lastError)
        }
        // if response is empty, we have an issue
        if (response.error) {
            console.error("Response for processLinkBatch is:" + response.error);
            return;
        }

        var hasNextPage = response.hasNextPage;
        var limit = settings.scraper.limit;

        // if there are no more pages, we're done!
        if (!hasNextPage) {
            status.done = true;
            callback();
        }

        // at this point we're guaranteed to have a response and a next page. we'll check a few things and keep going
        else if (response.results.length != 0) {

            // concatenate the response to our existing array
            results.people = results.people.concat(response.results);


            if (results.people.length >= limit) {
                status.done = true;
                callback();
            }
            else {

                chrome.tabs.update({url: "http://" + response.nextPage}, function () {
                    function pageChange(tabId, info, tab) {
                        var url = tab.url;

                        if (url != undefined && tabId == scrape_tab && info.status == "complete") {
                            console.log('page done loading');

                            chrome.tabs.onUpdated.removeListener(pageChange);

                            setTimeout(function (callback) {
                                callback();
                            }, 2000, callback);
                        }
                    }

                    chrome.tabs.onUpdated.addListener(pageChange);
                });
            }
        }
        else {
            console.error('reached else statement in processLinkBatch')
        }
    }
}


// stops module on cancelScrape event
window.addEventListener("cancelScrape", function () {
    stop();
});

// the api for this module
module.exports = {
    start: initialize,
    profileLinks: function () {
        return results.profileLinks
    },
    isFinished: function () {
        return isFinished
    }
};


function log(message) {
    console.log(message)
}


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvZ2V0TWlzc2luZ05hbWVzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9wZXJtdXRlRW1haWxzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9zY3JhcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNjcmFwZXIgPSByZXF1aXJlKCcuL3NjcmFwZXIuanMnKTtcbnZhciBnZXRCYXNpY0luZm8gPSByZXF1aXJlKCcuL2dldEJhc2ljSW5mby5qcycpO1xudmFyIGdldE1pc3NpbmdOYW1lcyA9IHJlcXVpcmUoJy4vZ2V0TWlzc2luZ05hbWVzJyk7XG52YXIgcGVybXV0ZUVtYWlscyA9IHJlcXVpcmUoJy4vcGVybXV0ZUVtYWlscycpO1xuXG53aW5kb3cucmVzdWx0cyA9IHtcbiAgICBwZW9wbGU6IFtdXG59O1xuXG53aW5kb3cucmVzdWx0cyA9IHtcInBlb3BsZVwiOlt7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSm9obiBXYWxsYWNlXCIsXCJmaXJzdFwiOlwiSm9oblwiLFwibGFzdFwiOlwiV2FsbGFjZVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE0NTcyMTAmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXXigKZoSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTQ1NzIxMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBTVyBFbmdpbmVlcmluZyBSZWNydWl0ZXIgYXQgQXBwbGUgICAgICAgIGlPUyBBcHBzICYgRnJhbWV3b3Jrc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbnRlcm5ldFwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGUgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIllhaG9vISBJbmMuXCIsXCJTb255IENvbXB1dGVyIEVudGVydGFpbm1lbnRcIixcIk9OSSBTeXN0ZW1zIEluYy4gcHVyY2hhc2VkIGJ5IENpZW5hIENvcnAuIGluIDIwMDNcIl0sXCJlZHVjYXRpb25cIjpbXCJNZW5sbyBDb2xsZWdlXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSmFjb2IgQ29ud2F5XCIsXCJmaXJzdFwiOlwiSmFjb2JcIixcImxhc3RcIjpcIkNvbndheVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE2NDQzMzAmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2XigKZoSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTY0NDMzMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlRlY2huaWNhbCBTb3VyY2luZyBSZWNydWl0ZXIgLSBXaXJlbGVzcyBTb2Z0d2FyZSBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgU2FuIERpZWdvIEFyZWFcIixcImluZHVzdHJ5XCI6XCJTdGFmZmluZyBhbmQgUmVjcnVpdGluZ1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiTm92YXRlbCBXaXJlbGVzc1wiLFwiVGFsZW50V2FyLm5ldCwgSW5jLlwiLFwiTmV0d29ya2VkIFJlY3J1aXRlclwiXSxcImVkdWNhdGlvblwiOltcIkF1Z3VzdGFuYSBDb2xsZWdlIChTRClcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJCaWxsIER1ZG5leVwiLFwiZmlyc3RcIjpcIkJpbGxcIixcImxhc3RcIjpcIkR1ZG5leVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQ4MDI4NCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdXTigKZjaElkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTQ4MDI4NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIldyaXRlciBvZiBDb2RlIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUdhbGEgRmFjdG9yeSBTb2Z0d2FyZSBMTENQcmFnbWF0aWMgUHJvZ3JhbW1lcnNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZSBJbmMuXCIsXCJEdWRuZXkuTmV0XCIsXCJWaXJ0dWFzIFNvbHV0aW9uc1wiXSxcImVkdWNhdGlvblwiOltcIlRleGFzIEEmTSBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQ29yZXkgQ2Fyc29uXCIsXCJmaXJzdFwiOlwiQ29yZXlcIixcImxhc3RcIjpcIkNhcnNvblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTk4MTYzNzMmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXXigKZoSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBOTgxNjM3MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlN5c3RlbXMgRW5naW5lZXJcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIERlbnZlciBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiSG9sY29tYidzIEVkdWNhdGlvbiBSZXNvdXJjZVwiLFwiTWFpemUgVVNEIDI2NlwiXSxcImVkdWNhdGlvblwiOltcIlBpdHRzYnVyZyBTdGF0ZSBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiU2FtYW50aGEgS2lzaFwiLFwiZmlyc3RcIjpcIlNhbWFudGhhXCIsXCJsYXN0XCI6XCJLaXNoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTAyNTQ5NjYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTEwMjU0OTY2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiR2xvYmFsIFN1cHBseSBNYW5hZ2VyIC0gQ2hhbm5lbCBQcm9jdXJlbWVudCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb25zdW1lciBFbGVjdHJvbmljc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXBwbGVcIixcIkpvaG5zIE1hbnZpbGxlXCIsXCJIb25leXdlbGxcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IERlbnZlclwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkRpbWl0cmkgR2VpZXJcIixcImZpcnN0XCI6XCJEaW1pdHJpXCIsXCJsYXN0XCI6XCJHZWllclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEyMDYzMjk2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0ExMjA2MzI5NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkRpbWl0cmkgR2VpZXIgaXMgYSBTZW5pb3IgU29mdHdhcmUgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiVGVsZWNvbW11bmljYXRpb25zXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk1vdG9yb2xhXCIsXCJOZXh0aXZlIFNvbHV0aW9uc1wiLFwiV2FybmVyIE11c2ljIEdyb3VwXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0w6R0IHp1IEvDtmxuXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWF0dGhldyBHYWRkaXNcIixcImZpcnN0XCI6XCJNYXR0aGV3XCIsXCJsYXN0XCI6XCJHYWRkaXNcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMjIxMzk1MyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTIyMTM5NTMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJVSSBFbmdpbmVlcmluZyBNYW5hZ2VyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkludGVybmV0XCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlNjb3V0IExhYnNcIixcIlBsYXlDb2VkXCIsXCJTZWxmXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiVHJpIFZ1b25nXCIsXCJmaXJzdFwiOlwiVHJpXCIsXCJsYXN0XCI6XCJWdW9uZ1wifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE0MDY4MjgyJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0ExNDA2ODI4MiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJUd2l0dGVyXCIsXCJZUFwiLFwiQmV0dGVyIFRoZSBXb3JsZFwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgVG9yb250b1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIktzaGl0aWogRGVzaHBhbmRlXCIsXCJmaXJzdFwiOlwiS3NoaXRpalwiLFwibGFzdFwiOlwiRGVzaHBhbmRlXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTkyOTIxMjgmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTE5MjkyMTI4JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3IuIGlPUyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiR3JhY2Vub3RlIChBIFNvbnkgQ29tcGFueSlcIixcIkluZGVwZW5kZW50IGlPUyBEZXZlbG9wZXJcIixcIlRlbGVzdHJlYW1cIl0sXCJlZHVjYXRpb25cIjpbXCJXcmlnaHQgU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlBhdWwgU3R1YXJ0XCIsXCJmaXJzdFwiOlwiUGF1bFwiLFwibGFzdFwiOlwiU3R1YXJ0XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjA1NDYxNzImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTIwNTQ2MTcyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVFNFL0VzY2FsYXRpb25zfHZDbG91ZFN1aXRlfHZTaGllbGR8SW5mcmFzdHJ1Y3R1cmV8TmV0d29ya3xGYXVsdHxTdG9yYWdlIGF0IFZNd2FyZVwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgRGVudmVyIEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiVk13YXJlVGltZSBXYXJuZXIgQ2FibGVBcHBsZSBSZXRhaWxcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJWTXdhcmVcIixcIklCTSBHbG9iYWwgU2VydmljZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJQYXJrIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJBemhhciBTaWthbmRlclwiLFwiZmlyc3RcIjpcIkF6aGFyXCIsXCJsYXN0XCI6XCJTaWthbmRlclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTIxMDMyMDkwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EyMTAzMjA5MCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIGluIFRlc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkJlbnRsZXkgU3lzdGVtc1wiLFwiUXdlc3QgQ29tbXVuaWNhdGlvbnNcIixcIk5TSURDLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IEJvdWxkZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJSYW5qaXQgTWVub25cIixcImZpcnN0XCI6XCJSYW5qaXRcIixcImxhc3RcIjpcIk1lbm9uXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjQzMzE2ODYmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva+KApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTI0MzMxNjg2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU2VuaW9yIFJlc2VhcmNoIFNjaWVudGlzdCwgQXBwbGUgTWFwc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJQYWNpZmljIEdhcyBhbmQgRWxlY3RyaWMgQ29tcGFueVwiLFwiU2NobmVpZGVyIEVsZWN0cmljXCIsXCJUZWx2ZW50IE1pbmVyICYgTWluZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJJbmRpYW4gSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3ksIE1hZHJhc1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkxpYW5nIFdlaVwiLFwiZmlyc3RcIjpcIkxpYW5nXCIsXCJsYXN0XCI6XCJXZWlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zMDEwMzU2MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMzAxMDM1NjElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgRGF0YSBTY2llbnRpc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNoZWdnIEluYy5cIixcIkFtYXpvbi5jb21cIixcIkx1Y2lkIENvbW1lcmNlIChBY3F1aXJlZCBieSBBT0wgaW4gMjAxNClcIl0sXCJlZHVjYXRpb25cIjpbXCJUaGUgQ29sbGVnZSBvZiBXaWxsaWFtIGFuZCBNYXJ5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS3Jpc3RpbmEgR3VsaXNoXCIsXCJmaXJzdFwiOlwiS3Jpc3RpbmFcIixcImxhc3RcIjpcIkd1bGlzaFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM1NjYzMzU0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzNTY2MzM1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlN0cmF0ZWdpYyBTb3VyY2luZyBNYW5hZ2VyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiVW5pdGVkIFN0YXRlc1wiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkpvaG5zIE1hbnZpbGxlXCIsXCJLb2hsZXIgQ28uXCIsXCJCb3JnV2FybmVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBhdCBEZW52ZXJcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTb25pYSBTYWluaVwiLFwiZmlyc3RcIjpcIlNvbmlhXCIsXCJsYXN0XCI6XCJTYWluaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4NDc3MjI2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzODQ3NzIyNiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBRQSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVGltZSBXYXJuZXIgQ2FibGVcIixcIkNvbWNhc3RcIixcIkdyZWJ3ZWJcIl0sXCJlZHVjYXRpb25cIjpbXCJQdW5qYWIgVGVjaG5pY2FsIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNaWNoYWVsIFR1cm5lclwiLFwiZmlyc3RcIjpcIk1pY2hhZWxcIixcImxhc3RcIjpcIlR1cm5lclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQyMzYxMTkxJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E0MjM2MTE5MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcImlPUyAmIE9TIFggU29mdHdhcmUgRW5naW5lZXJcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiV2F5SW5cIixcIlRyb3BwdXMgU29mdHdhcmUgQ29ycG9yYXRpb25cIixcIk5hdGlvbmFsIEFuYWx5dGljcywgSW5jLlwiXSxcImVkdWNhdGlvblwiOltcIkNvbG9yYWRvIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJHZW9yZ2UgS2FsYW5naVwiLFwiZmlyc3RcIjpcIkdlb3JnZVwiLFwibGFzdFwiOlwiS2FsYW5naVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTUyOTA4MDUzJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E1MjkwODA1MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIFVJIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUluZm9zeXNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIixcIkhDTCBUZWNobm9sb2dpZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJrIEdvdWxkc21pdGhcIixcImZpcnN0XCI6XCJNYXJrXCIsXCJsYXN0XCI6XCJHb3VsZHNtaXRoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NjQ3NjEyMjUmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTY0NzYxMjI1JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVjaG5vbG9neSArIE1lZGlhIFByb2R1Y3Rpb25cIixcImxvY2F0aW9uXCI6XCJBdXN0aW4sIFRleGFzIEFyZWFcIixcImluZHVzdHJ5XCI6XCJPbmxpbmUgTWVkaWFcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlbGVzZmlyZS5jb21cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiSGFydGUtSGFua3MsIEluYy5cIixcIlBlYWsgUGVyZm9ybWVyc1wiXSxcImVkdWNhdGlvblwiOltcIk5ldyBNZXhpY28gU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlRyZXZvciBTaGVyaWRhblwiLFwiZmlyc3RcIjpcIlRyZXZvclwiLFwibGFzdFwiOlwiU2hlcmlkYW5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD03MjExODY0MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNzIxMTg2NDIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdyb3Vwb25cIixcIlRyZXZvciBJbmNcIixcIlN1cmVpZnkuY29tXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJ2aW4gRGVsYSBDcnV6XCIsXCJmaXJzdFwiOlwiTWFydmluXCIsXCJsYXN0XCI6XCJEZWxhXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9ODIwNjEzOTcmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTgyMDYxMzk3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRW50ZXJwcmlzZSBTZXJ2aWNlcyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhY3JhbWVudG8sIENhbGlmb3JuaWEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkRlcHQgb2YgUmVhbCBFc3RhdGVcIixcIkNhbGlmb3JuaWEgU2VjcmV0YXJ5IG9mIFN0YXRlXCIsXCJFY2xpcHNlL0ludGVybG9jU29sdXRpb25zXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJBemhhciBTaWthbmRlclwiLFwiZmlyc3RcIjpcIkF6aGFyXCIsXCJsYXN0XCI6XCJTaWthbmRlclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTIxMDMyMDkwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EyMTAzMjA5MCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIGluIFRlc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkJlbnRsZXkgU3lzdGVtc1wiLFwiUXdlc3QgQ29tbXVuaWNhdGlvbnNcIixcIk5TSURDLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IEJvdWxkZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJSYW5qaXQgTWVub25cIixcImZpcnN0XCI6XCJSYW5qaXRcIixcImxhc3RcIjpcIk1lbm9uXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjQzMzE2ODYmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva+KApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTI0MzMxNjg2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU2VuaW9yIFJlc2VhcmNoIFNjaWVudGlzdCwgQXBwbGUgTWFwc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJQYWNpZmljIEdhcyBhbmQgRWxlY3RyaWMgQ29tcGFueVwiLFwiU2NobmVpZGVyIEVsZWN0cmljXCIsXCJUZWx2ZW50IE1pbmVyICYgTWluZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJJbmRpYW4gSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3ksIE1hZHJhc1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkxpYW5nIFdlaVwiLFwiZmlyc3RcIjpcIkxpYW5nXCIsXCJsYXN0XCI6XCJXZWlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zMDEwMzU2MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMzAxMDM1NjElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgRGF0YSBTY2llbnRpc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNoZWdnIEluYy5cIixcIkFtYXpvbi5jb21cIixcIkx1Y2lkIENvbW1lcmNlIChBY3F1aXJlZCBieSBBT0wgaW4gMjAxNClcIl0sXCJlZHVjYXRpb25cIjpbXCJUaGUgQ29sbGVnZSBvZiBXaWxsaWFtIGFuZCBNYXJ5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS3Jpc3RpbmEgR3VsaXNoXCIsXCJmaXJzdFwiOlwiS3Jpc3RpbmFcIixcImxhc3RcIjpcIkd1bGlzaFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM1NjYzMzU0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzNTY2MzM1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlN0cmF0ZWdpYyBTb3VyY2luZyBNYW5hZ2VyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiVW5pdGVkIFN0YXRlc1wiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkpvaG5zIE1hbnZpbGxlXCIsXCJLb2hsZXIgQ28uXCIsXCJCb3JnV2FybmVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBhdCBEZW52ZXJcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTb25pYSBTYWluaVwiLFwiZmlyc3RcIjpcIlNvbmlhXCIsXCJsYXN0XCI6XCJTYWluaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4NDc3MjI2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzODQ3NzIyNiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBRQSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVGltZSBXYXJuZXIgQ2FibGVcIixcIkNvbWNhc3RcIixcIkdyZWJ3ZWJcIl0sXCJlZHVjYXRpb25cIjpbXCJQdW5qYWIgVGVjaG5pY2FsIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNaWNoYWVsIFR1cm5lclwiLFwiZmlyc3RcIjpcIk1pY2hhZWxcIixcImxhc3RcIjpcIlR1cm5lclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQyMzYxMTkxJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E0MjM2MTE5MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcImlPUyAmIE9TIFggU29mdHdhcmUgRW5naW5lZXJcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiV2F5SW5cIixcIlRyb3BwdXMgU29mdHdhcmUgQ29ycG9yYXRpb25cIixcIk5hdGlvbmFsIEFuYWx5dGljcywgSW5jLlwiXSxcImVkdWNhdGlvblwiOltcIkNvbG9yYWRvIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJHZW9yZ2UgS2FsYW5naVwiLFwiZmlyc3RcIjpcIkdlb3JnZVwiLFwibGFzdFwiOlwiS2FsYW5naVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTUyOTA4MDUzJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E1MjkwODA1MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIFVJIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUluZm9zeXNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIixcIkhDTCBUZWNobm9sb2dpZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJrIEdvdWxkc21pdGhcIixcImZpcnN0XCI6XCJNYXJrXCIsXCJsYXN0XCI6XCJHb3VsZHNtaXRoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NjQ3NjEyMjUmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTY0NzYxMjI1JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVjaG5vbG9neSArIE1lZGlhIFByb2R1Y3Rpb25cIixcImxvY2F0aW9uXCI6XCJBdXN0aW4sIFRleGFzIEFyZWFcIixcImluZHVzdHJ5XCI6XCJPbmxpbmUgTWVkaWFcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlbGVzZmlyZS5jb21cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiSGFydGUtSGFua3MsIEluYy5cIixcIlBlYWsgUGVyZm9ybWVyc1wiXSxcImVkdWNhdGlvblwiOltcIk5ldyBNZXhpY28gU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlRyZXZvciBTaGVyaWRhblwiLFwiZmlyc3RcIjpcIlRyZXZvclwiLFwibGFzdFwiOlwiU2hlcmlkYW5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD03MjExODY0MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNzIxMTg2NDIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdyb3Vwb25cIixcIlRyZXZvciBJbmNcIixcIlN1cmVpZnkuY29tXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJ2aW4gRGVsYSBDcnV6XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9ODIwNjEzOTcmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTgyMDYxMzk3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRW50ZXJwcmlzZSBTZXJ2aWNlcyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhY3JhbWVudG8sIENhbGlmb3JuaWEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCJ9XX1cblxuXG53aW5kb3cuY2FsbFRhYkFjdGlvbiA9IGZ1bmN0aW9uICh0YWJJZCwgYWN0aW9uLCBjYWxsYmFjaywgYXJncykge1xuICAgIHZhciBtZXNzYWdlID0ge3RvOiAnY29udGVudCcsIGFjdGlvbjogYWN0aW9ufTtcbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZSh0YWJJZCwgbWVzc2FnZSwgY2FsbGJhY2spXG59O1xuXG53aW5kb3cuZ28gPSBmdW5jdGlvbiAoc2V0dGluZ3MpIHtcblxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcbiAgICBzZXR0aW5ncy5zY3JhcGVyLmxpbWl0ID0gMjA7XG5cbiAgICB2YXIgcm91dGluZSA9IFtcbiAgICAgICAgLy9zY3JhcGVyLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cyksXG4gICAgICAgIC8vZ2V0QmFzaWNJbmZvLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cyksXG4gICAgICAgIC8vZ2V0TWlzc2luZ05hbWVzLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cyksXG4gICAgICAgIHBlcm11dGVFbWFpbHMuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgIF07XG4gICAgcm91dGluZS5wdXNoKGRvbmUpO1xuXG4gICAgYXN5bmMuc2VyaWVzKHJvdXRpbmUpO1xufTtcblxuZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBjb25zb2xlLnRhYmxlKHJlc3VsdHMpXG59XG5cbi8vdmFyIHBlcm11dGVyID0gcmVxdWlyZSgnLi9wZXJtdXRlRW1haWxzLmpzJyk7XG4vL3ZhciBmaW5kX2xhc3RfbmFtZXMgPSByZXF1aXJlKCcuL2xhc3RfbmFtZXMuanMnKTtcbi8vdmFyIGVtYWlsX3ZlcmlmaWVyID0gcmVxdWlyZSgnLi9lbWFpbF9jaGVjay5qcycpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTcvMTUuXG4gKi9cbnZhciBjdXJyZW50V29ya2luZ1RhYjtcbnZhciBpc0ZpbmlzaGVkO1xudmFyIHJlc3VsdHM7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG52YXIgc2V0dGluZ3M7XG52YXIgaSA9IDA7XG52YXIgY3VycmVudFBlcnNvbjtcblxuZnVuY3Rpb24gaW5pdChzZXR0aW5nc0FyZywgcmVzdWx0c0FyZywgY2FsbGJhY2tBcmcpIHtcblxuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcblxuICAgIGl0ZXJhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXRCYXNpY0luZm8ocGVyc29uKSB7XG4gICAgY3VycmVudFBlcnNvbiA9IHBlcnNvbjtcbiAgICBjdXJyZW50UGVyc29uLmNvbXBhbnkgPSBzZXR0aW5ncy5nZW5lcmFsLmNvbXBhbnlOYW1lO1xuXG4gICAgLy8gY3JlYXRlIHRoZSB0YWIgd2l0aCBsaW5rIGFyZ3VtZW50XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHBlcnNvbi5wcm9maWxlTGlua30sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgY3VycmVudFdvcmtpbmdUYWIgPSB0YWI7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih0YWJVcGRhdGVkKVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICBpZiAodGFiSWQgPT0gY3VycmVudFdvcmtpbmdUYWIuaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSByZXF1aXJlZCBkYXRhIGZyb20gdGhlIHRhYlxuICAgICAgICBjYWxsVGFiQWN0aW9uKGN1cnJlbnRXb3JraW5nVGFiLmlkLCBcImdldEJhc2ljSW5mb1wiLCBoYW5kbGVSZXNwb25zZSk7XG5cbiAgICAgICAgLy8ganVzdCB0byBiZSBzYWZlLCByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0YWJVcGRhdGVkKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpIHtcblxuICAgICQuZXh0ZW5kKGN1cnJlbnRQZXJzb24sIHJlc3BvbnNlKTtcblxuICAgIC8qXG4gICAgIHZhciBuYW1lLmZ1bGwgPSByZXNwb25zZS5uYW1lLmZ1bGwudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgIHZhciBoZWFkbGluZSA9IHJlc3BvbnNlLmhlYWRsaW5lO1xuXG4gICAgIHN3aXRjaCAobmFtZS5mdWxsKXtcbiAgICAgY2FzZSAnbGlua2VkaW4gbWVtYmVyJzpcbiAgICAgfVxuICAgICAqL1xuICAgIC8vIHdlJ3JlIGRvbmUgd2l0aCB0aGUgdGFiLiByZW1vdmUgaXRcbiAgICBjaHJvbWUudGFicy5yZW1vdmUoY3VycmVudFdvcmtpbmdUYWIuaWQpO1xuXG4gICAgLy8gZGVjaWRlIHdoZXRoZXIgdG8gcnVuIGFnYWluIG9yIG5vdFxuICAgIGlmIChpICsgMSAhPSByZXN1bHRzLnBlb3BsZS5sZW5ndGgpIHtcbiAgICAgICAgaXRlcmF0ZSgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgIGdldEJhc2ljSW5mbyhyZXN1bHRzLnBlb3BsZVtpKytdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZDtcbiAgICB9LFxuICAgIHN0YXJ0OiBpbml0XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yMS8xNS5cbiAqL1xudmFyIHNldHRpbmdzLCByZXN1bHRzLCBtYXN0ZXJDYWxsYmFjaztcbnZhciBpID0gLTE7XG52YXIgY3VycmVudFBlcnNvbjtcblxuZnVuY3Rpb24gaW5pdChzZXR0aW5nc0FyZywgcmVzdWx0c0FyZywgY2FsbGJhY2tBcmcpIHtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGl0ZXJhdGUoKSB7XG4gICAgY3VycmVudFBlcnNvbiA9IHJlc3VsdHMucGVvcGxlWysraV07XG4gICAgdmFyIGN1cnJlbnRQZXJzb25GdWxsTmFtZSA9IGN1cnJlbnRQZXJzb24ubmFtZS5mdWxsO1xuXG4gICAgaWYgKGlzTmFtZUhpZGRlbihjdXJyZW50UGVyc29uRnVsbE5hbWUpIHx8IGlzTmFtZUFiYnJldmlhdGVkKGN1cnJlbnRQZXJzb25GdWxsTmFtZSkpIHtcbiAgICAgICAgZ2V0TWlzc2luZ05hbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0ZSgpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBlbHNlIGlmIChpICsgMSA9PSByZXN1bHRzLnBlb3BsZS5sZW5ndGgpIHtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBmdWxsTmFtZVNwbGl0ID0gY3VycmVudFBlcnNvbkZ1bGxOYW1lLnNwbGl0KCd8JylbMF0uc3BsaXQoJyAnKTtcbiAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmZpcnN0ID0gZnVsbE5hbWVTcGxpdFswXTtcbiAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmxhc3QgPSBmdWxsTmFtZVNwbGl0WzFdO1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE1pc3NpbmdOYW1lKGNhbGxiYWNrKSB7XG4gICAgLy9kZWJ1Z2dlcjtcbiAgICB2YXIgc2VhcmNoVGV4dCA9IChcbiAgICBcInNpdGU6bGlua2VkaW4uY29tIFwiICtcbiAgICBjdXJyZW50UGVyc29uLmhlYWRsaW5lICsgJyAnICtcbiAgICBjdXJyZW50UGVyc29uLmN1cnJlbnRQb3NpdGlvbiArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5wYXN0UG9zaXRpb25zLmpvaW4oJyAnKSArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5lZHVjYXRpb24uam9pbignICcpICsgJyAnICtcbiAgICBjdXJyZW50UGVyc29uLmNvbXBhbnkpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpO1xuXG4gICAgdmFyIHVybCA9XG4gICAgICAgIFwiaHR0cDovL2dvb2dsZS5jb21cIiArXG4gICAgICAgIFwiI3E9XCIgK1xuICAgICAgICBzZWFyY2hUZXh0O1xuICAgIHZhciB0YWJpZDtcblxuICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih0YWJVcGRhdGVkKTtcblxuICAgIGZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuXG4gICAgICAgIGlmICh0YWJJZCA9PSB0YWJpZCAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgIGNhbGxUYWJBY3Rpb24odGFiaWQsIFwiZ2V0TmFtZVwiLCBnb29nbGVSZXN1bHRSZXNwb25zZSk7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGFiVXBkYXRlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnb29nbGVSZXN1bHRSZXNwb25zZShuYW1lKSB7XG4gICAgICAgIGNvbnNvbGUudGFibGUobmFtZSlcbiAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmxhc3QgPSBuYW1lO1xuICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiaWQpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHRhYmlkID0gdGFiLmlkO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpc05hbWVIaWRkZW4obmFtZSkge1xuICAgIHJldHVybiBuYW1lLnRyaW0oKS50b0xvd2VyQ2FzZSgpID09IFwibGlua2VkaW4gbWVtYmVyXCJcbn1cblxuZnVuY3Rpb24gaXNOYW1lQWJicmV2aWF0ZWQobmFtZSkge1xuICAgIHJldHVybiBuYW1lLmluZGV4T2YoJy4nKSAhPSAtMVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdGFydDogaW5pdFxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEyLzE1LzE0LlxuICovXG4vKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzIxLzE1LlxuICovXG52YXIgc2V0dGluZ3MsIHJlc3VsdHMsIG1hc3RlckNhbGxiYWNrO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBwZXJtdXRlRW1haWxzKCk7XG59XG5cbmZ1bmN0aW9uIHBlcm11dGVFbWFpbHMoKSB7XG5cbiAgICAkLmVhY2gocmVzdWx0cy5wZW9wbGUsIGZ1bmN0aW9uIChpbmRleCwgcGVyc29uKSB7XG5cblxuICAgICAgICB2YXIgbmFtZSA9IHBlcnNvbi5uYW1lO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGluaXRpYWwgPSB7XG4gICAgICAgICAgICAgICAgZmlyc3Q6IG5hbWUuZmlyc3RbMF0sXG4gICAgICAgICAgICAgICAgbGFzdDogbmFtZS5sYXN0WzBdXG5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHRzLnBlb3BsZVtpbmRleF0ucG9zc2libGVFbWFpbHMgPSBbXG4gICAgICAgICAgICBuYW1lLmZpcnN0ICsgbmFtZS5sYXN0LFxuICAgICAgICAgICAgbmFtZS5maXJzdCArICcuJyArIG5hbWUubGFzdCxcbiAgICAgICAgICAgIGluaXRpYWwuZmlyc3QgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBpbml0aWFsLmZpcnN0ICsgJy4nICsgbmFtZS5sYXN0LFxuICAgICAgICAgICAgbmFtZS5sYXN0ICsgbmFtZS5maXJzdCxcbiAgICAgICAgICAgIG5hbWUubGFzdCArICcuJyArIG5hbWUuZmlyc3QsXG4gICAgICAgICAgICBuYW1lLmZpcnN0LFxuICAgICAgICAgICAgbmFtZS5sYXN0LFxuICAgICAgICAgICAgaW5pdGlhbC5maXJzdCArIGluaXRpYWwubGFzdFxuICAgICAgICBdLm1hcChmdW5jdGlvbiAoZW1haWxBZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtYWlsQWRkcmVzcyArIHNldHRpbmdzLmdlbmVyYWwuZW1haWxEb21haW47XG4gICAgICAgICAgICB9KVxuICAgIH0pO1xuICAgIG1hc3RlckNhbGxiYWNrKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0XG59XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEyLzEzLzE0LlxuICovXG4vLyByZXN1bHRzXG5cbi8vIHNjcmFwZSBzdGF0dXNcbnZhciBydW5uaW5nID0gZmFsc2U7XG5cbnZhciBzY3JhcGVfdGFiID0gMDtcblxudmFyIHNldHRpbmdzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xuXG52YXIgaXNGaW5pc2hlZCA9IGZhbHNlO1xuXG52YXIgc3RhdHVzID0ge307XG52YXIgcmVzdWx0cztcblxuXG5mdW5jdGlvbiBpbml0aWFsaXplKHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIC8vaW5pdGlhbGl6YXRpb25cbiAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgc3RhcnQoKTtcbn1cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgZnVuY3Rpb24gZ2V0QmF0Y2goY2FsbGJhY2spIHtcbiAgICAgICAgYXN5bmMuc2VyaWVzKFtcbiAgICAgICAgICAgIGNyZWF0ZV9zY3JhcGVfdGFiLFxuICAgICAgICAgICAgZ2V0UHJvZmlsZUxpbmtzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgXSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5pc2goKSB7XG4gICAgICAgIGNocm9tZS50YWJzLnJlbW92ZShzY3JhcGVfdGFiKTtcbiAgICAgICAgc2NyYXBlX3RhYiA9IGZhbHNlO1xuICAgICAgICBpc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvLyBwcm9ncmFtIGNvbnRyb2xcbiAgICBmdW5jdGlvbiBjb250cm9sbGVyKCkge1xuICAgICAgICBnZXRCYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoc3RhdHVzLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBmaW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgZ2V0QmF0Y2goY29udHJvbGxlcilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb250cm9sbGVyKCk7XG59XG5cbi8vIGNyZWF0ZXMgYSB0YWIgd2UnbGwgdXNlIGZvciBzY3JlZW4gc2NyYXBpbmdcbmZ1bmN0aW9uIGNyZWF0ZV9zY3JhcGVfdGFiKGNhbGxiYWNrKSB7XG4gICAgaWYgKHNjcmFwZV90YWIpIHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1cmwgPVxuICAgICAgICAnaHR0cDovL2xpbmtlZGluLmNvbS8nICtcbiAgICAgICAgJ3ZzZWFyY2gvJyArXG4gICAgICAgICdwP3RpdGxlPScgKyBzZXR0aW5ncy5nZW5lcmFsLnBvc2l0aW9uRmlsdGVyICtcbiAgICAgICAgJyZmX0NDPScgKyBzZXR0aW5ncy5nZW5lcmFsLkNvbXBhbnlJRHMgK1xuICAgICAgICAnJm9wZW5BZHZhbmNlZEZvcm09dHJ1ZSZ0aXRsZVNjb3BlPUMmbG9jYXRpb25UeXBlPUknO1xuXG4gICAgLy8gY3JlYXRlIHRoZSB0YWJcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogdXJsfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBzY3JhcGVfdGFiID0gdGFiLmlkO1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIod2FpdEZvclRhYilcbiAgICB9KTtcblxuICAgIC8vIGFmdGVyIHRhYiBjcmVhdGlvbiByZXR1cm4gY29udHJvbCB0byB0aGUgY2FsbGluZyBmdW5jdGlvblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JUYWIodGFiSWQsIGluZm8pIHtcbiAgICAgICAgaWYgKGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIiAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiKSB7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIod2FpdEZvclRhYik7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0UHJvZmlsZUxpbmtzKGNhbGxiYWNrKSB7XG4gICAgLy8gYXNrIGNvbnRlbnQgc2NyaXB0IGZvciBhbGwgdGhlIHByb2ZpbGUgbGlua3Mgb24gdGhlIHBhZ2VcbiAgICBjYWxsVGFiQWN0aW9uKHNjcmFwZV90YWIsICdzY3JhcGVQcm9maWxlTGlzdCcsIHByb2Nlc3NMaW5rQmF0Y2gpO1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0xpbmtCYXRjaChyZXNwb25zZSkge1xuICAgICAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcilcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiByZXNwb25zZSBpcyBlbXB0eSwgd2UgaGF2ZSBhbiBpc3N1ZVxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZXNwb25zZSBmb3IgcHJvY2Vzc0xpbmtCYXRjaCBpczpcIiArIHJlc3BvbnNlLmVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoYXNOZXh0UGFnZSA9IHJlc3BvbnNlLmhhc05leHRQYWdlO1xuICAgICAgICB2YXIgbGltaXQgPSBzZXR0aW5ncy5zY3JhcGVyLmxpbWl0O1xuXG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBtb3JlIHBhZ2VzLCB3ZSdyZSBkb25lIVxuICAgICAgICBpZiAoIWhhc05leHRQYWdlKSB7XG4gICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB3ZSdyZSBndWFyYW50ZWVkIHRvIGhhdmUgYSByZXNwb25zZSBhbmQgYSBuZXh0IHBhZ2UuIHdlJ2xsIGNoZWNrIGEgZmV3IHRoaW5ncyBhbmQga2VlcCBnb2luZ1xuICAgICAgICBlbHNlIGlmIChyZXNwb25zZS5yZXN1bHRzLmxlbmd0aCAhPSAwKSB7XG5cbiAgICAgICAgICAgIC8vIGNvbmNhdGVuYXRlIHRoZSByZXNwb25zZSB0byBvdXIgZXhpc3RpbmcgYXJyYXlcbiAgICAgICAgICAgIHJlc3VsdHMucGVvcGxlID0gcmVzdWx0cy5wZW9wbGUuY29uY2F0KHJlc3BvbnNlLnJlc3VsdHMpO1xuXG5cbiAgICAgICAgICAgIGlmIChyZXN1bHRzLnBlb3BsZS5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICBzdGF0dXMuZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMudXBkYXRlKHt1cmw6IFwiaHR0cDovL1wiICsgcmVzcG9uc2UubmV4dFBhZ2V9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHBhZ2VDaGFuZ2UodGFiSWQsIGluZm8sIHRhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IHRhYi51cmw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwgIT0gdW5kZWZpbmVkICYmIHRhYklkID09IHNjcmFwZV90YWIgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhZ2UgZG9uZSBsb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIocGFnZUNoYW5nZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDAsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYWNoZWQgZWxzZSBzdGF0ZW1lbnQgaW4gcHJvY2Vzc0xpbmtCYXRjaCcpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLy8gc3RvcHMgbW9kdWxlIG9uIGNhbmNlbFNjcmFwZSBldmVudFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5jZWxTY3JhcGVcIiwgZnVuY3Rpb24gKCkge1xuICAgIHN0b3AoKTtcbn0pO1xuXG4vLyB0aGUgYXBpIGZvciB0aGlzIG1vZHVsZVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRpYWxpemUsXG4gICAgcHJvZmlsZUxpbmtzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnByb2ZpbGVMaW5rc1xuICAgIH0sXG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZFxuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gbG9nKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxufVxuXG4iXX0=
