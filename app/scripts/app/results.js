/**
 * Created by matthew on 1/27/15.
 */
app.results = function () {
    function invokeCSVDownload() {
        var companies = app.bp.app.results;
        var csv = "FirstName,LastName,Title,Company,Email,Email Confirmed,Profile URL\n";

        $.each(companies, function (index, company) {
            $.each(company, function (index, person) {
                var dataString = [
                    person.name.first || '',
                    person.name.last || '',
                    person.currentPosition || "",
                    person.companyName,
                    person.email || '',
                    person.emailConfirmed,
                    person.profileLink
                ].map(function (item) {
                        return '"' + item + '"'
                    });

                dataString = dataString.join(',');
                //csv += index < companies[(companies.length-1)].length ? dataString + "\n" : dataString;
                csv += dataString + "\n"
            });
        });
        var name = '';
        $.each(companies, function (index, item) {
            name += item[0].companyName
        });
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
        pom.setAttribute('download', name + 'Employees.csv');
        pom.click();
    }

    return {
        invokeCSVDownload: invokeCSVDownload
    }
}();