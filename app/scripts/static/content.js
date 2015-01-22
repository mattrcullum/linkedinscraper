(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by matthew on 1/12/15.
 */
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
            var waitForSearchResults = setInterval(function (callback) {
                var $results = $('#rso');

                if ($results.length) {
                    callback(google.getName());
                    clearInterval(waitForSearchResults)
                }

            }, 50, sendResponse)
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
},{"./google.js":2,"./linkedin.js":3}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/21/15.
 */

var getName = function () {
    var $results = $('.g:lt(3)');
    var name = {};

    $.each($results, function (index, item) {
        var title = $results.find('h3').text();

        if (hasChar(title, '|')) {
            var fullName = title.split('|')[0].split(' ');
            var fName = fullName[0];
            var lName = fullName[1];

            name = {first: fName, last: lName}
            return false
        }
    });

    function hasChar(string, char) {
        return string.indexOf(char) != -1;
    }

    return name;
};

module.exports = {
    getName: getName
}
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

        var fullName = $nameLink.text();
        var profileLink = $nameLink.attr('href');
        var headline = $person.find('.description').text();
        var location = $person.find('.demographic bdi').text();
        var industry = $person.find('.demographic dd:last-child').text();

        var person = {
            name: {
                full: fullName
            },
            profileLink: profileLink,
            headline: headline,
            location: location,
            industry: industry
        };

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2dvb2dsZS5qcyIsImFwcC9zY3JpcHRzL2NvbnRlbnQvbGlua2VkaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzEyLzE1LlxuICovXG52YXIgbGlua2VkaW4gPSByZXF1aXJlKCcuL2xpbmtlZGluLmpzJyk7XG52YXIgZ29vZ2xlID0gcmVxdWlyZSgnLi9nb29nbGUuanMnKTtcblxuZnVuY3Rpb24gbWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG5cbiAgICBpZiAobWVzc2FnZS50byAhPSAnY29udGVudCcpIHJldHVybjtcblxuICAgIHN3aXRjaCAobWVzc2FnZS5hY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnc2NyYXBlUHJvZmlsZUxpc3QnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnNjcmFwZVByb2ZpbGVMaXN0KClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmV4dFBhZ2UnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnBhZ2luYXRpb24ubmV4dFBhZ2UoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZXRCYXNpY0luZm8nOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnNjcmFwZVByb2ZpbGVWaWV3KClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2V0TmFtZSc6XG4gICAgICAgICAgICB2YXIgd2FpdEZvclNlYXJjaFJlc3VsdHMgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgJHJlc3VsdHMgPSAkKCcjcnNvJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGdvb2dsZS5nZXROYW1lKCkpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JTZWFyY2hSZXN1bHRzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgNTAsIHNlbmRSZXNwb25zZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2VSZWNlaXZlZCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yMS8xNS5cbiAqL1xuXG52YXIgZ2V0TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHJlc3VsdHMgPSAkKCcuZzpsdCgzKScpO1xuICAgIHZhciBuYW1lID0ge307XG5cbiAgICAkLmVhY2goJHJlc3VsdHMsIGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICB2YXIgdGl0bGUgPSAkcmVzdWx0cy5maW5kKCdoMycpLnRleHQoKTtcblxuICAgICAgICBpZiAoaGFzQ2hhcih0aXRsZSwgJ3wnKSkge1xuICAgICAgICAgICAgdmFyIGZ1bGxOYW1lID0gdGl0bGUuc3BsaXQoJ3wnKVswXS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgdmFyIGZOYW1lID0gZnVsbE5hbWVbMF07XG4gICAgICAgICAgICB2YXIgbE5hbWUgPSBmdWxsTmFtZVsxXTtcblxuICAgICAgICAgICAgbmFtZSA9IHtmaXJzdDogZk5hbWUsIGxhc3Q6IGxOYW1lfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhc0NoYXIoc3RyaW5nLCBjaGFyKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuaW5kZXhPZihjaGFyKSAhPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldE5hbWU6IGdldE5hbWVcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzExLzE1LlxuICovXG5cbnZhciBzY3JhcGVQcm9maWxlTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICAvLyBncmFiIGVhY2ggcHJvZmlsZSBsaW5rIGFuZCBwdXNoIGl0IHRvIHJlc3VsdHNbXVxuICAgIHZhciAkcGVvcGxlRGl2ID0gJCgnI3Jlc3VsdHMgLm1vZC5yZXN1bHQucGVvcGxlJyk7XG5cbiAgICAkLmVhY2goJHBlb3BsZURpdiwgZnVuY3Rpb24gKGluZGV4LCBwZXJzb24pIHtcbiAgICAgICAgdmFyICRwZXJzb24gPSAkKHBlcnNvbik7XG4gICAgICAgIHZhciAkbmFtZUxpbmsgPSAkcGVyc29uLmZpbmQoJy5iZCBoMyBhLnRpdGxlJyk7XG5cbiAgICAgICAgdmFyIGZ1bGxOYW1lID0gJG5hbWVMaW5rLnRleHQoKTtcbiAgICAgICAgdmFyIHByb2ZpbGVMaW5rID0gJG5hbWVMaW5rLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGhlYWRsaW5lID0gJHBlcnNvbi5maW5kKCcuZGVzY3JpcHRpb24nKS50ZXh0KCk7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9ICRwZXJzb24uZmluZCgnLmRlbW9ncmFwaGljIGJkaScpLnRleHQoKTtcbiAgICAgICAgdmFyIGluZHVzdHJ5ID0gJHBlcnNvbi5maW5kKCcuZGVtb2dyYXBoaWMgZGQ6bGFzdC1jaGlsZCcpLnRleHQoKTtcblxuICAgICAgICB2YXIgcGVyc29uID0ge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGZ1bGw6IGZ1bGxOYW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvZmlsZUxpbms6IHByb2ZpbGVMaW5rLFxuICAgICAgICAgICAgaGVhZGxpbmU6IGhlYWRsaW5lLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgICAgaW5kdXN0cnk6IGluZHVzdHJ5XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHBlcnNvbik7XG4gICAgfSk7XG5cbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICBlcnJvciA9IFwiUGVvcGxlIGNvbnRhaW5lciBkb2Vzbid0IGV4aXN0XCJcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgICAgICBoYXNOZXh0UGFnZTogcGFnaW5hdGlvbi5oYXNOZXh0UGFnZSgpLFxuICAgICAgICBuZXh0UGFnZTogcGFnaW5hdGlvbi5uZXh0UGFnZSgpLFxuICAgICAgICBlcnJvcjogZXJyb3JcbiAgICB9XG59O1xuXG52YXIgc2NyYXBlUHJvZmlsZVZpZXcgPSBmdW5jdGlvbiAoKSB7XG5cblxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAkKCcjb3ZlcnZpZXctc3VtbWFyeS1jdXJyZW50IHRkIG9sIGxpIGEnKS50ZXh0KCk7XG5cbiAgICB2YXIgcGFzdFBvc2l0aW9ucyA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LXBhc3QgdGQgb2wgbGkgYScpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkLnRyaW0oJCh0aGlzKS50ZXh0KCkpO1xuICAgIH0pLmdldCgpO1xuXG4gICAgdmFyIGVkdWNhdGlvbiA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LWVkdWNhdGlvbiB0ZCBvbCBsaSBhJykubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQudHJpbSgkKHRoaXMpLnRleHQoKSk7XG4gICAgfSkuZ2V0KCk7XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uLFxuICAgICAgICBwYXN0UG9zaXRpb25zOiBwYXN0UG9zaXRpb25zLFxuICAgICAgICBlZHVjYXRpb246IGVkdWNhdGlvblxuICAgIH1cbn07XG5cbnZhciBwYWdpbmF0aW9uID1cbntcbiAgICBuZXh0UGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5leHRQYWdpbmF0aW9uQnRuID0gJCgnI3Jlc3VsdHMtcGFnaW5hdGlvbiAubmV4dCBhJyk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZSArICRuZXh0UGFnaW5hdGlvbkJ0bi5hdHRyKCdocmVmJyk7XG4gICAgfSxcblxuICAgIGhhc05leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKS5sZW5ndGhcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uLFxuICAgIHNjcmFwZVByb2ZpbGVMaXN0OiBzY3JhcGVQcm9maWxlTGlzdCxcbiAgICBzY3JhcGVQcm9maWxlVmlldzogc2NyYXBlUHJvZmlsZVZpZXdcbn07XG4iXX0=
