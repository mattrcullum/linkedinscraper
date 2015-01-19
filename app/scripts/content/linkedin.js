/**
 * Created by matthew on 1/11/15.
 */

var getProfileLinks = function () {
    var profileLinks = [];
    var error = false;

    // grab each profile link and push it to profileLinks[]
    var $profileLinks = $('#results .mod.result.people .bd h3 a.title');

    if ($profileLinks.length == 0) {
        error = "People container doesn't exist"
    }
    $.each($profileLinks, function (index, link) {
        var link = $(link).attr('href');
        profileLinks.push({
            profile_url: link
        })
    });

    return {
        profileLinks: profileLinks,
        hasNextPage: pagination.hasNextPage(),
        nextPage: pagination.nextPage(),
        error: error
    }
};

var getBasicInfo = function () {
    var $profileContainer = $('.profile-overview-content');

    var fullName = $profileContainer.find('.full-name').text();
    var headline = $profileContainer.find('#headline .title').text();

    return {fullName: fullName, headline: headline}
}

var pagination =
{
    nextPage: function () {
        var $nextPaginationBtn = $('#results-pagination .next a');
        return location.hostname + $nextPaginationBtn.attr('href');
    },

    hasNextPage: function () {
        return $('#results-pagination .next a').length
    }
};

module.exports = {
    pagination: pagination,
    getProfileLinks: getProfileLinks,
    getBasicInfo: getBasicInfo
    };
