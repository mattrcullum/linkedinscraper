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
        profileLinks.push({
            profile_url: link
        })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2NvbnRlbnQuanMiLCJhcHAvc2NyaXB0cy9jb250ZW50L2xpbmtlZGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMTIvMTUuXG4gKi9cbnZhciBsaW5rZWRpbiA9IHJlcXVpcmUoJy4vbGlua2VkaW4uanMnKTtcblxuZnVuY3Rpb24gbWVzc2FnZVJlY2VpdmVkKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG5cbiAgICBpZiAobWVzc2FnZS50byAhPSAnY29udGVudCcpIHJldHVybjtcblxuICAgIHN3aXRjaCAobWVzc2FnZS5hY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnZ2V0UHJvZmlsZUxpbmtzJzpcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShcbiAgICAgICAgICAgICAgICBsaW5rZWRpbi5nZXRQcm9maWxlTGlua3MoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICduZXh0UGFnZSc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4ucGFnaW5hdGlvbi5uZXh0UGFnZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2dldEJhc2ljSW5mbyc6XG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgbGlua2VkaW4uZ2V0QmFzaWNJbmZvKClcbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKG1lc3NhZ2VSZWNlaXZlZCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xMS8xNS5cbiAqL1xuXG52YXIgZ2V0UHJvZmlsZUxpbmtzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9maWxlTGlua3MgPSBbXTtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcblxuICAgIC8vIGdyYWIgZWFjaCBwcm9maWxlIGxpbmsgYW5kIHB1c2ggaXQgdG8gcHJvZmlsZUxpbmtzW11cbiAgICB2YXIgJHByb2ZpbGVMaW5rcyA9ICQoJyNyZXN1bHRzIC5tb2QucmVzdWx0LnBlb3BsZSAuYmQgaDMgYS50aXRsZScpO1xuXG4gICAgaWYgKCRwcm9maWxlTGlua3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgZXJyb3IgPSBcIlBlb3BsZSBjb250YWluZXIgZG9lc24ndCBleGlzdFwiXG4gICAgfVxuICAgICQuZWFjaCgkcHJvZmlsZUxpbmtzLCBmdW5jdGlvbiAoaW5kZXgsIGxpbmspIHtcbiAgICAgICAgdmFyIGxpbmsgPSAkKGxpbmspLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgcHJvZmlsZUxpbmtzLnB1c2goe1xuICAgICAgICAgICAgcHJvZmlsZV91cmw6IGxpbmtcbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHByb2ZpbGVMaW5rczogcHJvZmlsZUxpbmtzLFxuICAgICAgICBoYXNOZXh0UGFnZTogcGFnaW5hdGlvbi5oYXNOZXh0UGFnZSgpLFxuICAgICAgICBuZXh0UGFnZTogcGFnaW5hdGlvbi5uZXh0UGFnZSgpLFxuICAgICAgICBlcnJvcjogZXJyb3JcbiAgICB9XG59O1xuXG52YXIgZ2V0QmFzaWNJbmZvID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkcHJvZmlsZUNvbnRhaW5lciA9ICQoJy5wcm9maWxlLW92ZXJ2aWV3LWNvbnRlbnQnKTtcblxuICAgIHZhciBmdWxsTmFtZSA9ICRwcm9maWxlQ29udGFpbmVyLmZpbmQoJy5mdWxsLW5hbWUnKS50ZXh0KCk7XG4gICAgdmFyIGhlYWRsaW5lID0gJHByb2ZpbGVDb250YWluZXIuZmluZCgnI2hlYWRsaW5lIC50aXRsZScpLnRleHQoKTtcblxuICAgIHJldHVybiB7ZnVsbE5hbWU6IGZ1bGxOYW1lLCBoZWFkbGluZTogaGVhZGxpbmV9XG59XG5cbnZhciBwYWdpbmF0aW9uID1cbntcbiAgICBuZXh0UGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJG5leHRQYWdpbmF0aW9uQnRuID0gJCgnI3Jlc3VsdHMtcGFnaW5hdGlvbiAubmV4dCBhJyk7XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0bmFtZSArICRuZXh0UGFnaW5hdGlvbkJ0bi5hdHRyKCdocmVmJyk7XG4gICAgfSxcblxuICAgIGhhc05leHRQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAkKCcjcmVzdWx0cy1wYWdpbmF0aW9uIC5uZXh0IGEnKS5sZW5ndGhcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBwYWdpbmF0aW9uOiBwYWdpbmF0aW9uLFxuICAgIGdldFByb2ZpbGVMaW5rczogZ2V0UHJvZmlsZUxpbmtzLFxuICAgIGdldEJhc2ljSW5mbzogZ2V0QmFzaWNJbmZvXG4gICAgfTtcbiJdfQ==
