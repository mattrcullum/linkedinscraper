(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.helpers = require('../helpers');

var linkedin = require('./linkedin.js');
var google = require('./google.js');

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
            google.tryEmail(message.args.email, sendResponse);
            break;
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
},{"../helpers":4,"./google.js":2,"./linkedin.js":3}],2:[function(require,module,exports){
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

var tryEmail = function (email, callback) {

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

        var profileLink = $nameLink.attr('href');
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
 * Created by matthew on 1/24/15.
 */
// utilities
module.exports = {
    hasChar: function (string, char) {
        return string.indexOf(char) != -1;
    }
}
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2dvb2dsZS5qcyIsImFwcC9zY3JpcHRzL2NvbnRlbnQvbGlua2VkaW4uanMiLCJhcHAvc2NyaXB0cy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIndpbmRvdy5oZWxwZXJzID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xuXG52YXIgbGlua2VkaW4gPSByZXF1aXJlKCcuL2xpbmtlZGluLmpzJyk7XG52YXIgZ29vZ2xlID0gcmVxdWlyZSgnLi9nb29nbGUuanMnKTtcblxuZnVuY3Rpb24gbWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG5cbiAgICBpZiAobWVzc2FnZS50byAhPSAnY29udGVudCcpIHJldHVybjtcblxuICAgIHN3aXRjaCAobWVzc2FnZS5hY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnc2NyYXBlUHJvZmlsZUxpc3QnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnNjcmFwZVByb2ZpbGVMaXN0KClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmV4dFBhZ2UnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnBhZ2luYXRpb24ubmV4dFBhZ2UoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZXRCYXNpY0luZm8nOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnNjcmFwZVByb2ZpbGVWaWV3KClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2V0TmFtZSc6XG4gICAgICAgICAgICB2YXIgdGltZSA9IHtcbiAgICAgICAgICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgICAgICAgICBpbnRlcnZhbDogNTAsXG4gICAgICAgICAgICAgICAgb3V0OiA1MDAwIC8vdGltZS5vdXQgOylcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciB3YWl0Rm9yU2VhcmNoUmVzdWx0cyA9IHNldEludGVydmFsKGZ1bmN0aW9uIChjYWxsYmFjaywgdGltZSkge1xuXG4gICAgICAgICAgICAgICAgdGltZS50b3RhbCArPSB0aW1lLmludGVydmFsO1xuXG4gICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gJCgnI3JzbycpO1xuICAgICAgICAgICAgICAgIHZhciBoYXNSZXN1bHRzID0gJHJlc3VsdHMuZmluZCgnbGknKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFzUmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZ29vZ2xlLmdldE5hbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDM1MCwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2FpdEZvclNlYXJjaFJlc3VsdHMpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoJHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2FpdEZvclNlYXJjaFJlc3VsdHMpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbWUudG90YWwpXG5cbiAgICAgICAgICAgIH0sIHRpbWUuaW50ZXJ2YWwsIHNlbmRSZXNwb25zZSwgdGltZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICd0cnlFbWFpbCc6XG4gICAgICAgICAgICBnb29nbGUudHJ5RW1haWwobWVzc2FnZS5hcmdzLmVtYWlsLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlUmVjZWl2ZWQpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMjEvMTUuXG4gKi9cblxudmFyIGdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRyZXN1bHRzID0gJCgnLmc6bHQoMyknKTtcbiAgICB2YXIgbmFtZSA9IHt9O1xuXG4gICAgJC5lYWNoKCRyZXN1bHRzLCBmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgdmFyIHRpdGxlID0gJChpdGVtKS5maW5kKCdoMycpLnRleHQoKTtcblxuICAgICAgICAvLyBUaGUgZ29vZ2xlIHJlc3VsdCB3ZSB3YW50IHdpbGwgbG9vayBsaWtlIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgICAvLyBcIkpvaG4gU21pdGggfCBMaW5rZWRJblwiXG4gICAgICAgIC8vIFwiSm9obiBTLiB8IExpbmtlZEluXCJcbiAgICAgICAgLy8gXCJKb2huIEouIFNtaXRoIHwgTGlua2VkSW5cIlxuICAgICAgICBpZiAoaGVscGVycy5oYXNDaGFyKHRpdGxlLCAnfCcpKSB7XG4gICAgICAgICAgICB2YXIgZnVsbE5hbWUgPVxuICAgICAgICAgICAgICAgIHRpdGxlLnNwbGl0KCd8JylbMF0udHJpbSgpLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgICAgIHZhciBmTmFtZSA9IGZ1bGxOYW1lWzBdO1xuICAgICAgICAgICAgdmFyIGxOYW1lID0gZnVsbE5hbWVbMV07XG5cbiAgICAgICAgICAgIG5hbWUgPSB7Zmlyc3Q6IGZOYW1lLCBsYXN0OiBsTmFtZSwgZnVsbDogZnVsbE5hbWV9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuYW1lIHx8IGZhbHNlO1xufTtcblxudmFyIGlzR21haWxSZWFkeSA9IGZ1bmN0aW9uICgpIHtcblxufTtcblxudmFyIHRyeUVtYWlsID0gZnVuY3Rpb24gKGVtYWlsLCBjYWxsYmFjaykge1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXROYW1lOiBnZXROYW1lLFxuICAgIGlzR21haWxSZWFkeTogaXNHbWFpbFJlYWR5LFxuICAgIHRyeUVtYWlsOiB0cnlFbWFpbFxufTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzExLzE1LlxuICovXG5cbnZhciBzY3JhcGVQcm9maWxlTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICAvLyBncmFiIGVhY2ggcHJvZmlsZSBsaW5rIGFuZCBwdXNoIGl0IHRvIHJlc3VsdHNbXVxuICAgIHZhciAkcGVvcGxlRGl2ID0gJCgnI3Jlc3VsdHMgLm1vZC5yZXN1bHQucGVvcGxlJyk7XG5cbiAgICAkLmVhY2goJHBlb3BsZURpdiwgZnVuY3Rpb24gKGluZGV4LCBwZXJzb24pIHtcbiAgICAgICAgdmFyICRwZXJzb24gPSAkKHBlcnNvbik7XG4gICAgICAgIHZhciAkbmFtZUxpbmsgPSAkcGVyc29uLmZpbmQoJy5iZCBoMyBhLnRpdGxlJyk7XG5cbiAgICAgICAgdmFyIHByb2ZpbGVMaW5rID0gJG5hbWVMaW5rLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGhlYWRsaW5lID0gJHBlcnNvbi5maW5kKCcuZGVzY3JpcHRpb24nKS50ZXh0KCk7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9ICRwZXJzb24uZmluZCgnLmRlbW9ncmFwaGljIGJkaScpLnRleHQoKTtcbiAgICAgICAgdmFyIGluZHVzdHJ5ID0gJHBlcnNvbi5maW5kKCcuZGVtb2dyYXBoaWMgZGQ6bGFzdC1jaGlsZCcpLnRleHQoKTtcblxuICAgICAgICB2YXIgZnVsbE5hbWUgPSAkbmFtZUxpbmsudGV4dCgpLnRyaW0oKTtcbiAgICAgICAgdmFyIG5hbWUgPSB7fTtcblxuICAgICAgICAvLyBpZiB0aGUgZnVsbE5hbWUgaGFzIGEgcGVyaW9kLCB3ZSdsbCBhc3N1bWUgaXQncyBhYmJyZXZpYXRlZFxuICAgICAgICBpZiAoaGVscGVycy5oYXNDaGFyKGZ1bGxOYW1lLCAnLicpKSB7XG4gICAgICAgICAgICBuYW1lLmZpcnN0ID0gZnVsbE5hbWUuc3BsaXQoJyAnKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBmdWxsTmFtZSBpcyBoaWRkZW5cbiAgICAgICAgZWxzZSBpZiAoZnVsbE5hbWUgPT0gXCJMaW5rZWRJbiBNZW1iZXJcIikge1xuICAgICAgICAgICAgbmFtZS5pc0hpZGRlbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBpdCdzIGl0J3Mgbm90IGFiYnJldmlhdGVkLCB3ZSdsbCBhc3N1bWUgaXQgbG9va3MgbGlrZSBcIkpvaG4gU21pdGhcIiwgXCJKb2huIEouIFNtaXRoXCIgb3IgXCJKb2huIEouIFNtaXRoIElJXCJcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmdWxsTmFtZSA9IGZ1bGxOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBuYW1lLmZpcnN0ID0gZnVsbE5hbWVbMF07XG5cbiAgICAgICAgICAgIC8vIFwiSm9obiBKLiBTbWl0aCBvciBKb2huIEouIFNtaXRoIElJXCJcbiAgICAgICAgICAgIGlmIChmdWxsTmFtZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgbmFtZS5sYXN0ID0gZnVsbE5hbWVbMl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFwiSm9obiBTbWl0aFwiXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lLmZpcnN0ID0gZnVsbE5hbWVbMF07XG4gICAgICAgICAgICAgICAgbmFtZS5sYXN0ID0gZnVsbE5hbWVbMV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwZXJzb24gPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgcHJvZmlsZUxpbms6IHByb2ZpbGVMaW5rLFxuICAgICAgICAgICAgaGVhZGxpbmU6IGhlYWRsaW5lLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgICAgaW5kdXN0cnk6IGluZHVzdHJ5XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZ1bGxOYW1lID09IFwiTGlua2VkSW4gTWVtYmVyXCIpIHtcbiAgICAgICAgICAgIHBlcnNvbi5uYW1lID0ge2lzSGlkZGVuOiB0cnVlfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHBlcnNvbik7XG4gICAgfSk7XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICBlcnJvciA9IFwiUGVvcGxlIGNvbnRhaW5lciBkb2Vzbid0IGV4aXN0XCJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgICAgICBoYXNOZXh0UGFnZTogcGFnaW5hdGlvbi5oYXNOZXh0UGFnZSgpLFxuICAgICAgICBuZXh0UGFnZTogcGFnaW5hdGlvbi5uZXh0UGFnZSgpLFxuICAgICAgICBlcnJvcjogZXJyb3JcbiAgICB9XG59O1xuXG52YXIgc2NyYXBlUHJvZmlsZVZpZXcgPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAkKCcjb3ZlcnZpZXctc3VtbWFyeS1jdXJyZW50IHRkIG9sIGxpIGEnKS50ZXh0KCk7XG5cbiAgICB2YXIgcGFzdFBvc2l0aW9ucyA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LXBhc3QgdGQgb2wgbGkgYScpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkLnRyaW0oJCh0aGlzKS50ZXh0KCkpO1xuICAgIH0pLmdldCgpO1xuXG4gICAgdmFyIGVkdWNhdGlvbiA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LWVkdWNhdGlvbiB0ZCBvbCBsaSBhJykubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQudHJpbSgkKHRoaXMpLnRleHQoKSk7XG4gICAgfSkuZ2V0KCk7XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uLFxuICAgICAgICBwYXN0UG9zaXRpb25zOiBwYXN0UG9zaXRpb25zLFxuICAgICAgICBlZHVjYXRpb246IGVkdWNhdGlvblxuICAgIH1cbn07XG5cbnZhciBwYWdpbmF0aW9uID1cbntcbiAgICBuZXh0UGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5leHRQYWdpbmF0aW9uQnRuID0gJCgnI3Jlc3VsdHMtcGFnaW5hdGlvbiAubmV4dCBhJyk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZSArICRuZXh0UGFnaW5hdGlvbkJ0bi5hdHRyKCdocmVmJyk7XG4gICAgfSxcblxuICAgIGhhc05leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKS5sZW5ndGhcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uLFxuICAgIHNjcmFwZVByb2ZpbGVMaXN0OiBzY3JhcGVQcm9maWxlTGlzdCxcbiAgICBzY3JhcGVQcm9maWxlVmlldzogc2NyYXBlUHJvZmlsZVZpZXdcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzI0LzE1LlxuICovXG4vLyB1dGlsaXRpZXNcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGhhc0NoYXI6IGZ1bmN0aW9uIChzdHJpbmcsIGNoYXIpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5pbmRleE9mKGNoYXIpICE9IC0xO1xuICAgIH1cbn0iXX0=
