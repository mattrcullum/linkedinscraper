/**
 * Created by matthew on 12/15/14.
 */

exports.start = function (callback) {
    var domain = '@' + 'apple.com';
    $.each(people, function (index, person) {
        var name = person.name;
        var initial = {
            first: name.first[0],
            last: name.last[0]
        }

        people[index].possible_emails = [
            name.first + name.last,
            name.first + '.' + name.last,
            initial.first + name.last,
            initial.first + '.' + name.last,
            name.last + name.first,
            name.last + '.' + name.first,
            name.first,
            name.last,
            initial.first + initial.last
        ]
    })

    callback()

    return {
        start: start
    }
}

