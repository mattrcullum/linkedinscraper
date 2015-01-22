(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by matthew on 1/12/15.
 */
var linkedin = require('./linkedin.js');

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
            setInterval(function (callback) {
                var $results = $('#res');
                if ($results.length) {
                    sendResponse(getName());
                }
            }, 50, sendResponse)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2xpbmtlZGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMi8xNS5cbiAqL1xudmFyIGxpbmtlZGluID0gcmVxdWlyZSgnLi9saW5rZWRpbi5qcycpO1xuXG5mdW5jdGlvbiBtZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcblxuICAgIGlmIChtZXNzYWdlLnRvICE9ICdjb250ZW50JykgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChtZXNzYWdlLmFjdGlvbikge1xuICAgICAgICBjYXNlICdzY3JhcGVQcm9maWxlTGlzdCc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uc2NyYXBlUHJvZmlsZUxpc3QoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICduZXh0UGFnZSc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4ucGFnaW5hdGlvbi5uZXh0UGFnZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2dldEJhc2ljSW5mbyc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uc2NyYXBlUHJvZmlsZVZpZXcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZXROYW1lJzpcbiAgICAgICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciAkcmVzdWx0cyA9ICQoJyNyZXMnKTtcbiAgICAgICAgICAgICAgICBpZiAoJHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShnZXROYW1lKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwLCBzZW5kUmVzcG9uc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihtZXNzYWdlUmVjZWl2ZWQpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTEvMTUuXG4gKi9cblxudmFyIHNjcmFwZVByb2ZpbGVMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIGVycm9yID0gbnVsbDtcblxuICAgIC8vIGdyYWIgZWFjaCBwcm9maWxlIGxpbmsgYW5kIHB1c2ggaXQgdG8gcmVzdWx0c1tdXG4gICAgdmFyICRwZW9wbGVEaXYgPSAkKCcjcmVzdWx0cyAubW9kLnJlc3VsdC5wZW9wbGUnKTtcblxuICAgICQuZWFjaCgkcGVvcGxlRGl2LCBmdW5jdGlvbiAoaW5kZXgsIHBlcnNvbikge1xuICAgICAgICB2YXIgJHBlcnNvbiA9ICQocGVyc29uKTtcbiAgICAgICAgdmFyICRuYW1lTGluayA9ICRwZXJzb24uZmluZCgnLmJkIGgzIGEudGl0bGUnKTtcblxuICAgICAgICB2YXIgZnVsbE5hbWUgPSAkbmFtZUxpbmsudGV4dCgpO1xuICAgICAgICB2YXIgcHJvZmlsZUxpbmsgPSAkbmFtZUxpbmsuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgaGVhZGxpbmUgPSAkcGVyc29uLmZpbmQoJy5kZXNjcmlwdGlvbicpLnRleHQoKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gJHBlcnNvbi5maW5kKCcuZGVtb2dyYXBoaWMgYmRpJykudGV4dCgpO1xuICAgICAgICB2YXIgaW5kdXN0cnkgPSAkcGVyc29uLmZpbmQoJy5kZW1vZ3JhcGhpYyBkZDpsYXN0LWNoaWxkJykudGV4dCgpO1xuXG4gICAgICAgIHZhciBwZXJzb24gPSB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgZnVsbDogZnVsbE5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9maWxlTGluazogcHJvZmlsZUxpbmssXG4gICAgICAgICAgICBoZWFkbGluZTogaGVhZGxpbmUsXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgICAgICBpbmR1c3RyeTogaW5kdXN0cnlcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRzLnB1c2gocGVyc29uKTtcbiAgICB9KTtcblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGVycm9yID0gXCJQZW9wbGUgY29udGFpbmVyIGRvZXNuJ3QgZXhpc3RcIlxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgICAgIGhhc05leHRQYWdlOiBwYWdpbmF0aW9uLmhhc05leHRQYWdlKCksXG4gICAgICAgIG5leHRQYWdlOiBwYWdpbmF0aW9uLm5leHRQYWdlKCksXG4gICAgICAgIGVycm9yOiBlcnJvclxuICAgIH1cbn07XG5cbnZhciBzY3JhcGVQcm9maWxlVmlldyA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LWN1cnJlbnQgdGQgb2wgbGkgYScpLnRleHQoKTtcblxuICAgIHZhciBwYXN0UG9zaXRpb25zID0gJCgnI292ZXJ2aWV3LXN1bW1hcnktcGFzdCB0ZCBvbCBsaSBhJykubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQudHJpbSgkKHRoaXMpLnRleHQoKSk7XG4gICAgfSkuZ2V0KCk7XG5cbiAgICB2YXIgZWR1Y2F0aW9uID0gJCgnI292ZXJ2aWV3LXN1bW1hcnktZWR1Y2F0aW9uIHRkIG9sIGxpIGEnKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJC50cmltKCQodGhpcykudGV4dCgpKTtcbiAgICB9KS5nZXQoKTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb24sXG4gICAgICAgIHBhc3RQb3NpdGlvbnM6IHBhc3RQb3NpdGlvbnMsXG4gICAgICAgIGVkdWNhdGlvbjogZWR1Y2F0aW9uXG4gICAgfVxufTtcblxudmFyIHBhZ2luYXRpb24gPVxue1xuICAgIG5leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkbmV4dFBhZ2luYXRpb25CdG4gPSAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKTtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lICsgJG5leHRQYWdpbmF0aW9uQnRuLmF0dHIoJ2hyZWYnKTtcbiAgICB9LFxuXG4gICAgaGFzTmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpLmxlbmd0aFxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb24sXG4gICAgc2NyYXBlUHJvZmlsZUxpc3Q6IHNjcmFwZVByb2ZpbGVMaXN0LFxuICAgIHNjcmFwZVByb2ZpbGVWaWV3OiBzY3JhcGVQcm9maWxlVmlld1xufTtcbiJdfQ==
