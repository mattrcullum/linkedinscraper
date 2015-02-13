/**
 * Created by matthew on 2/12/15.
 */
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
/**
 * Created by matthew on 2/13/15.
 */
String.prototype.hasChar = function(char){
  return this.indexOf(char) != 0;
};
/**
 * Created by matthew on 2/11/15.
 */
var urlHelper = function () {

    function segments() {
        return location.pathname.substr(1).split('/')
    }

    function hostName() {
        return location.host.split('.')[1];
    }

    function param(name, link) {
        var href = link || location;
        // name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(href.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray(prmstr) {
        var params = {};
        var prmarr = prmstr.split("&");
        for (var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    return {
        params: getSearchParameters(),
        getParam: param,
        segments: segments(),
        hostName: hostName()
    }
}();
var app = {};

$(document).ready(function () {

    // array of url GET params
    app.params = urlHelper.params;

    var params = app.params;

    // background page
    app.bp = chrome.extension.getBackgroundPage(); // bp = background page

    // knockout
    app.ko = ko;

    // models
    app.viewModel = new app.models.view();
    app.ko.applyBindings(app.viewModel);

    app.modals = {addToQueue: $('#addToQueue')};

    if (params['a'] == "addToQueue") {
        app.modals.addToQueue.modal('show');
    }
});







/**
 * Created by matthew on 2/11/15.
 */
app.models = function () {
    function view() {
        var self = this;
        self.queue = app.ko.observableArray(app.bp.queue);

        self.removeFromQueue = function (company) {
            self.queue.remove(company)
        };
        self.start = function () {
            app.bp.go()
        };
        var companyParam = app.params['company'];
        var companyIDsParam = app.params['companyID'];

        self.emailDomain = app.ko.observable(companyParam.toLowerCase());
        self.companyName = app.ko.observable(companyParam);
        self.companyIDs = app.ko.observable(companyIDsParam);
        self.titleFilter = app.ko.observable(null);
        self.skipEmailRetrieval = app.ko.observable(false);

        self.addToQueue = app.queue.add;

        self.appendQueue = function (item) {
            self.queue.push(item);
        }
    }
    return {
        view: view
    }
}();
/**
 * Created by matthew on 2/11/15.
 */
app.queue = function () {
    function add() {
        var company = {
            emailDomain: app.viewModel.emailDomain(),
            companyName: app.viewModel.companyName(),
            companyID: app.viewModel.companyIDs(),
            titleFilter: app.viewModel.titleFilter(),
            skipEmails: app.viewModel.skipEmailRetrieval()
        };
        company.id = company.companyName + company.companyID;

        var duplicate = false;

        $(app.bp.queue).each(function (index, item) {
            if (item.id == company.id) {
                alert('Company already in queue');
                duplicate = true;
                return false
            }
        });

        if (duplicate) {
            return false;
        }

        app.viewModel.appendQueue(company);
        app.modals.addToQueue.modal('hide');
    }

    function remove(company) {
    }

    return {
        add: add,
        remove: remove
    }
}();
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