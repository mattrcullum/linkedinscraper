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

var getProfileLinks = function () {
    var profileLinks = [];
    var error = false;

    // grab each profile link and push it to profileLinks[]
    var $profileLinks = $('#results .mod.result.people .bd h3 a.title');

    if ($profileLinks.length == 0) {
        error = "People container doesn't exist"
    }
    $.each($profileLinks, function (index, link) {
        var link = $(link).attr('href');
        profileLinks.push(link)
    });

    return {
        profileLinks: profileLinks,
        hasNextPage: pagination.hasNextPage(),
        nextPage: pagination.nextPage(),
        error: error
    }
};

var getBasicInfo = function () {
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
    getProfileLinks: getProfileLinks,
    getBasicInfo: getBasicInfo
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2xpbmtlZGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzEyLzE1LlxuICovXG52YXIgbGlua2VkaW4gPSByZXF1aXJlKCcuL2xpbmtlZGluLmpzJyk7XG5cbmZ1bmN0aW9uIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuXG4gICAgaWYgKG1lc3NhZ2UudG8gIT0gJ2NvbnRlbnQnKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2dldFByb2ZpbGVMaW5rcyc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uZ2V0UHJvZmlsZUxpbmtzKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmV4dFBhZ2UnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLnBhZ2luYXRpb24ubmV4dFBhZ2UoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZXRCYXNpY0luZm8nOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLmdldEJhc2ljSW5mbygpXG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlUmVjZWl2ZWQpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTEvMTUuXG4gKi9cblxudmFyIGdldFByb2ZpbGVMaW5rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvZmlsZUxpbmtzID0gW107XG4gICAgdmFyIGVycm9yID0gZmFsc2U7XG5cbiAgICAvLyBncmFiIGVhY2ggcHJvZmlsZSBsaW5rIGFuZCBwdXNoIGl0IHRvIHByb2ZpbGVMaW5rc1tdXG4gICAgdmFyICRwcm9maWxlTGlua3MgPSAkKCcjcmVzdWx0cyAubW9kLnJlc3VsdC5wZW9wbGUgLmJkIGgzIGEudGl0bGUnKTtcblxuICAgIGlmICgkcHJvZmlsZUxpbmtzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGVycm9yID0gXCJQZW9wbGUgY29udGFpbmVyIGRvZXNuJ3QgZXhpc3RcIlxuICAgIH1cbiAgICAkLmVhY2goJHByb2ZpbGVMaW5rcywgZnVuY3Rpb24gKGluZGV4LCBsaW5rKSB7XG4gICAgICAgIHZhciBsaW5rID0gJChsaW5rKS5hdHRyKCdocmVmJyk7XG4gICAgICAgIHByb2ZpbGVMaW5rcy5wdXNoKGxpbmspXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9maWxlTGlua3M6IHByb2ZpbGVMaW5rcyxcbiAgICAgICAgaGFzTmV4dFBhZ2U6IHBhZ2luYXRpb24uaGFzTmV4dFBhZ2UoKSxcbiAgICAgICAgbmV4dFBhZ2U6IHBhZ2luYXRpb24ubmV4dFBhZ2UoKSxcbiAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgfVxufTtcblxudmFyIGdldEJhc2ljSW5mbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJHByb2ZpbGVDb250YWluZXIgPSAkKCcucHJvZmlsZS1vdmVydmlldy1jb250ZW50Jyk7XG4gICAgdmFyICRjdXJyZW50UG9zaXRpb25EaXYgPSAkKCcjYmFja2dyb3VuZC1leHBlcmllbmNlIC5jdXJyZW50LXBvc2l0aW9uJyk7XG5cbiAgICB2YXIgZnVsbE5hbWUgPSAkcHJvZmlsZUNvbnRhaW5lci5maW5kKCcuZnVsbC1uYW1lJykudGV4dCgpO1xuICAgIHZhciBoZWFkbGluZSA9ICRwcm9maWxlQ29udGFpbmVyLmZpbmQoJyNoZWFkbGluZSAudGl0bGUnKS50ZXh0KCk7XG5cbiAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gJGN1cnJlbnRQb3NpdGlvbkRpdi5maW5kKCdhW25hbWU9dGl0bGVdJykuZmlyc3QoKS50ZXh0KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiB7ZnVsbDogZnVsbE5hbWV9LFxuICAgICAgICBoZWFkbGluZTogaGVhZGxpbmUsXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbjogY3VycmVudFBvc2l0aW9uXG4gICAgfVxufTtcblxudmFyIHBhZ2luYXRpb24gPVxue1xuICAgIG5leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkbmV4dFBhZ2luYXRpb25CdG4gPSAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKTtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lICsgJG5leHRQYWdpbmF0aW9uQnRuLmF0dHIoJ2hyZWYnKTtcbiAgICB9LFxuXG4gICAgaGFzTmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpLmxlbmd0aFxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb24sXG4gICAgZ2V0UHJvZmlsZUxpbmtzOiBnZXRQcm9maWxlTGlua3MsXG4gICAgZ2V0QmFzaWNJbmZvOiBnZXRCYXNpY0luZm9cbn07XG4iXX0=
