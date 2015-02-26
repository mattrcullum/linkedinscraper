/**
 * Created by matthew on 12/15/14.
 */
/**
 * Created by matthew on 1/21/15.
 */
var permuteEmails = function () {
    var masterCallback;

    function start(callback) {

        masterCallback = callback;
        async.series(
            [
                permuteEmails,
                done
            ]
        );

        function done() {
            masterCallback()
        }
    }

    function permuteEmails(cb) {
        $.each(app.results, function (index, resultset) {
            $.each(resultset, function (index, person) {
                person.emailConfirmed = '';
                var name = person.name;
                if (name && !name.skipPermutation) {
                    try {
                        var initial = {
                            first: name.first[0],
                            last: name.last[0]

                        };
                    } catch (err) {
                        console.error(err);
                    }
                    person.possibleEmails = [
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
                            return convertStringToAscii(emailAddress + '@' + app.currentCompany.emailDomain);
                        })
                }
            })
        });

        cb();

        function convertStringToAscii(email) {

            //Convert Characters
            return email
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/é/g, 'e');
        }

    }

    return {
        start: start
    }
}();