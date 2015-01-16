/**
 * Created by matthew on 1/11/15.
 */

var getProfileLinks = function () {
    var profileLinks = [];

    // grab each profile link and push it to profileLinks[]
    var $profileLinks = $('#results .mod.result.people .bd h3 a.title');

    $.each($profileLinks, function (index, link) {
        var link = $(link).attr('href');
        profileLinks.push({
            profile_url: link
        })
    });

    return {profileLinks: profileLinks, hasNextPage: pagination.hasNextPage()}
};

var pagination =
{
    goNextPage: function (callback) {
        var $nextPaginationBtn = $('#results-pagination .next a');
        var dataLiPage = $nextPaginationBtn.attr('data-li-page');
        var $currentPaginationBtn =
            $nextPaginationBtn
                .parent('li')
                .siblings('.link')
                .find('[data-li-page=' + dataLiPage + "]")
                .prev('.link');

        $nextPaginationBtn[0].click();

        var waitForNextPage = setInterval(function (callback) {
            if (!$currentPaginationBtn.hasClass('active')) {
                clearInterval(waitForNextPage);
                callback();
            }
        }, 20, callback);
    },

    hasNextPage: function () {
        return $('#results-pagination .next a').length
    }
};

exports.pagination = pagination;
exports.getProfileLinks = getProfileLinks;
