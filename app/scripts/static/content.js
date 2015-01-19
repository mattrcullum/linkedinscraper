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

    var fullName = $profileContainer.find('.full-name').text();
    var headline = $profileContainer.find('#headline .title').text();

    return {fullName: fullName, headline: headline}
}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2xpbmtlZGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMi8xNS5cbiAqL1xudmFyIGxpbmtlZGluID0gcmVxdWlyZSgnLi9saW5rZWRpbi5qcycpO1xuXG5mdW5jdGlvbiBtZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcblxuICAgIGlmIChtZXNzYWdlLnRvICE9ICdjb250ZW50JykgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChtZXNzYWdlLmFjdGlvbikge1xuICAgICAgICBjYXNlICdnZXRQcm9maWxlTGlua3MnOlxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFxuICAgICAgICAgICAgICAgIGxpbmtlZGluLmdldFByb2ZpbGVMaW5rcygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25leHRQYWdlJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5wYWdpbmF0aW9uLm5leHRQYWdlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2V0QmFzaWNJbmZvJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5nZXRCYXNpY0luZm8oKVxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZVJlY2VpdmVkKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzExLzE1LlxuICovXG5cbnZhciBnZXRQcm9maWxlTGlua3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb2ZpbGVMaW5rcyA9IFtdO1xuICAgIHZhciBlcnJvciA9IGZhbHNlO1xuXG4gICAgLy8gZ3JhYiBlYWNoIHByb2ZpbGUgbGluayBhbmQgcHVzaCBpdCB0byBwcm9maWxlTGlua3NbXVxuICAgIHZhciAkcHJvZmlsZUxpbmtzID0gJCgnI3Jlc3VsdHMgLm1vZC5yZXN1bHQucGVvcGxlIC5iZCBoMyBhLnRpdGxlJyk7XG5cbiAgICBpZiAoJHByb2ZpbGVMaW5rcy5sZW5ndGggPT0gMCkge1xuICAgICAgICBlcnJvciA9IFwiUGVvcGxlIGNvbnRhaW5lciBkb2Vzbid0IGV4aXN0XCJcbiAgICB9XG4gICAgJC5lYWNoKCRwcm9maWxlTGlua3MsIGZ1bmN0aW9uIChpbmRleCwgbGluaykge1xuICAgICAgICB2YXIgbGluayA9ICQobGluaykuYXR0cignaHJlZicpO1xuICAgICAgICBwcm9maWxlTGlua3MucHVzaChsaW5rKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZmlsZUxpbmtzOiBwcm9maWxlTGlua3MsXG4gICAgICAgIGhhc05leHRQYWdlOiBwYWdpbmF0aW9uLmhhc05leHRQYWdlKCksXG4gICAgICAgIG5leHRQYWdlOiBwYWdpbmF0aW9uLm5leHRQYWdlKCksXG4gICAgICAgIGVycm9yOiBlcnJvclxuICAgIH1cbn07XG5cbnZhciBnZXRCYXNpY0luZm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICRwcm9maWxlQ29udGFpbmVyID0gJCgnLnByb2ZpbGUtb3ZlcnZpZXctY29udGVudCcpO1xuXG4gICAgdmFyIGZ1bGxOYW1lID0gJHByb2ZpbGVDb250YWluZXIuZmluZCgnLmZ1bGwtbmFtZScpLnRleHQoKTtcbiAgICB2YXIgaGVhZGxpbmUgPSAkcHJvZmlsZUNvbnRhaW5lci5maW5kKCcjaGVhZGxpbmUgLnRpdGxlJykudGV4dCgpO1xuXG4gICAgcmV0dXJuIHtmdWxsTmFtZTogZnVsbE5hbWUsIGhlYWRsaW5lOiBoZWFkbGluZX1cbn1cblxudmFyIHBhZ2luYXRpb24gPVxue1xuICAgIG5leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkbmV4dFBhZ2luYXRpb25CdG4gPSAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKTtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lICsgJG5leHRQYWdpbmF0aW9uQnRuLmF0dHIoJ2hyZWYnKTtcbiAgICB9LFxuXG4gICAgaGFzTmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpLmxlbmd0aFxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb24sXG4gICAgZ2V0UHJvZmlsZUxpbmtzOiBnZXRQcm9maWxlTGlua3MsXG4gICAgZ2V0QmFzaWNJbmZvOiBnZXRCYXNpY0luZm9cbiAgICB9O1xuIl19
