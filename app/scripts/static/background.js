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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvZ2V0TWlzc2luZ05hbWVzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9zY3JhcGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc2NyYXBlciA9IHJlcXVpcmUoJy4vc2NyYXBlci5qcycpO1xudmFyIGdldEJhc2ljSW5mbyA9IHJlcXVpcmUoJy4vZ2V0QmFzaWNJbmZvLmpzJyk7XG52YXIgZ2V0TWlzc2luZ05hbWVzID0gcmVxdWlyZSgnLi9nZXRNaXNzaW5nTmFtZXMnKTtcblxud2luZG93LnJlc3VsdHMgPSB7XG4gICAgcGVvcGxlOiBbXVxufTtcblxud2luZG93LnJlc3VsdHMgPSB7XCJwZW9wbGVcIjpbe1wibmFtZVwiOntcImZ1bGxcIjpcIkpvaG4gV2FsbGFjZVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE0NTcyMTAmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXXigKZoSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMTQ1NzIxMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBTVyBFbmdpbmVlcmluZyBSZWNydWl0ZXIgYXQgQXBwbGUgICAgICAgIGlPUyBBcHBzICYgRnJhbWV3b3Jrc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbnRlcm5ldFwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGUgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIllhaG9vISBJbmMuXCIsXCJTb255IENvbXB1dGVyIEVudGVydGFpbm1lbnRcIixcIk9OSSBTeXN0ZW1zIEluYy4gcHVyY2hhc2VkIGJ5IENpZW5hIENvcnAuIGluIDIwMDNcIl0sXCJlZHVjYXRpb25cIjpbXCJNZW5sbyBDb2xsZWdlXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSmFjb2IgQ29ud2F5XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTY0NDMzMCZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZeKApmhJZCUzQTM3MTczODAxNjE0MjE4NDEyNjc3NzIlMkNWU1JQdGFyZ2V0SWQlM0ExNjQ0MzMwJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVjaG5pY2FsIFNvdXJjaW5nIFJlY3J1aXRlciAtIFdpcmVsZXNzIFNvZnR3YXJlIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBTYW4gRGllZ28gQXJlYVwiLFwiaW5kdXN0cnlcIjpcIlN0YWZmaW5nIGFuZCBSZWNydWl0aW5nXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJOb3ZhdGVsIFdpcmVsZXNzXCIsXCJUYWxlbnRXYXIubmV0LCBJbmMuXCIsXCJOZXR3b3JrZWQgUmVjcnVpdGVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiQXVndXN0YW5hIENvbGxlZ2UgKFNEKVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkJpbGwgRHVkbmV5XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NDgwMjg0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF1dOKApmNoSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBNDgwMjg0JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiV3JpdGVyIG9mIENvZGUgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlR2FsYSBGYWN0b3J5IFNvZnR3YXJlIExMQ1ByYWdtYXRpYyBQcm9ncmFtbWVyc1wiLFwicGFzdFBvc2l0aW9uc1wiOltcIkFwcGxlIEluYy5cIixcIkR1ZG5leS5OZXRcIixcIlZpcnR1YXMgU29sdXRpb25zXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVGV4YXMgQSZNIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJDb3JleSBDYXJzb25cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD05ODE2MzczJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTk4MTYzNzMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTeXN0ZW1zIEVuZ2luZWVyXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBEZW52ZXIgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkhvbGNvbWIncyBFZHVjYXRpb24gUmVzb3VyY2VcIixcIk1haXplIFVTRCAyNjZcIl0sXCJlZHVjYXRpb25cIjpbXCJQaXR0c2J1cmcgU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlNhbWFudGhhIEtpc2hcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMDI1NDk2NiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMTAyNTQ5NjYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJHbG9iYWwgU3VwcGx5IE1hbmFnZXIgLSBDaGFubmVsIFByb2N1cmVtZW50IGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiSm9obnMgTWFudmlsbGVcIixcIkhvbmV5d2VsbFwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gYXQgRGVudmVyXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiRGltaXRyaSBHZWllclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEyMDYzMjk2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNjc3NzIlMkNWU1JQdGFyZ2V0SWQlM0ExMjA2MzI5NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkRpbWl0cmkgR2VpZXIgaXMgYSBTZW5pb3IgU29mdHdhcmUgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiVGVsZWNvbW11bmljYXRpb25zXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk1vdG9yb2xhXCIsXCJOZXh0aXZlIFNvbHV0aW9uc1wiLFwiV2FybmVyIE11c2ljIEdyb3VwXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0w6R0IHp1IEvDtmxuXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWF0dGhldyBHYWRkaXNcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMjIxMzk1MyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMTIyMTM5NTMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJVSSBFbmdpbmVlcmluZyBNYW5hZ2VyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkludGVybmV0XCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlNjb3V0IExhYnNcIixcIlBsYXlDb2VkXCIsXCJTZWxmXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiVHJpIFZ1b25nXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTQwNjgyODImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI2Nzc3MiUyQ1ZTUlB0YXJnZXRJZCUzQTE0MDY4MjgyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29mdHdhcmUgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlR3aXR0ZXJcIixcIllQXCIsXCJCZXR0ZXIgVGhlIFdvcmxkXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBUb3JvbnRvXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS3NoaXRpaiBEZXNocGFuZGVcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xOTI5MjEyOCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMTkyOTIxMjglMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTci4gaU9TIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHcmFjZW5vdGUgKEEgU29ueSBDb21wYW55KVwiLFwiSW5kZXBlbmRlbnQgaU9TIERldmVsb3BlclwiLFwiVGVsZXN0cmVhbVwiXSxcImVkdWNhdGlvblwiOltcIldyaWdodCBTdGF0ZSBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiUGF1bCBTdHVhcnRcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yMDU0NjE3MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjY3NzcyJTJDVlNSUHRhcmdldElkJTNBMjA1NDYxNzIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJUU0UvRXNjYWxhdGlvbnN8dkNsb3VkU3VpdGV8dlNoaWVsZHxJbmZyYXN0cnVjdHVyZXxOZXR3b3JrfEZhdWx0fFN0b3JhZ2UgYXQgVk13YXJlXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBEZW52ZXIgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJWTXdhcmVUaW1lIFdhcm5lciBDYWJsZUFwcGxlIFJldGFpbFwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlZNd2FyZVwiLFwiSUJNIEdsb2JhbCBTZXJ2aWNlc1wiXSxcImVkdWNhdGlvblwiOltcIlBhcmsgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkF6aGFyIFNpa2FuZGVyXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjEwMzIwOTAmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTIxMDMyMDkwJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29mdHdhcmUgRW5naW5lZXIgaW4gVGVzdCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQmVudGxleSBTeXN0ZW1zXCIsXCJRd2VzdCBDb21tdW5pY2F0aW9uc1wiLFwiTlNJREMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gYXQgQm91bGRlclwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlJhbmppdCBNZW5vblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTI0MzMxNjg2JmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2vigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0EyNDMzMTY4NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBSZXNlYXJjaCBTY2llbnRpc3QsIEFwcGxlIE1hcHNcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiUGFjaWZpYyBHYXMgYW5kIEVsZWN0cmljIENvbXBhbnlcIixcIlNjaG5laWRlciBFbGVjdHJpY1wiLFwiVGVsdmVudCBNaW5lciAmIE1pbmVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiSW5kaWFuIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5LCBNYWRyYXNcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJMaWFuZyBXZWlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zMDEwMzU2MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjcwMTI5JTJDVlNSUHRhcmdldElkJTNBMzAxMDM1NjElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgRGF0YSBTY2llbnRpc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNoZWdnIEluYy5cIixcIkFtYXpvbi5jb21cIixcIkx1Y2lkIENvbW1lcmNlIChBY3F1aXJlZCBieSBBT0wgaW4gMjAxNClcIl0sXCJlZHVjYXRpb25cIjpbXCJUaGUgQ29sbGVnZSBvZiBXaWxsaWFtIGFuZCBNYXJ5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS3Jpc3RpbmEgR3VsaXNoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MzU2NjMzNTQmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTM1NjYzMzU0JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3RyYXRlZ2ljIFNvdXJjaW5nIE1hbmFnZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJVbml0ZWQgU3RhdGVzXCIsXCJpbmR1c3RyeVwiOlwiQ29uc3VtZXIgRWxlY3Ryb25pY3NcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiSm9obnMgTWFudmlsbGVcIixcIktvaGxlciBDby5cIixcIkJvcmdXYXJuZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IERlbnZlclwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlNvbmlhIFNhaW5pXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9Mzg0NzcyMjYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTM4NDc3MjI2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3IuIFFBIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJUaW1lIFdhcm5lciBDYWJsZVwiLFwiQ29tY2FzdFwiLFwiR3JlYndlYlwiXSxcImVkdWNhdGlvblwiOltcIlB1bmphYiBUZWNobmljYWwgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1pY2hhZWwgVHVybmVyXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NDIzNjExOTEmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTQyMzYxMTkxJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiaU9TICYgT1MgWCBTb2Z0d2FyZSBFbmdpbmVlclwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJXYXlJblwiLFwiVHJvcHB1cyBTb2Z0d2FyZSBDb3Jwb3JhdGlvblwiLFwiTmF0aW9uYWwgQW5hbHl0aWNzLCBJbmMuXCJdLFwiZWR1Y2F0aW9uXCI6W1wiQ29sb3JhZG8gU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkdlb3JnZSBLYWxhbmdpXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NTI5MDgwNTMmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTUyOTA4MDUzJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29mdHdhcmUgRW5naW5lZXIgVUkgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlSW5mb3N5c1wiLFwicGFzdFBvc2l0aW9uc1wiOltcIlVuaXZlcnNpdHkgb2YgTG91aXNpYW5hIGF0IExhZmF5ZXR0ZVwiLFwiSENMIFRlY2hub2xvZ2llc1wiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgTG91aXNpYW5hIGF0IExhZmF5ZXR0ZVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1hcmsgR291bGRzbWl0aFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTY0NzYxMjI1JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzAxMjklMkNWU1JQdGFyZ2V0SWQlM0E2NDc2MTIyNSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlRlY2hub2xvZ3kgKyBNZWRpYSBQcm9kdWN0aW9uXCIsXCJsb2NhdGlvblwiOlwiQXVzdGluLCBUZXhhcyBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiT25saW5lIE1lZGlhXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZWxlc2ZpcmUuY29tXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXBwbGVcIixcIkhhcnRlLUhhbmtzLCBJbmMuXCIsXCJQZWFrIFBlcmZvcm1lcnNcIl0sXCJlZHVjYXRpb25cIjpbXCJOZXcgTWV4aWNvIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJUcmV2b3IgU2hlcmlkYW5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD03MjExODY0MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxODQxMjcwMTI5JTJDVlNSUHRhcmdldElkJTNBNzIxMTg2NDIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdyb3Vwb25cIixcIlRyZXZvciBJbmNcIixcIlN1cmVpZnkuY29tXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJ2aW4gRGVsYSBDcnV6XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9ODIwNjEzOTcmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTg0MTI3MDEyOSUyQ1ZTUlB0YXJnZXRJZCUzQTgyMDYxMzk3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRW50ZXJwcmlzZSBTZXJ2aWNlcyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhY3JhbWVudG8sIENhbGlmb3JuaWEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkRlcHQgb2YgUmVhbCBFc3RhdGVcIixcIkNhbGlmb3JuaWEgU2VjcmV0YXJ5IG9mIFN0YXRlXCIsXCJFY2xpcHNlL0ludGVybG9jU29sdXRpb25zXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJBbml0YSBDaGVuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTEyNDY3NDY2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJuKApmQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMTEyNDY3NDY2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiTWVjaGFuaWNhbCBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBIYXJkd2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiS0xBLVRlbmNvclwiXSxcImVkdWNhdGlvblwiOltcIkdlb3JnaWEgSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3lcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJKb3NlIEFsZm9uc29cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMTUwMjA5OTYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksm4oCmZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0ExMTUwMjA5OTYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJVSS9VWCBEZXZlbG9wZXIgYXQgQXBwbGUgSW5jLlwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQ2VydGFpbiwgSW5jLlwiLFwiTWFzdGVyQ2FyZFwiLFwiTUhXLCBMdGQuXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVmFyaW91cyBTY2hvb2xzXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiRXJpYyBBc2VsXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTc3NTcxMzg3JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJuKApmQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMTc3NTcxMzg3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiR2VuaXVzIGF0IEFwcGxlIEluYy5cIixcImxvY2F0aW9uXCI6XCJTYW4gQW50b25pbywgVGV4YXMgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJUaGUgR2F0aGVyaW5nIENodXJjaEFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiR2F0ZXdheSBGZWxsb3dzaGlwIENodXJjaFwiLFwiRmlyc3QgQXNzZW1ibHkgb2YgR29kIENodXJjaFwiXSxcImVkdWNhdGlvblwiOltcIlRoZSBVbml2ZXJzaXR5IG9mIFRleGFzIGF0IFNhbiBBbnRvbmlvXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiUnlhbiBIZXdpdHRcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yNDUyMjYxODAmYXV0aFR5cGU9T1VUX09GX05FVFdPUksm4oCmZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0EyNDUyMjYxODAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJHZW5pdXMgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29uc3VtZXIgRWxlY3Ryb25pY3NcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlQXJhbWFya1wiLFwicGFzdFBvc2l0aW9uc1wiOltcIkFwcGxlXCIsXCJTaGFya3MgU3BvcnRzIGFuZCBFbnRlcnRhaW5tZW50XCJdLFwiZWR1Y2F0aW9uXCI6W1wiU2FuIEpvc2UgU3RhdGUgVW5pdmVyc2l0eVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkdyYWhhbSBQYXJraW5zb24tTW9yZ2FuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjY4MDI5MzI0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJuKApmQlM0EzNzE3MzgwMTYxNDIxODQxMjc0NzAwJTJDVlNSUHRhcmdldElkJTNBMjY4MDI5MzI0JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiSSB0dW5lIGlUdW5lc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJRdWFyayBTb2Z0d2FyZSBJbmMuXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBPeGZvcmRcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJDaHJpcyBTLlwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTExMDg4ODY3JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0ExMTA4ODg2NyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNpbGljb24gRW5naW5lZXJpbmcgU3RhZmYgQWR2aXNvclwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJTZW1pY29uZHVjdG9yc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcmlzdGEgTmV0d29ya3MsIEluYy5cIixcIkVyaWNzc29uXCIsXCJKdW5pcGVyIE5ldHdvcmtzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiQ2FsaWZvcm5pYSBTdGF0ZSBVbml2ZXJzaXR5LUNoaWNvXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS2VyaWUgRC5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD00NTQwNzE1JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMTg0MTI3NDcwMCUyQ1ZTUlB0YXJnZXRJZCUzQTQ1NDA3MTUlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgUmVjcnVpdGVyIC0gQXBwbGUgV2F0Y2gsIEhlYWx0aEtpdCBhbmQgbmF0aXZlIGFwcCB0ZWFtc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJIdW1hbiBSZXNvdXJjZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiSGl0YWNoaSBEYXRhIFN5c3RlbXNcIixcIldlYk1ldGhvZHNcIixcIlZlcmlTaWduXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDYWxpZm9ybmlhLCBTYW50YSBDcnV6XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSm9obiBUdXJuYmVyZ1wifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTc1ODY2MSZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZW7igKZjaElkJTNBMzcxNzM4MDE2MTQyMTg0MTI3NDcwMCUyQ1ZTUlB0YXJnZXRJZCUzQTc1ODY2MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlYXJjaGluZyBmb3IgZ3JlYXQgTWVjaGFuaWNhbCBFbmdpbmVlcnNcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW50ZXJuZXRcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiTGlua2VkSW5cIixcIkNvdW5zeWxcIixcIkpSQyBBc3NvY2lhdGVzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBNYXNzYWNodXNldHRzLCBBbWhlcnN0XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWF0dCBTLlwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE2OTA3NDMwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0ExNjkwNzQzMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIk1hbmFnZW1lbnQgQWR2aXNvciBhbmQgU2VuaW9yIExlY3R1cmVyXCIsXCJsb2NhdGlvblwiOlwiTWVsYm91cm5lIEFyZWEsIEF1c3RyYWxpYVwiLFwiaW5kdXN0cnlcIjpcIkNvbnN0cnVjdGlvblwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiVW5pdmVyc2l0eSBvZiBNZWxib3VybmVNY0dyYXctSGlsbCBQcm9mZXNzaW9uYWxTdGV2ZW5zIENvbnN0cnVjdGlvbiBJbnN0aXR1dGUsIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJVbml2ZXJzaXR5IG9mIEZsb3JpZGFcIixcIkZNSSBDb3Jwb3JhdGlvblwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgRmxvcmlkYVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlRpbSBFc3NlXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9Mzg3OTgzNyZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZeKApmhJZCUzQTM3MTczODAxNjE0MjE4NDEyNzQ3MDAlMkNWU1JQdGFyZ2V0SWQlM0EzODc5ODM3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiUmVjcnVpdGluZyBXb3JsZCBDbGFzcyBUYWxlbnQgRm9yIEFwcGxlIEluYy4gLSBDZXJ0aWZpZWQgTGlua2VkaW4gUmVjcnVpdGVyIENvYWNoIC0gQ2VydGlmaWVkIExpbmtlZGluIFJlY3J1aXRlciBFeHBlcnRcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIE1pbm5lYXBvbGlzLVN0LiBQYXVsIEFyZWFcIixcImluZHVzdHJ5XCI6XCJTdGFmZmluZyBhbmQgUmVjcnVpdGluZ1wifV19XG5cblxud2luZG93LmNhbGxUYWJBY3Rpb24gPSBmdW5jdGlvbiAodGFiSWQsIGFjdGlvbiwgY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHt0bzogJ2NvbnRlbnQnLCBhY3Rpb246IGFjdGlvbn07XG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIG1lc3NhZ2UsIGNhbGxiYWNrKVxufTtcblxud2luZG93LmdvID0gZnVuY3Rpb24gKHNldHRpbmdzKSB7XG5cbiAgICAvLyBmb3IgZGVidWdnaW5nXG4gICAgc2V0dGluZ3Muc2NyYXBlci5saW1pdCA9IDI5O1xuXG4gICAgdmFyIHJvdXRpbmUgPSBbXG4gICAgICAgIC8vc2NyYXBlci5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpLFxuICAgICAgICAvL2dldEJhc2ljSW5mby5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpXG4gICAgICAgIGdldE1pc3NpbmdOYW1lcy5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpXG4gICAgXTtcbiAgICByb3V0aW5lLnB1c2goZG9uZSk7XG5cbiAgICBhc3luYy5zZXJpZXMocm91dGluZSk7XG59O1xuXG5mdW5jdGlvbiBkb25lKCkge1xuICAgIGNvbnNvbGUudGFibGUocmVzdWx0cylcbn1cblxuLy92YXIgcGVybXV0ZXIgPSByZXF1aXJlKCcuL2VtYWlsUGVybXV0ZXIuanMnKTtcbi8vdmFyIGZpbmRfbGFzdF9uYW1lcyA9IHJlcXVpcmUoJy4vbGFzdF9uYW1lcy5qcycpO1xuLy92YXIgZW1haWxfdmVyaWZpZXIgPSByZXF1aXJlKCcuL2VtYWlsX2NoZWNrLmpzJyk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xNy8xNS5cbiAqL1xudmFyIGN1cnJlbnRXb3JraW5nVGFiO1xudmFyIGlzRmluaXNoZWQ7XG52YXIgcmVzdWx0cztcbnZhciBtYXN0ZXJDYWxsYmFjaztcbnZhciBzZXR0aW5ncztcbnZhciBpID0gMDtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuXG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldEJhc2ljSW5mbyhwZXJzb24pIHtcbiAgICBjdXJyZW50UGVyc29uID0gcGVyc29uO1xuICAgIGN1cnJlbnRQZXJzb24uY29tcGFueSA9IHNldHRpbmdzLmdlbmVyYWwuY29tcGFueU5hbWU7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYiB3aXRoIGxpbmsgYXJndW1lbnRcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogcGVyc29uLnByb2ZpbGVMaW5rfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjdXJyZW50V29ya2luZ1RhYiA9IHRhYjtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuICAgIGlmICh0YWJJZCA9PSBjdXJyZW50V29ya2luZ1RhYi5pZCAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIHJlcXVpcmVkIGRhdGEgZnJvbSB0aGUgdGFiXG4gICAgICAgIGNhbGxUYWJBY3Rpb24oY3VycmVudFdvcmtpbmdUYWIuaWQsIFwiZ2V0QmFzaWNJbmZvXCIsIGhhbmRsZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBqdXN0IHRvIGJlIHNhZmUsIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZSkge1xuXG4gICAgJC5leHRlbmQoY3VycmVudFBlcnNvbiwgcmVzcG9uc2UpO1xuXG4gICAgLypcbiAgICAgdmFyIG5hbWUuZnVsbCA9IHJlc3BvbnNlLm5hbWUuZnVsbC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgdmFyIGhlYWRsaW5lID0gcmVzcG9uc2UuaGVhZGxpbmU7XG5cbiAgICAgc3dpdGNoIChuYW1lLmZ1bGwpe1xuICAgICBjYXNlICdsaW5rZWRpbiBtZW1iZXInOlxuICAgICB9XG4gICAgICovXG4gICAgLy8gd2UncmUgZG9uZSB3aXRoIHRoZSB0YWIuIHJlbW92ZSBpdFxuICAgIGNocm9tZS50YWJzLnJlbW92ZShjdXJyZW50V29ya2luZ1RhYi5pZCk7XG5cbiAgICAvLyBkZWNpZGUgd2hldGhlciB0byBydW4gYWdhaW4gb3Igbm90XG4gICAgaWYgKGkgKyAxICE9IHJlc3VsdHMucGVvcGxlLmxlbmd0aCkge1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGl0ZXJhdGUoKSB7XG4gICAgZ2V0QmFzaWNJbmZvKHJlc3VsdHMucGVvcGxlW2krK10pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpc0ZpbmlzaGVkO1xuICAgIH0sXG4gICAgc3RhcnQ6IGluaXRcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzIxLzE1LlxuICovXG52YXIgc2V0dGluZ3MsIHJlc3VsdHMsIG1hc3RlckNhbGxiYWNrO1xudmFyIGkgPSAtMTtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBpdGVyYXRlKClcbn1cblxuZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBjdXJyZW50UGVyc29uID0gcmVzdWx0cy5wZW9wbGVbKytpXTtcbiAgICB2YXIgY3VycmVudFBlcnNvbkZ1bGxOYW1lID0gY3VycmVudFBlcnNvbi5uYW1lLmZ1bGw7XG5cbiAgICBpZiAoaXNOYW1lSGlkZGVuKGN1cnJlbnRQZXJzb25GdWxsTmFtZSkgfHwgaXNOYW1lQWJicmV2aWF0ZWQoY3VycmVudFBlcnNvbkZ1bGxOYW1lKSkge1xuICAgICAgICBnZXRNaXNzaW5nTmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGkgKyAxID09IHJlc3VsdHMucGVvcGxlLmxlbmd0aCkge1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaXRlcmF0ZSgpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRNaXNzaW5nTmFtZShjYWxsYmFjaykge1xuICAgIC8vZGVidWdnZXI7XG4gICAgdmFyIHNlYXJjaFRleHQgPSAoXG4gICAgXCJzaXRlOmxpbmtlZGluLmNvbSBcIiArXG4gICAgY3VycmVudFBlcnNvbi5oZWFkbGluZSArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5jdXJyZW50UG9zaXRpb24gKyAnICcgK1xuICAgIGN1cnJlbnRQZXJzb24ucGFzdFBvc2l0aW9ucy5qb2luKCcgJykgKyAnICcgK1xuICAgIGN1cnJlbnRQZXJzb24uZWR1Y2F0aW9uLmpvaW4oJyAnKSArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5jb21wYW55KS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEgJDInKTtcblxuICAgIHZhciB1cmwgPVxuICAgICAgICBcImh0dHA6Ly9nb29nbGUuY29tXCIgK1xuICAgICAgICBcIiNxPVwiICtcbiAgICAgICAgc2VhcmNoVGV4dDtcbiAgICB2YXIgdGFiaWQ7XG5cbiAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIodGFiVXBkYXRlZCk7XG5cbiAgICBmdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcblxuICAgICAgICBpZiAodGFiSWQgPT0gdGFiaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICBjYWxsVGFiQWN0aW9uKHRhYmlkLCBcImdldE5hbWVcIiwgZ29vZ2xlUmVzdWx0UmVzcG9uc2UpO1xuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ29vZ2xlUmVzdWx0UmVzcG9uc2UobmFtZSkge1xuICAgICAgICBjb25zb2xlLnRhYmxlKG5hbWUpXG4gICAgICAgIGN1cnJlbnRQZXJzb24ubmFtZS5sYXN0ID0gbmFtZTtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYmlkKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogdXJsfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICB0YWJpZCA9IHRhYi5pZDtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaXNOYW1lSGlkZGVuKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS50cmltKCkudG9Mb3dlckNhc2UoKSA9PSBcImxpbmtlZGluIG1lbWJlclwiXG59XG5cbmZ1bmN0aW9uIGlzTmFtZUFiYnJldmlhdGVkKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5pbmRleE9mKCcuJykgIT0gLTFcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxMi8xMy8xNC5cbiAqL1xuLy8gcmVzdWx0c1xuXG4vLyBzY3JhcGUgc3RhdHVzXG52YXIgcnVubmluZyA9IGZhbHNlO1xuXG52YXIgc2NyYXBlX3RhYiA9IDA7XG5cbnZhciBzZXR0aW5ncztcbnZhciBtYXN0ZXJDYWxsYmFjaztcblxudmFyIGlzRmluaXNoZWQgPSBmYWxzZTtcblxudmFyIHN0YXR1cyA9IHt9O1xudmFyIHJlc3VsdHM7XG5cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZShzZXR0aW5nc0FyZywgcmVzdWx0c0FyZywgY2FsbGJhY2tBcmcpIHtcbiAgICAvL2luaXRpYWxpemF0aW9uXG4gICAgcnVubmluZyA9IHRydWU7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHN0YXJ0KCk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGZ1bmN0aW9uIGdldEJhdGNoKGNhbGxiYWNrKSB7XG4gICAgICAgIGFzeW5jLnNlcmllcyhbXG4gICAgICAgICAgICBjcmVhdGVfc2NyYXBlX3RhYixcbiAgICAgICAgICAgIGdldFByb2ZpbGVMaW5rcyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUoc2NyYXBlX3RhYik7XG4gICAgICAgIHNjcmFwZV90YWIgPSBmYWxzZTtcbiAgICAgICAgaXNGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgLy8gcHJvZ3JhbSBjb250cm9sXG4gICAgZnVuY3Rpb24gY29udHJvbGxlcigpIHtcbiAgICAgICAgZ2V0QmF0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHN0YXR1cy5kb25lKSB7XG4gICAgICAgICAgICAgICAgZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGdldEJhdGNoKGNvbnRyb2xsZXIpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29udHJvbGxlcigpO1xufVxuXG4vLyBjcmVhdGVzIGEgdGFiIHdlJ2xsIHVzZSBmb3Igc2NyZWVuIHNjcmFwaW5nXG5mdW5jdGlvbiBjcmVhdGVfc2NyYXBlX3RhYihjYWxsYmFjaykge1xuICAgIGlmIChzY3JhcGVfdGFiKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXJsID1cbiAgICAgICAgJ2h0dHA6Ly9saW5rZWRpbi5jb20vJyArXG4gICAgICAgICd2c2VhcmNoLycgK1xuICAgICAgICAncD90aXRsZT0nICsgc2V0dGluZ3MuZ2VuZXJhbC5wb3NpdGlvbkZpbHRlciArXG4gICAgICAgICcmZl9DQz0nICsgc2V0dGluZ3MuZ2VuZXJhbC5Db21wYW55SURzICtcbiAgICAgICAgJyZvcGVuQWR2YW5jZWRGb3JtPXRydWUmdGl0bGVTY29wZT1DJmxvY2F0aW9uVHlwZT1JJztcblxuICAgIC8vIGNyZWF0ZSB0aGUgdGFiXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHVybH0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgc2NyYXBlX3RhYiA9IHRhYi5pZDtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHdhaXRGb3JUYWIpXG4gICAgfSk7XG5cbiAgICAvLyBhZnRlciB0YWIgY3JlYXRpb24gcmV0dXJuIGNvbnRyb2wgdG8gdGhlIGNhbGxpbmcgZnVuY3Rpb25cbiAgICBmdW5jdGlvbiB3YWl0Rm9yVGFiKHRhYklkLCBpbmZvKSB7XG4gICAgICAgIGlmIChpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYikge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHdhaXRGb3JUYWIpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFByb2ZpbGVMaW5rcyhjYWxsYmFjaykge1xuICAgIC8vIGFzayBjb250ZW50IHNjcmlwdCBmb3IgYWxsIHRoZSBwcm9maWxlIGxpbmtzIG9uIHRoZSBwYWdlXG4gICAgY2FsbFRhYkFjdGlvbihzY3JhcGVfdGFiLCAnc2NyYXBlUHJvZmlsZUxpc3QnLCBwcm9jZXNzTGlua0JhdGNoKTtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NMaW5rQmF0Y2gocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgcmVzcG9uc2UgaXMgZW1wdHksIHdlIGhhdmUgYW4gaXNzdWVcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVzcG9uc2UgZm9yIHByb2Nlc3NMaW5rQmF0Y2ggaXM6XCIgKyByZXNwb25zZS5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFzTmV4dFBhZ2UgPSByZXNwb25zZS5oYXNOZXh0UGFnZTtcbiAgICAgICAgdmFyIGxpbWl0ID0gc2V0dGluZ3Muc2NyYXBlci5saW1pdDtcblxuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gbW9yZSBwYWdlcywgd2UncmUgZG9uZSFcbiAgICAgICAgaWYgKCFoYXNOZXh0UGFnZSkge1xuICAgICAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgd2UncmUgZ3VhcmFudGVlZCB0byBoYXZlIGEgcmVzcG9uc2UgYW5kIGEgbmV4dCBwYWdlLiB3ZSdsbCBjaGVjayBhIGZldyB0aGluZ3MgYW5kIGtlZXAgZ29pbmdcbiAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UucmVzdWx0cy5sZW5ndGggIT0gMCkge1xuXG4gICAgICAgICAgICAvLyBjb25jYXRlbmF0ZSB0aGUgcmVzcG9uc2UgdG8gb3VyIGV4aXN0aW5nIGFycmF5XG4gICAgICAgICAgICByZXN1bHRzLnBlb3BsZSA9IHJlc3VsdHMucGVvcGxlLmNvbmNhdChyZXNwb25zZS5yZXN1bHRzKTtcblxuXG4gICAgICAgICAgICBpZiAocmVzdWx0cy5wZW9wbGUubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzLmRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZSh7dXJsOiBcImh0dHA6Ly9cIiArIHJlc3BvbnNlLm5leHRQYWdlfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBwYWdlQ2hhbmdlKHRhYklkLCBpbmZvLCB0YWIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSB0YWIudXJsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXJsICE9IHVuZGVmaW5lZCAmJiB0YWJJZCA9PSBzY3JhcGVfdGFiICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYWdlIGRvbmUgbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIocGFnZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZWFjaGVkIGVsc2Ugc3RhdGVtZW50IGluIHByb2Nlc3NMaW5rQmF0Y2gnKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vIHN0b3BzIG1vZHVsZSBvbiBjYW5jZWxTY3JhcGUgZXZlbnRcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2FuY2VsU2NyYXBlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBzdG9wKCk7XG59KTtcblxuLy8gdGhlIGFwaSBmb3IgdGhpcyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0aWFsaXplLFxuICAgIHByb2ZpbGVMaW5rczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5wcm9maWxlTGlua3NcbiAgICB9LFxuICAgIGlzRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzRmluaXNoZWRcbiAgICB9XG59O1xuXG5cbmZ1bmN0aW9uIGxvZyhtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcbn1cblxuIl19
