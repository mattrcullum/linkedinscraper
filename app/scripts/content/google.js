/**
 * Created by matthew on 1/21/15.
 */
var google = function () {
    var getName = function () {
        var $results = $('.g:lt(3)');
        var name = {};

        $.each($results, function (index, item) {
            var title = $(item).find('h3').text();

            // The google result we want will look like one of the following:
            // "John Smith | LinkedIn"
            // "John S. | LinkedIn"
            // "John J. Smith | LinkedIn"
            if (" ".hasChar(title, '|')) { // TO DO ***********************************************8
                var fullName =
                    title.split('|')[0].trim().split(' ');

                var fName = fullName[0];
                var lName = fullName[1];

                name = {first: fName, last: lName, full: fullName};
                return false
            }
        });

        return name || false;
    };

    var isGmailReady = function () {

    };

    var tryEmail = function (message, callback) {
        console.log(message, callback);
        var email = message.email.replace(' ', '');
        var name = message.name.full;

        var $emailInput = $("textarea").first();

        $emailInput.focus();
        $emailInput.text(email);
        $emailInput.blur();

        setTimeout(function (callback) { // give rapportive 1500 milliseconds to initialize

            var waitForRapportive = setInterval(function (callback) { // now we wait for rapportive to load the results

                var $rapportive = $('#rapportive-sidebar');

                function rapportiveSidebarExists() {
                    return $rapportive.length != 0;
                }

                function isLoadingResults() {
                    return $rapportive.has('.wip-spinner').length || $rapportive.find('.links li a:contains("Looking up...")').length;
                }


                if (rapportiveSidebarExists() && !isLoadingResults()) {

                    clearInterval(waitForRapportive);

                    var $name = $rapportive.find('h1.name').first().text().trim().toLowerCase();
                    var $discardDraftBtn = $('[data-tooltip="Discard draft"]');

                    $discardDraftBtn.click();

                    var waitForDraftDiscard = setInterval(function (callback) {

                        var $hasSendButton = $('div[role="button"]:contains("Send")').length;

                        if (!$hasSendButton) {
                            clearInterval(waitForDraftDiscard);
                            if ($name == name) {
                                callback({correct: true});
                                console.log('found email')
                            }
                            else {
                                console.log('wrong');
                                callback({correct: false})
                            }
                        }
                    }, 100, callback)
                }
            }, 100, callback);
        }, 1500, callback);
        return {
            getName: getName,
            isGmailReady: isGmailReady,
            tryEmail: tryEmail
        }
    };
}()
