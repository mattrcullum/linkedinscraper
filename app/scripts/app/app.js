/**
 * Created by matthew on 12/7/14.
 */


//chrome.tabs.create({url:'http://linkedin.com'});
//chrome.tabs.create({url:'http://gmail.com'});
$(document).ready(function () {

    var ko = require('../../vendor/knockout/dist/knockout.js');

    var helper = require('../helper');

    var backgroundPage = chrome.extension.getBackgroundPage();

    function appViewModel() {
        var self = this;
        self.queue = ko.observableArray(backgroundPage.queue);

        self.addToQueue = function (company) {

            self.queue.push(company)
        };
        self.removeFromQueue = function (company) {
            self.queue.remove(company)
        };

        self.go = function () {
            startScraping();
        }
    };
    var appView = new appViewModel();

    ko.applyBindings(appView);


    var app = {
        queue: backgroundPage.queue,
        results: backgroundPage.results,
        ko: ko
    };


    var ui = require('./ui')(ko);

    var formHandler = require('./formHandler')(ui);

    if (helper.getParameterByName('a') == "addToQueue") {
        var company = {
            // get the company name and IDs from the URL
            name: helper.getParameterByName('company', location),
            IDs: helper.getParameterByName('companyID', location)
        };
        ui.modal.addToQueue(company, function () {
            appView.addToQueue(company);
        });
    }

    function startScraping() {

        backgroundPage.go();

     /*   var waitForCompletion = setInterval(function (backgroundPage, downloadResults) {
            if (backgroundPage.isFinished) {
                downloadResults();
                clearInterval(waitForCompletion);
            }
        }, 500, backgroundPage, downloadResults);*/
    }

    function downloadResults() {
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
    }


});








