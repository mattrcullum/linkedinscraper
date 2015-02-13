/**
 * Created by matthew on 1/11/15.
 */
var linkedin = function () {
    function scrapeProfileList() {
        var results = [];
        var error = null;

        // grab each profile link and push it to results[]
        var $peopleDiv = $('#results .mod.result.people');

        $.each($peopleDiv, function (index, person) {
            var $person = $(person);
            var $nameLink = $person.find('.bd h3 a.title');

            var profileLink = $nameLink.attr('href').replace(/&authType(.*)/, '');
            var headline = $person.find('.description').text();
            var location = $person.find('.demographic bdi').text();
            var industry = $person.find('.demographic dd:last-child').text();

            var fullName = $nameLink.text().trim();
            var name = {};

            // if the fullName has a period, we'll assume it's abbreviated
            if (fullName.hasChar('.')) {
                name.first = fullName.split(' ')[0];
            }

            // if the fullName is hidden
            else if (fullName == "LinkedIn Member") {
                name.isHidden = true;
            }

            // if it's it's not abbreviated, we'll assume it looks like "John Smith", "John J. Smith" or "John J. Smith II"
            else {
                fullName = fullName.split(' ');
                name.first = fullName[0];

                // "John J. Smith or John J. Smith II"
                if (fullName.length > 2) {
                    name.last = fullName[2];
                }

                // "John Smith"
                else {
                    name.first = fullName[0];
                    name.last = fullName[1];
                }

            }

            var person = {
                name: name,
                profileLink: profileLink,
                headline: headline,
                location: location,
                industry: industry
            };

            if (fullName == "LinkedIn Member") {
                person.name = {isHidden: true}
            }

            results.push(person);
        });

        if (results.length == 0) {
            error = "People container doesn't exist"
        }

        return {
            linkList: results,
            hasNextPage: pagination().hasNextPage(),
            nextPage: pagination().nextPage(),
            error: error
        }
    }

    function scrapeProfileView() {


        var currentPosition = $('#overview-summary-current td ol li a').text();

        var pastPositions = $('#overview-summary-past td ol li a').map(function () {
            return $.trim($(this).text());
        }).get();

        var education = $('#overview-summary-education td ol li a').map(function () {
            return $.trim($(this).text());
        }).get();


        return {
            currentPosition: currentPosition,
            pastPositions: pastPositions,
            education: education
        }
    }

    function pagination() {

        function nextPage() {
            var $nextPaginationBtn = $('#results-pagination .next a');
            return location.hostname + $nextPaginationBtn.attr('href');
        }

        function hasNextPage() {
            return $('#results-pagination .next a').length
        }

        return {
            nextPage: nextPage,
            hasNextPage: hasNextPage
        }
    }

    return {
        scrapeProfileList: scrapeProfileList,
        scrapeProfileView: scrapeProfileView,
        pagination: pagination
    }
}();
/*
 return {
 pagination: pagination,
 scrapeProfileList: scrapeProfileList,
 scrapeProfileView: scrapeProfileView
 };
 */