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

            }, 50, sendResponse);
            break;

        case 'tryEmail':
            google.tryEmail(message.args.email, sendResponse);
            break;
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

            name = {first: fName, last: lName};
            return false
        }
    });

    function hasChar(string, char) {
        return string.indexOf(char) != -1;
    }

    return name;
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
        debugger;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2dvb2dsZS5qcyIsImFwcC9zY3JpcHRzL2NvbnRlbnQvbGlua2VkaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMi8xNS5cbiAqL1xudmFyIGxpbmtlZGluID0gcmVxdWlyZSgnLi9saW5rZWRpbi5qcycpO1xudmFyIGdvb2dsZSA9IHJlcXVpcmUoJy4vZ29vZ2xlLmpzJyk7XG5cbmZ1bmN0aW9uIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuXG4gICAgaWYgKG1lc3NhZ2UudG8gIT0gJ2NvbnRlbnQnKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ3NjcmFwZVByb2ZpbGVMaXN0JzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5zY3JhcGVQcm9maWxlTGlzdCgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25leHRQYWdlJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5wYWdpbmF0aW9uLm5leHRQYWdlKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZ2V0QmFzaWNJbmZvJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5zY3JhcGVQcm9maWxlVmlldygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2dldE5hbWUnOlxuICAgICAgICAgICAgdmFyIHdhaXRGb3JTZWFyY2hSZXN1bHRzID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyICRyZXN1bHRzID0gJCgnI3JzbycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCRyZXN1bHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhnb29nbGUuZ2V0TmFtZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh3YWl0Rm9yU2VhcmNoUmVzdWx0cylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDUwLCBzZW5kUmVzcG9uc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAndHJ5RW1haWwnOlxuICAgICAgICAgICAgZ29vZ2xlLnRyeUVtYWlsKG1lc3NhZ2UuYXJncy5lbWFpbCwgc2VuZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZVJlY2VpdmVkKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzIxLzE1LlxuICovXG5cbnZhciBnZXROYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkcmVzdWx0cyA9ICQoJy5nOmx0KDMpJyk7XG4gICAgdmFyIG5hbWUgPSB7fTtcblxuICAgICQuZWFjaCgkcmVzdWx0cywgZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHZhciB0aXRsZSA9ICRyZXN1bHRzLmZpbmQoJ2gzJykudGV4dCgpO1xuXG4gICAgICAgIGlmIChoYXNDaGFyKHRpdGxlLCAnfCcpKSB7XG4gICAgICAgICAgICB2YXIgZnVsbE5hbWUgPSB0aXRsZS5zcGxpdCgnfCcpWzBdLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgZk5hbWUgPSBmdWxsTmFtZVswXTtcbiAgICAgICAgICAgIHZhciBsTmFtZSA9IGZ1bGxOYW1lWzFdO1xuXG4gICAgICAgICAgICBuYW1lID0ge2ZpcnN0OiBmTmFtZSwgbGFzdDogbE5hbWV9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhc0NoYXIoc3RyaW5nLCBjaGFyKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuaW5kZXhPZihjaGFyKSAhPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbn07XG5cbnZhciBpc0dtYWlsUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG5cbn07XG5cbnZhciB0cnlFbWFpbCA9IGZ1bmN0aW9uIChlbWFpbCwgY2FsbGJhY2spIHtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TmFtZTogZ2V0TmFtZSxcbiAgICBpc0dtYWlsUmVhZHk6IGlzR21haWxSZWFkeSxcbiAgICB0cnlFbWFpbDogdHJ5RW1haWxcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMS8xNS5cbiAqL1xuXG52YXIgc2NyYXBlUHJvZmlsZUxpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICB2YXIgZXJyb3IgPSBudWxsO1xuXG4gICAgLy8gZ3JhYiBlYWNoIHByb2ZpbGUgbGluayBhbmQgcHVzaCBpdCB0byByZXN1bHRzW11cbiAgICB2YXIgJHBlb3BsZURpdiA9ICQoJyNyZXN1bHRzIC5tb2QucmVzdWx0LnBlb3BsZScpO1xuXG4gICAgJC5lYWNoKCRwZW9wbGVEaXYsIGZ1bmN0aW9uIChpbmRleCwgcGVyc29uKSB7XG4gICAgICAgIHZhciAkcGVyc29uID0gJChwZXJzb24pO1xuICAgICAgICB2YXIgJG5hbWVMaW5rID0gJHBlcnNvbi5maW5kKCcuYmQgaDMgYS50aXRsZScpO1xuXG4gICAgICAgIHZhciBmdWxsTmFtZSA9ICRuYW1lTGluay50ZXh0KCk7XG5cbiAgICAgICAgdmFyIHByb2ZpbGVMaW5rID0gJG5hbWVMaW5rLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgdmFyIGhlYWRsaW5lID0gJHBlcnNvbi5maW5kKCcuZGVzY3JpcHRpb24nKS50ZXh0KCk7XG4gICAgICAgIHZhciBsb2NhdGlvbiA9ICRwZXJzb24uZmluZCgnLmRlbW9ncmFwaGljIGJkaScpLnRleHQoKTtcbiAgICAgICAgdmFyIGluZHVzdHJ5ID0gJHBlcnNvbi5maW5kKCcuZGVtb2dyYXBoaWMgZGQ6bGFzdC1jaGlsZCcpLnRleHQoKTtcblxuICAgICAgICB2YXIgcGVyc29uID0ge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIGZ1bGw6IGZ1bGxOYW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvZmlsZUxpbms6IHByb2ZpbGVMaW5rLFxuICAgICAgICAgICAgaGVhZGxpbmU6IGhlYWRsaW5lLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgICAgICAgICAgaW5kdXN0cnk6IGluZHVzdHJ5XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVzdWx0cy5wdXNoKHBlcnNvbik7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgIH0pO1xuXG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID09IDApIHtcbiAgICAgICAgZXJyb3IgPSBcIlBlb3BsZSBjb250YWluZXIgZG9lc24ndCBleGlzdFwiXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0czogcmVzdWx0cyxcbiAgICAgICAgaGFzTmV4dFBhZ2U6IHBhZ2luYXRpb24uaGFzTmV4dFBhZ2UoKSxcbiAgICAgICAgbmV4dFBhZ2U6IHBhZ2luYXRpb24ubmV4dFBhZ2UoKSxcbiAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgfVxufTtcblxudmFyIHNjcmFwZVByb2ZpbGVWaWV3ID0gZnVuY3Rpb24gKCkge1xuXG5cbiAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gJCgnI292ZXJ2aWV3LXN1bW1hcnktY3VycmVudCB0ZCBvbCBsaSBhJykudGV4dCgpO1xuXG4gICAgdmFyIHBhc3RQb3NpdGlvbnMgPSAkKCcjb3ZlcnZpZXctc3VtbWFyeS1wYXN0IHRkIG9sIGxpIGEnKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJC50cmltKCQodGhpcykudGV4dCgpKTtcbiAgICB9KS5nZXQoKTtcblxuICAgIHZhciBlZHVjYXRpb24gPSAkKCcjb3ZlcnZpZXctc3VtbWFyeS1lZHVjYXRpb24gdGQgb2wgbGkgYScpLm1hcChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkLnRyaW0oJCh0aGlzKS50ZXh0KCkpO1xuICAgIH0pLmdldCgpO1xuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50UG9zaXRpb246IGN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgcGFzdFBvc2l0aW9uczogcGFzdFBvc2l0aW9ucyxcbiAgICAgICAgZWR1Y2F0aW9uOiBlZHVjYXRpb25cbiAgICB9XG59O1xuXG52YXIgcGFnaW5hdGlvbiA9XG57XG4gICAgbmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRuZXh0UGFnaW5hdGlvbkJ0biA9ICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpO1xuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdG5hbWUgKyAkbmV4dFBhZ2luYXRpb25CdG4uYXR0cignaHJlZicpO1xuICAgIH0sXG5cbiAgICBoYXNOZXh0UGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJCgnI3Jlc3VsdHMtcGFnaW5hdGlvbiAubmV4dCBhJykubGVuZ3RoXG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcGFnaW5hdGlvbjogcGFnaW5hdGlvbixcbiAgICBzY3JhcGVQcm9maWxlTGlzdDogc2NyYXBlUHJvZmlsZUxpc3QsXG4gICAgc2NyYXBlUHJvZmlsZVZpZXc6IHNjcmFwZVByb2ZpbGVWaWV3XG59O1xuIl19
