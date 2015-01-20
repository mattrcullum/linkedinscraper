(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by matthew on 1/12/15.
 */
var linkedin = require('./linkedin.js');

function messageReceived(message, sender, sendResponse) {

    if (message.to != 'content') return;

    switch (message.action) {
        case 'getProfileLinks':
            sendResponse(
                linkedin.getProfileLinks()
            );
            break;
        case 'nextPage':
            sendResponse(
                linkedin.pagination.nextPage()
            );
            break;
        case 'getBasicInfo':
            sendResponse(
                linkedin.getBasicInfo()
            )
    }

    return true;
}

chrome.runtime.onMessage.addListener(messageReceived);
},{"./linkedin.js":2}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/11/15.
 */

var scrapeProfileList = function () {
    var results = [];
    var error = false;

    // grab each profile link and push it to results[]
    var $peopleDiv = $('#results .mod.result.people');

    $.each($peopleDiv, function (index, item) {
        var $item = $(item);
        var $nameLink = $item.find('bd h3 a.title');

        var fullName = $nameLink.text();
        var profileLink = $nameLink.attr('href');

        var person = {
            name: {
                full: fullName
            },
            profileLink: profileLink
        }
    });

    if ($results.length == 0) {
        error = "People container doesn't exist"
    }
    $.each($results, function (index, link) {
        var link = $(link).attr('href');
        results.push(link)
    });

    return {
        results: results,
        hasNextPage: pagination.hasNextPage(),
        nextPage: pagination.nextPage(),
        error: error
    }
};

var scrapeProfileView = function () {
    var $profileContainer = $('.profile-overview-content');
    var $currentPositionDiv = $('#background-experience .current-position');

    var fullName = $profileContainer.find('.full-name').text();
    var headline = $profileContainer.find('#headline .title').text();

    var currentPosition = $currentPositionDiv.find('a[name=title]').first().text();

    return {
        name: {full: fullName},
        headline: headline,
        currentPosition: currentPosition
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2xpbmtlZGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzEyLzE1LlxuICovXG52YXIgbGlua2VkaW4gPSByZXF1aXJlKCcuL2xpbmtlZGluLmpzJyk7XG5cbmZ1bmN0aW9uIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuXG4gICAgaWYgKG1lc3NhZ2UudG8gIT0gJ2NvbnRlbnQnKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2dldFByb2ZpbGVMaW5rcyc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uZ2V0UHJvZmlsZUxpbmtzKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmV4dFBhZ2UnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnBhZ2luYXRpb24ubmV4dFBhZ2UoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZXRCYXNpY0luZm8nOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLmdldEJhc2ljSW5mbygpXG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlUmVjZWl2ZWQpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTEvMTUuXG4gKi9cblxudmFyIHNjcmFwZVByb2ZpbGVMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG5cbiAgICAvLyBncmFiIGVhY2ggcHJvZmlsZSBsaW5rIGFuZCBwdXNoIGl0IHRvIHJlc3VsdHNbXVxuICAgIHZhciAkcGVvcGxlRGl2ID0gJCgnI3Jlc3VsdHMgLm1vZC5yZXN1bHQucGVvcGxlJyk7XG5cbiAgICAkLmVhY2goJHBlb3BsZURpdiwgZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHZhciAkaXRlbSA9ICQoaXRlbSk7XG4gICAgICAgIHZhciAkbmFtZUxpbmsgPSAkaXRlbS5maW5kKCdiZCBoMyBhLnRpdGxlJyk7XG5cbiAgICAgICAgdmFyIGZ1bGxOYW1lID0gJG5hbWVMaW5rLnRleHQoKTtcbiAgICAgICAgdmFyIHByb2ZpbGVMaW5rID0gJG5hbWVMaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICB2YXIgcGVyc29uID0ge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGZ1bGw6IGZ1bGxOYW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvZmlsZUxpbms6IHByb2ZpbGVMaW5rXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICgkcmVzdWx0cy5sZW5ndGggPT0gMCkge1xuICAgICAgICBlcnJvciA9IFwiUGVvcGxlIGNvbnRhaW5lciBkb2Vzbid0IGV4aXN0XCJcbiAgICB9XG4gICAgJC5lYWNoKCRyZXN1bHRzLCBmdW5jdGlvbiAoaW5kZXgsIGxpbmspIHtcbiAgICAgICAgdmFyIGxpbmsgPSAkKGxpbmspLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGxpbmspXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHRzOiByZXN1bHRzLFxuICAgICAgICBoYXNOZXh0UGFnZTogcGFnaW5hdGlvbi5oYXNOZXh0UGFnZSgpLFxuICAgICAgICBuZXh0UGFnZTogcGFnaW5hdGlvbi5uZXh0UGFnZSgpLFxuICAgICAgICBlcnJvcjogZXJyb3JcbiAgICB9XG59O1xuXG52YXIgc2NyYXBlUHJvZmlsZVZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRwcm9maWxlQ29udGFpbmVyID0gJCgnLnByb2ZpbGUtb3ZlcnZpZXctY29udGVudCcpO1xuICAgIHZhciAkY3VycmVudFBvc2l0aW9uRGl2ID0gJCgnI2JhY2tncm91bmQtZXhwZXJpZW5jZSAuY3VycmVudC1wb3NpdGlvbicpO1xuXG4gICAgdmFyIGZ1bGxOYW1lID0gJHByb2ZpbGVDb250YWluZXIuZmluZCgnLmZ1bGwtbmFtZScpLnRleHQoKTtcbiAgICB2YXIgaGVhZGxpbmUgPSAkcHJvZmlsZUNvbnRhaW5lci5maW5kKCcjaGVhZGxpbmUgLnRpdGxlJykudGV4dCgpO1xuXG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9ICRjdXJyZW50UG9zaXRpb25EaXYuZmluZCgnYVtuYW1lPXRpdGxlXScpLmZpcnN0KCkudGV4dCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZToge2Z1bGw6IGZ1bGxOYW1lfSxcbiAgICAgICAgaGVhZGxpbmU6IGhlYWRsaW5lLFxuICAgICAgICBjdXJyZW50UG9zaXRpb246IGN1cnJlbnRQb3NpdGlvblxuICAgIH1cbn07XG5cbnZhciBwYWdpbmF0aW9uID1cbntcbiAgICBuZXh0UGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5leHRQYWdpbmF0aW9uQnRuID0gJCgnI3Jlc3VsdHMtcGFnaW5hdGlvbiAubmV4dCBhJyk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZSArICRuZXh0UGFnaW5hdGlvbkJ0bi5hdHRyKCdocmVmJyk7XG4gICAgfSxcblxuICAgIGhhc05leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKS5sZW5ndGhcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uLFxuICAgIHNjcmFwZVByb2ZpbGVMaXN0OiBzY3JhcGVQcm9maWxlTGlzdCxcbiAgICBzY3JhcGVQcm9maWxlVmlldzogc2NyYXBlUHJvZmlsZVZpZXdcbn07XG4iXX0=
