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