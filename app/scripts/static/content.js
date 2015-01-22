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

            name = {first: fName, last: lName};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2dvb2dsZS5qcyIsImFwcC9zY3JpcHRzL2NvbnRlbnQvbGlua2VkaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTIvMTUuXG4gKi9cbnZhciBsaW5rZWRpbiA9IHJlcXVpcmUoJy4vbGlua2VkaW4uanMnKTtcbnZhciBnb29nbGUgPSByZXF1aXJlKCcuL2dvb2dsZS5qcycpO1xuXG5mdW5jdGlvbiBtZXNzYWdlUmVjZWl2ZWQobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcblxuICAgIGlmIChtZXNzYWdlLnRvICE9ICdjb250ZW50JykgcmV0dXJuO1xuXG4gICAgc3dpdGNoIChtZXNzYWdlLmFjdGlvbikge1xuICAgICAgICBjYXNlICdzY3JhcGVQcm9maWxlTGlzdCc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uc2NyYXBlUHJvZmlsZUxpc3QoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICduZXh0UGFnZSc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4ucGFnaW5hdGlvbi5uZXh0UGFnZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2dldEJhc2ljSW5mbyc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uc2NyYXBlUHJvZmlsZVZpZXcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdnZXROYW1lJzpcbiAgICAgICAgICAgIHZhciB3YWl0Rm9yU2VhcmNoUmVzdWx0cyA9IHNldEludGVydmFsKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciAkcmVzdWx0cyA9ICQoJyNyc28nKTtcblxuICAgICAgICAgICAgICAgIGlmICgkcmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZ29vZ2xlLmdldE5hbWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2FpdEZvclNlYXJjaFJlc3VsdHMpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCA1MCwgc2VuZFJlc3BvbnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZVJlY2VpdmVkKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzIxLzE1LlxuICovXG5cbnZhciBnZXROYW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkcmVzdWx0cyA9ICQoJy5nOmx0KDMpJyk7XG4gICAgdmFyIG5hbWUgPSB7fTtcblxuICAgICQuZWFjaCgkcmVzdWx0cywgZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHZhciB0aXRsZSA9ICRyZXN1bHRzLmZpbmQoJ2gzJykudGV4dCgpO1xuXG4gICAgICAgIGlmIChoYXNDaGFyKHRpdGxlLCAnfCcpKSB7XG4gICAgICAgICAgICB2YXIgZnVsbE5hbWUgPSB0aXRsZS5zcGxpdCgnfCcpWzBdLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICB2YXIgZk5hbWUgPSBmdWxsTmFtZVswXTtcbiAgICAgICAgICAgIHZhciBsTmFtZSA9IGZ1bGxOYW1lWzFdO1xuXG4gICAgICAgICAgICBuYW1lID0ge2ZpcnN0OiBmTmFtZSwgbGFzdDogbE5hbWV9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhc0NoYXIoc3RyaW5nLCBjaGFyKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcuaW5kZXhPZihjaGFyKSAhPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmFtZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldE5hbWU6IGdldE5hbWVcbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzExLzE1LlxuICovXG5cbnZhciBzY3JhcGVQcm9maWxlTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciBlcnJvciA9IG51bGw7XG5cbiAgICAvLyBncmFiIGVhY2ggcHJvZmlsZSBsaW5rIGFuZCBwdXNoIGl0IHRvIHJlc3VsdHNbXVxuICAgIHZhciAkcGVvcGxlRGl2ID0gJCgnI3Jlc3VsdHMgLm1vZC5yZXN1bHQucGVvcGxlJyk7XG5cbiAgICAkLmVhY2goJHBlb3BsZURpdiwgZnVuY3Rpb24gKGluZGV4LCBwZXJzb24pIHtcbiAgICAgICAgdmFyICRwZXJzb24gPSAkKHBlcnNvbik7XG4gICAgICAgIHZhciAkbmFtZUxpbmsgPSAkcGVyc29uLmZpbmQoJy5iZCBoMyBhLnRpdGxlJyk7XG5cbiAgICAgICAgdmFyIGZ1bGxOYW1lID0gJG5hbWVMaW5rLnRleHQoKTtcblxuICAgICAgICB2YXIgcHJvZmlsZUxpbmsgPSAkbmFtZUxpbmsuYXR0cignaHJlZicpO1xuICAgICAgICB2YXIgaGVhZGxpbmUgPSAkcGVyc29uLmZpbmQoJy5kZXNjcmlwdGlvbicpLnRleHQoKTtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gJHBlcnNvbi5maW5kKCcuZGVtb2dyYXBoaWMgYmRpJykudGV4dCgpO1xuICAgICAgICB2YXIgaW5kdXN0cnkgPSAkcGVyc29uLmZpbmQoJy5kZW1vZ3JhcGhpYyBkZDpsYXN0LWNoaWxkJykudGV4dCgpO1xuXG4gICAgICAgIHZhciBwZXJzb24gPSB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgICAgZnVsbDogZnVsbE5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9maWxlTGluazogcHJvZmlsZUxpbmssXG4gICAgICAgICAgICBoZWFkbGluZTogaGVhZGxpbmUsXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb24sXG4gICAgICAgICAgICBpbmR1c3RyeTogaW5kdXN0cnlcbiAgICAgICAgfTtcblxuICAgICAgICByZXN1bHRzLnB1c2gocGVyc29uKTtcbiAgICB9KTtcblxuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIGVycm9yID0gXCJQZW9wbGUgY29udGFpbmVyIGRvZXNuJ3QgZXhpc3RcIlxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdHM6IHJlc3VsdHMsXG4gICAgICAgIGhhc05leHRQYWdlOiBwYWdpbmF0aW9uLmhhc05leHRQYWdlKCksXG4gICAgICAgIG5leHRQYWdlOiBwYWdpbmF0aW9uLm5leHRQYWdlKCksXG4gICAgICAgIGVycm9yOiBlcnJvclxuICAgIH1cbn07XG5cbnZhciBzY3JhcGVQcm9maWxlVmlldyA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9ICQoJyNvdmVydmlldy1zdW1tYXJ5LWN1cnJlbnQgdGQgb2wgbGkgYScpLnRleHQoKTtcblxuICAgIHZhciBwYXN0UG9zaXRpb25zID0gJCgnI292ZXJ2aWV3LXN1bW1hcnktcGFzdCB0ZCBvbCBsaSBhJykubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQudHJpbSgkKHRoaXMpLnRleHQoKSk7XG4gICAgfSkuZ2V0KCk7XG5cbiAgICB2YXIgZWR1Y2F0aW9uID0gJCgnI292ZXJ2aWV3LXN1bW1hcnktZWR1Y2F0aW9uIHRkIG9sIGxpIGEnKS5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJC50cmltKCQodGhpcykudGV4dCgpKTtcbiAgICB9KS5nZXQoKTtcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uOiBjdXJyZW50UG9zaXRpb24sXG4gICAgICAgIHBhc3RQb3NpdGlvbnM6IHBhc3RQb3NpdGlvbnMsXG4gICAgICAgIGVkdWNhdGlvbjogZWR1Y2F0aW9uXG4gICAgfVxufTtcblxudmFyIHBhZ2luYXRpb24gPVxue1xuICAgIG5leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkbmV4dFBhZ2luYXRpb25CdG4gPSAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKTtcbiAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmhvc3RuYW1lICsgJG5leHRQYWdpbmF0aW9uQnRuLmF0dHIoJ2hyZWYnKTtcbiAgICB9LFxuXG4gICAgaGFzTmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpLmxlbmd0aFxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHBhZ2luYXRpb246IHBhZ2luYXRpb24sXG4gICAgc2NyYXBlUHJvZmlsZUxpc3Q6IHNjcmFwZVByb2ZpbGVMaXN0LFxuICAgIHNjcmFwZVByb2ZpbGVWaWV3OiBzY3JhcGVQcm9maWxlVmlld1xufTtcbiJdfQ==
