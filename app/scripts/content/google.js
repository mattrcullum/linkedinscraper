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