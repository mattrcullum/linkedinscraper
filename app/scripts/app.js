/**
 * Created by matthew on 12/7/14.
 */


//chrome.tabs.create({url:'http://linkedin.com'});
//chrome.tabs.create({url:'http://gmail.com'});
var profileLinks = [];
var people = [];

var $form, $steps, $contents,
    emailDomain, $form, $steps, $contents,
    employeePositionFilter, company,
    companyIDs, shouldFindEmails,
    $scrapeBtn;

var backgroundPage = chrome.extension.getBackgroundPage();

var steps = {scraper: '#scraper', results: '#results'};

function initializeResultsStep() {
    $form.hide();
    $('#scrape-link').hide()
    $('.steps div').hide();
    $('#results').show();

    $('#im-done').click(function () {
        chrome.runtime.reload();
    })
}

var ui = {
    show_step: function (step) {

        var $current_step = $('#current-step');
        $current_step.show();

        ui.hideContents(function () {
            $form.hide();

            $steps = $('.steps div');
            $steps.hide();

            var $step = $(step);
            $step.show('results');

            $current_step.text('Step ' + ($steps.index($step) + 1) + '/' + $steps.length)
        });

        switch (step) {
            case 'results':
                initializeResultsStep();
        }
    },
    hideContents: function (callback) {
        $contents.slideUp(600, function () {
            callback();
            $contents.delay(100).slideDown(200)
        });
    },
    update: {
        profilesRetrieved: function () {
            var $names_retrieved = $('#names-retrieved');
            $names_retrieved.text(backgroundPage.people.length);
        }
    }
};

function downloadResults() {
    var people = backgroundPage.results.people;
    var csv = "FirstName,LastName,Title,Company,Profile_URL\n";
    $.each(people, function (index, person) {
        if(typeof person.name.last == "object"){
            debugger;
        }
        var dataString = [
            person.name.first || '',
            person.name.last || '',
            person.headline.replace(/at(.*)/, "").trim(),
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

var formHelpers = {

    format_position_filter: function (title_filter) {
        var titles = title_filter.split(' ');
        var parsedString = '';
        for (var i = 0; i < titles.length; i++) {
            var currentTitle = titles[i];
            currentTitle = currentTitle.replace('.', '*');
            parsedString += currentTitle.toUpperCase();
            if ((i + 1) != titles.length) {
                parsedString += ' OR '
            }
        }
        return parsedString;
    }
};

function submitScrapeForm() {

    function validateForm() {
        var emailDomain = $('#emailDomain').val();

        if (emailDomain.length == 0) {
            alert("Domain cannot be empty");
            return false;
        }
        return true
    }

    if (!validateForm()) return false;

    var $employeePositionFilter = $('#position-filter');

    shouldFindEmails = $('#skip-email-retrieval').is(':checked');

    employeePositionFilter = formHelpers.format_position_filter($employeePositionFilter.val());

    emailDomain =
        '@' +
        $('#emailDomain').val() +
        $('#tld').val();

    var settings = {
        general: {
            CompanyIDs: companyIDs,
            companyName: company,
            positionFilter: employeePositionFilter,
            emailDomain: emailDomain
        },
        scraper: {}
    };

    backgroundPage.go(settings);

    var waitForCompletion = setInterval(function (backgroundPage, downloadResults) {
        if (backgroundPage.isFinished) {
            downloadResults();
            clearInterval(waitForCompletion);
        }
    }, 500, backgroundPage, downloadResults);

    return true;
}

$(document).ready(function () {

    function pageModifications() {
        // Populate the page with the company name and IDs
        $('#company-name').append(company);
        $('#company-IDs').append(companyIDs);
        $('#emailDomain').val(company.toLowerCase());
    }

    function initializers() {
        // get the company name and IDs from the URL
        company = helper.getParameterByName('company', location);
        companyIDs = helper.getParameterByName('companyID', location);


        $form = $('#options');
        $scrapeBtn = $('#scrape-link.btn-primary');

        $contents = $('#content');
    }

    function eventListeners() {
        $('#download').click(downloadResults);

        $scrapeBtn.click(function () {
            var $self = $(this);

            // if the button hasn't been clicked yet
            if ($self.hasClass('btn-primary')) {
                if (submitScrapeForm()) {
                    $self.text('Cancel Scrape');
                    $self.removeClass('btn-primary').addClass('btn-danger').blur();
                }
            }

            // the button has been clicked, which means it's now a cancel scrape button
            else {
                chrome.runtime.reload()
            }
        });
    }

    initializers();
    pageModifications();
    eventListeners();
});
