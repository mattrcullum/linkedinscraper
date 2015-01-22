(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');
var getMissingNames = require('./getMissingNames');

window.results = {
    people: []
};

window.results = {"people":[{"name":{"full":"John Wallace"},"profileLink":"https://www.linkedin.com/profile/view?id=1457210&authType=OUT_OF_NETWORK&au…hId%3A3717380161421841267772%2CVSRPtargetId%3A1457210%2CVSRPcmpt%3Aprimary","headline":"Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple Inc.","pastPositions":["Yahoo! Inc.","Sony Computer Entertainment","ONI Systems Inc. purchased by Ciena Corp. in 2003"],"education":["Menlo College"]},{"name":{"full":"Jacob Conway"},"profileLink":"https://www.linkedin.com/profile/view?id=1644330&authType=OPENLINK&authToke…hId%3A3717380161421841267772%2CVSRPtargetId%3A1644330%2CVSRPcmpt%3Aprimary","headline":"Technical Sourcing Recruiter - Wireless Software at Apple","location":"Greater San Diego Area","industry":"Staffing and Recruiting","company":"Apple","currentPosition":"","pastPositions":["Novatel Wireless","TalentWar.net, Inc.","Networked Recruiter"],"education":["Augustana College (SD)"]},{"name":{"full":"Bill Dudney"},"profileLink":"https://www.linkedin.com/profile/view?id=480284&authType=OUT_OF_NETWORK&aut…chId%3A3717380161421841267772%2CVSRPtargetId%3A480284%2CVSRPcmpt%3Aprimary","headline":"Writer of Code at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleGala Factory Software LLCPragmatic Programmers","pastPositions":["Apple Inc.","Dudney.Net","Virtuas Solutions"],"education":["Texas A&M University"]},{"name":{"full":"Corey Carson"},"profileLink":"https://www.linkedin.com/profile/view?id=9816373&authType=OUT_OF_NETWORK&au…hId%3A3717380161421841267772%2CVSRPtargetId%3A9816373%2CVSRPcmpt%3Aprimary","headline":"Systems Engineer","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"Apple","pastPositions":["Holcomb's Education Resource","Maize USD 266"],"education":["Pittsburg State University"]},{"name":{"full":"Samantha Kish"},"profileLink":"https://www.linkedin.com/profile/view?id=10254966&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841267772%2CVSRPtargetId%3A10254966%2CVSRPcmpt%3Aprimary","headline":"Global Supply Manager - Channel Procurement at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","company":"Apple","currentPosition":"","pastPositions":["Apple","Johns Manville","Honeywell"],"education":["University of Colorado at Denver"]},{"name":{"full":"Dimitri Geier"},"profileLink":"https://www.linkedin.com/profile/view?id=12063296&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841267772%2CVSRPtargetId%3A12063296%2CVSRPcmpt%3Aprimary","headline":"Dimitri Geier is a Senior Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Telecommunications","company":"Apple","currentPosition":"Apple","pastPositions":["Motorola","Nextive Solutions","Warner Music Group"],"education":["Universität zu Köln"]},{"name":{"full":"Matthew Gaddis"},"profileLink":"https://www.linkedin.com/profile/view?id=12213953&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841267772%2CVSRPtargetId%3A12213953%2CVSRPcmpt%3Aprimary","headline":"UI Engineering Manager at Apple","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple","pastPositions":["Scout Labs","PlayCoed","Self"],"education":["University of Colorado Boulder"]},{"name":{"full":"Tri Vuong"},"profileLink":"https://www.linkedin.com/profile/view?id=14068282&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841267772%2CVSRPtargetId%3A14068282%2CVSRPcmpt%3Aprimary","headline":"Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Twitter","YP","Better The World"],"education":["University of Toronto"]},{"name":{"full":"Kshitij Deshpande"},"profileLink":"https://www.linkedin.com/profile/view?id=19292128&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841267772%2CVSRPtargetId%3A19292128%2CVSRPcmpt%3Aprimary","headline":"Sr. iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Gracenote (A Sony Company)","Independent iOS Developer","Telestream"],"education":["Wright State University"]},{"name":{"full":"Paul Stuart"},"profileLink":"https://www.linkedin.com/profile/view?id=20546172&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841267772%2CVSRPtargetId%3A20546172%2CVSRPcmpt%3Aprimary","headline":"TSE/Escalations|vCloudSuite|vShield|Infrastructure|Network|Fault|Storage at VMware","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"VMwareTime Warner CableApple Retail","pastPositions":["VMware","IBM Global Services"],"education":["Park University"]},{"name":{"full":"Azhar Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"]},{"name":{"full":"Ranjit Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421841270129%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"]},{"name":{"full":"Liang Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"]},{"name":{"full":"Kristina Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"]},{"name":{"full":"Sonia Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"]},{"name":{"full":"Michael Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"]},{"name":{"full":"George Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"]},{"name":{"full":"Mark Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"]},{"name":{"full":"Trevor Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[]},{"name":{"full":"Marvin Dela Cruz"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841270129%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Dept of Real Estate","California Secretary of State","Eclipse/InterlocSolutions"],"education":[]},{"name":{"full":"Anita Chen"},"profileLink":"https://www.linkedin.com/profile/view?id=112467466&authType=OUT_OF_NETWORK&…d%3A3717380161421841274700%2CVSRPtargetId%3A112467466%2CVSRPcmpt%3Aprimary","headline":"Mechanical Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Hardware","company":"Apple","currentPosition":"","pastPositions":["KLA-Tencor"],"education":["Georgia Institute of Technology"]},{"name":{"full":"Jose Alfonso"},"profileLink":"https://www.linkedin.com/profile/view?id=115020996&authType=OUT_OF_NETWORK&…d%3A3717380161421841274700%2CVSRPtargetId%3A115020996%2CVSRPcmpt%3Aprimary","headline":"UI/UX Developer at Apple Inc.","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Certain, Inc.","MasterCard","MHW, Ltd."],"education":["Various Schools"]},{"name":{"full":"Eric Asel"},"profileLink":"https://www.linkedin.com/profile/view?id=177571387&authType=OUT_OF_NETWORK&…d%3A3717380161421841274700%2CVSRPtargetId%3A177571387%2CVSRPcmpt%3Aprimary","headline":"Genius at Apple Inc.","location":"San Antonio, Texas Area","industry":"Consumer Electronics","company":"Apple","currentPosition":"The Gathering ChurchApple","pastPositions":["Gateway Fellowship Church","First Assembly of God Church"],"education":["The University of Texas at San Antonio"]},{"name":{"full":"Ryan Hewitt"},"profileLink":"https://www.linkedin.com/profile/view?id=245226180&authType=OUT_OF_NETWORK&…d%3A3717380161421841274700%2CVSRPtargetId%3A245226180%2CVSRPcmpt%3Aprimary","headline":"Genius at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","company":"Apple","currentPosition":"AppleAramark","pastPositions":["Apple","Sharks Sports and Entertainment"],"education":["San Jose State University"]},{"name":{"full":"Graham Parkinson-Morgan"},"profileLink":"https://www.linkedin.com/profile/view?id=268029324&authType=OUT_OF_NETWORK&…d%3A3717380161421841274700%2CVSRPtargetId%3A268029324%2CVSRPcmpt%3Aprimary","headline":"I tune iTunes","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Quark Software Inc."],"education":["University of Oxford"]},{"name":{"full":"Chris S."},"profileLink":"https://www.linkedin.com/profile/view?id=11088867&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841274700%2CVSRPtargetId%3A11088867%2CVSRPcmpt%3Aprimary","headline":"Silicon Engineering Staff Advisor","location":"San Francisco Bay Area","industry":"Semiconductors","company":"Apple","currentPosition":"Apple","pastPositions":["Arista Networks, Inc.","Ericsson","Juniper Networks"],"education":["California State University-Chico"]},{"name":{"full":"Kerie D."},"profileLink":"https://www.linkedin.com/profile/view?id=4540715&authType=OUT_OF_NETWORK&au…hId%3A3717380161421841274700%2CVSRPtargetId%3A4540715%2CVSRPcmpt%3Aprimary","headline":"iOS Recruiter - Apple Watch, HealthKit and native app teams","location":"San Francisco Bay Area","industry":"Human Resources","company":"Apple","currentPosition":"Apple","pastPositions":["Hitachi Data Systems","WebMethods","VeriSign"],"education":["University of California, Santa Cruz"]},{"name":{"full":"John Turnberg"},"profileLink":"https://www.linkedin.com/profile/view?id=758661&authType=OPENLINK&authToken…chId%3A3717380161421841274700%2CVSRPtargetId%3A758661%2CVSRPcmpt%3Aprimary","headline":"Searching for great Mechanical Engineers","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple","pastPositions":["LinkedIn","Counsyl","JRC Associates"],"education":["University of Massachusetts, Amherst"]},{"name":{"full":"Matt S."},"profileLink":"https://www.linkedin.com/profile/view?id=16907430&authType=OUT_OF_NETWORK&a…Id%3A3717380161421841274700%2CVSRPtargetId%3A16907430%2CVSRPcmpt%3Aprimary","headline":"Management Advisor and Senior Lecturer","location":"Melbourne Area, Australia","industry":"Construction","company":"Apple","currentPosition":"University of MelbourneMcGraw-Hill ProfessionalStevens Construction Institute, Inc.","pastPositions":["University of Florida","FMI Corporation"],"education":["University of Florida"]},{"name":{"full":"Tim Esse"},"profileLink":"https://www.linkedin.com/profile/view?id=3879837&authType=OPENLINK&authToke…hId%3A3717380161421841274700%2CVSRPtargetId%3A3879837%2CVSRPcmpt%3Aprimary","headline":"Recruiting World Class Talent For Apple Inc. - Certified Linkedin Recruiter Coach - Certified Linkedin Recruiter Expert","location":"Greater Minneapolis-St. Paul Area","industry":"Staffing and Recruiting"}]}


window.callTabAction = function (tabId, action, callback, args) {
    var message = {to: 'content', action: action};
    chrome.tabs.sendMessage(tabId, message, callback)
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 29;

    var routine = [
        //scraper.start.bind(undefined, settings, results),
        //getBasicInfo.start.bind(undefined, settings, results)
        getMissingNames.start.bind(undefined, settings, results)
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
},{"./getBasicInfo.js":2,"./getMissingNames":3,"./scraper.js":4}],2:[function(require,module,exports){
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
var i = 0;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    iterate()
}

function iterate() {
    currentPerson = results.people[i];
    var currentPersonFullName = currentPerson.name.full;

    if (isNameHidden(currentPersonFullName) || isNameAbbreviated(currentPersonFullName)) {
        getMissingName()
    }
    else if (i + 1 == results.people.length) {
        masterCallback();
        return;
    }
    else {
        i++;
        iterate()
    }
}

function getMissingName() {
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
            callTabAction(tabid, "getGoogleResult", googleResultResponse)
            chrome.tabs.onUpdated.removeListener(tabUpdated)
        }
    }

    function googleResultResponse(response) {

        var fullName = response.split('|').trim();

        response = response.split('|').trim().split(' ');
        var fname = response[0];
        var lname = response[1];

        currentPerson.name.full = fullName;
        currentPerson.name.first = fname;
        currentPerson.name.last = lname;
    }

    chrome.tabs.create({url: url}, function (tab) {
        tabid = tab.id;
        i++;
        iterate();
    });
}

function processGoogleResponse(response) {
    if (response) {
        response.name.full
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvZ2V0TWlzc2luZ05hbWVzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9zY3JhcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNjcmFwZXIgPSByZXF1aXJlKCcuL3NjcmFwZXIuanMnKTtcbnZhciBnZXRCYXNpY0luZm8gPSByZXF1aXJlKCcuL2dldEJhc2ljSW5mby5qcycpO1xudmFyIGdldE1pc3NpbmdOYW1lcyA9IHJlcXVpcmUoJy4vZ2V0TWlzc2luZ05hbWVzJyk7XG5cbndpbmRvdy5yZXN1bHRzID0ge1xuICAgIHBlb3BsZTogW11cbn07XG5cbndpbmRvdy5yZXN1bHRzID0ge1wicGVvcGxlXCI6W3tcIm5hbWVcIjp7XCJmdWxsXCI6XCJKb2huIFdhbGxhY2VcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNDU3MjEwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTE0NTcyMTAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgU1cgRW5naW5lZXJpbmcgUmVjcnVpdGVyIGF0IEFwcGxlICAgICAgICBpT1MgQXBwcyAmIEZyYW1ld29ya3NcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW50ZXJuZXRcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJZYWhvbyEgSW5jLlwiLFwiU29ueSBDb21wdXRlciBFbnRlcnRhaW5tZW50XCIsXCJPTkkgU3lzdGVtcyBJbmMuIHB1cmNoYXNlZCBieSBDaWVuYSBDb3JwLiBpbiAyMDAzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiTWVubG8gQ29sbGVnZVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkphY29iIENvbndheVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE2NDQzMzAmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2XigKZoSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMTY0NDMzMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlRlY2huaWNhbCBTb3VyY2luZyBSZWNydWl0ZXIgLSBXaXJlbGVzcyBTb2Z0d2FyZSBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgU2FuIERpZWdvIEFyZWFcIixcImluZHVzdHJ5XCI6XCJTdGFmZmluZyBhbmQgUmVjcnVpdGluZ1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiTm92YXRlbCBXaXJlbGVzc1wiLFwiVGFsZW50V2FyLm5ldCwgSW5jLlwiLFwiTmV0d29ya2VkIFJlY3J1aXRlclwiXSxcImVkdWNhdGlvblwiOltcIkF1Z3VzdGFuYSBDb2xsZWdlIChTRClcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJCaWxsIER1ZG5leVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQ4MDI4NCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdXTigKZjaElkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTQ4MDI4NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIldyaXRlciBvZiBDb2RlIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUdhbGEgRmFjdG9yeSBTb2Z0d2FyZSBMTENQcmFnbWF0aWMgUHJvZ3JhbW1lcnNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZSBJbmMuXCIsXCJEdWRuZXkuTmV0XCIsXCJWaXJ0dWFzIFNvbHV0aW9uc1wiXSxcImVkdWNhdGlvblwiOltcIlRleGFzIEEmTSBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQ29yZXkgQ2Fyc29uXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9OTgxNjM3MyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdeKApmhJZCUzQTM3MTczODAxNjE0MjE4NDEyNjc3NzIlMkNWU1JQdGFyZ2V0SWQlM0E5ODE2MzczJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3lzdGVtcyBFbmdpbmVlclwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgRGVudmVyIEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJIb2xjb21iJ3MgRWR1Y2F0aW9uIFJlc291cmNlXCIsXCJNYWl6ZSBVU0QgMjY2XCJdLFwiZWR1Y2F0aW9uXCI6W1wiUGl0dHNidXJnIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTYW1hbnRoYSBLaXNoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTAyNTQ5NjYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTEwMjU0OTY2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiR2xvYmFsIFN1cHBseSBNYW5hZ2VyIC0gQ2hhbm5lbCBQcm9jdXJlbWVudCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb25zdW1lciBFbGVjdHJvbmljc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXBwbGVcIixcIkpvaG5zIE1hbnZpbGxlXCIsXCJIb25leXdlbGxcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IERlbnZlclwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkRpbWl0cmkgR2VpZXJcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMjA2MzI5NiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMTIwNjMyOTYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJEaW1pdHJpIEdlaWVyIGlzIGEgU2VuaW9yIFNvZnR3YXJlIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIlRlbGVjb21tdW5pY2F0aW9uc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJNb3Rvcm9sYVwiLFwiTmV4dGl2ZSBTb2x1dGlvbnNcIixcIldhcm5lciBNdXNpYyBHcm91cFwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdMOkdCB6dSBLw7ZsblwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1hdHRoZXcgR2FkZGlzXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTIyMTM5NTMmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTEyMjEzOTUzJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVUkgRW5naW5lZXJpbmcgTWFuYWdlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbnRlcm5ldFwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJTY291dCBMYWJzXCIsXCJQbGF5Q29lZFwiLFwiU2VsZlwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlRyaSBWdW9uZ1wifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE0MDY4MjgyJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNjc3NzIlMkNWU1JQdGFyZ2V0SWQlM0ExNDA2ODI4MiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJUd2l0dGVyXCIsXCJZUFwiLFwiQmV0dGVyIFRoZSBXb3JsZFwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgVG9yb250b1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIktzaGl0aWogRGVzaHBhbmRlXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTkyOTIxMjgmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTE5MjkyMTI4JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3IuIGlPUyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiR3JhY2Vub3RlIChBIFNvbnkgQ29tcGFueSlcIixcIkluZGVwZW5kZW50IGlPUyBEZXZlbG9wZXJcIixcIlRlbGVzdHJlYW1cIl0sXCJlZHVjYXRpb25cIjpbXCJXcmlnaHQgU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlBhdWwgU3R1YXJ0XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjA1NDYxNzImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTIwNTQ2MTcyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVFNFL0VzY2FsYXRpb25zfHZDbG91ZFN1aXRlfHZTaGllbGR8SW5mcmFzdHJ1Y3R1cmV8TmV0d29ya3xGYXVsdHxTdG9yYWdlIGF0IFZNd2FyZVwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgRGVudmVyIEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiVk13YXJlVGltZSBXYXJuZXIgQ2FibGVBcHBsZSBSZXRhaWxcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJWTXdhcmVcIixcIklCTSBHbG9iYWwgU2VydmljZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJQYXJrIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJBemhhciBTaWthbmRlclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTIxMDMyMDkwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0EyMTAzMjA5MCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIGluIFRlc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkJlbnRsZXkgU3lzdGVtc1wiLFwiUXdlc3QgQ29tbXVuaWNhdGlvbnNcIixcIk5TSURDLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IEJvdWxkZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJSYW5qaXQgTWVub25cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yNDMzMTY4NiZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9r4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjcwMTI5JTJDVlNSUHRhcmdldElkJTNBMjQzMzE2ODYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgUmVzZWFyY2ggU2NpZW50aXN0LCBBcHBsZSBNYXBzXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlBhY2lmaWMgR2FzIGFuZCBFbGVjdHJpYyBDb21wYW55XCIsXCJTY2huZWlkZXIgRWxlY3RyaWNcIixcIlRlbHZlbnQgTWluZXIgJiBNaW5lclwiXSxcImVkdWNhdGlvblwiOltcIkluZGlhbiBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neSwgTWFkcmFzXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTGlhbmcgV2VpXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MzAxMDM1NjEmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTMwMTAzNTYxJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU2VuaW9yIERhdGEgU2NpZW50aXN0IGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJDaGVnZyBJbmMuXCIsXCJBbWF6b24uY29tXCIsXCJMdWNpZCBDb21tZXJjZSAoQWNxdWlyZWQgYnkgQU9MIGluIDIwMTQpXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVGhlIENvbGxlZ2Ugb2YgV2lsbGlhbSBhbmQgTWFyeVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIktyaXN0aW5hIEd1bGlzaFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM1NjYzMzU0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0EzNTY2MzM1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlN0cmF0ZWdpYyBTb3VyY2luZyBNYW5hZ2VyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiVW5pdGVkIFN0YXRlc1wiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkpvaG5zIE1hbnZpbGxlXCIsXCJLb2hsZXIgQ28uXCIsXCJCb3JnV2FybmVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBhdCBEZW52ZXJcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTb25pYSBTYWluaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4NDc3MjI2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0EzODQ3NzIyNiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBRQSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVGltZSBXYXJuZXIgQ2FibGVcIixcIkNvbWNhc3RcIixcIkdyZWJ3ZWJcIl0sXCJlZHVjYXRpb25cIjpbXCJQdW5qYWIgVGVjaG5pY2FsIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNaWNoYWVsIFR1cm5lclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQyMzYxMTkxJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0E0MjM2MTE5MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcImlPUyAmIE9TIFggU29mdHdhcmUgRW5naW5lZXJcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiV2F5SW5cIixcIlRyb3BwdXMgU29mdHdhcmUgQ29ycG9yYXRpb25cIixcIk5hdGlvbmFsIEFuYWx5dGljcywgSW5jLlwiXSxcImVkdWNhdGlvblwiOltcIkNvbG9yYWRvIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJHZW9yZ2UgS2FsYW5naVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTUyOTA4MDUzJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0E1MjkwODA1MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIFVJIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUluZm9zeXNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIixcIkhDTCBUZWNobm9sb2dpZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJrIEdvdWxkc21pdGhcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD02NDc2MTIyNSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjcwMTI5JTJDVlNSUHRhcmdldElkJTNBNjQ3NjEyMjUlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJUZWNobm9sb2d5ICsgTWVkaWEgUHJvZHVjdGlvblwiLFwibG9jYXRpb25cIjpcIkF1c3RpbiwgVGV4YXMgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIk9ubGluZSBNZWRpYVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVsZXNmaXJlLmNvbVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkFwcGxlXCIsXCJIYXJ0ZS1IYW5rcywgSW5jLlwiLFwiUGVhayBQZXJmb3JtZXJzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiTmV3IE1leGljbyBTdGF0ZSBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiVHJldm9yIFNoZXJpZGFuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NzIxMTg2NDImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTcyMTE4NjQyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiaU9TIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHcm91cG9uXCIsXCJUcmV2b3IgSW5jXCIsXCJTdXJlaWZ5LmNvbVwiXSxcImVkdWNhdGlvblwiOltdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWFydmluIERlbGEgQ3J1elwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTgyMDYxMzk3JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0E4MjA2MTM5NyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkVudGVycHJpc2UgU2VydmljZXMgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYWNyYW1lbnRvLCBDYWxpZm9ybmlhIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJEZXB0IG9mIFJlYWwgRXN0YXRlXCIsXCJDYWxpZm9ybmlhIFNlY3JldGFyeSBvZiBTdGF0ZVwiLFwiRWNsaXBzZS9JbnRlcmxvY1NvbHV0aW9uc1wiXSxcImVkdWNhdGlvblwiOltdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQW5pdGEgQ2hlblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTExMjQ2NzQ2NiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSybigKZkJTNBMzcxNzM4MDE2MTQyMTg0MTI3NDcwMCUyQ1ZTUlB0YXJnZXRJZCUzQTExMjQ2NzQ2NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIk1lY2hhbmljYWwgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgSGFyZHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIktMQS1UZW5jb3JcIl0sXCJlZHVjYXRpb25cIjpbXCJHZW9yZ2lhIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSm9zZSBBbGZvbnNvXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTE1MDIwOTk2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJuKApmQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMTE1MDIwOTk2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVUkvVVggRGV2ZWxvcGVyIGF0IEFwcGxlIEluYy5cIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNlcnRhaW4sIEluYy5cIixcIk1hc3RlckNhcmRcIixcIk1IVywgTHRkLlwiXSxcImVkdWNhdGlvblwiOltcIlZhcmlvdXMgU2Nob29sc1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkVyaWMgQXNlbFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE3NzU3MTM4NyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSybigKZkJTNBMzcxNzM4MDE2MTQyMTg0MTI3NDcwMCUyQ1ZTUlB0YXJnZXRJZCUzQTE3NzU3MTM4NyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkdlbml1cyBhdCBBcHBsZSBJbmMuXCIsXCJsb2NhdGlvblwiOlwiU2FuIEFudG9uaW8sIFRleGFzIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb25zdW1lciBFbGVjdHJvbmljc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiVGhlIEdhdGhlcmluZyBDaHVyY2hBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdhdGV3YXkgRmVsbG93c2hpcCBDaHVyY2hcIixcIkZpcnN0IEFzc2VtYmx5IG9mIEdvZCBDaHVyY2hcIl0sXCJlZHVjYXRpb25cIjpbXCJUaGUgVW5pdmVyc2l0eSBvZiBUZXhhcyBhdCBTYW4gQW50b25pb1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlJ5YW4gSGV3aXR0XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjQ1MjI2MTgwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJuKApmQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMjQ1MjI2MTgwJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiR2VuaXVzIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUFyYW1hcmtcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiU2hhcmtzIFNwb3J0cyBhbmQgRW50ZXJ0YWlubWVudFwiXSxcImVkdWNhdGlvblwiOltcIlNhbiBKb3NlIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJHcmFoYW0gUGFya2luc29uLU1vcmdhblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTI2ODAyOTMyNCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSybigKZkJTNBMzcxNzM4MDE2MTQyMTg0MTI3NDcwMCUyQ1ZTUlB0YXJnZXRJZCUzQTI2ODAyOTMyNCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkkgdHVuZSBpVHVuZXNcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiUXVhcmsgU29mdHdhcmUgSW5jLlwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgT3hmb3JkXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQ2hyaXMgUy5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMTA4ODg2NyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMTEwODg4NjclMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTaWxpY29uIEVuZ2luZWVyaW5nIFN0YWZmIEFkdmlzb3JcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiU2VtaWNvbmR1Y3RvcnNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXJpc3RhIE5ldHdvcmtzLCBJbmMuXCIsXCJFcmljc3NvblwiLFwiSnVuaXBlciBOZXR3b3Jrc1wiXSxcImVkdWNhdGlvblwiOltcIkNhbGlmb3JuaWEgU3RhdGUgVW5pdmVyc2l0eS1DaGljb1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIktlcmllIEQuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NDU0MDcxNSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdeKApmhJZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0E0NTQwNzE1JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiaU9TIFJlY3J1aXRlciAtIEFwcGxlIFdhdGNoLCBIZWFsdGhLaXQgYW5kIG5hdGl2ZSBhcHAgdGVhbXNcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSHVtYW4gUmVzb3VyY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkhpdGFjaGkgRGF0YSBTeXN0ZW1zXCIsXCJXZWJNZXRob2RzXCIsXCJWZXJpU2lnblwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ2FsaWZvcm5pYSwgU2FudGEgQ3J1elwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkpvaG4gVHVybmJlcmdcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD03NTg2NjEmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2Vu4oCmY2hJZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0E3NTg2NjElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZWFyY2hpbmcgZm9yIGdyZWF0IE1lY2hhbmljYWwgRW5naW5lZXJzXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkludGVybmV0XCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkxpbmtlZEluXCIsXCJDb3Vuc3lsXCIsXCJKUkMgQXNzb2NpYXRlc1wiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgTWFzc2FjaHVzZXR0cywgQW1oZXJzdFwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1hdHQgUy5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNjkwNzQzMCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMTY5MDc0MzAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJNYW5hZ2VtZW50IEFkdmlzb3IgYW5kIFNlbmlvciBMZWN0dXJlclwiLFwibG9jYXRpb25cIjpcIk1lbGJvdXJuZSBBcmVhLCBBdXN0cmFsaWFcIixcImluZHVzdHJ5XCI6XCJDb25zdHJ1Y3Rpb25cIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlVuaXZlcnNpdHkgb2YgTWVsYm91cm5lTWNHcmF3LUhpbGwgUHJvZmVzc2lvbmFsU3RldmVucyBDb25zdHJ1Y3Rpb24gSW5zdGl0dXRlLCBJbmMuXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVW5pdmVyc2l0eSBvZiBGbG9yaWRhXCIsXCJGTUkgQ29ycG9yYXRpb25cIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIEZsb3JpZGFcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJUaW0gRXNzZVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4Nzk4MzcmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2XigKZoSWQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMzg3OTgzNyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlJlY3J1aXRpbmcgV29ybGQgQ2xhc3MgVGFsZW50IEZvciBBcHBsZSBJbmMuIC0gQ2VydGlmaWVkIExpbmtlZGluIFJlY3J1aXRlciBDb2FjaCAtIENlcnRpZmllZCBMaW5rZWRpbiBSZWNydWl0ZXIgRXhwZXJ0XCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBNaW5uZWFwb2xpcy1TdC4gUGF1bCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiU3RhZmZpbmcgYW5kIFJlY3J1aXRpbmdcIn1dfVxuXG5cbndpbmRvdy5jYWxsVGFiQWN0aW9uID0gZnVuY3Rpb24gKHRhYklkLCBhY3Rpb24sIGNhbGxiYWNrLCBhcmdzKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSB7dG86ICdjb250ZW50JywgYWN0aW9uOiBhY3Rpb259O1xuICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYklkLCBtZXNzYWdlLCBjYWxsYmFjaylcbn07XG5cbndpbmRvdy5nbyA9IGZ1bmN0aW9uIChzZXR0aW5ncykge1xuXG4gICAgLy8gZm9yIGRlYnVnZ2luZ1xuICAgIHNldHRpbmdzLnNjcmFwZXIubGltaXQgPSAyOTtcblxuICAgIHZhciByb3V0aW5lID0gW1xuICAgICAgICAvL3NjcmFwZXIuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKSxcbiAgICAgICAgLy9nZXRCYXNpY0luZm8uc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgICAgICBnZXRNaXNzaW5nTmFtZXMuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgIF07XG4gICAgcm91dGluZS5wdXNoKGRvbmUpO1xuXG4gICAgYXN5bmMuc2VyaWVzKHJvdXRpbmUpO1xufTtcblxuZnVuY3Rpb24gZG9uZSgpIHtcbiAgICBjb25zb2xlLnRhYmxlKHJlc3VsdHMpXG59XG5cbi8vdmFyIHBlcm11dGVyID0gcmVxdWlyZSgnLi9lbWFpbFBlcm11dGVyLmpzJyk7XG4vL3ZhciBmaW5kX2xhc3RfbmFtZXMgPSByZXF1aXJlKCcuL2xhc3RfbmFtZXMuanMnKTtcbi8vdmFyIGVtYWlsX3ZlcmlmaWVyID0gcmVxdWlyZSgnLi9lbWFpbF9jaGVjay5qcycpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTcvMTUuXG4gKi9cbnZhciBjdXJyZW50V29ya2luZ1RhYjtcbnZhciBpc0ZpbmlzaGVkO1xudmFyIHJlc3VsdHM7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG52YXIgc2V0dGluZ3M7XG52YXIgaSA9IDA7XG52YXIgY3VycmVudFBlcnNvbjtcblxuZnVuY3Rpb24gaW5pdChzZXR0aW5nc0FyZywgcmVzdWx0c0FyZywgY2FsbGJhY2tBcmcpIHtcblxuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcblxuICAgIGl0ZXJhdGUoKVxufVxuXG5mdW5jdGlvbiBnZXRCYXNpY0luZm8ocGVyc29uKSB7XG4gICAgY3VycmVudFBlcnNvbiA9IHBlcnNvbjtcbiAgICBjdXJyZW50UGVyc29uLmNvbXBhbnkgPSBzZXR0aW5ncy5nZW5lcmFsLmNvbXBhbnlOYW1lO1xuXG4gICAgLy8gY3JlYXRlIHRoZSB0YWIgd2l0aCBsaW5rIGFyZ3VtZW50XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHBlcnNvbi5wcm9maWxlTGlua30sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgY3VycmVudFdvcmtpbmdUYWIgPSB0YWI7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih0YWJVcGRhdGVkKVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICBpZiAodGFiSWQgPT0gY3VycmVudFdvcmtpbmdUYWIuaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSByZXF1aXJlZCBkYXRhIGZyb20gdGhlIHRhYlxuICAgICAgICBjYWxsVGFiQWN0aW9uKGN1cnJlbnRXb3JraW5nVGFiLmlkLCBcImdldEJhc2ljSW5mb1wiLCBoYW5kbGVSZXNwb25zZSk7XG5cbiAgICAgICAgLy8ganVzdCB0byBiZSBzYWZlLCByZW1vdmUgdGhlIGxpc3RlbmVyXG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0YWJVcGRhdGVkKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUmVzcG9uc2UocmVzcG9uc2UpIHtcblxuICAgICQuZXh0ZW5kKGN1cnJlbnRQZXJzb24sIHJlc3BvbnNlKTtcblxuICAgIC8qXG4gICAgIHZhciBuYW1lLmZ1bGwgPSByZXNwb25zZS5uYW1lLmZ1bGwudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgIHZhciBoZWFkbGluZSA9IHJlc3BvbnNlLmhlYWRsaW5lO1xuXG4gICAgIHN3aXRjaCAobmFtZS5mdWxsKXtcbiAgICAgY2FzZSAnbGlua2VkaW4gbWVtYmVyJzpcbiAgICAgfVxuICAgICAqL1xuICAgIC8vIHdlJ3JlIGRvbmUgd2l0aCB0aGUgdGFiLiByZW1vdmUgaXRcbiAgICBjaHJvbWUudGFicy5yZW1vdmUoY3VycmVudFdvcmtpbmdUYWIuaWQpO1xuXG4gICAgLy8gZGVjaWRlIHdoZXRoZXIgdG8gcnVuIGFnYWluIG9yIG5vdFxuICAgIGlmIChpICsgMSAhPSByZXN1bHRzLnBlb3BsZS5sZW5ndGgpIHtcbiAgICAgICAgaXRlcmF0ZSgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgIGdldEJhc2ljSW5mbyhyZXN1bHRzLnBlb3BsZVtpKytdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZDtcbiAgICB9LFxuICAgIHN0YXJ0OiBpbml0XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yMS8xNS5cbiAqL1xudmFyIHNldHRpbmdzLCByZXN1bHRzLCBtYXN0ZXJDYWxsYmFjaztcbnZhciBpID0gMDtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBpdGVyYXRlKClcbn1cblxuZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBjdXJyZW50UGVyc29uID0gcmVzdWx0cy5wZW9wbGVbaV07XG4gICAgdmFyIGN1cnJlbnRQZXJzb25GdWxsTmFtZSA9IGN1cnJlbnRQZXJzb24ubmFtZS5mdWxsO1xuXG4gICAgaWYgKGlzTmFtZUhpZGRlbihjdXJyZW50UGVyc29uRnVsbE5hbWUpIHx8IGlzTmFtZUFiYnJldmlhdGVkKGN1cnJlbnRQZXJzb25GdWxsTmFtZSkpIHtcbiAgICAgICAgZ2V0TWlzc2luZ05hbWUoKVxuICAgIH1cbiAgICBlbHNlIGlmIChpICsgMSA9PSByZXN1bHRzLnBlb3BsZS5sZW5ndGgpIHtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE1pc3NpbmdOYW1lKCkge1xuICAgIC8vZGVidWdnZXI7XG4gICAgdmFyIHNlYXJjaFRleHQgPSAoXG4gICAgXCJzaXRlOmxpbmtlZGluLmNvbSBcIiArXG4gICAgY3VycmVudFBlcnNvbi5oZWFkbGluZSArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5jdXJyZW50UG9zaXRpb24gKyAnICcgK1xuICAgIGN1cnJlbnRQZXJzb24ucGFzdFBvc2l0aW9ucy5qb2luKCcgJykgKyAnICcgK1xuICAgIGN1cnJlbnRQZXJzb24uZWR1Y2F0aW9uLmpvaW4oJyAnKSArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5jb21wYW55KS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEgJDInKTtcblxuICAgIHZhciB1cmwgPVxuICAgICAgICBcImh0dHA6Ly9nb29nbGUuY29tXCIgK1xuICAgICAgICBcIiNxPVwiICtcbiAgICAgICAgc2VhcmNoVGV4dDtcbiAgICB2YXIgdGFiaWQ7XG5cbiAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIodGFiVXBkYXRlZCk7XG5cbiAgICBmdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcblxuICAgICAgICBpZiAodGFiSWQgPT0gdGFiaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICBjYWxsVGFiQWN0aW9uKHRhYmlkLCBcImdldEdvb2dsZVJlc3VsdFwiLCBnb29nbGVSZXN1bHRSZXNwb25zZSlcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0YWJVcGRhdGVkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ29vZ2xlUmVzdWx0UmVzcG9uc2UocmVzcG9uc2UpIHtcblxuICAgICAgICB2YXIgZnVsbE5hbWUgPSByZXNwb25zZS5zcGxpdCgnfCcpLnRyaW0oKTtcblxuICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlLnNwbGl0KCd8JykudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgIHZhciBmbmFtZSA9IHJlc3BvbnNlWzBdO1xuICAgICAgICB2YXIgbG5hbWUgPSByZXNwb25zZVsxXTtcblxuICAgICAgICBjdXJyZW50UGVyc29uLm5hbWUuZnVsbCA9IGZ1bGxOYW1lO1xuICAgICAgICBjdXJyZW50UGVyc29uLm5hbWUuZmlyc3QgPSBmbmFtZTtcbiAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmxhc3QgPSBsbmFtZTtcbiAgICB9XG5cbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogdXJsfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICB0YWJpZCA9IHRhYi5pZDtcbiAgICAgICAgaSsrO1xuICAgICAgICBpdGVyYXRlKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NHb29nbGVSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZS5uYW1lLmZ1bGxcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzTmFtZUhpZGRlbihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT0gXCJsaW5rZWRpbiBtZW1iZXJcIlxufVxuXG5mdW5jdGlvbiBpc05hbWVBYmJyZXZpYXRlZChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuaW5kZXhPZignLicpICE9IC0xXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbnZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbnZhciBzdGF0dXMgPSB7fTtcbnZhciByZXN1bHRzO1xuXG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgLy9pbml0aWFsaXphdGlvblxuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLmdlbmVyYWwucG9zaXRpb25GaWx0ZXIgK1xuICAgICAgICAnJmZfQ0M9JyArIHNldHRpbmdzLmdlbmVyYWwuQ29tcGFueUlEcyArXG4gICAgICAgICcmb3BlbkFkdmFuY2VkRm9ybT10cnVlJnRpdGxlU2NvcGU9QyZsb2NhdGlvblR5cGU9SSc7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYlxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHNjcmFwZV90YWIgPSB0YWIuaWQ7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih3YWl0Rm9yVGFiKVxuICAgIH0pO1xuXG4gICAgLy8gYWZ0ZXIgdGFiIGNyZWF0aW9uIHJldHVybiBjb250cm9sIHRvIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gd2FpdEZvclRhYih0YWJJZCwgaW5mbykge1xuICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiICYmIHRhYklkID09IHNjcmFwZV90YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih3YWl0Rm9yVGFiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRQcm9maWxlTGlua3MoY2FsbGJhY2spIHtcbiAgICAvLyBhc2sgY29udGVudCBzY3JpcHQgZm9yIGFsbCB0aGUgcHJvZmlsZSBsaW5rcyBvbiB0aGUgcGFnZVxuICAgIGNhbGxUYWJBY3Rpb24oc2NyYXBlX3RhYiwgJ3NjcmFwZVByb2ZpbGVMaXN0JywgcHJvY2Vzc0xpbmtCYXRjaCk7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGlua0JhdGNoKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHJlc3BvbnNlIGlzIGVtcHR5LCB3ZSBoYXZlIGFuIGlzc3VlXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlc3BvbnNlIGZvciBwcm9jZXNzTGlua0JhdGNoIGlzOlwiICsgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc05leHRQYWdlID0gcmVzcG9uc2UuaGFzTmV4dFBhZ2U7XG4gICAgICAgIHZhciBsaW1pdCA9IHNldHRpbmdzLnNjcmFwZXIubGltaXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcGFnZXMsIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmICghaGFzTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHdlJ3JlIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHJlc3BvbnNlIGFuZCBhIG5leHQgcGFnZS4gd2UnbGwgY2hlY2sgYSBmZXcgdGhpbmdzIGFuZCBrZWVwIGdvaW5nXG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoICE9IDApIHtcblxuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc3BvbnNlIHRvIG91ciBleGlzdGluZyBhcnJheVxuICAgICAgICAgICAgcmVzdWx0cy5wZW9wbGUgPSByZXN1bHRzLnBlb3BsZS5jb25jYXQocmVzcG9uc2UucmVzdWx0cyk7XG5cblxuICAgICAgICAgICAgaWYgKHJlc3VsdHMucGVvcGxlLmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoe3VybDogXCJodHRwOi8vXCIgKyByZXNwb25zZS5uZXh0UGFnZX0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFnZUNoYW5nZSh0YWJJZCwgaW5mbywgdGFiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gdGFiLnVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAhPSB1bmRlZmluZWQgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYiAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSBkb25lIGxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVhY2hlZCBlbHNlIHN0YXRlbWVudCBpbiBwcm9jZXNzTGlua0JhdGNoJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBzdG9wcyBtb2R1bGUgb24gY2FuY2VsU2NyYXBlIGV2ZW50XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNhbmNlbFNjcmFwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcCgpO1xufSk7XG5cbi8vIHRoZSBhcGkgZm9yIHRoaXMgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdGFydDogaW5pdGlhbGl6ZSxcbiAgICBwcm9maWxlTGlua3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucHJvZmlsZUxpbmtzXG4gICAgfSxcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpc0ZpbmlzaGVkXG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBsb2cobWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG59XG5cbiJdfQ==
