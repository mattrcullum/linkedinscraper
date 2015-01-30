(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.helpers = require('../helpers');

var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');
var getMissingNames = require('./getMissingNames.js');
var permuteEmails = require('./permuteEmails.js');
var validateEmails = require('./validateEmails.js');

window.results = {
    people: []
};

window.queue = [];

// sample results from getBasicInfo
//window.results = {"people":[{"name":{"full":"Eric Kimberley"},"profileLink":"https://www.linkedin.com/profile/view?id=14960442&authType=OUT_OF_NETWORK&a…Id%3A3717380161422032549802%2CVSRPtargetId%3A14960442%2CVSRPcmpt%3Aprimary","headline":"Lead Sitecore .NET Architect / Developer at RBA, Inc.","location":"Greater Denver Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"RBA Consulting (contract)","pastPositions":["Godfrey (contract)","Adecco Staffing (contract)","Mayo Clinic (contract)"],"education":["University of Minnesota-Twin Cities"]},{"name":{"full":"Ramon Guerrero"},"profileLink":"https://www.linkedin.com/profile/view?id=106942766&authType=OUT_OF_NETWORK&…d%3A3717380161422032549802%2CVSRPtargetId%3A106942766%2CVSRPcmpt%3Aprimary","headline":"Consultant at RBA Consulting","location":"Greater Denver Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"","pastPositions":["NGenius Games","ACT Conferencing","Fujitsu Consulting"],"education":[]},{"name":{"full":"LuAnne M."},"profileLink":"https://www.linkedin.com/profile/view?id=8269175&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A8269175%2CVSRPcmpt%3Aprimary","headline":"Executive Assistant at RBA Consulting","location":"Dallas/Fort Worth Area","industry":"Internet","company":"RBA, Inc.","currentPosition":"","pastPositions":["HDVMS (True.com, AdShuffle, Metric Interactive, & H.D. Vest Investigations)"],"education":[]},{"name":{"full":"Phil W."},"profileLink":"https://www.linkedin.com/profile/view?id=12717151&authType=OUT_OF_NETWORK&a…Id%3A3717380161422032549802%2CVSRPtargetId%3A12717151%2CVSRPcmpt%3Aprimary","headline":"Regional Practice Manager at RBA, Inc.","location":"Greater Minneapolis-St. Paul Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"","pastPositions":["RBA, Inc.","O'Reilly Media","Manning Publications Co."],"education":["University of St. Thomas"]},{"name":{"full":"Clara Sponitz"},"profileLink":"https://www.linkedin.com/profile/view?id=4846586&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A4846586%2CVSRPcmpt%3Aprimary","headline":"Senior Recruiter","location":"Greater Minneapolis-St. Paul Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["RBA Consulting","Tech-Pro","Compuware Corporation"],"education":["University of Minnesota-Twin Cities"]},{"name":{"full":"Michael Lawrence"},"profileLink":"https://www.linkedin.com/profile/view?id=1263302&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A1263302%2CVSRPcmpt%3Aprimary","headline":"Senior Recruiter @ RBA","location":"Dallas/Fort Worth Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["Gold's Gym International","BearingPoint","Buchanan Associates"],"education":[]},{"name":{"full":"Wm Andrew G."},"profileLink":"https://www.linkedin.com/profile/view?id=1111149&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A1111149%2CVSRPcmpt%3Aprimary","headline":"Social Strategy at RBA, Inc., Enterprise Gamification Strategy, Portals and Collaboration Strategy","location":"Dallas/Fort Worth Area","industry":"Financial Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.Iron Horse Lacrosse","pastPositions":["Citi","Clear Alliances","Slalom Consulting"],"education":["Texas State University-San Marcos"]},{"name":{"full":"Craig Jonas"},"profileLink":"https://www.linkedin.com/profile/view?id=1641241&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A1641241%2CVSRPcmpt%3Aprimary","headline":"Sr. IT Recruiter at RBA, Inc.","location":"Greater Minneapolis-St. Paul Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["BORN/Fujitsu Consulting","BORN"],"education":["St. Cloud State University"]},{"name":{"full":"Jake Estares"},"profileLink":"https://www.linkedin.com/profile/view?id=4541983&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A4541983%2CVSRPcmpt%3Aprimary","headline":"Account Executive at RBA Consulting","location":"Greater Denver Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"","pastPositions":["Neudesic","Statera","Accelerated Network Solutions"],"education":["University of Northern Colorado"]},{"name":{"full":"Jay L."},"profileLink":"https://www.linkedin.com/profile/view?id=8869158&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A8869158%2CVSRPcmpt%3Aprimary","headline":"Dynamics CRM Practice Director & Microsoft Alliance Director","location":"Greater Minneapolis-St. Paul Area","industry":"Information Technology and Services"}]}

//window.results = {"people":[{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=6190386&authType=OUT_OF_NETWORK&au…hId%3A3717380161422214581194%2CVSRPtargetId%3A6190386%2CVSRPcmpt%3Aprimary","headline":"Director, Business Development at CM Labs Simulations Inc.","location":"Ottawa, Canada Area","industry":"Information Technology and Services"},{"name":{"first":"Véronique","last":"Turcotte"},"profileLink":"https://www.linkedin.com/profile/view?id=7906775&authType=OPENLINK&authToke…hId%3A3717380161422214581194%2CVSRPtargetId%3A7906775%2CVSRPcmpt%3Aprimary","headline":"HR Manager at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Information Technology and Services","company":"CM Labs Simulations Inc.","currentPosition":"CMLabs Simulations Inc.","pastPositions":["Averna","Unixel / Groupe Conseil PRI","SAP Labs"],"education":["HEC Montréal"]},{"name":{"first":"Arnold"},"profileLink":"https://www.linkedin.com/profile/view?id=21554&authType=OUT_OF_NETWORK&auth…rchId%3A3717380161422214581194%2CVSRPtargetId%3A21554%2CVSRPcmpt%3Aprimary","headline":"Chief Operating Officer","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"CMLabs Simulations Inc.","pastPositions":["Metix Software (now BuildIT Software and Solutions)","MAYA","Unitied Dominion Industries (now SPX Corporation)"],"education":["University of Cambridge"]},{"name":{"first":"Bob"},"profileLink":"https://www.linkedin.com/profile/view?id=38172606&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A38172606%2CVSRPcmpt%3Aprimary","headline":"Software Team Manager at CMLabs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["Codengineer","Ludia","Resonant Medical (now part of Elekta)"],"education":["Université de Montréal - Ecole polytechnique de Montréal"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=23108188&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A23108188%2CVSRPcmpt%3Aprimary","headline":"VP Product Development at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["CM Labs Simulations Inc.","Averna","Nakisa"],"education":["Lycée de la Communication"]},{"name":{"first":"Nicolas"},"profileLink":"https://www.linkedin.com/profile/view?id=25871474&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A25871474%2CVSRPcmpt%3Aprimary","headline":"Engineering Content Manager at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["CM Labs Simulations Inc.","Bombardier Aerospace","CAE"],"education":["HEC Montréal"]},{"name":{"first":"Sylvain"},"profileLink":"https://www.linkedin.com/profile/view?id=9267405&authType=OUT_OF_NETWORK&au…hId%3A3717380161422214581194%2CVSRPtargetId%3A9267405%2CVSRPcmpt%3Aprimary","headline":"Team Lead Software Platform at CMLabs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["Autodesk","Discreet Logic","Ericsson"],"education":["Université de Sherbrooke"]},{"name":{"first":"Robert","last":"Weldon"},"profileLink":"https://www.linkedin.com/profile/view?id=18226186&authType=OPENLINK&authTok…Id%3A3717380161422214581194%2CVSRPtargetId%3A18226186%2CVSRPcmpt%3Aprimary","headline":"CEO at CMLabs Simulations","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["MathEngine","PostLinear Entertainment","Velocity Games"],"education":["New England College"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=642854&authType=OUT_OF_NETWORK&aut…chId%3A3717380161422214581194%2CVSRPtargetId%3A642854%2CVSRPcmpt%3Aprimary","headline":"Account Manager at CM Labs","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["Nakisa","GELcore","Positron Public Safety Systems"],"education":["McGill University"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=13558697&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A13558697%2CVSRPcmpt%3Aprimary","headline":"Vice President Finances & Operations at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["CMLabs Simulations Inc.","Averna","Forensic Technology"],"education":["Université de Montréal - Ecole polytechnique de Montréal"]}]}
window.callTabAction = function (tabId, action, callback, args) {
    var message = {to: 'content', action: action, args: args};
    chrome.tabs.sendMessage(tabId, message, callback)
};

window.go = function (settings) {
    console.table(queue);
    return;
    // for debugging
    //settings.scraper.limit = 10000;
    //settings.scraper.limit = 9;
    var i = 0;
    var currentCompany = queue[i];

    var routine = [
        scraper.start.bind(undefined, settings, results),
        getBasicInfo.start.bind(undefined, settings, results),
        getMissingNames.start.bind(undefined, settings, results)
    ];

    /*if (settings.general.getEmails) {
     routine.push(
     permuteEmails.start.bind(undefined, settings, results),
     validateEmails.start.bind(undefined, settings, results)
     )
     }*/

    routine.push(done);

    async.series(routine);

    function done() {
        if(queue[++i]){
            currentCompany = queue[i];
            async.series(routine)
        }
        else{
            window.isFinished = true;
        }
    }
};

chrome.runtime.onMessage.addListener(function (message) {
    if (message.action == "openApp") {
        if (results) {
            chrome.tabs.create({url: message.path})
        }
    }
});

//var permuter = require('./permuteEmails.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');
},{"../helpers":7,"./getBasicInfo.js":2,"./getMissingNames.js":3,"./permuteEmails.js":4,"./scraper.js":5,"./validateEmails.js":6}],2:[function(require,module,exports){
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
    if (!currentPerson) {
        debugger;
    }
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
    getBasicInfo(results.people[++i]);
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
    var currentName = currentPerson.name;
    var currentPersonFullName = currentPerson.name.full;

    if (i == results.people.length) {
        masterCallback();
        return;
    }

    if (currentName.isHidden || !currentName.last) {
        getMissingName(function () {
            iterate();
        })
    }
    else {
        /*var fullNameSplit = currentPersonFullName.split('|')[0].split(' ');
         currentPerson.name.first = fullNameSplit[0];
         currentPerson.name.last = fullNameSplit[1];*/
        iterate()
    }
}

function getMissingName(callback) {
    if (!(currentPerson &&
        currentPerson.headline &&
        currentPerson.pastPositions &&
        currentPerson.education &&
        currentPerson.company)) {
        callback();
        return;
    }
    //debugger;
    var searchText =
        "site:linkedin.com " +
        (currentPerson.name.first ? currentPerson.name.first + ' ' : '') +
        (currentPerson.name.last ? currentPerson.name.last + ' ' : '') +
        currentPerson.headline + ' ' +
        currentPerson.pastPositions.join(' ') + ' ' +
        currentPerson.education.join(' ') + ' ';
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
        if (name && name.first && name.last) {
            currentPerson.name = name;
        }
        chrome.tabs.remove(tabid);
        callback();
    }


    chrome.tabs.create({url: url}, function (tab) {
        tabid = tab.id;
    });
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


},{}],6:[function(require,module,exports){
/**
 * Created by matthew on 1/22/15.
 */
var settings, results, masterCallback;
var gmailTab;
var currentPerson;
var successfulEmailFormats = [];
var emailFound = false;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    validateEmails();
}

function validateEmails() {
    var i = -1;

    async.series([
        createGmailTab,
        nextPerson
    ]);

    function nextPerson() {

        currentPerson = results.people[++i];
        if (currentPerson) {


            if (currentPerson.possibleEmails) {
                async.series([
                    composeEmail,
                    findCurrentPersonsEmail,
                    nextPerson
                ])
            }
            else {
                nextPerson();
            }
        }
        else {
            masterCallback();
        }
    }
}

function createGmailTab(callback) {
    chrome.tabs.create({url: "https://google.com"}, function (tab) {
        gmailTab = tab.id;
        setTimeout(callback, 2500);
    })
}

function findCurrentPersonsEmail(callback) {

    // these are the email combinations we permuted in the previous step
    var possibleEmails = currentPerson.possibleEmails;

    if (successfulEmailFormats.length) {
        $.each(successfulEmailFormats.reverse(), function (index, item) {
            possibleEmails.move(item, 0)
        })
    }

    var i = 0;

    function tryVariation() {
        // decide on what email to try next
        var email = possibleEmails[i++];

        if (email) {

            email = convertStringToAscii(email);

            callTabAction(gmailTab, 'tryEmail', processResponse, {email: email, name: currentPerson.name});

            function processResponse(response) {
                if (response) {
                    if (response.correct) {
                        currentPerson.email = email;
                    }
                    else {
                        composeEmail(tryVariation());
                    }
                }
            }
        }
        else {
            callback()
        }
    }

    tryVariation();
}

function composeEmail(callback) {
    console.log('compose email');

    function waitForLoad() {
        console.log('callback in 5s');
        setTimeout(callback, 3000);
    }

    chrome.tabs.update(gmailTab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, waitForLoad)
}

function convertStringToAscii(email) {

    //Convert Characters
    return email
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/é/g, 'e');
}

