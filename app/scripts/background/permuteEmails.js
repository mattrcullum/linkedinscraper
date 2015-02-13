/**
 * Created by matthew on 12/15/14.
 */
/**
 * Created by matthew on 1/21/15.
 */
var permuteEmails = function () {

    var settings, results, masterCallback;

    function init(settingsArg, resultsArg, callbackArg) {
        settings = settingsArg;
        results = resultsArg;
        masterCallback = callbackArg;
        permuteEmails();
    }

    function permuteEmails() {

        $.each(results.people, function (index, person) {


            var name = person.name;
            try {
                var initial = {
                    first: name.first[0],
                    last: name.last[0]

                };
            } catch (err) {
                return true;
            }

            results.people[index].possibleEmails = [
                name.first + name.last,
                name.first + '.' + name.last,
                initial.first + name.last,
                initial.first + '.' + name.last,
                name.last + name.first,
                name.last + '.' + name.first,
                name.first,
                name.last,
                initial.first + initial.last
            ].map(function (emailAddress) {
                    return emailAddress + settings.general.emailDomain;
                })
        });
        masterCallback();
    }

    return {
        start: init
    }
}();
