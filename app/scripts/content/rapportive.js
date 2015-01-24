/**
 * Created by matthew on 1/12/15.
 */

var checkEmail = function (message, callback) {
    var email = message.email.replace(' ', '');
    var name = message.args.full_name;

    var $emailInput = $("textarea").first();

    $emailInput.focus();
    $emailInput.text(email);
    $emailInput.blur();

    setTimeout(function (callback) { // give rapportive 1500 milliseconds to initialize

        var waitForRapportive = setInterval(function (callback) { // now we wait for rapportive to load the results

            var $rapportive = $('#rapportive-sidebar');
            
            function rapportiveSidebarExists(){
                return $rapportive.length != 0;
            }
            function isLoadingResults(){
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
};