module.exports = {
    start: init
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
},{}],7:[function(require,module,exports){
/**
 * Created by matthew on 1/24/15.
 */
// utilities
module.exports = {
    hasChar: function (string, char) {
        return string.indexOf(char) != -1;
    }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvZ2V0TWlzc2luZ05hbWVzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9wZXJtdXRlRW1haWxzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9zY3JhcGVyLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC92YWxpZGF0ZUVtYWlscy5qcyIsImFwcC9zY3JpcHRzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5oZWxwZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xuXG52YXIgc2NyYXBlciA9IHJlcXVpcmUoJy4vc2NyYXBlci5qcycpO1xudmFyIGdldEJhc2ljSW5mbyA9IHJlcXVpcmUoJy4vZ2V0QmFzaWNJbmZvLmpzJyk7XG52YXIgZ2V0TWlzc2luZ05hbWVzID0gcmVxdWlyZSgnLi9nZXRNaXNzaW5nTmFtZXMuanMnKTtcbnZhciBwZXJtdXRlRW1haWxzID0gcmVxdWlyZSgnLi9wZXJtdXRlRW1haWxzLmpzJyk7XG52YXIgdmFsaWRhdGVFbWFpbHMgPSByZXF1aXJlKCcuL3ZhbGlkYXRlRW1haWxzLmpzJyk7XG5cbndpbmRvdy5yZXN1bHRzID0ge1xuICAgIHBlb3BsZTogW11cbn07XG5cbndpbmRvdy5xdWV1ZSA9IFtdO1xuXG4vLyBzYW1wbGUgcmVzdWx0cyBmcm9tIGdldEJhc2ljSW5mb1xuLy93aW5kb3cucmVzdWx0cyA9IHtcInBlb3BsZVwiOlt7XCJuYW1lXCI6e1wiZnVsbFwiOlwiRXJpYyBLaW1iZXJsZXlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNDk2MDQ0MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIyMDMyNTQ5ODAyJTJDVlNSUHRhcmdldElkJTNBMTQ5NjA0NDIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJMZWFkIFNpdGVjb3JlIC5ORVQgQXJjaGl0ZWN0IC8gRGV2ZWxvcGVyIGF0IFJCQSwgSW5jLlwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgRGVudmVyIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiUkJBLCBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlJCQSBDb25zdWx0aW5nIChjb250cmFjdClcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHb2RmcmV5IChjb250cmFjdClcIixcIkFkZWNjbyBTdGFmZmluZyAoY29udHJhY3QpXCIsXCJNYXlvIENsaW5pYyAoY29udHJhY3QpXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBNaW5uZXNvdGEtVHdpbiBDaXRpZXNcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJSYW1vbiBHdWVycmVyb1wifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEwNjk0Mjc2NiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSybigKZkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTEwNjk0Mjc2NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkNvbnN1bHRhbnQgYXQgUkJBIENvbnN1bHRpbmdcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIERlbnZlciBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJOR2VuaXVzIEdhbWVzXCIsXCJBQ1QgQ29uZmVyZW5jaW5nXCIsXCJGdWppdHN1IENvbnN1bHRpbmdcIl0sXCJlZHVjYXRpb25cIjpbXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkx1QW5uZSBNLlwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTgyNjkxNzUmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXXigKZoSWQlM0EzNzE3MzgwMTYxNDIyMDMyNTQ5ODAyJTJDVlNSUHRhcmdldElkJTNBODI2OTE3NSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkV4ZWN1dGl2ZSBBc3Npc3RhbnQgYXQgUkJBIENvbnN1bHRpbmdcIixcImxvY2F0aW9uXCI6XCJEYWxsYXMvRm9ydCBXb3J0aCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW50ZXJuZXRcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJIRFZNUyAoVHJ1ZS5jb20sIEFkU2h1ZmZsZSwgTWV0cmljIEludGVyYWN0aXZlLCAmIEguRC4gVmVzdCBJbnZlc3RpZ2F0aW9ucylcIl0sXCJlZHVjYXRpb25cIjpbXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlBoaWwgVy5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMjcxNzE1MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIyMDMyNTQ5ODAyJTJDVlNSUHRhcmdldElkJTNBMTI3MTcxNTElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJSZWdpb25hbCBQcmFjdGljZSBNYW5hZ2VyIGF0IFJCQSwgSW5jLlwiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgTWlubmVhcG9saXMtU3QuIFBhdWwgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJSQkEsIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiUkJBLCBJbmMuXCIsXCJPJ1JlaWxseSBNZWRpYVwiLFwiTWFubmluZyBQdWJsaWNhdGlvbnMgQ28uXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBTdC4gVGhvbWFzXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQ2xhcmEgU3Bvbml0elwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQ4NDY1ODYmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2XigKZoSWQlM0EzNzE3MzgwMTYxNDIyMDMyNTQ5ODAyJTJDVlNSUHRhcmdldElkJTNBNDg0NjU4NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBSZWNydWl0ZXJcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIE1pbm5lYXBvbGlzLVN0LiBQYXVsIEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiUkJBLCBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlJCQSwgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlJCQSBDb25zdWx0aW5nXCIsXCJUZWNoLVByb1wiLFwiQ29tcHV3YXJlIENvcnBvcmF0aW9uXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBNaW5uZXNvdGEtVHdpbiBDaXRpZXNcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNaWNoYWVsIExhd3JlbmNlXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTI2MzMwMiZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZeKApmhJZCUzQTM3MTczODAxNjE0MjIwMzI1NDk4MDIlMkNWU1JQdGFyZ2V0SWQlM0ExMjYzMzAyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU2VuaW9yIFJlY3J1aXRlciBAIFJCQVwiLFwibG9jYXRpb25cIjpcIkRhbGxhcy9Gb3J0IFdvcnRoIEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiUkJBLCBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlJCQSwgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdvbGQncyBHeW0gSW50ZXJuYXRpb25hbFwiLFwiQmVhcmluZ1BvaW50XCIsXCJCdWNoYW5hbiBBc3NvY2lhdGVzXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJXbSBBbmRyZXcgRy5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMTExMTQ5JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTExMTExNDklMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTb2NpYWwgU3RyYXRlZ3kgYXQgUkJBLCBJbmMuLCBFbnRlcnByaXNlIEdhbWlmaWNhdGlvbiBTdHJhdGVneSwgUG9ydGFscyBhbmQgQ29sbGFib3JhdGlvbiBTdHJhdGVneVwiLFwibG9jYXRpb25cIjpcIkRhbGxhcy9Gb3J0IFdvcnRoIEFyZWFcIixcImluZHVzdHJ5XCI6XCJGaW5hbmNpYWwgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJSQkEsIEluYy5Jcm9uIEhvcnNlIExhY3Jvc3NlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQ2l0aVwiLFwiQ2xlYXIgQWxsaWFuY2VzXCIsXCJTbGFsb20gQ29uc3VsdGluZ1wiXSxcImVkdWNhdGlvblwiOltcIlRleGFzIFN0YXRlIFVuaXZlcnNpdHktU2FuIE1hcmNvc1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkNyYWlnIEpvbmFzXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTY0MTI0MSZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZeKApmhJZCUzQTM3MTczODAxNjE0MjIwMzI1NDk4MDIlMkNWU1JQdGFyZ2V0SWQlM0ExNjQxMjQxJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3IuIElUIFJlY3J1aXRlciBhdCBSQkEsIEluYy5cIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIE1pbm5lYXBvbGlzLVN0LiBQYXVsIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiUkJBLCBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlJCQSwgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkJPUk4vRnVqaXRzdSBDb25zdWx0aW5nXCIsXCJCT1JOXCJdLFwiZWR1Y2F0aW9uXCI6W1wiU3QuIENsb3VkIFN0YXRlIFVuaXZlcnNpdHlcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJKYWtlIEVzdGFyZXNcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD00NTQxOTgzJmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2tl4oCmaElkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTQ1NDE5ODMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJBY2NvdW50IEV4ZWN1dGl2ZSBhdCBSQkEgQ29uc3VsdGluZ1wiLFwibG9jYXRpb25cIjpcIkdyZWF0ZXIgRGVudmVyIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiUkJBLCBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk5ldWRlc2ljXCIsXCJTdGF0ZXJhXCIsXCJBY2NlbGVyYXRlZCBOZXR3b3JrIFNvbHV0aW9uc1wiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgTm9ydGhlcm4gQ29sb3JhZG9cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJKYXkgTC5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD04ODY5MTU4JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTg4NjkxNTglMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJEeW5hbWljcyBDUk0gUHJhY3RpY2UgRGlyZWN0b3IgJiBNaWNyb3NvZnQgQWxsaWFuY2UgRGlyZWN0b3JcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIE1pbm5lYXBvbGlzLVN0LiBQYXVsIEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wifV19XG5cbi8vd2luZG93LnJlc3VsdHMgPSB7XCJwZW9wbGVcIjpbe1wibmFtZVwiOntcImlzSGlkZGVuXCI6dHJ1ZX0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD02MTkwMzg2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMjIxNDU4MTE5NCUyQ1ZTUlB0YXJnZXRJZCUzQTYxOTAzODYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJEaXJlY3RvciwgQnVzaW5lc3MgRGV2ZWxvcG1lbnQgYXQgQ00gTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJsb2NhdGlvblwiOlwiT3R0YXdhLCBDYW5hZGEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCJ9LHtcIm5hbWVcIjp7XCJmaXJzdFwiOlwiVsOpcm9uaXF1ZVwiLFwibGFzdFwiOlwiVHVyY290dGVcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD03OTA2Nzc1JmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2tl4oCmaElkJTNBMzcxNzM4MDE2MTQyMjIxNDU4MTE5NCUyQ1ZTUlB0YXJnZXRJZCUzQTc5MDY3NzUlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJIUiBNYW5hZ2VyIGF0IENNIExhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwibG9jYXRpb25cIjpcIk1vbnRyZWFsLCBDYW5hZGEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJDTSBMYWJzIFNpbXVsYXRpb25zIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQ01MYWJzIFNpbXVsYXRpb25zIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBdmVybmFcIixcIlVuaXhlbCAvIEdyb3VwZSBDb25zZWlsIFBSSVwiLFwiU0FQIExhYnNcIl0sXCJlZHVjYXRpb25cIjpbXCJIRUMgTW9udHLDqWFsXCJdfSx7XCJuYW1lXCI6e1wiZmlyc3RcIjpcIkFybm9sZFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTIxNTU0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF1dGjigKZyY2hJZCUzQTM3MTczODAxNjE0MjIyMTQ1ODExOTQlMkNWU1JQdGFyZ2V0SWQlM0EyMTU1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkNoaWVmIE9wZXJhdGluZyBPZmZpY2VyXCIsXCJsb2NhdGlvblwiOlwiTW9udHJlYWwsIENhbmFkYSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkNNIExhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJDTUxhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk1ldGl4IFNvZnR3YXJlIChub3cgQnVpbGRJVCBTb2Z0d2FyZSBhbmQgU29sdXRpb25zKVwiLFwiTUFZQVwiLFwiVW5pdGllZCBEb21pbmlvbiBJbmR1c3RyaWVzIChub3cgU1BYIENvcnBvcmF0aW9uKVwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ2FtYnJpZGdlXCJdfSx7XCJuYW1lXCI6e1wiZmlyc3RcIjpcIkJvYlwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4MTcyNjA2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjIyMTQ1ODExOTQlMkNWU1JQdGFyZ2V0SWQlM0EzODE3MjYwNiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIFRlYW0gTWFuYWdlciBhdCBDTUxhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwibG9jYXRpb25cIjpcIk1vbnRyZWFsLCBDYW5hZGEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJDTSBMYWJzIFNpbXVsYXRpb25zIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQ29kZW5naW5lZXJcIixcIkx1ZGlhXCIsXCJSZXNvbmFudCBNZWRpY2FsIChub3cgcGFydCBvZiBFbGVrdGEpXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0w6kgZGUgTW9udHLDqWFsIC0gRWNvbGUgcG9seXRlY2huaXF1ZSBkZSBNb250csOpYWxcIl19LHtcIm5hbWVcIjp7XCJpc0hpZGRlblwiOnRydWV9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjMxMDgxODgmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMjIxNDU4MTE5NCUyQ1ZTUlB0YXJnZXRJZCUzQTIzMTA4MTg4JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVlAgUHJvZHVjdCBEZXZlbG9wbWVudCBhdCBDTSBMYWJzIFNpbXVsYXRpb25zIEluYy5cIixcImxvY2F0aW9uXCI6XCJNb250cmVhbCwgQ2FuYWRhIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQ00gTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNNIExhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwiQXZlcm5hXCIsXCJOYWtpc2FcIl0sXCJlZHVjYXRpb25cIjpbXCJMeWPDqWUgZGUgbGEgQ29tbXVuaWNhdGlvblwiXX0se1wibmFtZVwiOntcImZpcnN0XCI6XCJOaWNvbGFzXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjU4NzE0NzQmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMjIxNDU4MTE5NCUyQ1ZTUlB0YXJnZXRJZCUzQTI1ODcxNDc0JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRW5naW5lZXJpbmcgQ29udGVudCBNYW5hZ2VyIGF0IENNIExhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwibG9jYXRpb25cIjpcIk1vbnRyZWFsLCBDYW5hZGEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJDTSBMYWJzIFNpbXVsYXRpb25zIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQ00gTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJCb21iYXJkaWVyIEFlcm9zcGFjZVwiLFwiQ0FFXCJdLFwiZWR1Y2F0aW9uXCI6W1wiSEVDIE1vbnRyw6lhbFwiXX0se1wibmFtZVwiOntcImZpcnN0XCI6XCJTeWx2YWluXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9OTI2NzQwNSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdeKApmhJZCUzQTM3MTczODAxNjE0MjIyMTQ1ODExOTQlMkNWU1JQdGFyZ2V0SWQlM0E5MjY3NDA1JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVhbSBMZWFkIFNvZnR3YXJlIFBsYXRmb3JtIGF0IENNTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJsb2NhdGlvblwiOlwiTW9udHJlYWwsIENhbmFkYSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkNNIExhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBdXRvZGVza1wiLFwiRGlzY3JlZXQgTG9naWNcIixcIkVyaWNzc29uXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0w6kgZGUgU2hlcmJyb29rZVwiXX0se1wibmFtZVwiOntcImZpcnN0XCI6XCJSb2JlcnRcIixcImxhc3RcIjpcIldlbGRvblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE4MjI2MTg2JmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2vigKZJZCUzQTM3MTczODAxNjE0MjIyMTQ1ODExOTQlMkNWU1JQdGFyZ2V0SWQlM0ExODIyNjE4NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkNFTyBhdCBDTUxhYnMgU2ltdWxhdGlvbnNcIixcImxvY2F0aW9uXCI6XCJNb250cmVhbCwgQ2FuYWRhIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQ00gTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk1hdGhFbmdpbmVcIixcIlBvc3RMaW5lYXIgRW50ZXJ0YWlubWVudFwiLFwiVmVsb2NpdHkgR2FtZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJOZXcgRW5nbGFuZCBDb2xsZWdlXCJdfSx7XCJuYW1lXCI6e1wiaXNIaWRkZW5cIjp0cnVlfSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTY0Mjg1NCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdXTigKZjaElkJTNBMzcxNzM4MDE2MTQyMjIxNDU4MTE5NCUyQ1ZTUlB0YXJnZXRJZCUzQTY0Mjg1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkFjY291bnQgTWFuYWdlciBhdCBDTSBMYWJzXCIsXCJsb2NhdGlvblwiOlwiTW9udHJlYWwsIENhbmFkYSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkNNIExhYnMgU2ltdWxhdGlvbnMgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJOYWtpc2FcIixcIkdFTGNvcmVcIixcIlBvc2l0cm9uIFB1YmxpYyBTYWZldHkgU3lzdGVtc1wiXSxcImVkdWNhdGlvblwiOltcIk1jR2lsbCBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiaXNIaWRkZW5cIjp0cnVlfSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEzNTU4Njk3JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjIyMTQ1ODExOTQlMkNWU1JQdGFyZ2V0SWQlM0ExMzU1ODY5NyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlZpY2UgUHJlc2lkZW50IEZpbmFuY2VzICYgT3BlcmF0aW9ucyBhdCBDTSBMYWJzIFNpbXVsYXRpb25zIEluYy5cIixcImxvY2F0aW9uXCI6XCJNb250cmVhbCwgQ2FuYWRhIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQ00gTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNNTGFicyBTaW11bGF0aW9ucyBJbmMuXCIsXCJBdmVybmFcIixcIkZvcmVuc2ljIFRlY2hub2xvZ3lcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXTDqSBkZSBNb250csOpYWwgLSBFY29sZSBwb2x5dGVjaG5pcXVlIGRlIE1vbnRyw6lhbFwiXX1dfVxud2luZG93LmNhbGxUYWJBY3Rpb24gPSBmdW5jdGlvbiAodGFiSWQsIGFjdGlvbiwgY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHt0bzogJ2NvbnRlbnQnLCBhY3Rpb246IGFjdGlvbiwgYXJnczogYXJnc307XG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIG1lc3NhZ2UsIGNhbGxiYWNrKVxufTtcblxud2luZG93LmdvID0gZnVuY3Rpb24gKHNldHRpbmdzKSB7XG4gICAgY29uc29sZS50YWJsZShxdWV1ZSk7XG4gICAgcmV0dXJuO1xuICAgIC8vIGZvciBkZWJ1Z2dpbmdcbiAgICAvL3NldHRpbmdzLnNjcmFwZXIubGltaXQgPSAxMDAwMDtcbiAgICAvL3NldHRpbmdzLnNjcmFwZXIubGltaXQgPSA5O1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgY3VycmVudENvbXBhbnkgPSBxdWV1ZVtpXTtcblxuICAgIHZhciByb3V0aW5lID0gW1xuICAgICAgICBzY3JhcGVyLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cyksXG4gICAgICAgIGdldEJhc2ljSW5mby5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpLFxuICAgICAgICBnZXRNaXNzaW5nTmFtZXMuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgIF07XG5cbiAgICAvKmlmIChzZXR0aW5ncy5nZW5lcmFsLmdldEVtYWlscykge1xuICAgICByb3V0aW5lLnB1c2goXG4gICAgIHBlcm11dGVFbWFpbHMuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKSxcbiAgICAgdmFsaWRhdGVFbWFpbHMuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgICApXG4gICAgIH0qL1xuXG4gICAgcm91dGluZS5wdXNoKGRvbmUpO1xuXG4gICAgYXN5bmMuc2VyaWVzKHJvdXRpbmUpO1xuXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgaWYocXVldWVbKytpXSl7XG4gICAgICAgICAgICBjdXJyZW50Q29tcGFueSA9IHF1ZXVlW2ldO1xuICAgICAgICAgICAgYXN5bmMuc2VyaWVzKHJvdXRpbmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHdpbmRvdy5pc0ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PSBcIm9wZW5BcHBcIikge1xuICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IG1lc3NhZ2UucGF0aH0pXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLy92YXIgcGVybXV0ZXIgPSByZXF1aXJlKCcuL3Blcm11dGVFbWFpbHMuanMnKTtcbi8vdmFyIGZpbmRfbGFzdF9uYW1lcyA9IHJlcXVpcmUoJy4vbGFzdF9uYW1lcy5qcycpO1xuLy92YXIgZW1haWxfdmVyaWZpZXIgPSByZXF1aXJlKCcuL2VtYWlsX2NoZWNrLmpzJyk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xNy8xNS5cbiAqL1xudmFyIGN1cnJlbnRXb3JraW5nVGFiO1xudmFyIGlzRmluaXNoZWQ7XG52YXIgcmVzdWx0cztcbnZhciBtYXN0ZXJDYWxsYmFjaztcbnZhciBzZXR0aW5ncztcbnZhciBpID0gMDtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuXG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldEJhc2ljSW5mbyhwZXJzb24pIHtcbiAgICBjdXJyZW50UGVyc29uID0gcGVyc29uO1xuICAgIGlmICghY3VycmVudFBlcnNvbikge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICB9XG4gICAgY3VycmVudFBlcnNvbi5jb21wYW55ID0gc2V0dGluZ3MuZ2VuZXJhbC5jb21wYW55TmFtZTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgdGFiIHdpdGggbGluayBhcmd1bWVudFxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiBwZXJzb24ucHJvZmlsZUxpbmt9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIGN1cnJlbnRXb3JraW5nVGFiID0gdGFiO1xuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIodGFiVXBkYXRlZClcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdGFiVXBkYXRlZCh0YWJJZCwgaW5mbywgdGFiKSB7XG4gICAgaWYgKHRhYklkID09IGN1cnJlbnRXb3JraW5nVGFiLmlkICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuXG4gICAgICAgIC8vIGdldCB0aGUgcmVxdWlyZWQgZGF0YSBmcm9tIHRoZSB0YWJcbiAgICAgICAgY2FsbFRhYkFjdGlvbihjdXJyZW50V29ya2luZ1RhYi5pZCwgXCJnZXRCYXNpY0luZm9cIiwgaGFuZGxlUmVzcG9uc2UpO1xuXG4gICAgICAgIC8vIGp1c3QgdG8gYmUgc2FmZSwgcmVtb3ZlIHRoZSBsaXN0ZW5lclxuICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGFiVXBkYXRlZClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKHJlc3BvbnNlKSB7XG5cbiAgICAkLmV4dGVuZChjdXJyZW50UGVyc29uLCByZXNwb25zZSk7XG5cblxuICAgIC8qXG4gICAgIHZhciBuYW1lLmZ1bGwgPSByZXNwb25zZS5uYW1lLmZ1bGwudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgIHZhciBoZWFkbGluZSA9IHJlc3BvbnNlLmhlYWRsaW5lO1xuXG4gICAgIHN3aXRjaCAobmFtZS5mdWxsKXtcbiAgICAgY2FzZSAnbGlua2VkaW4gbWVtYmVyJzpcbiAgICAgfVxuICAgICAqL1xuICAgIC8vIHdlJ3JlIGRvbmUgd2l0aCB0aGUgdGFiLiByZW1vdmUgaXRcbiAgICBjaHJvbWUudGFicy5yZW1vdmUoY3VycmVudFdvcmtpbmdUYWIuaWQpO1xuXG4gICAgLy8gZGVjaWRlIHdoZXRoZXIgdG8gcnVuIGFnYWluIG9yIG5vdFxuICAgIGlmIChpICsgMSAhPSByZXN1bHRzLnBlb3BsZS5sZW5ndGgpIHtcbiAgICAgICAgaXRlcmF0ZSgpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgIGdldEJhc2ljSW5mbyhyZXN1bHRzLnBlb3BsZVsrK2ldKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pc2hlZDtcbiAgICB9LFxuICAgIHN0YXJ0OiBpbml0XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yMS8xNS5cbiAqL1xudmFyIHNldHRpbmdzLCByZXN1bHRzLCBtYXN0ZXJDYWxsYmFjaztcbnZhciBpID0gLTE7XG52YXIgY3VycmVudFBlcnNvbjtcblxuZnVuY3Rpb24gaW5pdChzZXR0aW5nc0FyZywgcmVzdWx0c0FyZywgY2FsbGJhY2tBcmcpIHtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGl0ZXJhdGUoKSB7XG4gICAgY3VycmVudFBlcnNvbiA9IHJlc3VsdHMucGVvcGxlWysraV07XG4gICAgdmFyIGN1cnJlbnROYW1lID0gY3VycmVudFBlcnNvbi5uYW1lO1xuICAgIHZhciBjdXJyZW50UGVyc29uRnVsbE5hbWUgPSBjdXJyZW50UGVyc29uLm5hbWUuZnVsbDtcblxuICAgIGlmIChpID09IHJlc3VsdHMucGVvcGxlLmxlbmd0aCkge1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnROYW1lLmlzSGlkZGVuIHx8ICFjdXJyZW50TmFtZS5sYXN0KSB7XG4gICAgICAgIGdldE1pc3NpbmdOYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8qdmFyIGZ1bGxOYW1lU3BsaXQgPSBjdXJyZW50UGVyc29uRnVsbE5hbWUuc3BsaXQoJ3wnKVswXS5zcGxpdCgnICcpO1xuICAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmZpcnN0ID0gZnVsbE5hbWVTcGxpdFswXTtcbiAgICAgICAgIGN1cnJlbnRQZXJzb24ubmFtZS5sYXN0ID0gZnVsbE5hbWVTcGxpdFsxXTsqL1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE1pc3NpbmdOYW1lKGNhbGxiYWNrKSB7XG4gICAgaWYgKCEoY3VycmVudFBlcnNvbiAmJlxuICAgICAgICBjdXJyZW50UGVyc29uLmhlYWRsaW5lICYmXG4gICAgICAgIGN1cnJlbnRQZXJzb24ucGFzdFBvc2l0aW9ucyAmJlxuICAgICAgICBjdXJyZW50UGVyc29uLmVkdWNhdGlvbiAmJlxuICAgICAgICBjdXJyZW50UGVyc29uLmNvbXBhbnkpKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9kZWJ1Z2dlcjtcbiAgICB2YXIgc2VhcmNoVGV4dCA9XG4gICAgICAgIFwic2l0ZTpsaW5rZWRpbi5jb20gXCIgK1xuICAgICAgICAoY3VycmVudFBlcnNvbi5uYW1lLmZpcnN0ID8gY3VycmVudFBlcnNvbi5uYW1lLmZpcnN0ICsgJyAnIDogJycpICtcbiAgICAgICAgKGN1cnJlbnRQZXJzb24ubmFtZS5sYXN0ID8gY3VycmVudFBlcnNvbi5uYW1lLmxhc3QgKyAnICcgOiAnJykgK1xuICAgICAgICBjdXJyZW50UGVyc29uLmhlYWRsaW5lICsgJyAnICtcbiAgICAgICAgY3VycmVudFBlcnNvbi5wYXN0UG9zaXRpb25zLmpvaW4oJyAnKSArICcgJyArXG4gICAgICAgIGN1cnJlbnRQZXJzb24uZWR1Y2F0aW9uLmpvaW4oJyAnKSArICcgJztcbiAgICB2YXIgdXJsID1cbiAgICAgICAgXCJodHRwOi8vZ29vZ2xlLmNvbVwiICtcbiAgICAgICAgXCIjcT1cIiArXG4gICAgICAgIHNlYXJjaFRleHQ7XG5cbiAgICB2YXIgdGFiaWQ7XG5cbiAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIodGFiVXBkYXRlZCk7XG5cbiAgICBmdW5jdGlvbiB0YWJVcGRhdGVkKHRhYklkLCBpbmZvLCB0YWIpIHtcblxuICAgICAgICBpZiAodGFiSWQgPT0gdGFiaWQgJiYgaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICBjYWxsVGFiQWN0aW9uKHRhYmlkLCBcImdldE5hbWVcIiwgZ29vZ2xlUmVzdWx0UmVzcG9uc2UpO1xuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ29vZ2xlUmVzdWx0UmVzcG9uc2UobmFtZSkge1xuICAgICAgICBpZiAobmFtZSAmJiBuYW1lLmZpcnN0ICYmIG5hbWUubGFzdCkge1xuICAgICAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiaWQpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHVybH0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgdGFiaWQgPSB0YWIuaWQ7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTUvMTQuXG4gKi9cbi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMjEvMTUuXG4gKi9cbnZhciBzZXR0aW5ncywgcmVzdWx0cywgbWFzdGVyQ2FsbGJhY2s7XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHBlcm11dGVFbWFpbHMoKTtcbn1cblxuZnVuY3Rpb24gcGVybXV0ZUVtYWlscygpIHtcblxuICAgICQuZWFjaChyZXN1bHRzLnBlb3BsZSwgZnVuY3Rpb24gKGluZGV4LCBwZXJzb24pIHtcblxuXG4gICAgICAgIHZhciBuYW1lID0gcGVyc29uLm5hbWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbCA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdDogbmFtZS5maXJzdFswXSxcbiAgICAgICAgICAgICAgICBsYXN0OiBuYW1lLmxhc3RbMF1cblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdHMucGVvcGxlW2luZGV4XS5wb3NzaWJsZUVtYWlscyA9IFtcbiAgICAgICAgICAgIG5hbWUuZmlyc3QgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBuYW1lLmZpcnN0ICsgJy4nICsgbmFtZS5sYXN0LFxuICAgICAgICAgICAgaW5pdGlhbC5maXJzdCArIG5hbWUubGFzdCxcbiAgICAgICAgICAgIGluaXRpYWwuZmlyc3QgKyAnLicgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBuYW1lLmxhc3QgKyBuYW1lLmZpcnN0LFxuICAgICAgICAgICAgbmFtZS5sYXN0ICsgJy4nICsgbmFtZS5maXJzdCxcbiAgICAgICAgICAgIG5hbWUuZmlyc3QsXG4gICAgICAgICAgICBuYW1lLmxhc3QsXG4gICAgICAgICAgICBpbml0aWFsLmZpcnN0ICsgaW5pdGlhbC5sYXN0XG4gICAgICAgIF0ubWFwKGZ1bmN0aW9uIChlbWFpbEFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1haWxBZGRyZXNzICsgc2V0dGluZ3MuZ2VuZXJhbC5lbWFpbERvbWFpbjtcbiAgICAgICAgICAgIH0pXG4gICAgfSk7XG4gICAgbWFzdGVyQ2FsbGJhY2soKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRcbn1cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbnZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbnZhciBzdGF0dXMgPSB7fTtcbnZhciByZXN1bHRzO1xuXG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgLy9pbml0aWFsaXphdGlvblxuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLmdlbmVyYWwucG9zaXRpb25GaWx0ZXIgK1xuICAgICAgICAnJmZfQ0M9JyArIHNldHRpbmdzLmdlbmVyYWwuQ29tcGFueUlEcyArXG4gICAgICAgICcmb3BlbkFkdmFuY2VkRm9ybT10cnVlJnRpdGxlU2NvcGU9QyZsb2NhdGlvblR5cGU9SSc7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYlxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHNjcmFwZV90YWIgPSB0YWIuaWQ7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih3YWl0Rm9yVGFiKVxuICAgIH0pO1xuXG4gICAgLy8gYWZ0ZXIgdGFiIGNyZWF0aW9uIHJldHVybiBjb250cm9sIHRvIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gd2FpdEZvclRhYih0YWJJZCwgaW5mbykge1xuICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiICYmIHRhYklkID09IHNjcmFwZV90YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih3YWl0Rm9yVGFiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRQcm9maWxlTGlua3MoY2FsbGJhY2spIHtcbiAgICAvLyBhc2sgY29udGVudCBzY3JpcHQgZm9yIGFsbCB0aGUgcHJvZmlsZSBsaW5rcyBvbiB0aGUgcGFnZVxuICAgIGNhbGxUYWJBY3Rpb24oc2NyYXBlX3RhYiwgJ3NjcmFwZVByb2ZpbGVMaXN0JywgcHJvY2Vzc0xpbmtCYXRjaCk7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGlua0JhdGNoKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHJlc3BvbnNlIGlzIGVtcHR5LCB3ZSBoYXZlIGFuIGlzc3VlXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlc3BvbnNlIGZvciBwcm9jZXNzTGlua0JhdGNoIGlzOlwiICsgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc05leHRQYWdlID0gcmVzcG9uc2UuaGFzTmV4dFBhZ2U7XG4gICAgICAgIHZhciBsaW1pdCA9IHNldHRpbmdzLnNjcmFwZXIubGltaXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcGFnZXMsIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmICghaGFzTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHdlJ3JlIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHJlc3BvbnNlIGFuZCBhIG5leHQgcGFnZS4gd2UnbGwgY2hlY2sgYSBmZXcgdGhpbmdzIGFuZCBrZWVwIGdvaW5nXG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoICE9IDApIHtcblxuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc3BvbnNlIHRvIG91ciBleGlzdGluZyBhcnJheVxuICAgICAgICAgICAgcmVzdWx0cy5wZW9wbGUgPSByZXN1bHRzLnBlb3BsZS5jb25jYXQocmVzcG9uc2UucmVzdWx0cyk7XG5cblxuICAgICAgICAgICAgaWYgKHJlc3VsdHMucGVvcGxlLmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoe3VybDogXCJodHRwOi8vXCIgKyByZXNwb25zZS5uZXh0UGFnZX0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFnZUNoYW5nZSh0YWJJZCwgaW5mbywgdGFiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gdGFiLnVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAhPSB1bmRlZmluZWQgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYiAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSBkb25lIGxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVhY2hlZCBlbHNlIHN0YXRlbWVudCBpbiBwcm9jZXNzTGlua0JhdGNoJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gdGhlIGFwaSBmb3IgdGhpcyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0aWFsaXplLFxuICAgIHByb2ZpbGVMaW5rczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5wcm9maWxlTGlua3NcbiAgICB9LFxuICAgIGlzRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzRmluaXNoZWRcbiAgICB9XG59O1xuXG5cbmZ1bmN0aW9uIGxvZyhtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcbn1cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yMi8xNS5cbiAqL1xudmFyIHNldHRpbmdzLCByZXN1bHRzLCBtYXN0ZXJDYWxsYmFjaztcbnZhciBnbWFpbFRhYjtcbnZhciBjdXJyZW50UGVyc29uO1xudmFyIHN1Y2Nlc3NmdWxFbWFpbEZvcm1hdHMgPSBbXTtcbnZhciBlbWFpbEZvdW5kID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHZhbGlkYXRlRW1haWxzKCk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRW1haWxzKCkge1xuICAgIHZhciBpID0gLTE7XG5cbiAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICBjcmVhdGVHbWFpbFRhYixcbiAgICAgICAgbmV4dFBlcnNvblxuICAgIF0pO1xuXG4gICAgZnVuY3Rpb24gbmV4dFBlcnNvbigpIHtcblxuICAgICAgICBjdXJyZW50UGVyc29uID0gcmVzdWx0cy5wZW9wbGVbKytpXTtcbiAgICAgICAgaWYgKGN1cnJlbnRQZXJzb24pIHtcblxuXG4gICAgICAgICAgICBpZiAoY3VycmVudFBlcnNvbi5wb3NzaWJsZUVtYWlscykge1xuICAgICAgICAgICAgICAgIGFzeW5jLnNlcmllcyhbXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2VFbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgZmluZEN1cnJlbnRQZXJzb25zRW1haWwsXG4gICAgICAgICAgICAgICAgICAgIG5leHRQZXJzb25cbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dFBlcnNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlR21haWxUYWIoY2FsbGJhY2spIHtcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogXCJodHRwczovL2dvb2dsZS5jb21cIn0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgZ21haWxUYWIgPSB0YWIuaWQ7XG4gICAgICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDI1MDApO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZpbmRDdXJyZW50UGVyc29uc0VtYWlsKGNhbGxiYWNrKSB7XG5cbiAgICAvLyB0aGVzZSBhcmUgdGhlIGVtYWlsIGNvbWJpbmF0aW9ucyB3ZSBwZXJtdXRlZCBpbiB0aGUgcHJldmlvdXMgc3RlcFxuICAgIHZhciBwb3NzaWJsZUVtYWlscyA9IGN1cnJlbnRQZXJzb24ucG9zc2libGVFbWFpbHM7XG5cbiAgICBpZiAoc3VjY2Vzc2Z1bEVtYWlsRm9ybWF0cy5sZW5ndGgpIHtcbiAgICAgICAgJC5lYWNoKHN1Y2Nlc3NmdWxFbWFpbEZvcm1hdHMucmV2ZXJzZSgpLCBmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgICAgIHBvc3NpYmxlRW1haWxzLm1vdmUoaXRlbSwgMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB2YXIgaSA9IDA7XG5cbiAgICBmdW5jdGlvbiB0cnlWYXJpYXRpb24oKSB7XG4gICAgICAgIC8vIGRlY2lkZSBvbiB3aGF0IGVtYWlsIHRvIHRyeSBuZXh0XG4gICAgICAgIHZhciBlbWFpbCA9IHBvc3NpYmxlRW1haWxzW2krK107XG5cbiAgICAgICAgaWYgKGVtYWlsKSB7XG5cbiAgICAgICAgICAgIGVtYWlsID0gY29udmVydFN0cmluZ1RvQXNjaWkoZW1haWwpO1xuXG4gICAgICAgICAgICBjYWxsVGFiQWN0aW9uKGdtYWlsVGFiLCAndHJ5RW1haWwnLCBwcm9jZXNzUmVzcG9uc2UsIHtlbWFpbDogZW1haWwsIG5hbWU6IGN1cnJlbnRQZXJzb24ubmFtZX0pO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBwcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmNvcnJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQZXJzb24uZW1haWwgPSBlbWFpbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2VFbWFpbCh0cnlWYXJpYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cnlWYXJpYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZUVtYWlsKGNhbGxiYWNrKSB7XG4gICAgY29uc29sZS5sb2coJ2NvbXBvc2UgZW1haWwnKTtcblxuICAgIGZ1bmN0aW9uIHdhaXRGb3JMb2FkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2FsbGJhY2sgaW4gNXMnKTtcbiAgICAgICAgc2V0VGltZW91dChjYWxsYmFjaywgMzAwMCk7XG4gICAgfVxuXG4gICAgY2hyb21lLnRhYnMudXBkYXRlKGdtYWlsVGFiLCB7dXJsOiBcImh0dHBzOi8vbWFpbC5nb29nbGUuY29tL21haWwvdS8wLz8jaW5ib3g/Y29tcG9zZT1uZXdcIn0sIHdhaXRGb3JMb2FkKVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0U3RyaW5nVG9Bc2NpaShlbWFpbCkge1xuXG4gICAgLy9Db252ZXJ0IENoYXJhY3RlcnNcbiAgICByZXR1cm4gZW1haWxcbiAgICAgICAgLnJlcGxhY2UoL8O2L2csICdvJylcbiAgICAgICAgLnJlcGxhY2UoL8OnL2csICdjJylcbiAgICAgICAgLnJlcGxhY2UoL8WfL2csICdzJylcbiAgICAgICAgLnJlcGxhY2UoL8SxL2csICdpJylcbiAgICAgICAgLnJlcGxhY2UoL8SfL2csICdnJylcbiAgICAgICAgLnJlcGxhY2UoL8O8L2csICd1JylcbiAgICAgICAgLnJlcGxhY2UoL8OpL2csICdlJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0XG59XG5cbkFycmF5LnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gICAgdGhpcy5zcGxpY2UodG8sIDAsIHRoaXMuc3BsaWNlKGZyb20sIDEpWzBdKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yNC8xNS5cbiAqL1xuLy8gdXRpbGl0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBoYXNDaGFyOiBmdW5jdGlvbiAoc3RyaW5nLCBjaGFyKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuaW5kZXhPZihjaGFyKSAhPSAtMTtcbiAgICB9XG59Il19
