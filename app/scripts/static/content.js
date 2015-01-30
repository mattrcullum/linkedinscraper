(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.helpers = require('../helpers');

var linkedin = require('./linkedin.js');
var google = require('./google.js');
require('./showScrapeBtn')();

function messageReceived(message, sender, sendResponse) {

    if (message.to != 'content') return;

    switch (message.action) {
        case 'scrapeProfileList':
            sendResponse(
                linkedin.scrapeProfileList()
            );
            break;
        case 'nextPage':
            sendResponse(
                linkedin.pagination.nextPage()
            );
            break;
        case 'getBasicInfo':
            sendResponse(
                linkedin.scrapeProfileView()
            );
            break;
        case 'getName':
            var time = {
                total: 0,
                interval: 50,
                out: 5000 //time.out ;)
            };

            var waitForSearchResults = setInterval(function (callback, time) {

                time.total += time.interval;

                var $results = $('#rso');
                var hasResults = $results.find('li').length;

                if (hasResults) {
                    setTimeout(function (callback) {
                        callback(google.getName());
                    }, 350, callback);

                    clearInterval(waitForSearchResults)
                }

                else if ($results.length) {
                    clearInterval(waitForSearchResults);
                    callback(false);
                }
                console.log(time.total)

            }, time.interval, sendResponse, time);
            break;

        case 'tryEmail':
            console.log('try email')
            google.tryEmail(message.args, sendResponse);
            break;
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
},{"../helpers":6,"./google.js":2,"./linkedin.js":3,"./showScrapeBtn":4}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/21/15.
 */

var getName = function () {
    var $results = $('.g:lt(3)');
    var name = {};

    $.each($results, function (index, item) {
        var title = $(item).find('h3').text();

        // The google result we want will look like one of the following:
        // "John Smith | LinkedIn"
        // "John S. | LinkedIn"
        // "John J. Smith | LinkedIn"
        if (helpers.hasChar(title, '|')) {
            var fullName =
                title.split('|')[0].trim().split(' ');

            var fName = fullName[0];
            var lName = fullName[1];

            name = {first: fName, last: lName, full: fullName};
            return false
        }
    });

    return name || false;
};

var isGmailReady = function () {

};

var tryEmail = function (message, callback) {
    console.log(message, callback);
    var email = message.email.replace(' ', '');
    var name = message.name.full;

    var $emailInput = $("textarea").first();

    $emailInput.focus();
    $emailInput.text(email);
    $emailInput.blur();

    setTimeout(function (callback) { // give rapportive 1500 milliseconds to initialize

        var waitForRapportive = setInterval(function (callback) { // now we wait for rapportive to load the results

            var $rapportive = $('#rapportive-sidebar');

            function rapportiveSidebarExists() {
                return $rapportive.length != 0;
            }

            function isLoadingResults() {
                return $rapportive.has('.wip-spinner').length || $rapportive.find('.links li a:contains("Looking up...")').length;
            }


            if (rapportiveSidebarExists() && !isLoadingResults()) {

                clearInterval(waitForRapportive);

                var $name = $rapportive.find('h1.name').first().text().trim().toLowerCase();
                var $discardDraftBtn = $('[data-tooltip="Discard draft"]');

                $discardDraftBtn.click();

                var waitForDraftDiscard = setInterval(function (callback) {

                    var $hasSendButton = $('div[role="button"]:contains("Send")').length;

                    if (!$hasSendButton) {
                        clearInterval(waitForDraftDiscard);
                        if ($name == name) {
                            callback({correct: true});
                            console.log('found email')
                        }
                        else {
                            console.log('wrong');
                            callback({correct: false})
                        }
                    }
                }, 100, callback)
            }
        }, 100, callback);
    }, 1500, callback);
};

module.exports = {
    getName: getName,
    isGmailReady: isGmailReady,
    tryEmail: tryEmail
};
},{}],3:[function(require,module,exports){
/**
 * Created by matthew on 1/11/15.
 */

var scrapeProfileList = function () {
    var results = [];
    var error = null;

    // grab each profile link and push it to results[]
    var $peopleDiv = $('#results .mod.result.people');

    $.each($peopleDiv, function (index, person) {
        var $person = $(person);
        var $nameLink = $person.find('.bd h3 a.title');

        var profileLink = $nameLink.attr('href').replace(/&authType(.*)/, '');
        var headline = $person.find('.description').text();
        var location = $person.find('.demographic bdi').text();
        var industry = $person.find('.demographic dd:last-child').text();

        var fullName = $nameLink.text().trim();
        var name = {};

        // if the fullName has a period, we'll assume it's abbreviated
        if (helpers.hasChar(fullName, '.')) {
            name.first = fullName.split(' ')[0];
        }

        // if the fullName is hidden
        else if (fullName == "LinkedIn Member") {
            name.isHidden = true;
        }

        // if it's it's not abbreviated, we'll assume it looks like "John Smith", "John J. Smith" or "John J. Smith II"
        else {
            fullName = fullName.split(' ');
            name.first = fullName[0];

            // "John J. Smith or John J. Smith II"
            if (fullName.length > 2) {
                name.last = fullName[2];
            }

            // "John Smith"
            else {
                name.first = fullName[0];
                name.last = fullName[1];
            }

        }

        var person = {
            name: name,
            profileLink: profileLink,
            headline: headline,
            location: location,
            industry: industry
        };

        if (fullName == "LinkedIn Member") {
            person.name = {isHidden: true}
        }

        results.push(person);
    });

    if (results.length == 0) {
        error = "People container doesn't exist"
    }

    return {
        results: results,
        hasNextPage: pagination.hasNextPage(),
        nextPage: pagination.nextPage(),
        error: error
    }
};

var scrapeProfileView = function () {


    var currentPosition = $('#overview-summary-current td ol li a').text();

    var pastPositions = $('#overview-summary-past td ol li a').map(function () {
        return $.trim($(this).text());
    }).get();

    var education = $('#overview-summary-education td ol li a').map(function () {
        return $.trim($(this).text());
    }).get();


    return {
        currentPosition: currentPosition,
        pastPositions: pastPositions,
        education: education
    }
};

var pagination =
{
    nextPage: function () {
        var $nextPaginationBtn = $('#results-pagination .next a');
        return location.hostname + $nextPaginationBtn.attr('href');
    },

    hasNextPage: function () {
        return $('#results-pagination .next a').length
    }
};

module.exports = {
    pagination: pagination,
    scrapeProfileList: scrapeProfileList,
    scrapeProfileView: scrapeProfileView
};

},{}],4:[function(require,module,exports){
/**
 * Created by matthew on 12/12/14.
 */

module.exports = function () {
    var helper = require('../helper');

    var path_segments = helper.url.get_path_segments(location);
    var first_path_segment = path_segments[0] || null;
    var host_title = helper.url.get_host_title(location).toLowerCase();

    if (host_title == "linkedin")
        switch (first_path_segment) {
            case 'company':
                add_scrape_button();
                break;
        }

    function add_scrape_button() {

        // $employeesLinkHref contains relevant company IDs.
        var link_containing_company_IDs = $('.how-connected .stats li .density')[0];

        //We need to extract the relevant company IDs to a string before they can be of any use.
        var companyIDs = helper.getParameterByName('f_CC', link_containing_company_IDs);
        var companyName = $('span[itemprop="name"]').text();

        // we'll place our scrape button after this one
        var $follow_button = $('.follow-content .not-hidden');

        var $scrape_btn_container = $('<div></div>').css('display', 'inline');
        var $scrape_btn = $('<a></a>').addClass('').attr('id', 'scrape').html('Scrape').css({
            background: '#27ae60',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '12px',
            border: 'solid 1px #34495e',
            padding: '2px 13px',
            cursor: 'pointer',
            borderRadius: '3px',
            textDecoration: 'none',
            lineHeight: '16px',
            height: '31px',
            marginLeft: '10px'
        });

        $scrape_btn.click(function () {
            var path = 'html/app.html' +
                '?a=addToQueue'
                + '&company=' + companyName
                + '&companyID=' + companyIDs
                + '&a=addToQueue';
            chrome.runtime.sendMessage({to: "background", action: "openApp", path: path})
        });

        $scrape_btn_container.html($scrape_btn);
        $scrape_btn_container.insertAfter($follow_button)
    }
};
},{"../helper":5}],5:[function(require,module,exports){
module.exports = {
  url: {
    get_path_segments: function (location) {
      return location.pathname.substr(1).split('/')
    },
    get_host_title: function (location) {
      return location.host.split('.')[1];
    }
  },
  getParameterByName: function (name) {
      var href = location;
    // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(href.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
};
},{}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2dvb2dsZS5qcyIsImFwcC9zY3JpcHRzL2NvbnRlbnQvbGlua2VkaW4uanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L3Nob3dTY3JhcGVCdG4uanMiLCJhcHAvc2NyaXB0cy9oZWxwZXIuanMiLCJhcHAvc2NyaXB0cy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5oZWxwZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xuXG52YXIgbGlua2VkaW4gPSByZXF1aXJlKCcuL2xpbmtlZGluLmpzJyk7XG52YXIgZ29vZ2xlID0gcmVxdWlyZSgnLi9nb29nbGUuanMnKTtcbnJlcXVpcmUoJy4vc2hvd1NjcmFwZUJ0bicpKCk7XG5cbmZ1bmN0aW9uIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuXG4gICAgaWYgKG1lc3NhZ2UudG8gIT0gJ2NvbnRlbnQnKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ3NjcmFwZVByb2ZpbGVMaXN0JzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5zY3JhcGVQcm9maWxlTGlzdCgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25leHRQYWdlJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5wYWdpbmF0aW9uLm5leHRQYWdlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2V0QmFzaWNJbmZvJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5zY3JhcGVQcm9maWxlVmlldygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2dldE5hbWUnOlxuICAgICAgICAgICAgdmFyIHRpbWUgPSB7XG4gICAgICAgICAgICAgICAgdG90YWw6IDAsXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWw6IDUwLFxuICAgICAgICAgICAgICAgIG91dDogNTAwMCAvL3RpbWUub3V0IDspXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgd2FpdEZvclNlYXJjaFJlc3VsdHMgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoY2FsbGJhY2ssIHRpbWUpIHtcblxuICAgICAgICAgICAgICAgIHRpbWUudG90YWwgKz0gdGltZS5pbnRlcnZhbDtcblxuICAgICAgICAgICAgICAgIHZhciAkcmVzdWx0cyA9ICQoJyNyc28nKTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzUmVzdWx0cyA9ICRyZXN1bHRzLmZpbmQoJ2xpJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1Jlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdvb2dsZS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICB9LCAzNTAsIGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JTZWFyY2hSZXN1bHRzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCRyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JTZWFyY2hSZXN1bHRzKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aW1lLnRvdGFsKVxuXG4gICAgICAgICAgICB9LCB0aW1lLmludGVydmFsLCBzZW5kUmVzcG9uc2UsIHRpbWUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndHJ5RW1haWwnOlxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyeSBlbWFpbCcpXG4gICAgICAgICAgICBnb29nbGUudHJ5RW1haWwobWVzc2FnZS5hcmdzLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlUmVjZWl2ZWQpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMjEvMTUuXG4gKi9cblxudmFyIGdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRyZXN1bHRzID0gJCgnLmc6bHQoMyknKTtcbiAgICB2YXIgbmFtZSA9IHt9O1xuXG4gICAgJC5lYWNoKCRyZXN1bHRzLCBmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgdmFyIHRpdGxlID0gJChpdGVtKS5maW5kKCdoMycpLnRleHQoKTtcblxuICAgICAgICAvLyBUaGUgZ29vZ2xlIHJlc3VsdCB3ZSB3YW50IHdpbGwgbG9vayBsaWtlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBcIkpvaG4gU21pdGggfCBMaW5rZWRJblwiXG4gICAgICAgIC8vIFwiSm9obiBTLiB8IExpbmtlZEluXCJcbiAgICAgICAgLy8gXCJKb2huIEouIFNtaXRoIHwgTGlua2VkSW5cIlxuICAgICAgICBpZiAoaGVscGVycy5oYXNDaGFyKHRpdGxlLCAnfCcpKSB7XG4gICAgICAgICAgICB2YXIgZnVsbE5hbWUgPVxuICAgICAgICAgICAgICAgIHRpdGxlLnNwbGl0KCd8JylbMF0udHJpbSgpLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgICAgIHZhciBmTmFtZSA9IGZ1bGxOYW1lWzBdO1xuICAgICAgICAgICAgdmFyIGxOYW1lID0gZnVsbE5hbWVbMV07XG5cbiAgICAgICAgICAgIG5hbWUgPSB7Zmlyc3Q6IGZOYW1lLCBsYXN0OiBsTmFtZSwgZnVsbDogZnVsbE5hbWV9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lIHx8IGZhbHNlO1xufTtcblxudmFyIGlzR21haWxSZWFkeSA9IGZ1bmN0aW9uICgpIHtcblxufTtcblxudmFyIHRyeUVtYWlsID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGNhbGxiYWNrKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSwgY2FsbGJhY2spO1xuICAgIHZhciBlbWFpbCA9IG1lc3NhZ2UuZW1haWwucmVwbGFjZSgnICcsICcnKTtcbiAgICB2YXIgbmFtZSA9IG1lc3NhZ2UubmFtZS5mdWxsO1xuXG4gICAgdmFyICRlbWFpbElucHV0ID0gJChcInRleHRhcmVhXCIpLmZpcnN0KCk7XG5cbiAgICAkZW1haWxJbnB1dC5mb2N1cygpO1xuICAgICRlbWFpbElucHV0LnRleHQoZW1haWwpO1xuICAgICRlbWFpbElucHV0LmJsdXIoKTtcblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGNhbGxiYWNrKSB7IC8vIGdpdmUgcmFwcG9ydGl2ZSAxNTAwIG1pbGxpc2Vjb25kcyB0byBpbml0aWFsaXplXG5cbiAgICAgICAgdmFyIHdhaXRGb3JSYXBwb3J0aXZlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKGNhbGxiYWNrKSB7IC8vIG5vdyB3ZSB3YWl0IGZvciByYXBwb3J0aXZlIHRvIGxvYWQgdGhlIHJlc3VsdHNcblxuICAgICAgICAgICAgdmFyICRyYXBwb3J0aXZlID0gJCgnI3JhcHBvcnRpdmUtc2lkZWJhcicpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiByYXBwb3J0aXZlU2lkZWJhckV4aXN0cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHJhcHBvcnRpdmUubGVuZ3RoICE9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzTG9hZGluZ1Jlc3VsdHMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRyYXBwb3J0aXZlLmhhcygnLndpcC1zcGlubmVyJykubGVuZ3RoIHx8ICRyYXBwb3J0aXZlLmZpbmQoJy5saW5rcyBsaSBhOmNvbnRhaW5zKFwiTG9va2luZyB1cC4uLlwiKScpLmxlbmd0aDtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBpZiAocmFwcG9ydGl2ZVNpZGViYXJFeGlzdHMoKSAmJiAhaXNMb2FkaW5nUmVzdWx0cygpKSB7XG5cbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JSYXBwb3J0aXZlKTtcblxuICAgICAgICAgICAgICAgIHZhciAkbmFtZSA9ICRyYXBwb3J0aXZlLmZpbmQoJ2gxLm5hbWUnKS5maXJzdCgpLnRleHQoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB2YXIgJGRpc2NhcmREcmFmdEJ0biA9ICQoJ1tkYXRhLXRvb2x0aXA9XCJEaXNjYXJkIGRyYWZ0XCJdJyk7XG5cbiAgICAgICAgICAgICAgICAkZGlzY2FyZERyYWZ0QnRuLmNsaWNrKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgd2FpdEZvckRyYWZ0RGlzY2FyZCA9IHNldEludGVydmFsKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciAkaGFzU2VuZEJ1dHRvbiA9ICQoJ2Rpdltyb2xlPVwiYnV0dG9uXCJdOmNvbnRhaW5zKFwiU2VuZFwiKScpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoISRoYXNTZW5kQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JEcmFmdERpc2NhcmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRuYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh7Y29ycmVjdDogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3VuZCBlbWFpbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd3JvbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh7Y29ycmVjdDogZmFsc2V9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMTAwLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwLCBjYWxsYmFjayk7XG4gICAgfSwgMTUwMCwgY2FsbGJhY2spO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TmFtZTogZ2V0TmFtZSxcbiAgICBpc0dtYWlsUmVhZHk6IGlzR21haWxSZWFkeSxcbiAgICB0cnlFbWFpbDogdHJ5RW1haWxcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMS8xNS5cbiAqL1xuXG52YXIgc2NyYXBlUHJvZmlsZUxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgLy8gZ3JhYiBlYWNoIHByb2ZpbGUgbGluayBhbmQgcHVzaCBpdCB0byByZXN1bHRzW11cbiAgICB2YXIgJHBlb3BsZURpdiA9ICQoJyNyZXN1bHRzIC5tb2QucmVzdWx0LnBlb3BsZScpO1xuXG4gICAgJC5lYWNoKCRwZW9wbGVEaXYsIGZ1bmN0aW9uIChpbmRleCwgcGVyc29uKSB7XG4gICAgICAgIHZhciAkcGVyc29uID0gJChwZXJzb24pO1xuICAgICAgICB2YXIgJG5hbWVMaW5rID0gJHBlcnNvbi5maW5kKCcuYmQgaDMgYS50aXRsZScpO1xuXG4gICAgICAgIHZhciBwcm9maWxlTGluayA9ICRuYW1lTGluay5hdHRyKCdocmVmJykucmVwbGFjZSgvJmF1dGhUeXBlKC4qKS8sICcnKTtcbiAgICAgICAgdmFyIGhlYWRsaW5lID0gJHBlcnNvbi5maW5kKCcuZGVzY3JpcHRpb24nKS50ZXh0KCk7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9ICRwZXJzb24uZmluZCgnLmRlbW9ncmFwaGljIGJkaScpLnRleHQoKTtcbiAgICAgICAgdmFyIGluZHVzdHJ5ID0gJHBlcnNvbi5maW5kKCcuZGVtb2dyYXBoaWMgZGQ6bGFzdC1jaGlsZCcpLnRleHQoKTtcblxuICAgICAgICB2YXIgZnVsbE5hbWUgPSAkbmFtZUxpbmsudGV4dCgpLnRyaW0oKTtcbiAgICAgICAgdmFyIG5hbWUgPSB7fTtcblxuICAgICAgICAvLyBpZiB0aGUgZnVsbE5hbWUgaGFzIGEgcGVyaW9kLCB3ZSdsbCBhc3N1bWUgaXQncyBhYmJyZXZpYXRlZFxuICAgICAgICBpZiAoaGVscGVycy5oYXNDaGFyKGZ1bGxOYW1lLCAnLicpKSB7XG4gICAgICAgICAgICBuYW1lLmZpcnN0ID0gZnVsbE5hbWUuc3BsaXQoJyAnKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBmdWxsTmFtZSBpcyBoaWRkZW5cbiAgICAgICAgZWxzZSBpZiAoZnVsbE5hbWUgPT0gXCJMaW5rZWRJbiBNZW1iZXJcIikge1xuICAgICAgICAgICAgbmFtZS5pc0hpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCdzIGl0J3Mgbm90IGFiYnJldmlhdGVkLCB3ZSdsbCBhc3N1bWUgaXQgbG9va3MgbGlrZSBcIkpvaG4gU21pdGhcIiwgXCJKb2huIEouIFNtaXRoXCIgb3IgXCJKb2huIEouIFNtaXRoIElJXCJcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmdWxsTmFtZSA9IGZ1bGxOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBuYW1lLmZpcnN0ID0gZnVsbE5hbWVbMF07XG5cbiAgICAgICAgICAgIC8vIFwiSm9obiBKLiBTbWl0aCBvciBKb2huIEouIFNtaXRoIElJXCJcbiAgICAgICAgICAgIGlmIChmdWxsTmFtZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgbmFtZS5sYXN0ID0gZnVsbE5hbWVbMl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFwiSm9obiBTbWl0aFwiXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lLmZpcnN0ID0gZnVsbE5hbWVbMF07XG4gICAgICAgICAgICAgICAgbmFtZS5sYXN0ID0gZnVsbE5hbWVbMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwZXJzb24gPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgcHJvZmlsZUxpbms6IHByb2ZpbGVMaW5rLFxuICAgICAgICAgICAgaGVhZGxpbmU6IGhlYWRsaW5lLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgICAgaW5kdXN0cnk6IGluZHVzdHJ5XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZ1bGxOYW1lID09IFwiTGlua2VkSW4gTWVtYmVyXCIpIHtcbiAgICAgICAgICAgIHBlcnNvbi5uYW1lID0ge2lzSGlkZGVuOiB0cnVlfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHBlcnNvbik7XG4gICAgfSk7XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICBlcnJvciA9IFwiUGVvcGxlIGNvbnRhaW5lciBkb2Vzbid0IGV4aXN0XCJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgICAgICBoYXNOZXh0UGFnZTogcGFnaW5hdGlvbi5oYXNOZXh0UGFnZSgpLFxuICAgICAgICBuZXh0UGFnZTogcGFnaW5hdGlvbi5uZXh0UGFnZSgpLFxuICAgICAgICBlcnJvcjogZXJyb3JcbiAgICB9XG59O1xuXG52YXIgc2NyYXBlUHJvZmlsZVZpZXcgPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAkKCcjb3ZlcnZpZXctc3VtbWFyeS1jdXJyZW50IHRkIG9sIGxpIGEnKS50ZXh0KCk7XG5cbiAgICB2YXIgcGFzdFBvc2l0aW9ucyA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LXBhc3QgdGQgb2wgbGkgYScpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkLnRyaW0oJCh0aGlzKS50ZXh0KCkpO1xuICAgIH0pLmdldCgpO1xuXG4gICAgdmFyIGVkdWNhdGlvbiA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LWVkdWNhdGlvbiB0ZCBvbCBsaSBhJykubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQudHJpbSgkKHRoaXMpLnRleHQoKSk7XG4gICAgfSkuZ2V0KCk7XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uLFxuICAgICAgICBwYXN0UG9zaXRpb25zOiBwYXN0UG9zaXRpb25zLFxuICAgICAgICBlZHVjYXRpb246IGVkdWNhdGlvblxuICAgIH1cbn07XG5cbnZhciBwYWdpbmF0aW9uID1cbntcbiAgICBuZXh0UGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5leHRQYWdpbmF0aW9uQnRuID0gJCgnI3Jlc3VsdHMtcGFnaW5hdGlvbiAubmV4dCBhJyk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZSArICRuZXh0UGFnaW5hdGlvbkJ0bi5hdHRyKCdocmVmJyk7XG4gICAgfSxcblxuICAgIGhhc05leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKS5sZW5ndGhcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uLFxuICAgIHNjcmFwZVByb2ZpbGVMaXN0OiBzY3JhcGVQcm9maWxlTGlzdCxcbiAgICBzY3JhcGVQcm9maWxlVmlldzogc2NyYXBlUHJvZmlsZVZpZXdcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxMi8xMi8xNC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyJyk7XG5cbiAgICB2YXIgcGF0aF9zZWdtZW50cyA9IGhlbHBlci51cmwuZ2V0X3BhdGhfc2VnbWVudHMobG9jYXRpb24pO1xuICAgIHZhciBmaXJzdF9wYXRoX3NlZ21lbnQgPSBwYXRoX3NlZ21lbnRzWzBdIHx8IG51bGw7XG4gICAgdmFyIGhvc3RfdGl0bGUgPSBoZWxwZXIudXJsLmdldF9ob3N0X3RpdGxlKGxvY2F0aW9uKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKGhvc3RfdGl0bGUgPT0gXCJsaW5rZWRpblwiKVxuICAgICAgICBzd2l0Y2ggKGZpcnN0X3BhdGhfc2VnbWVudCkge1xuICAgICAgICAgICAgY2FzZSAnY29tcGFueSc6XG4gICAgICAgICAgICAgICAgYWRkX3NjcmFwZV9idXR0b24oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX3NjcmFwZV9idXR0b24oKSB7XG5cbiAgICAgICAgLy8gJGVtcGxveWVlc0xpbmtIcmVmIGNvbnRhaW5zIHJlbGV2YW50IGNvbXBhbnkgSURzLlxuICAgICAgICB2YXIgbGlua19jb250YWluaW5nX2NvbXBhbnlfSURzID0gJCgnLmhvdy1jb25uZWN0ZWQgLnN0YXRzIGxpIC5kZW5zaXR5JylbMF07XG5cbiAgICAgICAgLy9XZSBuZWVkIHRvIGV4dHJhY3QgdGhlIHJlbGV2YW50IGNvbXBhbnkgSURzIHRvIGEgc3RyaW5nIGJlZm9yZSB0aGV5IGNhbiBiZSBvZiBhbnkgdXNlLlxuICAgICAgICB2YXIgY29tcGFueUlEcyA9IGhlbHBlci5nZXRQYXJhbWV0ZXJCeU5hbWUoJ2ZfQ0MnLCBsaW5rX2NvbnRhaW5pbmdfY29tcGFueV9JRHMpO1xuICAgICAgICB2YXIgY29tcGFueU5hbWUgPSAkKCdzcGFuW2l0ZW1wcm9wPVwibmFtZVwiXScpLnRleHQoKTtcblxuICAgICAgICAvLyB3ZSdsbCBwbGFjZSBvdXIgc2NyYXBlIGJ1dHRvbiBhZnRlciB0aGlzIG9uZVxuICAgICAgICB2YXIgJGZvbGxvd19idXR0b24gPSAkKCcuZm9sbG93LWNvbnRlbnQgLm5vdC1oaWRkZW4nKTtcblxuICAgICAgICB2YXIgJHNjcmFwZV9idG5fY29udGFpbmVyID0gJCgnPGRpdj48L2Rpdj4nKS5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lJyk7XG4gICAgICAgIHZhciAkc2NyYXBlX2J0biA9ICQoJzxhPjwvYT4nKS5hZGRDbGFzcygnJykuYXR0cignaWQnLCAnc2NyYXBlJykuaHRtbCgnU2NyYXBlJykuY3NzKHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjdhZTYwJyxcbiAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJ3NvbGlkIDFweCAjMzQ0OTVlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHggMTNweCcsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzNweCcsXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgbGluZUhlaWdodDogJzE2cHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMzFweCcsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnMTBweCdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNjcmFwZV9idG4uY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSAnaHRtbC9hcHAuaHRtbCcgK1xuICAgICAgICAgICAgICAgICc/YT1hZGRUb1F1ZXVlJ1xuICAgICAgICAgICAgICAgICsgJyZjb21wYW55PScgKyBjb21wYW55TmFtZVxuICAgICAgICAgICAgICAgICsgJyZjb21wYW55SUQ9JyArIGNvbXBhbnlJRHNcbiAgICAgICAgICAgICAgICArICcmYT1hZGRUb1F1ZXVlJztcbiAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHt0bzogXCJiYWNrZ3JvdW5kXCIsIGFjdGlvbjogXCJvcGVuQXBwXCIsIHBhdGg6IHBhdGh9KVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2NyYXBlX2J0bl9jb250YWluZXIuaHRtbCgkc2NyYXBlX2J0bik7XG4gICAgICAgICRzY3JhcGVfYnRuX2NvbnRhaW5lci5pbnNlcnRBZnRlcigkZm9sbG93X2J1dHRvbilcbiAgICB9XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICB1cmw6IHtcbiAgICBnZXRfcGF0aF9zZWdtZW50czogZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gbG9jYXRpb24ucGF0aG5hbWUuc3Vic3RyKDEpLnNwbGl0KCcvJylcbiAgICB9LFxuICAgIGdldF9ob3N0X3RpdGxlOiBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0LnNwbGl0KCcuJylbMV07XG4gICAgfVxuICB9LFxuICBnZXRQYXJhbWV0ZXJCeU5hbWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgaHJlZiA9IGxvY2F0aW9uO1xuICAgIC8vIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXF1cIik7XG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIiksXG4gICAgICByZXN1bHRzID0gcmVnZXguZXhlYyhocmVmLnNlYXJjaCk7XG4gICAgcmV0dXJuIHJlc3VsdHMgPT09IG51bGwgPyBcIlwiIDogZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG4gIH1cbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yNC8xNS5cbiAqL1xuLy8gdXRpbGl0aWVzXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBoYXNDaGFyOiBmdW5jdGlvbiAoc3RyaW5nLCBjaGFyKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuaW5kZXhPZihjaGFyKSAhPSAtMTtcbiAgICB9XG59Il19
