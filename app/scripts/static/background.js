/**
 * Created by matthew on 2/12/15.
 */
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
/**
 * Created by matthew on 2/13/15.
 */
function log(message) {
    console.log(message)
}
/**
 * Created by matthew on 2/13/15.
 */
String.prototype.hasChar = function(char){
  return this.indexOf(char) != -1;
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
        return results === null ? "" : decodeURI(results[1]);
    }

    function getSearchParameters() {
        var parameterString = window.location.search.substr(1);
        return parameterString != null && parameterString != "" ? transformToArray(parameterString) : {};
    }

    function transformToArray(parameterString) {
        var params = {};
        var parameterArray = parameterString.split("&");
        for (var i = 0; i < parameterArray.length; i++) {
            var tmparr = decodeURI(parameterArray[i]).split("=");
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
// for purposes of debugging
//window.results = {"people":[{"name":{"full":"Eric Kimberley"},"profileLink":"https://www.linkedin.com/profile/view?id=14960442&authType=OUT_OF_NETWORK&a…Id%3A3717380161422032549802%2CVSRPtargetId%3A14960442%2CVSRPcmpt%3Aprimary","headline":"Lead Sitecore .NET Architect / Developer at RBA, Inc.","location":"Greater Denver Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"RBA Consulting (contract)","pastPositions":["Godfrey (contract)","Adecco Staffing (contract)","Mayo Clinic (contract)"],"education":["University of Minnesota-Twin Cities"]},{"name":{"full":"Ramon Guerrero"},"profileLink":"https://www.linkedin.com/profile/view?id=106942766&authType=OUT_OF_NETWORK&…d%3A3717380161422032549802%2CVSRPtargetId%3A106942766%2CVSRPcmpt%3Aprimary","headline":"Consultant at RBA Consulting","location":"Greater Denver Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"","pastPositions":["NGenius Games","ACT Conferencing","Fujitsu Consulting"],"education":[]},{"name":{"full":"LuAnne M."},"profileLink":"https://www.linkedin.com/profile/view?id=8269175&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A8269175%2CVSRPcmpt%3Aprimary","headline":"Executive Assistant at RBA Consulting","location":"Dallas/Fort Worth Area","industry":"Internet","company":"RBA, Inc.","currentPosition":"","pastPositions":["HDVMS (True.com, AdShuffle, Metric Interactive, & H.D. Vest Investigations)"],"education":[]},{"name":{"full":"Phil W."},"profileLink":"https://www.linkedin.com/profile/view?id=12717151&authType=OUT_OF_NETWORK&a…Id%3A3717380161422032549802%2CVSRPtargetId%3A12717151%2CVSRPcmpt%3Aprimary","headline":"Regional Practice Manager at RBA, Inc.","location":"Greater Minneapolis-St. Paul Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"","pastPositions":["RBA, Inc.","O'Reilly Media","Manning Publications Co."],"education":["University of St. Thomas"]},{"name":{"full":"Clara Sponitz"},"profileLink":"https://www.linkedin.com/profile/view?id=4846586&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A4846586%2CVSRPcmpt%3Aprimary","headline":"Senior Recruiter","location":"Greater Minneapolis-St. Paul Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["RBA Consulting","Tech-Pro","Compuware Corporation"],"education":["University of Minnesota-Twin Cities"]},{"name":{"full":"Michael Lawrence"},"profileLink":"https://www.linkedin.com/profile/view?id=1263302&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A1263302%2CVSRPcmpt%3Aprimary","headline":"Senior Recruiter @ RBA","location":"Dallas/Fort Worth Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["Gold's Gym International","BearingPoint","Buchanan Associates"],"education":[]},{"name":{"full":"Wm Andrew G."},"profileLink":"https://www.linkedin.com/profile/view?id=1111149&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A1111149%2CVSRPcmpt%3Aprimary","headline":"Social Strategy at RBA, Inc., Enterprise Gamification Strategy, Portals and Collaboration Strategy","location":"Dallas/Fort Worth Area","industry":"Financial Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.Iron Horse Lacrosse","pastPositions":["Citi","Clear Alliances","Slalom Consulting"],"education":["Texas State University-San Marcos"]},{"name":{"full":"Craig Jonas"},"profileLink":"https://www.linkedin.com/profile/view?id=1641241&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A1641241%2CVSRPcmpt%3Aprimary","headline":"Sr. IT Recruiter at RBA, Inc.","location":"Greater Minneapolis-St. Paul Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["BORN/Fujitsu Consulting","BORN"],"education":["St. Cloud State University"]},{"name":{"full":"Jake Estares"},"profileLink":"https://www.linkedin.com/profile/view?id=4541983&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A4541983%2CVSRPcmpt%3Aprimary","headline":"Account Executive at RBA Consulting","location":"Greater Denver Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"","pastPositions":["Neudesic","Statera","Accelerated Network Solutions"],"education":["University of Northern Colorado"]},{"name":{"full":"Jay L."},"profileLink":"https://www.linkedin.com/profile/view?id=8869158&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A8869158%2CVSRPcmpt%3Aprimary","headline":"Dynamics CRM Practice Director & Microsoft Alliance Director","location":"Greater Minneapolis-St. Paul Area","industry":"Information Technology and Services"}]}

//window.results = {"people":[{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=6190386&authType=OUT_OF_NETWORK&au…hId%3A3717380161422214581194%2CVSRPtargetId%3A6190386%2CVSRPcmpt%3Aprimary","headline":"Director, Business Development at CM Labs Simulations Inc.","location":"Ottawa, Canada Area","industry":"Information Technology and Services"},{"name":{"first":"Véronique","last":"Turcotte"},"profileLink":"https://www.linkedin.com/profile/view?id=7906775&authType=OPENLINK&authToke…hId%3A3717380161422214581194%2CVSRPtargetId%3A7906775%2CVSRPcmpt%3Aprimary","headline":"HR Manager at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Information Technology and Services","company":"CM Labs Simulations Inc.","currentPosition":"CMLabs Simulations Inc.","pastPositions":["Averna","Unixel / Groupe Conseil PRI","SAP Labs"],"education":["HEC Montréal"]},{"name":{"first":"Arnold"},"profileLink":"https://www.linkedin.com/profile/view?id=21554&authType=OUT_OF_NETWORK&auth…rchId%3A3717380161422214581194%2CVSRPtargetId%3A21554%2CVSRPcmpt%3Aprimary","headline":"Chief Operating Officer","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"CMLabs Simulations Inc.","pastPositions":["Metix Software (now BuildIT Software and Solutions)","MAYA","Unitied Dominion Industries (now SPX Corporation)"],"education":["University of Cambridge"]},{"name":{"first":"Bob"},"profileLink":"https://www.linkedin.com/profile/view?id=38172606&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A38172606%2CVSRPcmpt%3Aprimary","headline":"Software Team Manager at CMLabs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["Codengineer","Ludia","Resonant Medical (now part of Elekta)"],"education":["Université de Montréal - Ecole polytechnique de Montréal"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=23108188&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A23108188%2CVSRPcmpt%3Aprimary","headline":"VP Product Development at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["CM Labs Simulations Inc.","Averna","Nakisa"],"education":["Lycée de la Communication"]},{"name":{"first":"Nicolas"},"profileLink":"https://www.linkedin.com/profile/view?id=25871474&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A25871474%2CVSRPcmpt%3Aprimary","headline":"Engineering Content Manager at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["CM Labs Simulations Inc.","Bombardier Aerospace","CAE"],"education":["HEC Montréal"]},{"name":{"first":"Sylvain"},"profileLink":"https://www.linkedin.com/profile/view?id=9267405&authType=OUT_OF_NETWORK&au…hId%3A3717380161422214581194%2CVSRPtargetId%3A9267405%2CVSRPcmpt%3Aprimary","headline":"Team Lead Software Platform at CMLabs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["Autodesk","Discreet Logic","Ericsson"],"education":["Université de Sherbrooke"]},{"name":{"first":"Robert","last":"Weldon"},"profileLink":"https://www.linkedin.com/profile/view?id=18226186&authType=OPENLINK&authTok…Id%3A3717380161422214581194%2CVSRPtargetId%3A18226186%2CVSRPcmpt%3Aprimary","headline":"CEO at CMLabs Simulations","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["MathEngine","PostLinear Entertainment","Velocity Games"],"education":["New England College"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=642854&authType=OUT_OF_NETWORK&aut…chId%3A3717380161422214581194%2CVSRPtargetId%3A642854%2CVSRPcmpt%3Aprimary","headline":"Account Manager at CM Labs","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["Nakisa","GELcore","Positron Public Safety Systems"],"education":["McGill University"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=13558697&authType=OUT_OF_NETWORK&a…Id%3A3717380161422214581194%2CVSRPtargetId%3A13558697%2CVSRPcmpt%3Aprimary","headline":"Vice President Finances & Operations at CM Labs Simulations Inc.","location":"Montreal, Canada Area","industry":"Computer Software","company":"CM Labs Simulations Inc.","currentPosition":"","pastPositions":["CMLabs Simulations Inc.","Averna","Forensic Technology"],"education":["Université de Montréal - Ecole polytechnique de Montréal"]}]}

var app = {
    settings: {
        scraper: {
            limit: 10000
            //limit: 8
        },
        delay: 500
    },
    currentCompany: null,
    results: []

    // get profile data
    //   [{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=41873538","headline":"SEO Executive at Logicsofts Pvt Ltd","location":"New Delhi Area, India","industry":"Computer Networking","companyName":"Digg","currentPosition":"","pastPositions":[],"education":[]},{"name":{"first":"Michael","last":"Young"},"profileLink":"https://www.linkedin.com/profile/view?id=10518155","headline":"CTO at Digg.com","location":"Greater New York City Area","industry":"Computer Software","companyName":"Digg","currentPosition":"Digg","pastPositions":["News.me","New York Times, Research and Development","OpenTV"],"education":["Lewis and Clark College"]},{"name":{"first":"Sissi","last":"Nie"},"profileLink":"https://www.linkedin.com/profile/view?id=74572526","headline":"Business at Digg","location":"Greater New York City Area","industry":"Online Media","companyName":"Digg","currentPosition":"Digg","pastPositions":["Ogilvy & Mather","Harvey Nash","Yale University"],"education":["Yale University"]},{"name":{"first":"Jon","last":"Ferrer"},"profileLink":"https://www.linkedin.com/profile/view?id=12051551","headline":"Webmaster","location":"Greater New York City Area","industry":"Internet","companyName":"Digg","currentPosition":"DiggNews.me","pastPositions":["MLB Advanced Media, LP","Self-Employed","Taproot Foundation"],"education":["Penn State University"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=21973901","headline":"Vice President Diggs Construction, LLC; Coalition for Achievement Now (ConnCAN)","location":"Hartford, Connecticut Area","industry":"Construction","companyName":"Digg","currentPosition":"","pastPositions":[],"education":[]},{"name":{"first":"Justin","last":"Slembrouck"},"profileLink":"https://www.linkedin.com/profile/view?id=22072970","headline":"Design Director at Digg","location":"Greater New York City Area","industry":"Computer Software","companyName":"Digg","currentPosition":"DiggNews.me","pastPositions":["Adobe Systems","R/GA"],"education":["College for Creative Studies"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=10444444","headline":"Solution Architect at IAG","location":"Auckland, New Zealand","industry":"Information Technology and Services","companyName":"Digg","currentPosition":"","pastPositions":[],"education":[]},{"name":{"first":"Cynthia","last":"Davis"},"profileLink":"https://www.linkedin.com/profile/view?id=33828677","headline":"Executive Assistant","location":"San Francisco Bay Area","industry":"Internet","companyName":"Digg","currentPosition":"Digg","pastPositions":["Walmart.com","KidzMouse","Google, Microsoft, Netscape"],"education":["Mission College"]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=20653728","headline":"Founder/President at CasePark Holdings","location":"Jacksonville, Florida Area","industry":"Venture Capital & Private Equity","companyName":"Digg","currentPosition":"","pastPositions":[],"education":[]},{"name":{"isHidden":true},"profileLink":"https://www.linkedin.com/profile/view?id=51789870","headline":"Social Media Editor at Digg","location":"Greater New York City Area","industry":"Internet","companyName":"Digg","currentPosition":"","pastPositions":[],"education":[]}]
    // getMissingNames
    //[{"name":{"first":"John","last":"Wallace"},"profileLink":"https://www.linkedin.com/profile/view?id=1457210","headline":"Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks","location":"San Francisco Bay Area","industry":"Internet","companyName":"Apple","currentPosition":"Apple Inc.","pastPositions":["Yahoo! Inc.","Sony Computer Entertainment","ONI Systems Inc. purchased by Ciena Corp. in 2003"],"education":["Menlo College"]},{"name":{"first":"Jacob","last":"Conway"},"profileLink":"https://www.linkedin.com/profile/view?id=1644330","headline":"Technical Sourcing Recruiter - Wireless Software at Apple","location":"Greater San Diego Area","industry":"Staffing and Recruiting","companyName":"Apple","currentPosition":"","pastPositions":["Novatel Wireless","TalentWar.net, Inc.","Networked Recruiter"],"education":["Augustana College (SD)"]},{"name":{"first":"Bill","last":"Dudney"},"profileLink":"https://www.linkedin.com/profile/view?id=480284","headline":"Writer of Code at Apple","location":"San Francisco Bay Area","industry":"Computer Software","companyName":"Apple","currentPosition":"AppleGala Factory Software LLCPragmatic Programmers","pastPositions":["Apple Inc.","Dudney.Net","Virtuas Solutions"],"education":["Texas A&M University"]},{"name":{"first":"Brian","last":"Temple"},"profileLink":"https://www.linkedin.com/profile/view?id=2674208","headline":"Building software people love","location":"Greater Denver Area","industry":"Computer Software","companyName":"Apple","currentPosition":"ApplePlaid Software, LLC","pastPositions":["Photobucket","Wayin","University of Colorado"],"education":["University of Colorado Boulder"]},{"name":{"first":"Corey","last":"Carson"},"profileLink":"https://www.linkedin.com/profile/view?id=9816373","headline":"Systems Engineering Manager at Apple","location":"Greater Denver Area","industry":"Information Technology and Services","companyName":"Apple","currentPosition":"Apple","pastPositions":["Holcomb's Education Resource","Maize USD 266"],"education":["Pittsburg State University"]},{"name":{"first":"Samantha","last":"Kish"},"profileLink":"https://www.linkedin.com/profile/view?id=10254966","headline":"Global Supply Manager - Channel Procurement at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","companyName":"Apple","currentPosition":"","pastPositions":["Apple","Johns Manville","Honeywell"],"education":["University of Colorado at Denver"]},{"name":{"first":"Dimitri","last":"Geier"},"profileLink":"https://www.linkedin.com/profile/view?id=12063296","headline":"Dimitri Geier is a Senior Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Telecommunications","companyName":"Apple","currentPosition":"Apple","pastPositions":["Motorola","Nextive Solutions","Warner Music Group"],"education":["Universität zu Köln"]},{"name":{"first":"Matthew","last":"Gaddis"},"profileLink":"https://www.linkedin.com/profile/view?id=12213953","headline":"UI Engineering Manager at Apple","location":"San Francisco Bay Area","industry":"Internet","companyName":"Apple","currentPosition":"Apple","pastPositions":["Scout Labs","PlayCoed","Self"],"education":["University of Colorado Boulder"]},{"name":{"first":"Tri","last":"Vuong"},"profileLink":"https://www.linkedin.com/profile/view?id=14068282","headline":"Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","companyName":"Apple","currentPosition":"","pastPositions":["Twitter","YP","Better The World"],"education":["University of Toronto"]},{"name":{"first":"Craig","last":"Bartels"},"profileLink":"https://www.linkedin.com/profile/view?id=15174289","headline":"Information Security at Apple","location":"London, United Kingdom","industry":"Information Technology and Services","companyName":"Apple","currentPosition":"","pastPositions":["Apple","Honeywell","IBM"],"education":["University of Oxford"]}]

    // permute emails
    //[{"name":{"first":"John","last":"Wallace"},"profileLink":"https://www.linkedin.com/profile/view?id=1457210","headline":"Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks","location":"San Francisco Bay Area","industry":"Internet","companyName":"Apple","currentPosition":"Apple Inc.","pastPositions":["Yahoo! Inc.","Sony Computer Entertainment","ONI Systems Inc. purchased by Ciena Corp. in 2003"],"education":["Menlo College"],"possibleEmails":["JohnWallace@apple.com","John.Wallace@apple.com","JWallace@apple.com","J.Wallace@apple.com","WallaceJohn@apple.com","Wallace.John@apple.com","John@apple.com","Wallace@apple.com","JW@apple.com"]},{"name":{"first":"Jacob","last":"Conway"},"profileLink":"https://www.linkedin.com/profile/view?id=1644330","headline":"Technical Sourcing Recruiter - Wireless Software at Apple","location":"Greater San Diego Area","industry":"Staffing and Recruiting","companyName":"Apple","currentPosition":"","pastPositions":["Novatel Wireless","TalentWar.net, Inc.","Networked Recruiter"],"education":["Augustana College (SD)"],"possibleEmails":["JacobConway@apple.com","Jacob.Conway@apple.com","JConway@apple.com","J.Conway@apple.com","ConwayJacob@apple.com","Conway.Jacob@apple.com","Jacob@apple.com","Conway@apple.com","JC@apple.com"]},{"name":{"first":"Bill","last":"Dudney"},"profileLink":"https://www.linkedin.com/profile/view?id=480284","headline":"Writer of Code at Apple","location":"San Francisco Bay Area","industry":"Computer Software","companyName":"Apple","currentPosition":"AppleGala Factory Software LLCPragmatic Programmers","pastPositions":["Apple Inc.","Dudney.Net","Virtuas Solutions"],"education":["Texas A&M University"],"possibleEmails":["BillDudney@apple.com","Bill.Dudney@apple.com","BDudney@apple.com","B.Dudney@apple.com","DudneyBill@apple.com","Dudney.Bill@apple.com","Bill@apple.com","Dudney@apple.com","BD@apple.com"]},{"name":{"first":"Brian","last":"Temple"},"profileLink":"https://www.linkedin.com/profile/view?id=2674208","headline":"Building software people love","location":"Greater Denver Area","industry":"Computer Software","companyName":"Apple","currentPosition":"ApplePlaid Software, LLC","pastPositions":["Photobucket","Wayin","University of Colorado"],"education":["University of Colorado Boulder"],"possibleEmails":["BrianTemple@apple.com","Brian.Temple@apple.com","BTemple@apple.com","B.Temple@apple.com","TempleBrian@apple.com","Temple.Brian@apple.com","Brian@apple.com","Temple@apple.com","BT@apple.com"]},{"name":{"first":"Corey","last":"Carson"},"profileLink":"https://www.linkedin.com/profile/view?id=9816373","headline":"Systems Engineering Manager at Apple","location":"Greater Denver Area","industry":"Information Technology and Services","companyName":"Apple","currentPosition":"Apple","pastPositions":["Holcomb's Education Resource","Maize USD 266"],"education":["Pittsburg State University"],"possibleEmails":["CoreyCarson@apple.com","Corey.Carson@apple.com","CCarson@apple.com","C.Carson@apple.com","CarsonCorey@apple.com","Carson.Corey@apple.com","Corey@apple.com","Carson@apple.com","CC@apple.com"]},{"name":{"first":"Samantha","last":"Kish"},"profileLink":"https://www.linkedin.com/profile/view?id=10254966","headline":"Global Supply Manager - Channel Procurement at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","companyName":"Apple","currentPosition":"","pastPositions":["Apple","Johns Manville","Honeywell"],"education":["University of Colorado at Denver"],"possibleEmails":["SamanthaKish@apple.com","Samantha.Kish@apple.com","SKish@apple.com","S.Kish@apple.com","KishSamantha@apple.com","Kish.Samantha@apple.com","Samantha@apple.com","Kish@apple.com","SK@apple.com"]},{"name":{"first":"Dimitri","last":"Geier"},"profileLink":"https://www.linkedin.com/profile/view?id=12063296","headline":"Dimitri Geier is a Senior Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Telecommunications","companyName":"Apple","currentPosition":"Apple","pastPositions":["Motorola","Nextive Solutions","Warner Music Group"],"education":["Universität zu Köln"],"possibleEmails":["DimitriGeier@apple.com","Dimitri.Geier@apple.com","DGeier@apple.com","D.Geier@apple.com","GeierDimitri@apple.com","Geier.Dimitri@apple.com","Dimitri@apple.com","Geier@apple.com","DG@apple.com"]},{"name":{"first":"Matthew","last":"Gaddis"},"profileLink":"https://www.linkedin.com/profile/view?id=12213953","headline":"UI Engineering Manager at Apple","location":"San Francisco Bay Area","industry":"Internet","companyName":"Apple","currentPosition":"Apple","pastPositions":["Scout Labs","PlayCoed","Self"],"education":["University of Colorado Boulder"],"possibleEmails":["MatthewGaddis@apple.com","Matthew.Gaddis@apple.com","MGaddis@apple.com","M.Gaddis@apple.com","GaddisMatthew@apple.com","Gaddis.Matthew@apple.com","Matthew@apple.com","Gaddis@apple.com","MG@apple.com"]},{"name":{"first":"Tri","last":"Vuong"},"profileLink":"https://www.linkedin.com/profile/view?id=14068282","headline":"Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","companyName":"Apple","currentPosition":"","pastPositions":["Twitter","YP","Better The World"],"education":["University of Toronto"],"possibleEmails":["TriVuong@apple.com","Tri.Vuong@apple.com","TVuong@apple.com","T.Vuong@apple.com","VuongTri@apple.com","Vuong.Tri@apple.com","Tri@apple.com","Vuong@apple.com","TV@apple.com"]},{"name":{"first":"Craig","last":"Bartels"},"profileLink":"https://www.linkedin.com/profile/view?id=15174289","headline":"Information Security at Apple","location":"London, United Kingdom","industry":"Information Technology and Services","companyName":"Apple","currentPosition":"","pastPositions":["Apple","Honeywell","IBM"],"education":["University of Oxford"],"possibleEmails":["CraigBartels@apple.com","Craig.Bartels@apple.com","CBartels@apple.com","C.Bartels@apple.com","BartelsCraig@apple.com","Bartels.Craig@apple.com","Craig@apple.com","Bartels@apple.com","CB@apple.com"]}]
};

window.queue = [];
window.settings = {};

window.go = function () {
    console.table(queue);

    var i = 0;

    var routine = [
        scraper.start,
        getProfileData.start,
        getMissingNames.start,
        permuteEmails.start,
        validateEmails.start,
        nextQueueItem
    ];

    function nextQueueItem() {
        log('callback');
        app.currentCompany = queue[i++];
        if (app.currentCompany) {
            async.series(routine)
        }
        else {
            console.log(app.results);
        }
    }

    nextQueueItem();
};

/**
 * Created by matthew on 2/13/15.
 */

// message sending/receiving
chrome.runtime.onMessage.addListener(function (message) {
    if (message.action == "openApp") {
        chrome.tabs.create({url: message.path})

    }
});

// provides a proxy to call a content script function
app.callTabAction = function (tabID, action, callback, args) {

    if (!action) {
        console.error('actions not set');
        return false
    }

    var message = {to: 'content', action: action, args: args};

    chrome.tabs.sendMessage(tabID, message, callback)
};
/**
 * Created by matthew on 1/21/15.
 */
var getMissingNames = function () {
    var masterCallback,
        searchTab,
        personIndex,
        currentPerson;

    function start(cb) {

        masterCallback = cb;
        personIndex = 0;
        currentPerson = true;

        var series = [
            createSearchTab,
            getName,
            nextIteration
        ];

        // program control
        function nextIteration() {

            currentPerson = app.results[personIndex++];

            if (status.done || !currentPerson) {
                exit();
            }
            else {
                if (currentPerson.name.isHidden || !currentPerson.name.last) {
                    executeSeries();
                }
                else {
                    nextIteration();
                }
            }
        }

        // execute series after a one-time function call
        /*async.series([
         init,
         executeSeries
         ]
         );*/

        nextIteration();

        function executeSeries() {
            async.series(series)
        }
    }

    function createSearchTab(callback) {
        if (
            !(
            currentPerson ||
            currentPerson.headline ||
            currentPerson.pastPositions ||
            currentPerson.education ||
            currentPerson.currentCompany
            )
        ) {
            callback();
            return false;
        }
        else {
            //debugger;
            var searchText =
                "site:linkedin.com " +
                (currentPerson.name.first ? currentPerson.name.first + ' ' : '') +
                (currentPerson.name.last ? currentPerson.name.last + ' ' : '') +
                currentPerson.headline + ' ';
            // currentPerson.pastPositions.join(' ') + ' ' +
            //currentPerson.education.join(' ') + ' ';
            var url =
                "http://google.com" +
                "#q=" +
                searchText;

            chrome.tabs.onUpdated.addListener(tabUpdated);

            function tabUpdated(tabID, info, tab) {

                if (searchTab == tabID && info.status == "complete") {
                    chrome.tabs.onUpdated.removeListener(tabUpdated);
                    callback();
                }
            }

            chrome.tabs.create({url: url}, function (tab) {
                searchTab = tab.id;
            });
        }
    }

    function getName(callback) {
        app.callTabAction(searchTab, "getName", handleResponse);

        function handleResponse(name) {
            if (name && name.first && name.last) {
                currentPerson.name = name;
            }
            else {
                currentPerson.name = false;
            }
            chrome.tabs.remove(searchTab);
            callback();
        }
    }

    function exit() {
        if (searchTab) {
            chrome.tabs.remove(searchTab);
        }
        masterCallback();
    }


    return {
        start: start
    }
}();
/**
 * Created by matthew on 1/17/15.
 */
var getProfileData = function () {

    var masterCallback,
        currentPerson,
        personIndex,
        profileScrapeTab;

    function start(cb) {
        masterCallback = cb;
        personIndex = 0;
        currentPerson = true;

        var series = [
            createProfileScrapeTab,
            retrieveProfileData,
            nextIteration
        ];

        // program control
        function nextIteration() {
            currentPerson = app.results[personIndex++]

            if (status.done || !currentPerson) {
                exit();
            }
            else {
                executeSeries();
            }
        }

        // execute series after a one-time function call
        /*async.series([
         init,
         executeSeries
         ]
         );*/

        nextIteration();

        function executeSeries() {
            async.series(series)
        }
    }

    function createProfileScrapeTab(callback) {
        // create the tab with link argument
        chrome.tabs.create({url: currentPerson.profileLink}, function (tab) {
            profileScrapeTab = tab.id;
            chrome.tabs.onUpdated.addListener(tabUpdated);

            function tabUpdated(tabID, changeInfo, tab) {
                if (tabID == profileScrapeTab && changeInfo.status == "complete") {
                    chrome.tabs.onUpdated.removeListener(tabUpdated);
                    setTimeout(callback, app.settings.delay);
                    log(app.settings.delay)
                }
            }
        });
    }

    function retrieveProfileData(callback) {

        // get the required data from the tab
        app.callTabAction(profileScrapeTab, "getBasicInfo", handleResponse);

        function handleResponse(response) {

            $.extend(currentPerson, response);

            // we're done with the tab. remove it
            chrome.tabs.remove(profileScrapeTab);

            callback()
        }
    }

    // releases program control back to calling function
    function exit() {
        masterCallback();
    }

    return {
        start: start
    }
}();

/**
 * Created by matthew on 12/15/14.
 */
/**
 * Created by matthew on 1/21/15.
 */
var permuteEmails = function () {
    var masterCallback;

    function start(callback) {

        masterCallback = callback;
        async.series(
            [
                permuteEmails,
                done
            ]
        );

        function done() {
            masterCallback()
        }
    }

    function permuteEmails(cb) {
        $.each(app.results, function (index, person) {
            person.emailConfirmed = '';
            var name = person.name;
            if (name) {
                try {
                    var initial = {
                        first: name.first[0],
                        last: name.last[0]

                    };
                } catch (err) {
                    console.error(err);
                }
                app.results[index].possibleEmails = [
                    name.first + name.last,
                    name.first + '.' + name.last,
                    initial.first + name.last,
                    initial.first + '.' + name.last,
                    name.last + name.first,
                    name.last + '.' + name.first,
                    name.first,
                    name.last,
                    initial.first + initial.last
                ].map(function (emailAddress) {
                        return convertStringToAscii(emailAddress + '@' + app.currentCompany.emailDomain);
                    })
            }
        });

        cb();

        function convertStringToAscii(email) {

            //Convert Characters
            return email
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/é/g, 'e');
        }

    }

    return {
        start: start
    }
}();

/**
 * Created by matthew on 12/13/14.
 */
// results
var scraper = function () {

// scrape status
    var running = false;

    var scrapeTab = 0;

    var masterCallback;

    var isFinished = false;

    var status = {};
    var limit = app.settings.scraper.limit;

    // starts scraping
    function start(cb) {
        running = true;
        masterCallback = cb;

        var series = [
            getProfileLinks,
            nextIteration
        ];

        function executeSeries() {
            async.series(series)
        }

        // program control
        function nextIteration() {
            if (status.done) {
                exit();
            }
            else {
                executeSeries();
            }
        }

        async.series([
                create_scrapeTab,
                executeSeries
            ]
        )
    }

    // releases program control back to calling function
    function exit() {
        if (scrapeTab) {
            chrome.tabs.remove(scrapeTab);
        }
        scrapeTab = false;
        isFinished = true;
        masterCallback();
    }

    // creates the tab we'll use for scraping
    function create_scrapeTab(callback) {

        // prevents creation of extra tab
        if (scrapeTab) {
            callback();
            return;
        }

        var titleFilter = app.currentCompany.titleFilter;

        var url =
            'http://linkedin.com/' +
            'vsearch/p' +
            '?f_CC=' + app.currentCompany.companyID +
            (
                titleFilter ?
                '&title=' + titleFilter : '') +
            '&openAdvancedForm=true' +
            '&titleScope=C&locationType=I' +
            '&orig=MDYS';

        // create the tab
        chrome.tabs.create({url: url}, function (tab) {
            scrapeTab = tab.id;
            chrome.tabs.onUpdated.addListener(onTabLoad)
        });

        // after tab creation return control to the calling function
        function onTabLoad(tabId, info) {
            if (info.status == "complete" && tabId == scrapeTab) {
                chrome.tabs.onUpdated.removeListener(onTabLoad);
                callback();
            }
        }
    }

    // retrieves profile links from scrape tab
    function getProfileLinks(callback) {

        // tells the content script to grab and return the current page's profile links
        app.callTabAction(scrapeTab, 'scrapeProfileList', processResults);

        // checks the integrity of the response, then concatenates it to our app.results variable
        function processResults(response) {

            // basic error checking
            if (!response || response.error) {
                console.error(chrome.runtime.lastError);
                console.error("Response for processLinkBatch is:" + response.error);
                return false;
            }

            // concatenate the response (if any) to our existing results array
            if (response.linkList.length != 0) {
                $(response.linkList).each(function (index, item) {
                    item.companyName = app.currentCompany.companyName
                });
                app.results = app.results.concat(response.linkList);
            }

            // when debugging, limits the number of profile links we collect
            if (app.results.length >= limit) {
                status.done = true;
                callback();
                return false;
            }

            // hasNextPage is a boolean representing whether the "next" pagination button exists.
            if (!response.hasNextPage) {
                status.done = true;
                callback();
                return false;
            }

            // otherwise, go on to scrape next page
            else {
                chrome.tabs.update({url: "http://" + response.nextPage}, function () {
                    function pageChange(tabId, info, tab) {
                        var url = tab.url;

                        if (url != undefined && tabId == scrapeTab && info.status == "complete") {

                            chrome.tabs.onUpdated.removeListener(pageChange);

                            setTimeout(function (callback) {
                                callback();
                            }, 2000, callback);
                        }
                    }

                    chrome.tabs.onUpdated.addListener(pageChange);
                });
            }
        }
    }

// the api for this module
    return {
        start: start
    };

}();

/**
 * Created by matthew on 1/22/15.
 */
var validateEmails = function () {
    var masterCallback, gmailTab, currentPerson, personIndex, successfulEmailFormats, gmailInitialLoad;

    function start(cb) {
        gmailInitialLoad = true;
        masterCallback = cb;
        personIndex = 0;
        successfulEmailFormats = [];

        var series = [
            arrangeEmails,
            findCurrentPersonsEmail,
            nextIteration
        ];

        function executeSeries() {
            async.series(series)
        }

        // program control
        function nextIteration() {
            console.log('ay there!');
            currentPerson = app.results[personIndex++];

            if (status.done || !currentPerson) {
                exit();
            }
            else {
                executeSeries();
            }
        }

        async.series([
                createGmailTab,
                nextIteration
            ]
        )
    }

    function createGmailTab(callback) {
        chrome.tabs.create({url: "https://google.com"}, function (tab) {
            gmailTab = tab.id;
            setTimeout(callback, 1000);
        })
    }

    function arrangeEmails(callback) {
        // these are the email combinations we permuted in the previous step
        var possibleEmails = currentPerson.possibleEmails;
        if (possibleEmails) {

            if (successfulEmailFormats.length) {
                $.each(successfulEmailFormats.reverse(), function (index, item) {
                    possibleEmails.move(item, 0)
                })
            }
        }
        callback()
    }

    function findCurrentPersonsEmail(callback) {

        var i = 0;
        var email;

        function composeNewEmail(composeNewEmailCb) {
            var timeout = gmailInitialLoad ? 7000 : 800;
            console.log('compose email');

            function waitForLoad() {
                console.log('callback in 5s');
                setTimeout(composeNewEmailCb, timeout);
            }

            chrome.tabs.update(gmailTab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, waitForLoad);
            gmailInitialLoad = false;
        }

        function tryNextVariation(nextVariationCb) {

            app.callTabAction(gmailTab, 'tryEmail', processResponse, {email: email, name: currentPerson.name});

            function processResponse(response) {
                if (response && response.correct) {
                    currentPerson.email = email;
                    if (successfulEmailFormats.indexOf(i) == -1) {
                        successfulEmailFormats.push(i - 1);
                    }
                }
                nextVariationCb();
            }
        }

        var series = [composeNewEmail, tryNextVariation, nextIteration];

        function nextIteration() {
            var possibleEmails = currentPerson.possibleEmails;
            if (possibleEmails) {
                email = currentPerson.possibleEmails[i++];
                if (email && !currentPerson.email) {
                    async.series(series);
                }
                else {
                    if (!currentPerson.email) {
                        currentPerson.email = possibleEmails[successfulEmailFormats[0] || 0];
                        currentPerson.emailConfirmed = '';
                    }
                    else {
                        currentPerson.emailConfirmed = 'yes';
                    }
                    callback()
                }
            }
            else {
                callback()
            }
        }

        nextIteration();
    }

    function exit() {
        if (gmailTab) {
            setTimeout(closeGmailTab, 1000);
            function closeGmailTab() {
                chrome.tabs.remove(gmailTab);
            }
        }
        masterCallback();
    }

    return {
        start: start
    };

}();
