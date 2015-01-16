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
            linkedin.pagination.goNextPage(sendResponse)
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

    // grab each profile link and push it to profileLinks[]
    var $profileLinks = $('#results .mod.result.people .bd h3 a.title');

    $.each($profileLinks, function (index, link) {
        var link = $(link).attr('href');
        profileLinks.push({
            profile_url: link
        })
    });

    return {profileLinks: profileLinks, hasNextPage: pagination.hasNextPage()}
};

var pagination =
{
    goNextPage: function (callback) {
        var $nextPaginationBtn = $('#results-pagination .next a');
        var dataLiPage = $nextPaginationBtn.attr('data-li-page');
        var $currentPaginationBtn =
            $nextPaginationBtn
                .parent('li')
                .siblings('.link')
                .find('[data-li-page=' + dataLiPage + "]")
                .prev('.link');

        $nextPaginationBtn[0].click();

        var waitForNextPage = setInterval(function (callback) {
            if (!$currentPaginationBtn.hasClass('active')) {
                clearInterval(waitForNextPage);
                callback();
            }
        }, 20, callback);
    },

    hasNextPage: function () {
        return $('#results-pagination .next a').length
    }
};

exports.pagination = pagination;
exports.getProfileLinks = getProfileLinks;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2xpbmtlZGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzEyLzE1LlxuICovXG52YXIgbGlua2VkaW4gPSByZXF1aXJlKCcuL2xpbmtlZGluLmpzJyk7XG5cbmZ1bmN0aW9uIG1lc3NhZ2VSZWNlaXZlZChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuXG4gICAgaWYgKG1lc3NhZ2UudG8gIT0gJ2NvbnRlbnQnKSByZXR1cm47XG5cbiAgICBzd2l0Y2ggKG1lc3NhZ2UuYWN0aW9uKSB7XG4gICAgICAgIGNhc2UgJ2dldFByb2ZpbGVMaW5rcyc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uZ2V0UHJvZmlsZUxpbmtzKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbmV4dFBhZ2UnOlxuICAgICAgICAgICAgbGlua2VkaW4ucGFnaW5hdGlvbi5nb05leHRQYWdlKHNlbmRSZXNwb25zZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2VSZWNlaXZlZCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMS8xNS5cbiAqL1xuXG52YXIgZ2V0UHJvZmlsZUxpbmtzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9maWxlTGlua3MgPSBbXTtcblxuICAgIC8vIGdyYWIgZWFjaCBwcm9maWxlIGxpbmsgYW5kIHB1c2ggaXQgdG8gcHJvZmlsZUxpbmtzW11cbiAgICB2YXIgJHByb2ZpbGVMaW5rcyA9ICQoJyNyZXN1bHRzIC5tb2QucmVzdWx0LnBlb3BsZSAuYmQgaDMgYS50aXRsZScpO1xuXG4gICAgJC5lYWNoKCRwcm9maWxlTGlua3MsIGZ1bmN0aW9uIChpbmRleCwgbGluaykge1xuICAgICAgICB2YXIgbGluayA9ICQobGluaykuYXR0cignaHJlZicpO1xuICAgICAgICBwcm9maWxlTGlua3MucHVzaCh7XG4gICAgICAgICAgICBwcm9maWxlX3VybDogbGlua1xuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtwcm9maWxlTGlua3M6IHByb2ZpbGVMaW5rcywgaGFzTmV4dFBhZ2U6IHBhZ2luYXRpb24uaGFzTmV4dFBhZ2UoKX1cbn07XG5cbnZhciBwYWdpbmF0aW9uID1cbntcbiAgICBnb05leHRQYWdlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyICRuZXh0UGFnaW5hdGlvbkJ0biA9ICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpO1xuICAgICAgICB2YXIgZGF0YUxpUGFnZSA9ICRuZXh0UGFnaW5hdGlvbkJ0bi5hdHRyKCdkYXRhLWxpLXBhZ2UnKTtcbiAgICAgICAgdmFyICRjdXJyZW50UGFnaW5hdGlvbkJ0biA9XG4gICAgICAgICAgICAkbmV4dFBhZ2luYXRpb25CdG5cbiAgICAgICAgICAgICAgICAucGFyZW50KCdsaScpXG4gICAgICAgICAgICAgICAgLnNpYmxpbmdzKCcubGluaycpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ1tkYXRhLWxpLXBhZ2U9JyArIGRhdGFMaVBhZ2UgKyBcIl1cIilcbiAgICAgICAgICAgICAgICAucHJldignLmxpbmsnKTtcblxuICAgICAgICAkbmV4dFBhZ2luYXRpb25CdG5bMF0uY2xpY2soKTtcblxuICAgICAgICB2YXIgd2FpdEZvck5leHRQYWdlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoISRjdXJyZW50UGFnaW5hdGlvbkJ0bi5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JOZXh0UGFnZSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAsIGNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgaGFzTmV4dFBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICQoJyNyZXN1bHRzLXBhZ2luYXRpb24gLm5leHQgYScpLmxlbmd0aFxuICAgIH1cbn07XG5cbmV4cG9ydHMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb247XG5leHBvcnRzLmdldFByb2ZpbGVMaW5rcyA9IGdldFByb2ZpbGVMaW5rcztcbiJdfQ==
