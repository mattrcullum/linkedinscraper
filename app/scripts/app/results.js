/**
 * Created by matthew on 1/27/15.
 */
app.results = function (app) {
    function invokeCSVDownload() {
        var people = backgroundPage.results.people;
        var csv = "FirstName,LastName,Title,Company,Profile_URL\n";
        $.each(people, function (index, person) {
            if (typeof person.name.last == "object") {
                debugger;
            }
            var dataString = [
                person.name.first || '',
                person.name.last || '',
                person.headline.replace(/ at(.*)/, "").trim(),
                company,
                person.profileLink
            ].map(function (item) {
                    return '"' + item + '"'
                });

            dataString = dataString.join(',');
            csv += index < people.length ? dataString + "\n" : dataString;
        });
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        pom.setAttribute('download', company.trim() + 'Employees.csv');
        pom.click();

        return {
            invokeCSVDownload: invokeCSVDownload
        }
    }
};