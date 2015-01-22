(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');
var getMissingNames = require('./getMissingNames.js');
var permuteEmails = require('./permuteEmails.js');
var validateEmails = require('./validateEmails.js');

window.results = {
    people: []
};

window.results = {"people":[{"name":{"full":"John Wallace","first":"John","last":"Wallace"},"profileLink":"https://www.linkedin.com/profile/view?id=1457210&authType=OUT_OF_NETWORK&au…hId%3A3717380161421910678637%2CVSRPtargetId%3A1457210%2CVSRPcmpt%3Aprimary","headline":"Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple Inc.","pastPositions":["Yahoo! Inc.","Sony Computer Entertainment","ONI Systems Inc. purchased by Ciena Corp. in 2003"],"education":["Menlo College"],"possibleEmails":["JohnWallace@apple.com","John.Wallace@apple.com","JWallace@apple.com","J.Wallace@apple.com","WallaceJohn@apple.com","Wallace.John@apple.com","John@apple.com","Wallace@apple.com","JW@apple.com"]},{"name":{"full":"Jacob Conway","first":"Jacob","last":"Conway"},"profileLink":"https://www.linkedin.com/profile/view?id=1644330&authType=OPENLINK&authToke…hId%3A3717380161421910678637%2CVSRPtargetId%3A1644330%2CVSRPcmpt%3Aprimary","headline":"Technical Sourcing Recruiter - Wireless Software at Apple","location":"Greater San Diego Area","industry":"Staffing and Recruiting","company":"Apple","currentPosition":"","pastPositions":["Novatel Wireless","TalentWar.net, Inc.","Networked Recruiter"],"education":["Augustana College (SD)"],"possibleEmails":["JacobConway@apple.com","Jacob.Conway@apple.com","JConway@apple.com","J.Conway@apple.com","ConwayJacob@apple.com","Conway.Jacob@apple.com","Jacob@apple.com","Conway@apple.com","JC@apple.com"]},{"name":{"full":"Bill Dudney","first":"Bill","last":"Dudney"},"profileLink":"https://www.linkedin.com/profile/view?id=480284&authType=OUT_OF_NETWORK&aut…chId%3A3717380161421910678637%2CVSRPtargetId%3A480284%2CVSRPcmpt%3Aprimary","headline":"Writer of Code at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleGala Factory Software LLCPragmatic Programmers","pastPositions":["Apple Inc.","Dudney.Net","Virtuas Solutions"],"education":["Texas A&M University"],"possibleEmails":["BillDudney@apple.com","Bill.Dudney@apple.com","BDudney@apple.com","B.Dudney@apple.com","DudneyBill@apple.com","Dudney.Bill@apple.com","Bill@apple.com","Dudney@apple.com","BD@apple.com"]},{"name":{"full":"Corey Carson","first":"Corey","last":"Carson"},"profileLink":"https://www.linkedin.com/profile/view?id=9816373&authType=OUT_OF_NETWORK&au…hId%3A3717380161421910678637%2CVSRPtargetId%3A9816373%2CVSRPcmpt%3Aprimary","headline":"Systems Engineer","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"Apple","pastPositions":["Holcomb's Education Resource","Maize USD 266"],"education":["Pittsburg State University"],"possibleEmails":["CoreyCarson@apple.com","Corey.Carson@apple.com","CCarson@apple.com","C.Carson@apple.com","CarsonCorey@apple.com","Carson.Corey@apple.com","Corey@apple.com","Carson@apple.com","CC@apple.com"]},{"name":{"full":"Samantha Kish","first":"Samantha","last":"Kish"},"profileLink":"https://www.linkedin.com/profile/view?id=10254966&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A10254966%2CVSRPcmpt%3Aprimary","headline":"Global Supply Manager - Channel Procurement at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","company":"Apple","currentPosition":"","pastPositions":["Apple","Johns Manville","Honeywell"],"education":["University of Colorado at Denver"],"possibleEmails":["SamanthaKish@apple.com","Samantha.Kish@apple.com","SKish@apple.com","S.Kish@apple.com","KishSamantha@apple.com","Kish.Samantha@apple.com","Samantha@apple.com","Kish@apple.com","SK@apple.com"]},{"name":{"full":"Dimitri Geier","first":"Dimitri","last":"Geier"},"profileLink":"https://www.linkedin.com/profile/view?id=12063296&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A12063296%2CVSRPcmpt%3Aprimary","headline":"Dimitri Geier is a Senior Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Telecommunications","company":"Apple","currentPosition":"Apple","pastPositions":["Motorola","Nextive Solutions","Warner Music Group"],"education":["Universität zu Köln"],"possibleEmails":["DimitriGeier@apple.com","Dimitri.Geier@apple.com","DGeier@apple.com","D.Geier@apple.com","GeierDimitri@apple.com","Geier.Dimitri@apple.com","Dimitri@apple.com","Geier@apple.com","DG@apple.com"]},{"name":{"full":"Matthew Gaddis","first":"Matthew","last":"Gaddis"},"profileLink":"https://www.linkedin.com/profile/view?id=12213953&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A12213953%2CVSRPcmpt%3Aprimary","headline":"UI Engineering Manager at Apple","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple","pastPositions":["Scout Labs","PlayCoed","Self"],"education":["University of Colorado Boulder"],"possibleEmails":["MatthewGaddis@apple.com","Matthew.Gaddis@apple.com","MGaddis@apple.com","M.Gaddis@apple.com","GaddisMatthew@apple.com","Gaddis.Matthew@apple.com","Matthew@apple.com","Gaddis@apple.com","MG@apple.com"]},{"name":{"full":"Tri Vuong","first":"Tri","last":"Vuong"},"profileLink":"https://www.linkedin.com/profile/view?id=14068282&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A14068282%2CVSRPcmpt%3Aprimary","headline":"Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Twitter","YP","Better The World"],"education":["University of Toronto"],"possibleEmails":["TriVuong@apple.com","Tri.Vuong@apple.com","TVuong@apple.com","T.Vuong@apple.com","VuongTri@apple.com","Vuong.Tri@apple.com","Tri@apple.com","Vuong@apple.com","TV@apple.com"]},{"name":{"full":"Kshitij Deshpande","first":"Kshitij","last":"Deshpande"},"profileLink":"https://www.linkedin.com/profile/view?id=19292128&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A19292128%2CVSRPcmpt%3Aprimary","headline":"Sr. iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Gracenote (A Sony Company)","Independent iOS Developer","Telestream"],"education":["Wright State University"],"possibleEmails":["KshitijDeshpande@apple.com","Kshitij.Deshpande@apple.com","KDeshpande@apple.com","K.Deshpande@apple.com","DeshpandeKshitij@apple.com","Deshpande.Kshitij@apple.com","Kshitij@apple.com","Deshpande@apple.com","KD@apple.com"]},{"name":{"full":"Paul Stuart","first":"Paul","last":"Stuart"},"profileLink":"https://www.linkedin.com/profile/view?id=20546172&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A20546172%2CVSRPcmpt%3Aprimary","headline":"TSE/Escalations|vCloudSuite|vShield|Infrastructure|Network|Fault|Storage at VMware","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"VMwareTime Warner CableApple Retail","pastPositions":["VMware","IBM Global Services"],"education":["Park University"],"possibleEmails":["PaulStuart@apple.com","Paul.Stuart@apple.com","PStuart@apple.com","P.Stuart@apple.com","StuartPaul@apple.com","Stuart.Paul@apple.com","Paul@apple.com","Stuart@apple.com","PS@apple.com"]},{"name":{"full":"Azhar Sikander","first":"Azhar","last":"Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"],"possibleEmails":["AzharSikander@apple.com","Azhar.Sikander@apple.com","ASikander@apple.com","A.Sikander@apple.com","SikanderAzhar@apple.com","Sikander.Azhar@apple.com","Azhar@apple.com","Sikander@apple.com","AS@apple.com"]},{"name":{"full":"Ranjit Menon","first":"Ranjit","last":"Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421910681011%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"],"possibleEmails":["RanjitMenon@apple.com","Ranjit.Menon@apple.com","RMenon@apple.com","R.Menon@apple.com","MenonRanjit@apple.com","Menon.Ranjit@apple.com","Ranjit@apple.com","Menon@apple.com","RM@apple.com"]},{"name":{"full":"Liang Wei","first":"Liang","last":"Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"],"possibleEmails":["LiangWei@apple.com","Liang.Wei@apple.com","LWei@apple.com","L.Wei@apple.com","WeiLiang@apple.com","Wei.Liang@apple.com","Liang@apple.com","Wei@apple.com","LW@apple.com"]},{"name":{"full":"Kristina Gulish","first":"Kristina","last":"Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"],"possibleEmails":["KristinaGulish@apple.com","Kristina.Gulish@apple.com","KGulish@apple.com","K.Gulish@apple.com","GulishKristina@apple.com","Gulish.Kristina@apple.com","Kristina@apple.com","Gulish@apple.com","KG@apple.com"]},{"name":{"full":"Sonia Saini","first":"Sonia","last":"Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"],"possibleEmails":["SoniaSaini@apple.com","Sonia.Saini@apple.com","SSaini@apple.com","S.Saini@apple.com","SainiSonia@apple.com","Saini.Sonia@apple.com","Sonia@apple.com","Saini@apple.com","SS@apple.com"]},{"name":{"full":"Michael Turner","first":"Michael","last":"Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"],"possibleEmails":["MichaelTurner@apple.com","Michael.Turner@apple.com","MTurner@apple.com","M.Turner@apple.com","TurnerMichael@apple.com","Turner.Michael@apple.com","Michael@apple.com","Turner@apple.com","MT@apple.com"]},{"name":{"full":"George Kalangi","first":"George","last":"Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"],"possibleEmails":["GeorgeKalangi@apple.com","George.Kalangi@apple.com","GKalangi@apple.com","G.Kalangi@apple.com","KalangiGeorge@apple.com","Kalangi.George@apple.com","George@apple.com","Kalangi@apple.com","GK@apple.com"]},{"name":{"full":"Mark Gouldsmith","first":"Mark","last":"Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"],"possibleEmails":["MarkGouldsmith@apple.com","Mark.Gouldsmith@apple.com","MGouldsmith@apple.com","M.Gouldsmith@apple.com","GouldsmithMark@apple.com","Gouldsmith.Mark@apple.com","Mark@apple.com","Gouldsmith@apple.com","MG@apple.com"]},{"name":{"full":"Trevor Sheridan","first":"Trevor","last":"Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[],"possibleEmails":["TrevorSheridan@apple.com","Trevor.Sheridan@apple.com","TSheridan@apple.com","T.Sheridan@apple.com","SheridanTrevor@apple.com","Sheridan.Trevor@apple.com","Trevor@apple.com","Sheridan@apple.com","TS@apple.com"]},{"name":{"full":"Marvin Dela Cruz","first":"Marvin","last":"Dela"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Dept of Real Estate","California Secretary of State","Eclipse/InterlocSolutions"],"education":[],"possibleEmails":["MarvinDela@apple.com","Marvin.Dela@apple.com","MDela@apple.com","M.Dela@apple.com","DelaMarvin@apple.com","Dela.Marvin@apple.com","Marvin@apple.com","Dela@apple.com","MD@apple.com"]},{"name":{"full":"Azhar Sikander","first":"Azhar","last":"Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"],"possibleEmails":["AzharSikander@apple.com","Azhar.Sikander@apple.com","ASikander@apple.com","A.Sikander@apple.com","SikanderAzhar@apple.com","Sikander.Azhar@apple.com","Azhar@apple.com","Sikander@apple.com","AS@apple.com"]},{"name":{"full":"Ranjit Menon","first":"Ranjit","last":"Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421910681011%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"],"possibleEmails":["RanjitMenon@apple.com","Ranjit.Menon@apple.com","RMenon@apple.com","R.Menon@apple.com","MenonRanjit@apple.com","Menon.Ranjit@apple.com","Ranjit@apple.com","Menon@apple.com","RM@apple.com"]},{"name":{"full":"Liang Wei","first":"Liang","last":"Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"],"possibleEmails":["LiangWei@apple.com","Liang.Wei@apple.com","LWei@apple.com","L.Wei@apple.com","WeiLiang@apple.com","Wei.Liang@apple.com","Liang@apple.com","Wei@apple.com","LW@apple.com"]},{"name":{"full":"Kristina Gulish","first":"Kristina","last":"Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"],"possibleEmails":["KristinaGulish@apple.com","Kristina.Gulish@apple.com","KGulish@apple.com","K.Gulish@apple.com","GulishKristina@apple.com","Gulish.Kristina@apple.com","Kristina@apple.com","Gulish@apple.com","KG@apple.com"]},{"name":{"full":"Sonia Saini","first":"Sonia","last":"Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"],"possibleEmails":["SoniaSaini@apple.com","Sonia.Saini@apple.com","SSaini@apple.com","S.Saini@apple.com","SainiSonia@apple.com","Saini.Sonia@apple.com","Sonia@apple.com","Saini@apple.com","SS@apple.com"]},{"name":{"full":"Michael Turner","first":"Michael","last":"Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"],"possibleEmails":["MichaelTurner@apple.com","Michael.Turner@apple.com","MTurner@apple.com","M.Turner@apple.com","TurnerMichael@apple.com","Turner.Michael@apple.com","Michael@apple.com","Turner@apple.com","MT@apple.com"]},{"name":{"full":"George Kalangi","first":"George","last":"Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"],"possibleEmails":["GeorgeKalangi@apple.com","George.Kalangi@apple.com","GKalangi@apple.com","G.Kalangi@apple.com","KalangiGeorge@apple.com","Kalangi.George@apple.com","George@apple.com","Kalangi@apple.com","GK@apple.com"]},{"name":{"full":"Mark Gouldsmith","first":"Mark","last":"Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"],"possibleEmails":["MarkGouldsmith@apple.com","Mark.Gouldsmith@apple.com","MGouldsmith@apple.com","M.Gouldsmith@apple.com","GouldsmithMark@apple.com","Gouldsmith.Mark@apple.com","Mark@apple.com","Gouldsmith@apple.com","MG@apple.com"]},{"name":{"full":"Trevor Sheridan","first":"Trevor","last":"Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[],"possibleEmails":["TrevorSheridan@apple.com","Trevor.Sheridan@apple.com","TSheridan@apple.com","T.Sheridan@apple.com","SheridanTrevor@apple.com","Sheridan.Trevor@apple.com","Trevor@apple.com","Sheridan@apple.com","TS@apple.com"]},{"name":{"full":"Marvin Dela Cruz"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software"}]}


window.callTabAction = function (tabId, action, callback, args) {
    var message = {to: 'content', action: action};
    chrome.tabs.sendMessage(tabId, message, callback)
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 20;

    var routine = [
        //scraper.start.bind(undefined, settings, results),
        //getBasicInfo.start.bind(undefined, settings, results),
        //getMissingNames.start.bind(undefined, settings, results),
        //permuteEmails.start.bind(undefined, settings, results)
        validateEmails.start.bind(undefined, settings, results)
    ];
    routine.push(done);

    async.series(routine);
};

function done() {
    console.table(results)
}

//var permuter = require('./permuteEmails.js');
//var find_last_names = require('./last_names.js');
//var email_verifier = require('./email_check.js');
},{"./getBasicInfo.js":2,"./getMissingNames.js":3,"./permuteEmails.js":4,"./scraper.js":5,"./validateEmails.js":6}],2:[function(require,module,exports){
/**
 * Created by matthew on 1/17/15.
 */
var currentWorkingTab;
var isFinished;
var results;
var masterCallback;
var settings;
var i = 0;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {

    results = resultsArg;
    masterCallback = callbackArg;
    settings = settingsArg;

    iterate()
}

function getBasicInfo(person) {
    currentPerson = person;
    currentPerson.company = settings.general.companyName;

    // create the tab with link argument
    chrome.tabs.create({url: person.profileLink}, function (tab) {
        currentWorkingTab = tab;
        chrome.tabs.onUpdated.addListener(tabUpdated)
    });
}

function tabUpdated(tabId, info, tab) {
    if (tabId == currentWorkingTab.id && info.status == "complete") {

        // get the required data from the tab
        callTabAction(currentWorkingTab.id, "getBasicInfo", handleResponse);

        // just to be safe, remove the listener
        chrome.tabs.onUpdated.removeListener(tabUpdated)
    }
}

function handleResponse(response) {

    $.extend(currentPerson, response);

    /*
     var name.full = response.name.full.trim().toLowerCase();
     var headline = response.headline;

     switch (name.full){
     case 'linkedin member':
     }
     */
    // we're done with the tab. remove it
    chrome.tabs.remove(currentWorkingTab.id);

    // decide whether to run again or not
    if (i + 1 != results.people.length) {
        iterate()
    }
    else {
        masterCallback();
    }
}


function iterate() {
    getBasicInfo(results.people[i++]);
}

module.exports = {
    isFinished: function () {
        return isFinished;
    },
    start: init
};

},{}],3:[function(require,module,exports){
/**
 * Created by matthew on 1/21/15.
 */
var settings, results, masterCallback;
var i = -1;
var currentPerson;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    iterate()
}

function iterate() {
    currentPerson = results.people[++i];
    var currentPersonFullName = currentPerson.name.full;

    if (isNameHidden(currentPersonFullName) || isNameAbbreviated(currentPersonFullName)) {
        getMissingName(function () {
            iterate();
        })
    }
    else if (i + 1 == results.people.length) {
        masterCallback();
    }
    else {
        var fullNameSplit = currentPersonFullName.split('|')[0].split(' ');
        currentPerson.name.first = fullNameSplit[0];
        currentPerson.name.last = fullNameSplit[1];
        iterate()
    }
}

function getMissingName(callback) {
    //debugger;
    var searchText = (
    "site:linkedin.com " +
    currentPerson.headline + ' ' +
    currentPerson.currentPosition + ' ' +
    currentPerson.pastPositions.join(' ') + ' ' +
    currentPerson.education.join(' ') + ' ' +
    currentPerson.company).replace(/\s+/g, " ").replace(/([a-z])([A-Z])/g, '$1 $2');

    var url =
        "http://google.com" +
        "#q=" +
        searchText;
    var tabid;

    chrome.tabs.onUpdated.addListener(tabUpdated);

    function tabUpdated(tabId, info, tab) {

        if (tabId == tabid && info.status == "complete") {
            callTabAction(tabid, "getName", googleResultResponse);
            chrome.tabs.onUpdated.removeListener(tabUpdated);
        }
    }

    function googleResultResponse(name) {
        console.table(name)
        currentPerson.name.last = name;
        chrome.tabs.remove(tabid);
        callback();
    }

    chrome.tabs.create({url: url}, function (tab) {
        tabid = tab.id;
    });
}

function isNameHidden(name) {
    return name.trim().toLowerCase() == "linkedin member"
}

function isNameAbbreviated(name) {
    return name.indexOf('.') != -1
}

module.exports = {
    start: init
}
},{}],4:[function(require,module,exports){
/**
 * Created by matthew on 12/15/14.
 */
/**
 * Created by matthew on 1/21/15.
 */
var settings, results, masterCallback;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    permuteEmails();
}

function permuteEmails() {

    $.each(results.people, function (index, person) {


        var name = person.name;
        try {
            var initial = {
                first: name.first[0],
                last: name.last[0]

            };
        } catch (err) {
            return true;
        }

        results.people[index].possibleEmails = [
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
                return emailAddress + settings.general.emailDomain;
            })
    });
    masterCallback();
}

module.exports = {
    start: init
}


},{}],5:[function(require,module,exports){
/**
 * Created by matthew on 12/13/14.
 */
// results

// scrape status
var running = false;

var scrape_tab = 0;

var settings;
var masterCallback;

var isFinished = false;

var status = {};
var results;


function initialize(settingsArg, resultsArg, callbackArg) {
    //initialization
    running = true;
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    start();
}

function start() {
    function getBatch(callback) {
        async.series([
            create_scrape_tab,
            getProfileLinks,
            callback
        ])
    }

    function finish() {
        chrome.tabs.remove(scrape_tab);
        scrape_tab = false;
        isFinished = true;
        masterCallback();
    }

    // program control
    function controller() {
        getBatch(function () {
            if (status.done) {
                finish();
            }
            else getBatch(controller)
        })
    }

    controller();
}

// creates a tab we'll use for screen scraping
function create_scrape_tab(callback) {
    if (scrape_tab) {
        callback();
        return;
    }

    var url =
        'http://linkedin.com/' +
        'vsearch/' +
        'p?title=' + settings.general.positionFilter +
        '&f_CC=' + settings.general.CompanyIDs +
        '&openAdvancedForm=true&titleScope=C&locationType=I';

    // create the tab
    chrome.tabs.create({url: url}, function (tab) {
        scrape_tab = tab.id;
        chrome.tabs.onUpdated.addListener(waitForTab)
    });

    // after tab creation return control to the calling function
    function waitForTab(tabId, info) {
        if (info.status == "complete" && tabId == scrape_tab) {
            chrome.tabs.onUpdated.removeListener(waitForTab);
            callback();
        }
    }
}
function getProfileLinks(callback) {
    // ask content script for all the profile links on the page
    callTabAction(scrape_tab, 'scrapeProfileList', processLinkBatch);

    function processLinkBatch(response) {
        if (!response) {
            console.error(chrome.runtime.lastError)
        }
        // if response is empty, we have an issue
        if (response.error) {
            console.error("Response for processLinkBatch is:" + response.error);
            return;
        }

        var hasNextPage = response.hasNextPage;
        var limit = settings.scraper.limit;

        // if there are no more pages, we're done!
        if (!hasNextPage) {
            status.done = true;
            callback();
        }

        // at this point we're guaranteed to have a response and a next page. we'll check a few things and keep going
        else if (response.results.length != 0) {

            // concatenate the response to our existing array
            results.people = results.people.concat(response.results);


            if (results.people.length >= limit) {
                status.done = true;
                callback();
            }
            else {

                chrome.tabs.update({url: "http://" + response.nextPage}, function () {
                    function pageChange(tabId, info, tab) {
                        var url = tab.url;

                        if (url != undefined && tabId == scrape_tab && info.status == "complete") {
                            console.log('page done loading');

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
        else {
            console.error('reached else statement in processLinkBatch')
        }
    }
}


// stops module on cancelScrape event
window.addEventListener("cancelScrape", function () {
    stop();
});

// the api for this module
module.exports = {
    start: initialize,
    profileLinks: function () {
        return results.profileLinks
    },
    isFinished: function () {
        return isFinished
    }
};


function log(message) {
    console.log(message)
}


},{}],6:[function(require,module,exports){
/**
 * Created by matthew on 12/15/14.
 */
var validateEmails = (function () {

  var done = false;

  function start(domain) {
    var iteration = 0;
    var domain = domain;
    var gmail_tab = 0;
    var first_run = true;

    function wait_for_gmail(callback) {
      function listen(tabId, changeInfo) {
        if (changeInfo.status == "complete" && tabId == gmail_tab) {
          setTimeout(function (callback) {
            callback()
          }, 1200, callback);
          chrome.tabs.onUpdated.removeListener(listen);
        }
      }

      chrome.tabs.onUpdated.addListener(listen);
    }

    function verify_emails_recursive() {
      var person = people[iteration];
      if (person) {
        var possible_emails = person.possible_emails;

        var i = 0;

        function next_email() {
          var email = possible_emails[i];
          var full_name = person.full_name.toLowerCase().trim();
          if (email) {
            email = email + domain;
            chrome.tabs.update(gmail_tab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, function () {
              if (first_run) {
                wait_for_gmail(ask)
              }
              else {
                setTimeout(function () {
                  ask()
                }, 1200)
              }

              function ask() {
                console.log('gmail ready')
                first_run = false;
                send_to.tab(gmail_tab, 'get_email', function (response) {
                  if (response.correct) {
                    person.email = email;
                    ++iteration;
                    verify_emails_recursive();
                  }
                  else {
                    ++i;
                    next_email();
                  }
                  console.table(people)
                }, {email: email, full_name: full_name})
              }
            });
          }
          else {
            ++iteration;
            person.email = 'not found'
            verify_emails_recursive()
          }
        }

        next_email()
      }
      else {
        done = true;
        setTimeout(function () {
          chrome.tabs.remove(gmail_tab);
        }, 1000)
      }
    }

    chrome.tabs.create({url: "https://google.com"}, function (tab) {
      gmail_tab = tab.id;
      verify_emails_recursive()
    });
  }

  return {
    done: function () {
      return done
    },
    start: start
  }
}

)

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvZ2V0TWlzc2luZ05hbWVzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9wZXJtdXRlRW1haWxzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9zY3JhcGVyLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC92YWxpZGF0ZUVtYWlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzY3JhcGVyID0gcmVxdWlyZSgnLi9zY3JhcGVyLmpzJyk7XG52YXIgZ2V0QmFzaWNJbmZvID0gcmVxdWlyZSgnLi9nZXRCYXNpY0luZm8uanMnKTtcbnZhciBnZXRNaXNzaW5nTmFtZXMgPSByZXF1aXJlKCcuL2dldE1pc3NpbmdOYW1lcy5qcycpO1xudmFyIHBlcm11dGVFbWFpbHMgPSByZXF1aXJlKCcuL3Blcm11dGVFbWFpbHMuanMnKTtcbnZhciB2YWxpZGF0ZUVtYWlscyA9IHJlcXVpcmUoJy4vdmFsaWRhdGVFbWFpbHMuanMnKTtcblxud2luZG93LnJlc3VsdHMgPSB7XG4gICAgcGVvcGxlOiBbXVxufTtcblxud2luZG93LnJlc3VsdHMgPSB7XCJwZW9wbGVcIjpbe1wibmFtZVwiOntcImZ1bGxcIjpcIkpvaG4gV2FsbGFjZVwiLFwiZmlyc3RcIjpcIkpvaG5cIixcImxhc3RcIjpcIldhbGxhY2VcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNDU3MjEwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTE0NTcyMTAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgU1cgRW5naW5lZXJpbmcgUmVjcnVpdGVyIGF0IEFwcGxlICAgICAgICBpT1MgQXBwcyAmIEZyYW1ld29ya3NcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW50ZXJuZXRcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJZYWhvbyEgSW5jLlwiLFwiU29ueSBDb21wdXRlciBFbnRlcnRhaW5tZW50XCIsXCJPTkkgU3lzdGVtcyBJbmMuIHB1cmNoYXNlZCBieSBDaWVuYSBDb3JwLiBpbiAyMDAzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiTWVubG8gQ29sbGVnZVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiSm9obldhbGxhY2VAYXBwbGUuY29tXCIsXCJKb2huLldhbGxhY2VAYXBwbGUuY29tXCIsXCJKV2FsbGFjZUBhcHBsZS5jb21cIixcIkouV2FsbGFjZUBhcHBsZS5jb21cIixcIldhbGxhY2VKb2huQGFwcGxlLmNvbVwiLFwiV2FsbGFjZS5Kb2huQGFwcGxlLmNvbVwiLFwiSm9obkBhcHBsZS5jb21cIixcIldhbGxhY2VAYXBwbGUuY29tXCIsXCJKV0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJKYWNvYiBDb253YXlcIixcImZpcnN0XCI6XCJKYWNvYlwiLFwibGFzdFwiOlwiQ29ud2F5XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTY0NDMzMCZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZeKApmhJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0ExNjQ0MzMwJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVjaG5pY2FsIFNvdXJjaW5nIFJlY3J1aXRlciAtIFdpcmVsZXNzIFNvZnR3YXJlIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBTYW4gRGllZ28gQXJlYVwiLFwiaW5kdXN0cnlcIjpcIlN0YWZmaW5nIGFuZCBSZWNydWl0aW5nXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJOb3ZhdGVsIFdpcmVsZXNzXCIsXCJUYWxlbnRXYXIubmV0LCBJbmMuXCIsXCJOZXR3b3JrZWQgUmVjcnVpdGVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiQXVndXN0YW5hIENvbGxlZ2UgKFNEKVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiSmFjb2JDb253YXlAYXBwbGUuY29tXCIsXCJKYWNvYi5Db253YXlAYXBwbGUuY29tXCIsXCJKQ29ud2F5QGFwcGxlLmNvbVwiLFwiSi5Db253YXlAYXBwbGUuY29tXCIsXCJDb253YXlKYWNvYkBhcHBsZS5jb21cIixcIkNvbndheS5KYWNvYkBhcHBsZS5jb21cIixcIkphY29iQGFwcGxlLmNvbVwiLFwiQ29ud2F5QGFwcGxlLmNvbVwiLFwiSkNAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQmlsbCBEdWRuZXlcIixcImZpcnN0XCI6XCJCaWxsXCIsXCJsYXN0XCI6XCJEdWRuZXlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD00ODAyODQmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXV04oCmY2hJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0E0ODAyODQlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJXcml0ZXIgb2YgQ29kZSBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVHYWxhIEZhY3RvcnkgU29mdHdhcmUgTExDUHJhZ21hdGljIFByb2dyYW1tZXJzXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXBwbGUgSW5jLlwiLFwiRHVkbmV5Lk5ldFwiLFwiVmlydHVhcyBTb2x1dGlvbnNcIl0sXCJlZHVjYXRpb25cIjpbXCJUZXhhcyBBJk0gVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiQmlsbER1ZG5leUBhcHBsZS5jb21cIixcIkJpbGwuRHVkbmV5QGFwcGxlLmNvbVwiLFwiQkR1ZG5leUBhcHBsZS5jb21cIixcIkIuRHVkbmV5QGFwcGxlLmNvbVwiLFwiRHVkbmV5QmlsbEBhcHBsZS5jb21cIixcIkR1ZG5leS5CaWxsQGFwcGxlLmNvbVwiLFwiQmlsbEBhcHBsZS5jb21cIixcIkR1ZG5leUBhcHBsZS5jb21cIixcIkJEQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkNvcmV5IENhcnNvblwiLFwiZmlyc3RcIjpcIkNvcmV5XCIsXCJsYXN0XCI6XCJDYXJzb25cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD05ODE2MzczJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTk4MTYzNzMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTeXN0ZW1zIEVuZ2luZWVyXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBEZW52ZXIgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkhvbGNvbWIncyBFZHVjYXRpb24gUmVzb3VyY2VcIixcIk1haXplIFVTRCAyNjZcIl0sXCJlZHVjYXRpb25cIjpbXCJQaXR0c2J1cmcgU3RhdGUgVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiQ29yZXlDYXJzb25AYXBwbGUuY29tXCIsXCJDb3JleS5DYXJzb25AYXBwbGUuY29tXCIsXCJDQ2Fyc29uQGFwcGxlLmNvbVwiLFwiQy5DYXJzb25AYXBwbGUuY29tXCIsXCJDYXJzb25Db3JleUBhcHBsZS5jb21cIixcIkNhcnNvbi5Db3JleUBhcHBsZS5jb21cIixcIkNvcmV5QGFwcGxlLmNvbVwiLFwiQ2Fyc29uQGFwcGxlLmNvbVwiLFwiQ0NAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiU2FtYW50aGEgS2lzaFwiLFwiZmlyc3RcIjpcIlNhbWFudGhhXCIsXCJsYXN0XCI6XCJLaXNoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTAyNTQ5NjYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTEwMjU0OTY2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiR2xvYmFsIFN1cHBseSBNYW5hZ2VyIC0gQ2hhbm5lbCBQcm9jdXJlbWVudCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb25zdW1lciBFbGVjdHJvbmljc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXBwbGVcIixcIkpvaG5zIE1hbnZpbGxlXCIsXCJIb25leXdlbGxcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IERlbnZlclwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiU2FtYW50aGFLaXNoQGFwcGxlLmNvbVwiLFwiU2FtYW50aGEuS2lzaEBhcHBsZS5jb21cIixcIlNLaXNoQGFwcGxlLmNvbVwiLFwiUy5LaXNoQGFwcGxlLmNvbVwiLFwiS2lzaFNhbWFudGhhQGFwcGxlLmNvbVwiLFwiS2lzaC5TYW1hbnRoYUBhcHBsZS5jb21cIixcIlNhbWFudGhhQGFwcGxlLmNvbVwiLFwiS2lzaEBhcHBsZS5jb21cIixcIlNLQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkRpbWl0cmkgR2VpZXJcIixcImZpcnN0XCI6XCJEaW1pdHJpXCIsXCJsYXN0XCI6XCJHZWllclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEyMDYzMjk2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0ExMjA2MzI5NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkRpbWl0cmkgR2VpZXIgaXMgYSBTZW5pb3IgU29mdHdhcmUgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiVGVsZWNvbW11bmljYXRpb25zXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk1vdG9yb2xhXCIsXCJOZXh0aXZlIFNvbHV0aW9uc1wiLFwiV2FybmVyIE11c2ljIEdyb3VwXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0w6R0IHp1IEvDtmxuXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJEaW1pdHJpR2VpZXJAYXBwbGUuY29tXCIsXCJEaW1pdHJpLkdlaWVyQGFwcGxlLmNvbVwiLFwiREdlaWVyQGFwcGxlLmNvbVwiLFwiRC5HZWllckBhcHBsZS5jb21cIixcIkdlaWVyRGltaXRyaUBhcHBsZS5jb21cIixcIkdlaWVyLkRpbWl0cmlAYXBwbGUuY29tXCIsXCJEaW1pdHJpQGFwcGxlLmNvbVwiLFwiR2VpZXJAYXBwbGUuY29tXCIsXCJER0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXR0aGV3IEdhZGRpc1wiLFwiZmlyc3RcIjpcIk1hdHRoZXdcIixcImxhc3RcIjpcIkdhZGRpc1wifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEyMjEzOTUzJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0ExMjIxMzk1MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlVJIEVuZ2luZWVyaW5nIE1hbmFnZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW50ZXJuZXRcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiU2NvdXQgTGFic1wiLFwiUGxheUNvZWRcIixcIlNlbGZcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIk1hdHRoZXdHYWRkaXNAYXBwbGUuY29tXCIsXCJNYXR0aGV3LkdhZGRpc0BhcHBsZS5jb21cIixcIk1HYWRkaXNAYXBwbGUuY29tXCIsXCJNLkdhZGRpc0BhcHBsZS5jb21cIixcIkdhZGRpc01hdHRoZXdAYXBwbGUuY29tXCIsXCJHYWRkaXMuTWF0dGhld0BhcHBsZS5jb21cIixcIk1hdHRoZXdAYXBwbGUuY29tXCIsXCJHYWRkaXNAYXBwbGUuY29tXCIsXCJNR0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJUcmkgVnVvbmdcIixcImZpcnN0XCI6XCJUcmlcIixcImxhc3RcIjpcIlZ1b25nXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTQwNjgyODImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTE0MDY4MjgyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29mdHdhcmUgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlR3aXR0ZXJcIixcIllQXCIsXCJCZXR0ZXIgVGhlIFdvcmxkXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBUb3JvbnRvXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJUcmlWdW9uZ0BhcHBsZS5jb21cIixcIlRyaS5WdW9uZ0BhcHBsZS5jb21cIixcIlRWdW9uZ0BhcHBsZS5jb21cIixcIlQuVnVvbmdAYXBwbGUuY29tXCIsXCJWdW9uZ1RyaUBhcHBsZS5jb21cIixcIlZ1b25nLlRyaUBhcHBsZS5jb21cIixcIlRyaUBhcHBsZS5jb21cIixcIlZ1b25nQGFwcGxlLmNvbVwiLFwiVFZAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS3NoaXRpaiBEZXNocGFuZGVcIixcImZpcnN0XCI6XCJLc2hpdGlqXCIsXCJsYXN0XCI6XCJEZXNocGFuZGVcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xOTI5MjEyOCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTkyOTIxMjglMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTci4gaU9TIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHcmFjZW5vdGUgKEEgU29ueSBDb21wYW55KVwiLFwiSW5kZXBlbmRlbnQgaU9TIERldmVsb3BlclwiLFwiVGVsZXN0cmVhbVwiXSxcImVkdWNhdGlvblwiOltcIldyaWdodCBTdGF0ZSBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJLc2hpdGlqRGVzaHBhbmRlQGFwcGxlLmNvbVwiLFwiS3NoaXRpai5EZXNocGFuZGVAYXBwbGUuY29tXCIsXCJLRGVzaHBhbmRlQGFwcGxlLmNvbVwiLFwiSy5EZXNocGFuZGVAYXBwbGUuY29tXCIsXCJEZXNocGFuZGVLc2hpdGlqQGFwcGxlLmNvbVwiLFwiRGVzaHBhbmRlLktzaGl0aWpAYXBwbGUuY29tXCIsXCJLc2hpdGlqQGFwcGxlLmNvbVwiLFwiRGVzaHBhbmRlQGFwcGxlLmNvbVwiLFwiS0RAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiUGF1bCBTdHVhcnRcIixcImZpcnN0XCI6XCJQYXVsXCIsXCJsYXN0XCI6XCJTdHVhcnRcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yMDU0NjE3MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMjA1NDYxNzIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJUU0UvRXNjYWxhdGlvbnN8dkNsb3VkU3VpdGV8dlNoaWVsZHxJbmZyYXN0cnVjdHVyZXxOZXR3b3JrfEZhdWx0fFN0b3JhZ2UgYXQgVk13YXJlXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBEZW52ZXIgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJWTXdhcmVUaW1lIFdhcm5lciBDYWJsZUFwcGxlIFJldGFpbFwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlZNd2FyZVwiLFwiSUJNIEdsb2JhbCBTZXJ2aWNlc1wiXSxcImVkdWNhdGlvblwiOltcIlBhcmsgVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiUGF1bFN0dWFydEBhcHBsZS5jb21cIixcIlBhdWwuU3R1YXJ0QGFwcGxlLmNvbVwiLFwiUFN0dWFydEBhcHBsZS5jb21cIixcIlAuU3R1YXJ0QGFwcGxlLmNvbVwiLFwiU3R1YXJ0UGF1bEBhcHBsZS5jb21cIixcIlN0dWFydC5QYXVsQGFwcGxlLmNvbVwiLFwiUGF1bEBhcHBsZS5jb21cIixcIlN0dWFydEBhcHBsZS5jb21cIixcIlBTQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkF6aGFyIFNpa2FuZGVyXCIsXCJmaXJzdFwiOlwiQXpoYXJcIixcImxhc3RcIjpcIlNpa2FuZGVyXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjEwMzIwOTAmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTIxMDMyMDkwJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29mdHdhcmUgRW5naW5lZXIgaW4gVGVzdCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQmVudGxleSBTeXN0ZW1zXCIsXCJRd2VzdCBDb21tdW5pY2F0aW9uc1wiLFwiTlNJREMsIFVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gYXQgQm91bGRlclwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiQXpoYXJTaWthbmRlckBhcHBsZS5jb21cIixcIkF6aGFyLlNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiQVNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiQS5TaWthbmRlckBhcHBsZS5jb21cIixcIlNpa2FuZGVyQXpoYXJAYXBwbGUuY29tXCIsXCJTaWthbmRlci5BemhhckBhcHBsZS5jb21cIixcIkF6aGFyQGFwcGxlLmNvbVwiLFwiU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJBU0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJSYW5qaXQgTWVub25cIixcImZpcnN0XCI6XCJSYW5qaXRcIixcImxhc3RcIjpcIk1lbm9uXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MjQzMzE2ODYmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva+KApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTI0MzMxNjg2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU2VuaW9yIFJlc2VhcmNoIFNjaWVudGlzdCwgQXBwbGUgTWFwc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJQYWNpZmljIEdhcyBhbmQgRWxlY3RyaWMgQ29tcGFueVwiLFwiU2NobmVpZGVyIEVsZWN0cmljXCIsXCJUZWx2ZW50IE1pbmVyICYgTWluZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJJbmRpYW4gSW5zdGl0dXRlIG9mIFRlY2hub2xvZ3ksIE1hZHJhc1wiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiUmFuaml0TWVub25AYXBwbGUuY29tXCIsXCJSYW5qaXQuTWVub25AYXBwbGUuY29tXCIsXCJSTWVub25AYXBwbGUuY29tXCIsXCJSLk1lbm9uQGFwcGxlLmNvbVwiLFwiTWVub25SYW5qaXRAYXBwbGUuY29tXCIsXCJNZW5vbi5SYW5qaXRAYXBwbGUuY29tXCIsXCJSYW5qaXRAYXBwbGUuY29tXCIsXCJNZW5vbkBhcHBsZS5jb21cIixcIlJNQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkxpYW5nIFdlaVwiLFwiZmlyc3RcIjpcIkxpYW5nXCIsXCJsYXN0XCI6XCJXZWlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zMDEwMzU2MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMzAxMDM1NjElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgRGF0YSBTY2llbnRpc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNoZWdnIEluYy5cIixcIkFtYXpvbi5jb21cIixcIkx1Y2lkIENvbW1lcmNlIChBY3F1aXJlZCBieSBBT0wgaW4gMjAxNClcIl0sXCJlZHVjYXRpb25cIjpbXCJUaGUgQ29sbGVnZSBvZiBXaWxsaWFtIGFuZCBNYXJ5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJMaWFuZ1dlaUBhcHBsZS5jb21cIixcIkxpYW5nLldlaUBhcHBsZS5jb21cIixcIkxXZWlAYXBwbGUuY29tXCIsXCJMLldlaUBhcHBsZS5jb21cIixcIldlaUxpYW5nQGFwcGxlLmNvbVwiLFwiV2VpLkxpYW5nQGFwcGxlLmNvbVwiLFwiTGlhbmdAYXBwbGUuY29tXCIsXCJXZWlAYXBwbGUuY29tXCIsXCJMV0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJLcmlzdGluYSBHdWxpc2hcIixcImZpcnN0XCI6XCJLcmlzdGluYVwiLFwibGFzdFwiOlwiR3VsaXNoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MzU2NjMzNTQmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTM1NjYzMzU0JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3RyYXRlZ2ljIFNvdXJjaW5nIE1hbmFnZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJVbml0ZWQgU3RhdGVzXCIsXCJpbmR1c3RyeVwiOlwiQ29uc3VtZXIgRWxlY3Ryb25pY3NcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiSm9obnMgTWFudmlsbGVcIixcIktvaGxlciBDby5cIixcIkJvcmdXYXJuZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IERlbnZlclwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiS3Jpc3RpbmFHdWxpc2hAYXBwbGUuY29tXCIsXCJLcmlzdGluYS5HdWxpc2hAYXBwbGUuY29tXCIsXCJLR3VsaXNoQGFwcGxlLmNvbVwiLFwiSy5HdWxpc2hAYXBwbGUuY29tXCIsXCJHdWxpc2hLcmlzdGluYUBhcHBsZS5jb21cIixcIkd1bGlzaC5LcmlzdGluYUBhcHBsZS5jb21cIixcIktyaXN0aW5hQGFwcGxlLmNvbVwiLFwiR3VsaXNoQGFwcGxlLmNvbVwiLFwiS0dAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiU29uaWEgU2FpbmlcIixcImZpcnN0XCI6XCJTb25pYVwiLFwibGFzdFwiOlwiU2FpbmlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zODQ3NzIyNiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMzg0NzcyMjYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTci4gUUEgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlRpbWUgV2FybmVyIENhYmxlXCIsXCJDb21jYXN0XCIsXCJHcmVid2ViXCJdLFwiZWR1Y2F0aW9uXCI6W1wiUHVuamFiIFRlY2huaWNhbCBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJTb25pYVNhaW5pQGFwcGxlLmNvbVwiLFwiU29uaWEuU2FpbmlAYXBwbGUuY29tXCIsXCJTU2FpbmlAYXBwbGUuY29tXCIsXCJTLlNhaW5pQGFwcGxlLmNvbVwiLFwiU2FpbmlTb25pYUBhcHBsZS5jb21cIixcIlNhaW5pLlNvbmlhQGFwcGxlLmNvbVwiLFwiU29uaWFAYXBwbGUuY29tXCIsXCJTYWluaUBhcHBsZS5jb21cIixcIlNTQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1pY2hhZWwgVHVybmVyXCIsXCJmaXJzdFwiOlwiTWljaGFlbFwiLFwibGFzdFwiOlwiVHVybmVyXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NDIzNjExOTEmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTQyMzYxMTkxJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiaU9TICYgT1MgWCBTb2Z0d2FyZSBFbmdpbmVlclwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJXYXlJblwiLFwiVHJvcHB1cyBTb2Z0d2FyZSBDb3Jwb3JhdGlvblwiLFwiTmF0aW9uYWwgQW5hbHl0aWNzLCBJbmMuXCJdLFwiZWR1Y2F0aW9uXCI6W1wiQ29sb3JhZG8gU3RhdGUgVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiTWljaGFlbFR1cm5lckBhcHBsZS5jb21cIixcIk1pY2hhZWwuVHVybmVyQGFwcGxlLmNvbVwiLFwiTVR1cm5lckBhcHBsZS5jb21cIixcIk0uVHVybmVyQGFwcGxlLmNvbVwiLFwiVHVybmVyTWljaGFlbEBhcHBsZS5jb21cIixcIlR1cm5lci5NaWNoYWVsQGFwcGxlLmNvbVwiLFwiTWljaGFlbEBhcHBsZS5jb21cIixcIlR1cm5lckBhcHBsZS5jb21cIixcIk1UQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkdlb3JnZSBLYWxhbmdpXCIsXCJmaXJzdFwiOlwiR2VvcmdlXCIsXCJsYXN0XCI6XCJLYWxhbmdpXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NTI5MDgwNTMmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTUyOTA4MDUzJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29mdHdhcmUgRW5naW5lZXIgVUkgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlSW5mb3N5c1wiLFwicGFzdFBvc2l0aW9uc1wiOltcIlVuaXZlcnNpdHkgb2YgTG91aXNpYW5hIGF0IExhZmF5ZXR0ZVwiLFwiSENMIFRlY2hub2xvZ2llc1wiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgTG91aXNpYW5hIGF0IExhZmF5ZXR0ZVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiR2VvcmdlS2FsYW5naUBhcHBsZS5jb21cIixcIkdlb3JnZS5LYWxhbmdpQGFwcGxlLmNvbVwiLFwiR0thbGFuZ2lAYXBwbGUuY29tXCIsXCJHLkthbGFuZ2lAYXBwbGUuY29tXCIsXCJLYWxhbmdpR2VvcmdlQGFwcGxlLmNvbVwiLFwiS2FsYW5naS5HZW9yZ2VAYXBwbGUuY29tXCIsXCJHZW9yZ2VAYXBwbGUuY29tXCIsXCJLYWxhbmdpQGFwcGxlLmNvbVwiLFwiR0tAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWFyayBHb3VsZHNtaXRoXCIsXCJmaXJzdFwiOlwiTWFya1wiLFwibGFzdFwiOlwiR291bGRzbWl0aFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTY0NzYxMjI1JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E2NDc2MTIyNSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlRlY2hub2xvZ3kgKyBNZWRpYSBQcm9kdWN0aW9uXCIsXCJsb2NhdGlvblwiOlwiQXVzdGluLCBUZXhhcyBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiT25saW5lIE1lZGlhXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZWxlc2ZpcmUuY29tXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQXBwbGVcIixcIkhhcnRlLUhhbmtzLCBJbmMuXCIsXCJQZWFrIFBlcmZvcm1lcnNcIl0sXCJlZHVjYXRpb25cIjpbXCJOZXcgTWV4aWNvIFN0YXRlIFVuaXZlcnNpdHlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIk1hcmtHb3VsZHNtaXRoQGFwcGxlLmNvbVwiLFwiTWFyay5Hb3VsZHNtaXRoQGFwcGxlLmNvbVwiLFwiTUdvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNLkdvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJHb3VsZHNtaXRoTWFya0BhcHBsZS5jb21cIixcIkdvdWxkc21pdGguTWFya0BhcHBsZS5jb21cIixcIk1hcmtAYXBwbGUuY29tXCIsXCJHb3VsZHNtaXRoQGFwcGxlLmNvbVwiLFwiTUdAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiVHJldm9yIFNoZXJpZGFuXCIsXCJmaXJzdFwiOlwiVHJldm9yXCIsXCJsYXN0XCI6XCJTaGVyaWRhblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTcyMTE4NjQyJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E3MjExODY0MiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcImlPUyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiR3JvdXBvblwiLFwiVHJldm9yIEluY1wiLFwiU3VyZWlmeS5jb21cIl0sXCJlZHVjYXRpb25cIjpbXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiVHJldm9yU2hlcmlkYW5AYXBwbGUuY29tXCIsXCJUcmV2b3IuU2hlcmlkYW5AYXBwbGUuY29tXCIsXCJUU2hlcmlkYW5AYXBwbGUuY29tXCIsXCJULlNoZXJpZGFuQGFwcGxlLmNvbVwiLFwiU2hlcmlkYW5UcmV2b3JAYXBwbGUuY29tXCIsXCJTaGVyaWRhbi5UcmV2b3JAYXBwbGUuY29tXCIsXCJUcmV2b3JAYXBwbGUuY29tXCIsXCJTaGVyaWRhbkBhcHBsZS5jb21cIixcIlRTQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1hcnZpbiBEZWxhIENydXpcIixcImZpcnN0XCI6XCJNYXJ2aW5cIixcImxhc3RcIjpcIkRlbGFcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD04MjA2MTM5NyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBODIwNjEzOTclMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJFbnRlcnByaXNlIFNlcnZpY2VzIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FjcmFtZW50bywgQ2FsaWZvcm5pYSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiRGVwdCBvZiBSZWFsIEVzdGF0ZVwiLFwiQ2FsaWZvcm5pYSBTZWNyZXRhcnkgb2YgU3RhdGVcIixcIkVjbGlwc2UvSW50ZXJsb2NTb2x1dGlvbnNcIl0sXCJlZHVjYXRpb25cIjpbXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiTWFydmluRGVsYUBhcHBsZS5jb21cIixcIk1hcnZpbi5EZWxhQGFwcGxlLmNvbVwiLFwiTURlbGFAYXBwbGUuY29tXCIsXCJNLkRlbGFAYXBwbGUuY29tXCIsXCJEZWxhTWFydmluQGFwcGxlLmNvbVwiLFwiRGVsYS5NYXJ2aW5AYXBwbGUuY29tXCIsXCJNYXJ2aW5AYXBwbGUuY29tXCIsXCJEZWxhQGFwcGxlLmNvbVwiLFwiTURAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQXpoYXIgU2lrYW5kZXJcIixcImZpcnN0XCI6XCJBemhhclwiLFwibGFzdFwiOlwiU2lrYW5kZXJcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yMTAzMjA5MCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMjEwMzIwOTAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTb2Z0d2FyZSBFbmdpbmVlciBpbiBUZXN0IGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJCZW50bGV5IFN5c3RlbXNcIixcIlF3ZXN0IENvbW11bmljYXRpb25zXCIsXCJOU0lEQywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBhdCBCb3VsZGVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJBemhhclNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiQXpoYXIuU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJBU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJBLlNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiU2lrYW5kZXJBemhhckBhcHBsZS5jb21cIixcIlNpa2FuZGVyLkF6aGFyQGFwcGxlLmNvbVwiLFwiQXpoYXJAYXBwbGUuY29tXCIsXCJTaWthbmRlckBhcHBsZS5jb21cIixcIkFTQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlJhbmppdCBNZW5vblwiLFwiZmlyc3RcIjpcIlJhbmppdFwiLFwibGFzdFwiOlwiTWVub25cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yNDMzMTY4NiZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9r4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMjQzMzE2ODYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgUmVzZWFyY2ggU2NpZW50aXN0LCBBcHBsZSBNYXBzXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlBhY2lmaWMgR2FzIGFuZCBFbGVjdHJpYyBDb21wYW55XCIsXCJTY2huZWlkZXIgRWxlY3RyaWNcIixcIlRlbHZlbnQgTWluZXIgJiBNaW5lclwiXSxcImVkdWNhdGlvblwiOltcIkluZGlhbiBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neSwgTWFkcmFzXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJSYW5qaXRNZW5vbkBhcHBsZS5jb21cIixcIlJhbmppdC5NZW5vbkBhcHBsZS5jb21cIixcIlJNZW5vbkBhcHBsZS5jb21cIixcIlIuTWVub25AYXBwbGUuY29tXCIsXCJNZW5vblJhbmppdEBhcHBsZS5jb21cIixcIk1lbm9uLlJhbmppdEBhcHBsZS5jb21cIixcIlJhbmppdEBhcHBsZS5jb21cIixcIk1lbm9uQGFwcGxlLmNvbVwiLFwiUk1AYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTGlhbmcgV2VpXCIsXCJmaXJzdFwiOlwiTGlhbmdcIixcImxhc3RcIjpcIldlaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTMwMTAzNTYxJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzMDEwMzU2MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBEYXRhIFNjaWVudGlzdCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQ2hlZ2cgSW5jLlwiLFwiQW1hem9uLmNvbVwiLFwiTHVjaWQgQ29tbWVyY2UgKEFjcXVpcmVkIGJ5IEFPTCBpbiAyMDE0KVwiXSxcImVkdWNhdGlvblwiOltcIlRoZSBDb2xsZWdlIG9mIFdpbGxpYW0gYW5kIE1hcnlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIkxpYW5nV2VpQGFwcGxlLmNvbVwiLFwiTGlhbmcuV2VpQGFwcGxlLmNvbVwiLFwiTFdlaUBhcHBsZS5jb21cIixcIkwuV2VpQGFwcGxlLmNvbVwiLFwiV2VpTGlhbmdAYXBwbGUuY29tXCIsXCJXZWkuTGlhbmdAYXBwbGUuY29tXCIsXCJMaWFuZ0BhcHBsZS5jb21cIixcIldlaUBhcHBsZS5jb21cIixcIkxXQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIktyaXN0aW5hIEd1bGlzaFwiLFwiZmlyc3RcIjpcIktyaXN0aW5hXCIsXCJsYXN0XCI6XCJHdWxpc2hcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zNTY2MzM1NCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMzU2NjMzNTQlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTdHJhdGVnaWMgU291cmNpbmcgTWFuYWdlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlVuaXRlZCBTdGF0ZXNcIixcImluZHVzdHJ5XCI6XCJDb25zdW1lciBFbGVjdHJvbmljc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJKb2hucyBNYW52aWxsZVwiLFwiS29obGVyIENvLlwiLFwiQm9yZ1dhcm5lclwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gYXQgRGVudmVyXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJLcmlzdGluYUd1bGlzaEBhcHBsZS5jb21cIixcIktyaXN0aW5hLkd1bGlzaEBhcHBsZS5jb21cIixcIktHdWxpc2hAYXBwbGUuY29tXCIsXCJLLkd1bGlzaEBhcHBsZS5jb21cIixcIkd1bGlzaEtyaXN0aW5hQGFwcGxlLmNvbVwiLFwiR3VsaXNoLktyaXN0aW5hQGFwcGxlLmNvbVwiLFwiS3Jpc3RpbmFAYXBwbGUuY29tXCIsXCJHdWxpc2hAYXBwbGUuY29tXCIsXCJLR0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTb25pYSBTYWluaVwiLFwiZmlyc3RcIjpcIlNvbmlhXCIsXCJsYXN0XCI6XCJTYWluaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4NDc3MjI2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzODQ3NzIyNiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBRQSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVGltZSBXYXJuZXIgQ2FibGVcIixcIkNvbWNhc3RcIixcIkdyZWJ3ZWJcIl0sXCJlZHVjYXRpb25cIjpbXCJQdW5qYWIgVGVjaG5pY2FsIFVuaXZlcnNpdHlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIlNvbmlhU2FpbmlAYXBwbGUuY29tXCIsXCJTb25pYS5TYWluaUBhcHBsZS5jb21cIixcIlNTYWluaUBhcHBsZS5jb21cIixcIlMuU2FpbmlAYXBwbGUuY29tXCIsXCJTYWluaVNvbmlhQGFwcGxlLmNvbVwiLFwiU2FpbmkuU29uaWFAYXBwbGUuY29tXCIsXCJTb25pYUBhcHBsZS5jb21cIixcIlNhaW5pQGFwcGxlLmNvbVwiLFwiU1NAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWljaGFlbCBUdXJuZXJcIixcImZpcnN0XCI6XCJNaWNoYWVsXCIsXCJsYXN0XCI6XCJUdXJuZXJcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD00MjM2MTE5MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNDIzNjExOTElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgJiBPUyBYIFNvZnR3YXJlIEVuZ2luZWVyXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIldheUluXCIsXCJUcm9wcHVzIFNvZnR3YXJlIENvcnBvcmF0aW9uXCIsXCJOYXRpb25hbCBBbmFseXRpY3MsIEluYy5cIl0sXCJlZHVjYXRpb25cIjpbXCJDb2xvcmFkbyBTdGF0ZSBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJNaWNoYWVsVHVybmVyQGFwcGxlLmNvbVwiLFwiTWljaGFlbC5UdXJuZXJAYXBwbGUuY29tXCIsXCJNVHVybmVyQGFwcGxlLmNvbVwiLFwiTS5UdXJuZXJAYXBwbGUuY29tXCIsXCJUdXJuZXJNaWNoYWVsQGFwcGxlLmNvbVwiLFwiVHVybmVyLk1pY2hhZWxAYXBwbGUuY29tXCIsXCJNaWNoYWVsQGFwcGxlLmNvbVwiLFwiVHVybmVyQGFwcGxlLmNvbVwiLFwiTVRAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiR2VvcmdlIEthbGFuZ2lcIixcImZpcnN0XCI6XCJHZW9yZ2VcIixcImxhc3RcIjpcIkthbGFuZ2lcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD01MjkwODA1MyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNTI5MDgwNTMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTb2Z0d2FyZSBFbmdpbmVlciBVSSBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVJbmZvc3lzXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVW5pdmVyc2l0eSBvZiBMb3Vpc2lhbmEgYXQgTGFmYXlldHRlXCIsXCJIQ0wgVGVjaG5vbG9naWVzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBMb3Vpc2lhbmEgYXQgTGFmYXlldHRlXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJHZW9yZ2VLYWxhbmdpQGFwcGxlLmNvbVwiLFwiR2VvcmdlLkthbGFuZ2lAYXBwbGUuY29tXCIsXCJHS2FsYW5naUBhcHBsZS5jb21cIixcIkcuS2FsYW5naUBhcHBsZS5jb21cIixcIkthbGFuZ2lHZW9yZ2VAYXBwbGUuY29tXCIsXCJLYWxhbmdpLkdlb3JnZUBhcHBsZS5jb21cIixcIkdlb3JnZUBhcHBsZS5jb21cIixcIkthbGFuZ2lAYXBwbGUuY29tXCIsXCJHS0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJrIEdvdWxkc21pdGhcIixcImZpcnN0XCI6XCJNYXJrXCIsXCJsYXN0XCI6XCJHb3VsZHNtaXRoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NjQ3NjEyMjUmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTY0NzYxMjI1JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVjaG5vbG9neSArIE1lZGlhIFByb2R1Y3Rpb25cIixcImxvY2F0aW9uXCI6XCJBdXN0aW4sIFRleGFzIEFyZWFcIixcImluZHVzdHJ5XCI6XCJPbmxpbmUgTWVkaWFcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlbGVzZmlyZS5jb21cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiSGFydGUtSGFua3MsIEluYy5cIixcIlBlYWsgUGVyZm9ybWVyc1wiXSxcImVkdWNhdGlvblwiOltcIk5ldyBNZXhpY28gU3RhdGUgVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiTWFya0dvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNYXJrLkdvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNR291bGRzbWl0aEBhcHBsZS5jb21cIixcIk0uR291bGRzbWl0aEBhcHBsZS5jb21cIixcIkdvdWxkc21pdGhNYXJrQGFwcGxlLmNvbVwiLFwiR291bGRzbWl0aC5NYXJrQGFwcGxlLmNvbVwiLFwiTWFya0BhcHBsZS5jb21cIixcIkdvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNR0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJUcmV2b3IgU2hlcmlkYW5cIixcImZpcnN0XCI6XCJUcmV2b3JcIixcImxhc3RcIjpcIlNoZXJpZGFuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NzIxMTg2NDImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTcyMTE4NjQyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiaU9TIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHcm91cG9uXCIsXCJUcmV2b3IgSW5jXCIsXCJTdXJlaWZ5LmNvbVwiXSxcImVkdWNhdGlvblwiOltdLFwicG9zc2libGVFbWFpbHNcIjpbXCJUcmV2b3JTaGVyaWRhbkBhcHBsZS5jb21cIixcIlRyZXZvci5TaGVyaWRhbkBhcHBsZS5jb21cIixcIlRTaGVyaWRhbkBhcHBsZS5jb21cIixcIlQuU2hlcmlkYW5AYXBwbGUuY29tXCIsXCJTaGVyaWRhblRyZXZvckBhcHBsZS5jb21cIixcIlNoZXJpZGFuLlRyZXZvckBhcHBsZS5jb21cIixcIlRyZXZvckBhcHBsZS5jb21cIixcIlNoZXJpZGFuQGFwcGxlLmNvbVwiLFwiVFNAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWFydmluIERlbGEgQ3J1elwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTgyMDYxMzk3JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E4MjA2MTM5NyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkVudGVycHJpc2UgU2VydmljZXMgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYWNyYW1lbnRvLCBDYWxpZm9ybmlhIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwifV19XG5cblxud2luZG93LmNhbGxUYWJBY3Rpb24gPSBmdW5jdGlvbiAodGFiSWQsIGFjdGlvbiwgY2FsbGJhY2ssIGFyZ3MpIHtcbiAgICB2YXIgbWVzc2FnZSA9IHt0bzogJ2NvbnRlbnQnLCBhY3Rpb246IGFjdGlvbn07XG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIG1lc3NhZ2UsIGNhbGxiYWNrKVxufTtcblxud2luZG93LmdvID0gZnVuY3Rpb24gKHNldHRpbmdzKSB7XG5cbiAgICAvLyBmb3IgZGVidWdnaW5nXG4gICAgc2V0dGluZ3Muc2NyYXBlci5saW1pdCA9IDIwO1xuXG4gICAgdmFyIHJvdXRpbmUgPSBbXG4gICAgICAgIC8vc2NyYXBlci5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpLFxuICAgICAgICAvL2dldEJhc2ljSW5mby5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpLFxuICAgICAgICAvL2dldE1pc3NpbmdOYW1lcy5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpLFxuICAgICAgICAvL3Blcm11dGVFbWFpbHMuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKVxuICAgICAgICB2YWxpZGF0ZUVtYWlscy5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpXG4gICAgXTtcbiAgICByb3V0aW5lLnB1c2goZG9uZSk7XG5cbiAgICBhc3luYy5zZXJpZXMocm91dGluZSk7XG59O1xuXG5mdW5jdGlvbiBkb25lKCkge1xuICAgIGNvbnNvbGUudGFibGUocmVzdWx0cylcbn1cblxuLy92YXIgcGVybXV0ZXIgPSByZXF1aXJlKCcuL3Blcm11dGVFbWFpbHMuanMnKTtcbi8vdmFyIGZpbmRfbGFzdF9uYW1lcyA9IHJlcXVpcmUoJy4vbGFzdF9uYW1lcy5qcycpO1xuLy92YXIgZW1haWxfdmVyaWZpZXIgPSByZXF1aXJlKCcuL2VtYWlsX2NoZWNrLmpzJyk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8xNy8xNS5cbiAqL1xudmFyIGN1cnJlbnRXb3JraW5nVGFiO1xudmFyIGlzRmluaXNoZWQ7XG52YXIgcmVzdWx0cztcbnZhciBtYXN0ZXJDYWxsYmFjaztcbnZhciBzZXR0aW5ncztcbnZhciBpID0gMDtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuXG4gICAgaXRlcmF0ZSgpXG59XG5cbmZ1bmN0aW9uIGdldEJhc2ljSW5mbyhwZXJzb24pIHtcbiAgICBjdXJyZW50UGVyc29uID0gcGVyc29uO1xuICAgIGN1cnJlbnRQZXJzb24uY29tcGFueSA9IHNldHRpbmdzLmdlbmVyYWwuY29tcGFueU5hbWU7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYiB3aXRoIGxpbmsgYXJndW1lbnRcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogcGVyc29uLnByb2ZpbGVMaW5rfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjdXJyZW50V29ya2luZ1RhYiA9IHRhYjtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuICAgIGlmICh0YWJJZCA9PSBjdXJyZW50V29ya2luZ1RhYi5pZCAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIHJlcXVpcmVkIGRhdGEgZnJvbSB0aGUgdGFiXG4gICAgICAgIGNhbGxUYWJBY3Rpb24oY3VycmVudFdvcmtpbmdUYWIuaWQsIFwiZ2V0QmFzaWNJbmZvXCIsIGhhbmRsZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBqdXN0IHRvIGJlIHNhZmUsIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZSkge1xuXG4gICAgJC5leHRlbmQoY3VycmVudFBlcnNvbiwgcmVzcG9uc2UpO1xuXG4gICAgLypcbiAgICAgdmFyIG5hbWUuZnVsbCA9IHJlc3BvbnNlLm5hbWUuZnVsbC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgdmFyIGhlYWRsaW5lID0gcmVzcG9uc2UuaGVhZGxpbmU7XG5cbiAgICAgc3dpdGNoIChuYW1lLmZ1bGwpe1xuICAgICBjYXNlICdsaW5rZWRpbiBtZW1iZXInOlxuICAgICB9XG4gICAgICovXG4gICAgLy8gd2UncmUgZG9uZSB3aXRoIHRoZSB0YWIuIHJlbW92ZSBpdFxuICAgIGNocm9tZS50YWJzLnJlbW92ZShjdXJyZW50V29ya2luZ1RhYi5pZCk7XG5cbiAgICAvLyBkZWNpZGUgd2hldGhlciB0byBydW4gYWdhaW4gb3Igbm90XG4gICAgaWYgKGkgKyAxICE9IHJlc3VsdHMucGVvcGxlLmxlbmd0aCkge1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG1hc3RlckNhbGxiYWNrKCk7XG4gICAgfVxufVxuXG5cbmZ1bmN0aW9uIGl0ZXJhdGUoKSB7XG4gICAgZ2V0QmFzaWNJbmZvKHJlc3VsdHMucGVvcGxlW2krK10pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpc0ZpbmlzaGVkO1xuICAgIH0sXG4gICAgc3RhcnQ6IGluaXRcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzIxLzE1LlxuICovXG52YXIgc2V0dGluZ3MsIHJlc3VsdHMsIG1hc3RlckNhbGxiYWNrO1xudmFyIGkgPSAtMTtcbnZhciBjdXJyZW50UGVyc29uO1xuXG5mdW5jdGlvbiBpbml0KHNldHRpbmdzQXJnLCByZXN1bHRzQXJnLCBjYWxsYmFja0FyZykge1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBpdGVyYXRlKClcbn1cblxuZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBjdXJyZW50UGVyc29uID0gcmVzdWx0cy5wZW9wbGVbKytpXTtcbiAgICB2YXIgY3VycmVudFBlcnNvbkZ1bGxOYW1lID0gY3VycmVudFBlcnNvbi5uYW1lLmZ1bGw7XG5cbiAgICBpZiAoaXNOYW1lSGlkZGVuKGN1cnJlbnRQZXJzb25GdWxsTmFtZSkgfHwgaXNOYW1lQWJicmV2aWF0ZWQoY3VycmVudFBlcnNvbkZ1bGxOYW1lKSkge1xuICAgICAgICBnZXRNaXNzaW5nTmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGkgKyAxID09IHJlc3VsdHMucGVvcGxlLmxlbmd0aCkge1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGZ1bGxOYW1lU3BsaXQgPSBjdXJyZW50UGVyc29uRnVsbE5hbWUuc3BsaXQoJ3wnKVswXS5zcGxpdCgnICcpO1xuICAgICAgICBjdXJyZW50UGVyc29uLm5hbWUuZmlyc3QgPSBmdWxsTmFtZVNwbGl0WzBdO1xuICAgICAgICBjdXJyZW50UGVyc29uLm5hbWUubGFzdCA9IGZ1bGxOYW1lU3BsaXRbMV07XG4gICAgICAgIGl0ZXJhdGUoKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWlzc2luZ05hbWUoY2FsbGJhY2spIHtcbiAgICAvL2RlYnVnZ2VyO1xuICAgIHZhciBzZWFyY2hUZXh0ID0gKFxuICAgIFwic2l0ZTpsaW5rZWRpbi5jb20gXCIgK1xuICAgIGN1cnJlbnRQZXJzb24uaGVhZGxpbmUgKyAnICcgK1xuICAgIGN1cnJlbnRQZXJzb24uY3VycmVudFBvc2l0aW9uICsgJyAnICtcbiAgICBjdXJyZW50UGVyc29uLnBhc3RQb3NpdGlvbnMuam9pbignICcpICsgJyAnICtcbiAgICBjdXJyZW50UGVyc29uLmVkdWNhdGlvbi5qb2luKCcgJykgKyAnICcgK1xuICAgIGN1cnJlbnRQZXJzb24uY29tcGFueSkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJyk7XG5cbiAgICB2YXIgdXJsID1cbiAgICAgICAgXCJodHRwOi8vZ29vZ2xlLmNvbVwiICtcbiAgICAgICAgXCIjcT1cIiArXG4gICAgICAgIHNlYXJjaFRleHQ7XG4gICAgdmFyIHRhYmlkO1xuXG4gICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYlVwZGF0ZWQpO1xuXG4gICAgZnVuY3Rpb24gdGFiVXBkYXRlZCh0YWJJZCwgaW5mbywgdGFiKSB7XG5cbiAgICAgICAgaWYgKHRhYklkID09IHRhYmlkICYmIGluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgY2FsbFRhYkFjdGlvbih0YWJpZCwgXCJnZXROYW1lXCIsIGdvb2dsZVJlc3VsdFJlc3BvbnNlKTtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0YWJVcGRhdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdvb2dsZVJlc3VsdFJlc3BvbnNlKG5hbWUpIHtcbiAgICAgICAgY29uc29sZS50YWJsZShuYW1lKVxuICAgICAgICBjdXJyZW50UGVyc29uLm5hbWUubGFzdCA9IG5hbWU7XG4gICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWJpZCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHVybH0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgdGFiaWQgPSB0YWIuaWQ7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzTmFtZUhpZGRlbihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT0gXCJsaW5rZWRpbiBtZW1iZXJcIlxufVxuXG5mdW5jdGlvbiBpc05hbWVBYmJyZXZpYXRlZChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuaW5kZXhPZignLicpICE9IC0xXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTUvMTQuXG4gKi9cbi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMjEvMTUuXG4gKi9cbnZhciBzZXR0aW5ncywgcmVzdWx0cywgbWFzdGVyQ2FsbGJhY2s7XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHBlcm11dGVFbWFpbHMoKTtcbn1cblxuZnVuY3Rpb24gcGVybXV0ZUVtYWlscygpIHtcblxuICAgICQuZWFjaChyZXN1bHRzLnBlb3BsZSwgZnVuY3Rpb24gKGluZGV4LCBwZXJzb24pIHtcblxuXG4gICAgICAgIHZhciBuYW1lID0gcGVyc29uLm5hbWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbCA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdDogbmFtZS5maXJzdFswXSxcbiAgICAgICAgICAgICAgICBsYXN0OiBuYW1lLmxhc3RbMF1cblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdHMucGVvcGxlW2luZGV4XS5wb3NzaWJsZUVtYWlscyA9IFtcbiAgICAgICAgICAgIG5hbWUuZmlyc3QgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBuYW1lLmZpcnN0ICsgJy4nICsgbmFtZS5sYXN0LFxuICAgICAgICAgICAgaW5pdGlhbC5maXJzdCArIG5hbWUubGFzdCxcbiAgICAgICAgICAgIGluaXRpYWwuZmlyc3QgKyAnLicgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBuYW1lLmxhc3QgKyBuYW1lLmZpcnN0LFxuICAgICAgICAgICAgbmFtZS5sYXN0ICsgJy4nICsgbmFtZS5maXJzdCxcbiAgICAgICAgICAgIG5hbWUuZmlyc3QsXG4gICAgICAgICAgICBuYW1lLmxhc3QsXG4gICAgICAgICAgICBpbml0aWFsLmZpcnN0ICsgaW5pdGlhbC5sYXN0XG4gICAgICAgIF0ubWFwKGZ1bmN0aW9uIChlbWFpbEFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1haWxBZGRyZXNzICsgc2V0dGluZ3MuZ2VuZXJhbC5lbWFpbERvbWFpbjtcbiAgICAgICAgICAgIH0pXG4gICAgfSk7XG4gICAgbWFzdGVyQ2FsbGJhY2soKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRcbn1cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbnZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbnZhciBzdGF0dXMgPSB7fTtcbnZhciByZXN1bHRzO1xuXG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgLy9pbml0aWFsaXphdGlvblxuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLmdlbmVyYWwucG9zaXRpb25GaWx0ZXIgK1xuICAgICAgICAnJmZfQ0M9JyArIHNldHRpbmdzLmdlbmVyYWwuQ29tcGFueUlEcyArXG4gICAgICAgICcmb3BlbkFkdmFuY2VkRm9ybT10cnVlJnRpdGxlU2NvcGU9QyZsb2NhdGlvblR5cGU9SSc7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYlxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHNjcmFwZV90YWIgPSB0YWIuaWQ7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih3YWl0Rm9yVGFiKVxuICAgIH0pO1xuXG4gICAgLy8gYWZ0ZXIgdGFiIGNyZWF0aW9uIHJldHVybiBjb250cm9sIHRvIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gd2FpdEZvclRhYih0YWJJZCwgaW5mbykge1xuICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiICYmIHRhYklkID09IHNjcmFwZV90YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih3YWl0Rm9yVGFiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRQcm9maWxlTGlua3MoY2FsbGJhY2spIHtcbiAgICAvLyBhc2sgY29udGVudCBzY3JpcHQgZm9yIGFsbCB0aGUgcHJvZmlsZSBsaW5rcyBvbiB0aGUgcGFnZVxuICAgIGNhbGxUYWJBY3Rpb24oc2NyYXBlX3RhYiwgJ3NjcmFwZVByb2ZpbGVMaXN0JywgcHJvY2Vzc0xpbmtCYXRjaCk7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGlua0JhdGNoKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHJlc3BvbnNlIGlzIGVtcHR5LCB3ZSBoYXZlIGFuIGlzc3VlXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlc3BvbnNlIGZvciBwcm9jZXNzTGlua0JhdGNoIGlzOlwiICsgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc05leHRQYWdlID0gcmVzcG9uc2UuaGFzTmV4dFBhZ2U7XG4gICAgICAgIHZhciBsaW1pdCA9IHNldHRpbmdzLnNjcmFwZXIubGltaXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcGFnZXMsIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmICghaGFzTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHdlJ3JlIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHJlc3BvbnNlIGFuZCBhIG5leHQgcGFnZS4gd2UnbGwgY2hlY2sgYSBmZXcgdGhpbmdzIGFuZCBrZWVwIGdvaW5nXG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoICE9IDApIHtcblxuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc3BvbnNlIHRvIG91ciBleGlzdGluZyBhcnJheVxuICAgICAgICAgICAgcmVzdWx0cy5wZW9wbGUgPSByZXN1bHRzLnBlb3BsZS5jb25jYXQocmVzcG9uc2UucmVzdWx0cyk7XG5cblxuICAgICAgICAgICAgaWYgKHJlc3VsdHMucGVvcGxlLmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoe3VybDogXCJodHRwOi8vXCIgKyByZXNwb25zZS5uZXh0UGFnZX0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFnZUNoYW5nZSh0YWJJZCwgaW5mbywgdGFiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gdGFiLnVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAhPSB1bmRlZmluZWQgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYiAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSBkb25lIGxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVhY2hlZCBlbHNlIHN0YXRlbWVudCBpbiBwcm9jZXNzTGlua0JhdGNoJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vLyBzdG9wcyBtb2R1bGUgb24gY2FuY2VsU2NyYXBlIGV2ZW50XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNhbmNlbFNjcmFwZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcCgpO1xufSk7XG5cbi8vIHRoZSBhcGkgZm9yIHRoaXMgbW9kdWxlXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzdGFydDogaW5pdGlhbGl6ZSxcbiAgICBwcm9maWxlTGlua3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMucHJvZmlsZUxpbmtzXG4gICAgfSxcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBpc0ZpbmlzaGVkXG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBsb2cobWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpXG59XG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEyLzE1LzE0LlxuICovXG52YXIgdmFsaWRhdGVFbWFpbHMgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBkb25lID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gc3RhcnQoZG9tYWluKSB7XG4gICAgdmFyIGl0ZXJhdGlvbiA9IDA7XG4gICAgdmFyIGRvbWFpbiA9IGRvbWFpbjtcbiAgICB2YXIgZ21haWxfdGFiID0gMDtcbiAgICB2YXIgZmlyc3RfcnVuID0gdHJ1ZTtcblxuICAgIGZ1bmN0aW9uIHdhaXRfZm9yX2dtYWlsKGNhbGxiYWNrKSB7XG4gICAgICBmdW5jdGlvbiBsaXN0ZW4odGFiSWQsIGNoYW5nZUluZm8pIHtcbiAgICAgICAgaWYgKGNoYW5nZUluZm8uc3RhdHVzID09IFwiY29tcGxldGVcIiAmJiB0YWJJZCA9PSBnbWFpbF90YWIpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIH0sIDEyMDAsIGNhbGxiYWNrKTtcbiAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIobGlzdGVuKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIobGlzdGVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlfZW1haWxzX3JlY3Vyc2l2ZSgpIHtcbiAgICAgIHZhciBwZXJzb24gPSBwZW9wbGVbaXRlcmF0aW9uXTtcbiAgICAgIGlmIChwZXJzb24pIHtcbiAgICAgICAgdmFyIHBvc3NpYmxlX2VtYWlscyA9IHBlcnNvbi5wb3NzaWJsZV9lbWFpbHM7XG5cbiAgICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIG5leHRfZW1haWwoKSB7XG4gICAgICAgICAgdmFyIGVtYWlsID0gcG9zc2libGVfZW1haWxzW2ldO1xuICAgICAgICAgIHZhciBmdWxsX25hbWUgPSBwZXJzb24uZnVsbF9uYW1lLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgICAgIGlmIChlbWFpbCkge1xuICAgICAgICAgICAgZW1haWwgPSBlbWFpbCArIGRvbWFpbjtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnVwZGF0ZShnbWFpbF90YWIsIHt1cmw6IFwiaHR0cHM6Ly9tYWlsLmdvb2dsZS5jb20vbWFpbC91LzAvPyNpbmJveD9jb21wb3NlPW5ld1wifSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoZmlyc3RfcnVuKSB7XG4gICAgICAgICAgICAgICAgd2FpdF9mb3JfZ21haWwoYXNrKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgYXNrKClcbiAgICAgICAgICAgICAgICB9LCAxMjAwKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZnVuY3Rpb24gYXNrKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnbWFpbCByZWFkeScpXG4gICAgICAgICAgICAgICAgZmlyc3RfcnVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VuZF90by50YWIoZ21haWxfdGFiLCAnZ2V0X2VtYWlsJywgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY29ycmVjdCkge1xuICAgICAgICAgICAgICAgICAgICBwZXJzb24uZW1haWwgPSBlbWFpbDtcbiAgICAgICAgICAgICAgICAgICAgKytpdGVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZlcmlmeV9lbWFpbHNfcmVjdXJzaXZlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0X2VtYWlsKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLnRhYmxlKHBlb3BsZSlcbiAgICAgICAgICAgICAgICB9LCB7ZW1haWw6IGVtYWlsLCBmdWxsX25hbWU6IGZ1bGxfbmFtZX0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICsraXRlcmF0aW9uO1xuICAgICAgICAgICAgcGVyc29uLmVtYWlsID0gJ25vdCBmb3VuZCdcbiAgICAgICAgICAgIHZlcmlmeV9lbWFpbHNfcmVjdXJzaXZlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuZXh0X2VtYWlsKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKGdtYWlsX3RhYik7XG4gICAgICAgIH0sIDEwMDApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IFwiaHR0cHM6Ly9nb29nbGUuY29tXCJ9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICBnbWFpbF90YWIgPSB0YWIuaWQ7XG4gICAgICB2ZXJpZnlfZW1haWxzX3JlY3Vyc2l2ZSgpXG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBkb25lXG4gICAgfSxcbiAgICBzdGFydDogc3RhcnRcbiAgfVxufVxuXG4pXG4iXX0=
