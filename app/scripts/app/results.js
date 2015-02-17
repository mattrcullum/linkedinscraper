/**
 * Created by matthew on 1/27/15.
 */
app.results = function () {
    function invokeCSVDownload() {
        var people = app.bp.app.results;
        var csv = "FirstName,LastName,Title,Company,Email,Email Confirmed,Profile URL\n";

        $.each(people, function (index, person) {

            var dataString = [
                person.name.first || '',
                person.name.last || '',
                person.headline.replace(/ at(.*)/, "").trim(),
                person.companyName,
                person.email || '',
                person.emailConfirmed,
                person.profileLink
            ].map(function (item) {
                    return '"' + item + '"'
                });

            dataString = dataString.join(',');
            csv += index < people.length ? dataString + "\n" : dataString;
        });
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        pom.setAttribute('download', app.bp.app.results[0].companyName.trim() + 'Employees.csv');
        pom.click();
    }

    return {
        invokeCSVDownload: invokeCSVDownload
    }
}();