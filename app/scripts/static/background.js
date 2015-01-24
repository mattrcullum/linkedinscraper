(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scraper = require('./scraper.js');
var getBasicInfo = require('./getBasicInfo.js');
var getMissingNames = require('./getMissingNames.js');
var permuteEmails = require('./permuteEmails.js');
var validateEmails = require('./validateEmails.js');

window.results = {
    people: []
};

//window.results = {"people":[{"name":{"full":"John Wallace","first":"John","last":"Wallace"},"profileLink":"https://www.linkedin.com/profile/view?id=1457210&authType=OUT_OF_NETWORK&au…hId%3A3717380161421910678637%2CVSRPtargetId%3A1457210%2CVSRPcmpt%3Aprimary","headline":"Senior SW Engineering Recruiter at Apple        iOS Apps & Frameworks","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple Inc.","pastPositions":["Yahoo! Inc.","Sony Computer Entertainment","ONI Systems Inc. purchased by Ciena Corp. in 2003"],"education":["Menlo College"],"possibleEmails":["JohnWallace@apple.com","John.Wallace@apple.com","JWallace@apple.com","J.Wallace@apple.com","WallaceJohn@apple.com","Wallace.John@apple.com","John@apple.com","Wallace@apple.com","JW@apple.com"]},{"name":{"full":"Jacob Conway","first":"Jacob","last":"Conway"},"profileLink":"https://www.linkedin.com/profile/view?id=1644330&authType=OPENLINK&authToke…hId%3A3717380161421910678637%2CVSRPtargetId%3A1644330%2CVSRPcmpt%3Aprimary","headline":"Technical Sourcing Recruiter - Wireless Software at Apple","location":"Greater San Diego Area","industry":"Staffing and Recruiting","company":"Apple","currentPosition":"","pastPositions":["Novatel Wireless","TalentWar.net, Inc.","Networked Recruiter"],"education":["Augustana College (SD)"],"possibleEmails":["JacobConway@apple.com","Jacob.Conway@apple.com","JConway@apple.com","J.Conway@apple.com","ConwayJacob@apple.com","Conway.Jacob@apple.com","Jacob@apple.com","Conway@apple.com","JC@apple.com"]},{"name":{"full":"Bill Dudney","first":"Bill","last":"Dudney"},"profileLink":"https://www.linkedin.com/profile/view?id=480284&authType=OUT_OF_NETWORK&aut…chId%3A3717380161421910678637%2CVSRPtargetId%3A480284%2CVSRPcmpt%3Aprimary","headline":"Writer of Code at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleGala Factory Software LLCPragmatic Programmers","pastPositions":["Apple Inc.","Dudney.Net","Virtuas Solutions"],"education":["Texas A&M University"],"possibleEmails":["BillDudney@apple.com","Bill.Dudney@apple.com","BDudney@apple.com","B.Dudney@apple.com","DudneyBill@apple.com","Dudney.Bill@apple.com","Bill@apple.com","Dudney@apple.com","BD@apple.com"]},{"name":{"full":"Corey Carson","first":"Corey","last":"Carson"},"profileLink":"https://www.linkedin.com/profile/view?id=9816373&authType=OUT_OF_NETWORK&au…hId%3A3717380161421910678637%2CVSRPtargetId%3A9816373%2CVSRPcmpt%3Aprimary","headline":"Systems Engineer","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"Apple","pastPositions":["Holcomb's Education Resource","Maize USD 266"],"education":["Pittsburg State University"],"possibleEmails":["CoreyCarson@apple.com","Corey.Carson@apple.com","CCarson@apple.com","C.Carson@apple.com","CarsonCorey@apple.com","Carson.Corey@apple.com","Corey@apple.com","Carson@apple.com","CC@apple.com"]},{"name":{"full":"Samantha Kish","first":"Samantha","last":"Kish"},"profileLink":"https://www.linkedin.com/profile/view?id=10254966&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A10254966%2CVSRPcmpt%3Aprimary","headline":"Global Supply Manager - Channel Procurement at Apple","location":"San Francisco Bay Area","industry":"Consumer Electronics","company":"Apple","currentPosition":"","pastPositions":["Apple","Johns Manville","Honeywell"],"education":["University of Colorado at Denver"],"possibleEmails":["SamanthaKish@apple.com","Samantha.Kish@apple.com","SKish@apple.com","S.Kish@apple.com","KishSamantha@apple.com","Kish.Samantha@apple.com","Samantha@apple.com","Kish@apple.com","SK@apple.com"]},{"name":{"full":"Dimitri Geier","first":"Dimitri","last":"Geier"},"profileLink":"https://www.linkedin.com/profile/view?id=12063296&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A12063296%2CVSRPcmpt%3Aprimary","headline":"Dimitri Geier is a Senior Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Telecommunications","company":"Apple","currentPosition":"Apple","pastPositions":["Motorola","Nextive Solutions","Warner Music Group"],"education":["Universität zu Köln"],"possibleEmails":["DimitriGeier@apple.com","Dimitri.Geier@apple.com","DGeier@apple.com","D.Geier@apple.com","GeierDimitri@apple.com","Geier.Dimitri@apple.com","Dimitri@apple.com","Geier@apple.com","DG@apple.com"]},{"name":{"full":"Matthew Gaddis","first":"Matthew","last":"Gaddis"},"profileLink":"https://www.linkedin.com/profile/view?id=12213953&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A12213953%2CVSRPcmpt%3Aprimary","headline":"UI Engineering Manager at Apple","location":"San Francisco Bay Area","industry":"Internet","company":"Apple","currentPosition":"Apple","pastPositions":["Scout Labs","PlayCoed","Self"],"education":["University of Colorado Boulder"],"possibleEmails":["MatthewGaddis@apple.com","Matthew.Gaddis@apple.com","MGaddis@apple.com","M.Gaddis@apple.com","GaddisMatthew@apple.com","Gaddis.Matthew@apple.com","Matthew@apple.com","Gaddis@apple.com","MG@apple.com"]},{"name":{"full":"Tri Vuong","first":"Tri","last":"Vuong"},"profileLink":"https://www.linkedin.com/profile/view?id=14068282&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A14068282%2CVSRPcmpt%3Aprimary","headline":"Software Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Twitter","YP","Better The World"],"education":["University of Toronto"],"possibleEmails":["TriVuong@apple.com","Tri.Vuong@apple.com","TVuong@apple.com","T.Vuong@apple.com","VuongTri@apple.com","Vuong.Tri@apple.com","Tri@apple.com","Vuong@apple.com","TV@apple.com"]},{"name":{"full":"Kshitij Deshpande","first":"Kshitij","last":"Deshpande"},"profileLink":"https://www.linkedin.com/profile/view?id=19292128&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A19292128%2CVSRPcmpt%3Aprimary","headline":"Sr. iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Gracenote (A Sony Company)","Independent iOS Developer","Telestream"],"education":["Wright State University"],"possibleEmails":["KshitijDeshpande@apple.com","Kshitij.Deshpande@apple.com","KDeshpande@apple.com","K.Deshpande@apple.com","DeshpandeKshitij@apple.com","Deshpande.Kshitij@apple.com","Kshitij@apple.com","Deshpande@apple.com","KD@apple.com"]},{"name":{"full":"Paul Stuart","first":"Paul","last":"Stuart"},"profileLink":"https://www.linkedin.com/profile/view?id=20546172&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910678637%2CVSRPtargetId%3A20546172%2CVSRPcmpt%3Aprimary","headline":"TSE/Escalations|vCloudSuite|vShield|Infrastructure|Network|Fault|Storage at VMware","location":"Greater Denver Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"VMwareTime Warner CableApple Retail","pastPositions":["VMware","IBM Global Services"],"education":["Park University"],"possibleEmails":["PaulStuart@apple.com","Paul.Stuart@apple.com","PStuart@apple.com","P.Stuart@apple.com","StuartPaul@apple.com","Stuart.Paul@apple.com","Paul@apple.com","Stuart@apple.com","PS@apple.com"]},{"name":{"full":"Azhar Sikander","first":"Azhar","last":"Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"],"possibleEmails":["AzharSikander@apple.com","Azhar.Sikander@apple.com","ASikander@apple.com","A.Sikander@apple.com","SikanderAzhar@apple.com","Sikander.Azhar@apple.com","Azhar@apple.com","Sikander@apple.com","AS@apple.com"]},{"name":{"full":"Ranjit Menon","first":"Ranjit","last":"Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421910681011%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"],"possibleEmails":["RanjitMenon@apple.com","Ranjit.Menon@apple.com","RMenon@apple.com","R.Menon@apple.com","MenonRanjit@apple.com","Menon.Ranjit@apple.com","Ranjit@apple.com","Menon@apple.com","RM@apple.com"]},{"name":{"full":"Liang Wei","first":"Liang","last":"Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"],"possibleEmails":["LiangWei@apple.com","Liang.Wei@apple.com","LWei@apple.com","L.Wei@apple.com","WeiLiang@apple.com","Wei.Liang@apple.com","Liang@apple.com","Wei@apple.com","LW@apple.com"]},{"name":{"full":"Kristina Gulish","first":"Kristina","last":"Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"],"possibleEmails":["KristinaGulish@apple.com","Kristina.Gulish@apple.com","KGulish@apple.com","K.Gulish@apple.com","GulishKristina@apple.com","Gulish.Kristina@apple.com","Kristina@apple.com","Gulish@apple.com","KG@apple.com"]},{"name":{"full":"Sonia Saini","first":"Sonia","last":"Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"],"possibleEmails":["SoniaSaini@apple.com","Sonia.Saini@apple.com","SSaini@apple.com","S.Saini@apple.com","SainiSonia@apple.com","Saini.Sonia@apple.com","Sonia@apple.com","Saini@apple.com","SS@apple.com"]},{"name":{"full":"Michael Turner","first":"Michael","last":"Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"],"possibleEmails":["MichaelTurner@apple.com","Michael.Turner@apple.com","MTurner@apple.com","M.Turner@apple.com","TurnerMichael@apple.com","Turner.Michael@apple.com","Michael@apple.com","Turner@apple.com","MT@apple.com"]},{"name":{"full":"George Kalangi","first":"George","last":"Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"],"possibleEmails":["GeorgeKalangi@apple.com","George.Kalangi@apple.com","GKalangi@apple.com","G.Kalangi@apple.com","KalangiGeorge@apple.com","Kalangi.George@apple.com","George@apple.com","Kalangi@apple.com","GK@apple.com"]},{"name":{"full":"Mark Gouldsmith","first":"Mark","last":"Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"],"possibleEmails":["MarkGouldsmith@apple.com","Mark.Gouldsmith@apple.com","MGouldsmith@apple.com","M.Gouldsmith@apple.com","GouldsmithMark@apple.com","Gouldsmith.Mark@apple.com","Mark@apple.com","Gouldsmith@apple.com","MG@apple.com"]},{"name":{"full":"Trevor Sheridan","first":"Trevor","last":"Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[],"possibleEmails":["TrevorSheridan@apple.com","Trevor.Sheridan@apple.com","TSheridan@apple.com","T.Sheridan@apple.com","SheridanTrevor@apple.com","Sheridan.Trevor@apple.com","Trevor@apple.com","Sheridan@apple.com","TS@apple.com"]},{"name":{"full":"Marvin Dela Cruz","first":"Marvin","last":"Dela"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Dept of Real Estate","California Secretary of State","Eclipse/InterlocSolutions"],"education":[],"possibleEmails":["MarvinDela@apple.com","Marvin.Dela@apple.com","MDela@apple.com","M.Dela@apple.com","DelaMarvin@apple.com","Dela.Marvin@apple.com","Marvin@apple.com","Dela@apple.com","MD@apple.com"]},{"name":{"full":"Azhar Sikander","first":"Azhar","last":"Sikander"},"profileLink":"https://www.linkedin.com/profile/view?id=21032090&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A21032090%2CVSRPcmpt%3Aprimary","headline":"Software Engineer in Test at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Bentley Systems","Qwest Communications","NSIDC, University of Colorado at Boulder"],"education":["University of Colorado Boulder"],"possibleEmails":["AzharSikander@apple.com","Azhar.Sikander@apple.com","ASikander@apple.com","A.Sikander@apple.com","SikanderAzhar@apple.com","Sikander.Azhar@apple.com","Azhar@apple.com","Sikander@apple.com","AS@apple.com"]},{"name":{"full":"Ranjit Menon","first":"Ranjit","last":"Menon"},"profileLink":"https://www.linkedin.com/profile/view?id=24331686&authType=OPENLINK&authTok…Id%3A3717380161421910681011%2CVSRPtargetId%3A24331686%2CVSRPcmpt%3Aprimary","headline":"Senior Research Scientist, Apple Maps","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["Pacific Gas and Electric Company","Schneider Electric","Telvent Miner & Miner"],"education":["Indian Institute of Technology, Madras"],"possibleEmails":["RanjitMenon@apple.com","Ranjit.Menon@apple.com","RMenon@apple.com","R.Menon@apple.com","MenonRanjit@apple.com","Menon.Ranjit@apple.com","Ranjit@apple.com","Menon@apple.com","RM@apple.com"]},{"name":{"full":"Liang Wei","first":"Liang","last":"Wei"},"profileLink":"https://www.linkedin.com/profile/view?id=30103561&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A30103561%2CVSRPcmpt%3Aprimary","headline":"Senior Data Scientist at Apple","location":"San Francisco Bay Area","industry":"Information Technology and Services","company":"Apple","currentPosition":"","pastPositions":["Chegg Inc.","Amazon.com","Lucid Commerce (Acquired by AOL in 2014)"],"education":["The College of William and Mary"],"possibleEmails":["LiangWei@apple.com","Liang.Wei@apple.com","LWei@apple.com","L.Wei@apple.com","WeiLiang@apple.com","Wei.Liang@apple.com","Liang@apple.com","Wei@apple.com","LW@apple.com"]},{"name":{"full":"Kristina Gulish","first":"Kristina","last":"Gulish"},"profileLink":"https://www.linkedin.com/profile/view?id=35663354&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A35663354%2CVSRPcmpt%3Aprimary","headline":"Strategic Sourcing Manager at Apple","location":"United States","industry":"Consumer Electronics","company":"Apple","currentPosition":"Apple","pastPositions":["Johns Manville","Kohler Co.","BorgWarner"],"education":["University of Colorado at Denver"],"possibleEmails":["KristinaGulish@apple.com","Kristina.Gulish@apple.com","KGulish@apple.com","K.Gulish@apple.com","GulishKristina@apple.com","Gulish.Kristina@apple.com","Kristina@apple.com","Gulish@apple.com","KG@apple.com"]},{"name":{"full":"Sonia Saini","first":"Sonia","last":"Saini"},"profileLink":"https://www.linkedin.com/profile/view?id=38477226&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A38477226%2CVSRPcmpt%3Aprimary","headline":"Sr. QA Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Time Warner Cable","Comcast","Grebweb"],"education":["Punjab Technical University"],"possibleEmails":["SoniaSaini@apple.com","Sonia.Saini@apple.com","SSaini@apple.com","S.Saini@apple.com","SainiSonia@apple.com","Saini.Sonia@apple.com","Sonia@apple.com","Saini@apple.com","SS@apple.com"]},{"name":{"full":"Michael Turner","first":"Michael","last":"Turner"},"profileLink":"https://www.linkedin.com/profile/view?id=42361191&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A42361191%2CVSRPcmpt%3Aprimary","headline":"iOS & OS X Software Engineer","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"Apple","pastPositions":["WayIn","Troppus Software Corporation","National Analytics, Inc."],"education":["Colorado State University"],"possibleEmails":["MichaelTurner@apple.com","Michael.Turner@apple.com","MTurner@apple.com","M.Turner@apple.com","TurnerMichael@apple.com","Turner.Michael@apple.com","Michael@apple.com","Turner@apple.com","MT@apple.com"]},{"name":{"full":"George Kalangi","first":"George","last":"Kalangi"},"profileLink":"https://www.linkedin.com/profile/view?id=52908053&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A52908053%2CVSRPcmpt%3Aprimary","headline":"Software Engineer UI at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"AppleInfosys","pastPositions":["University of Louisiana at Lafayette","HCL Technologies"],"education":["University of Louisiana at Lafayette"],"possibleEmails":["GeorgeKalangi@apple.com","George.Kalangi@apple.com","GKalangi@apple.com","G.Kalangi@apple.com","KalangiGeorge@apple.com","Kalangi.George@apple.com","George@apple.com","Kalangi@apple.com","GK@apple.com"]},{"name":{"full":"Mark Gouldsmith","first":"Mark","last":"Gouldsmith"},"profileLink":"https://www.linkedin.com/profile/view?id=64761225&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A64761225%2CVSRPcmpt%3Aprimary","headline":"Technology + Media Production","location":"Austin, Texas Area","industry":"Online Media","company":"Apple","currentPosition":"Applelesfire.com","pastPositions":["Apple","Harte-Hanks, Inc.","Peak Performers"],"education":["New Mexico State University"],"possibleEmails":["MarkGouldsmith@apple.com","Mark.Gouldsmith@apple.com","MGouldsmith@apple.com","M.Gouldsmith@apple.com","GouldsmithMark@apple.com","Gouldsmith.Mark@apple.com","Mark@apple.com","Gouldsmith@apple.com","MG@apple.com"]},{"name":{"full":"Trevor Sheridan","first":"Trevor","last":"Sheridan"},"profileLink":"https://www.linkedin.com/profile/view?id=72118642&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A72118642%2CVSRPcmpt%3Aprimary","headline":"iOS Engineer at Apple","location":"San Francisco Bay Area","industry":"Computer Software","company":"Apple","currentPosition":"","pastPositions":["Groupon","Trevor Inc","Sureify.com"],"education":[],"possibleEmails":["TrevorSheridan@apple.com","Trevor.Sheridan@apple.com","TSheridan@apple.com","T.Sheridan@apple.com","SheridanTrevor@apple.com","Sheridan.Trevor@apple.com","Trevor@apple.com","Sheridan@apple.com","TS@apple.com"]},{"name":{"full":"Marvin Dela Cruz"},"profileLink":"https://www.linkedin.com/profile/view?id=82061397&authType=OUT_OF_NETWORK&a…Id%3A3717380161421910681011%2CVSRPtargetId%3A82061397%2CVSRPcmpt%3Aprimary","headline":"Enterprise Services Engineer at Apple","location":"Sacramento, California Area","industry":"Computer Software"}]}
//window.results = {"people":[{"name":{"full":"Eric Kimberley"},"profileLink":"https://www.linkedin.com/profile/view?id=14960442&authType=OUT_OF_NETWORK&a…Id%3A3717380161422032549802%2CVSRPtargetId%3A14960442%2CVSRPcmpt%3Aprimary","headline":"Lead Sitecore .NET Architect / Developer at RBA, Inc.","location":"Greater Denver Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"RBA Consulting (contract)","pastPositions":["Godfrey (contract)","Adecco Staffing (contract)","Mayo Clinic (contract)"],"education":["University of Minnesota-Twin Cities"]},{"name":{"full":"Ramon Guerrero"},"profileLink":"https://www.linkedin.com/profile/view?id=106942766&authType=OUT_OF_NETWORK&…d%3A3717380161422032549802%2CVSRPtargetId%3A106942766%2CVSRPcmpt%3Aprimary","headline":"Consultant at RBA Consulting","location":"Greater Denver Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"","pastPositions":["NGenius Games","ACT Conferencing","Fujitsu Consulting"],"education":[]},{"name":{"full":"LuAnne M."},"profileLink":"https://www.linkedin.com/profile/view?id=8269175&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A8269175%2CVSRPcmpt%3Aprimary","headline":"Executive Assistant at RBA Consulting","location":"Dallas/Fort Worth Area","industry":"Internet","company":"RBA, Inc.","currentPosition":"","pastPositions":["HDVMS (True.com, AdShuffle, Metric Interactive, & H.D. Vest Investigations)"],"education":[]},{"name":{"full":"Phil W."},"profileLink":"https://www.linkedin.com/profile/view?id=12717151&authType=OUT_OF_NETWORK&a…Id%3A3717380161422032549802%2CVSRPtargetId%3A12717151%2CVSRPcmpt%3Aprimary","headline":"Regional Practice Manager at RBA, Inc.","location":"Greater Minneapolis-St. Paul Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"","pastPositions":["RBA, Inc.","O'Reilly Media","Manning Publications Co."],"education":["University of St. Thomas"]},{"name":{"full":"Clara Sponitz"},"profileLink":"https://www.linkedin.com/profile/view?id=4846586&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A4846586%2CVSRPcmpt%3Aprimary","headline":"Senior Recruiter","location":"Greater Minneapolis-St. Paul Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["RBA Consulting","Tech-Pro","Compuware Corporation"],"education":["University of Minnesota-Twin Cities"]},{"name":{"full":"Michael Lawrence"},"profileLink":"https://www.linkedin.com/profile/view?id=1263302&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A1263302%2CVSRPcmpt%3Aprimary","headline":"Senior Recruiter @ RBA","location":"Dallas/Fort Worth Area","industry":"Information Technology and Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["Gold's Gym International","BearingPoint","Buchanan Associates"],"education":[]},{"name":{"full":"Wm Andrew G."},"profileLink":"https://www.linkedin.com/profile/view?id=1111149&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A1111149%2CVSRPcmpt%3Aprimary","headline":"Social Strategy at RBA, Inc., Enterprise Gamification Strategy, Portals and Collaboration Strategy","location":"Dallas/Fort Worth Area","industry":"Financial Services","company":"RBA, Inc.","currentPosition":"RBA, Inc.Iron Horse Lacrosse","pastPositions":["Citi","Clear Alliances","Slalom Consulting"],"education":["Texas State University-San Marcos"]},{"name":{"full":"Craig Jonas"},"profileLink":"https://www.linkedin.com/profile/view?id=1641241&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A1641241%2CVSRPcmpt%3Aprimary","headline":"Sr. IT Recruiter at RBA, Inc.","location":"Greater Minneapolis-St. Paul Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"RBA, Inc.","pastPositions":["BORN/Fujitsu Consulting","BORN"],"education":["St. Cloud State University"]},{"name":{"full":"Jake Estares"},"profileLink":"https://www.linkedin.com/profile/view?id=4541983&authType=OPENLINK&authToke…hId%3A3717380161422032549802%2CVSRPtargetId%3A4541983%2CVSRPcmpt%3Aprimary","headline":"Account Executive at RBA Consulting","location":"Greater Denver Area","industry":"Computer Software","company":"RBA, Inc.","currentPosition":"","pastPositions":["Neudesic","Statera","Accelerated Network Solutions"],"education":["University of Northern Colorado"]},{"name":{"full":"Jay L."},"profileLink":"https://www.linkedin.com/profile/view?id=8869158&authType=OUT_OF_NETWORK&au…hId%3A3717380161422032549802%2CVSRPtargetId%3A8869158%2CVSRPcmpt%3Aprimary","headline":"Dynamics CRM Practice Director & Microsoft Alliance Director","location":"Greater Minneapolis-St. Paul Area","industry":"Information Technology and Services"}]}


window.callTabAction = function (tabId, action, callback, args) {
    var message = {to: 'content', action: action, args:args};
    chrome.tabs.sendMessage(tabId, message, callback)
};

window.go = function (settings) {

    // for debugging
    settings.scraper.limit = 10000;

    var routine = [
        scraper.start.bind(undefined, settings, results),
        getBasicInfo.start.bind(undefined, settings, results),
        getMissingNames.start.bind(undefined, settings, results)
        //permuteEmails.start.bind(undefined, settings, results)
        //validateEmails_old.start.bind(undefined, settings, results)
    ];
    routine.push(done);

    async.series(routine);
};
function debug(){
    debugger;
}

function done() {
    window.isFinished = true;
}

chrome.runtime.onMessage.addListener(function(message, sender){
    if(message.action == "openApp"){
        chrome.tabs.create({url:message.path})
    }
});

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
if(!currentPerson){debugger;}
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
    getBasicInfo(results.people[++i]);
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

    if (i + 1 == results.people.length) {
        masterCallback();
        return;
    }

    if (isNameHidden(currentPersonFullName) || isNameAbbreviated(currentPersonFullName)) {
        getMissingName(function () {
            iterate();
        })
    }
    else {
        var fullNameSplit = currentPersonFullName.split('|')[0].split(' ');
        currentPerson.name.first = fullNameSplit[0];
        currentPerson.name.last = fullNameSplit[1];
        iterate()
    }
}

function getMissingName(callback) {
    if (!(currentPerson &&
        currentPerson.headline &&
        currentPerson.pastPositions &&
        currentPerson.education &&
        currentPerson.company)) {
        callback();
        return;
    }
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
        if(name && name.first && name.last){
            currentPerson.name.last = name.last;
            chrome.tabs.remove(tabid);
        }
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
 * Created by matthew on 1/22/15.
 */
var settings, results, masterCallback;
var gmailTab;
var currentPerson;
var successfulEmailComboIndexes = [];
var emailFound = false;

function init(settingsArg, resultsArg, callbackArg) {
    settings = settingsArg;
    results = resultsArg;
    masterCallback = callbackArg;
    validateEmails();
}

function validateEmails() {
    var i = 0;

    async.series([
        createGmailTab,
        nextPerson
    ]);

    function nextPerson() {
        currentPerson = results.people[i];

        async.series(
            composeNewEmail,
            findCurrentPersonsEmail()
        )
    }
}

function createGmailTab(callback) {
    chrome.tabs.create({url: "https://google.com"}, function (tab) {
        gmailTab = tab.id;
        callback()
    })
}
function composeNewEmail(callback) {
    function waitForLoad(tabId, status) {
        if (tabId == gmailTab && status == "complete") {

            chrome.tabs.onUpdated.removeListener(waitForLoad);

            setTimeout(function (callback) {
                callback()
            }, 1200, callback);

        }
    }

    chrome.tabs.update(gmailTab, {url: "https://mail.google.com/mail/u/0/?#inbox?compose=new"}, waitForLoad)
}
function findCurrentPersonsEmail(callback) {

    var possibleEmails = currentPerson.possibleEmails;
    var prioritizedComboIndexes;
    var email = null;

    if (successfulEmailComboIndexes.length) {
        prioritizedComboIndexes = successfulEmailComboIndexes.splice();

        var index = prioritizedComboIndexes.splice(0, 1);
        email = possibleEmails.splice(index, 1);

        tryEmail(email, processResponse)
    }

    else {
        email = possibleEmails.splice(0, 1);
    }

    function tryEmail(email, callback) {
        callTabAction(gmailTab, 'tryEmail', processResponse, {email:email})
    }

    function processResponse(response) {
        if (response) {
            currentPerson.email = email;
        }
    }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJhcHAvc2NyaXB0cy9iYWNrZ3JvdW5kL2dldEJhc2ljSW5mby5qcyIsImFwcC9zY3JpcHRzL2JhY2tncm91bmQvZ2V0TWlzc2luZ05hbWVzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9wZXJtdXRlRW1haWxzLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC9zY3JhcGVyLmpzIiwiYXBwL3NjcmlwdHMvYmFja2dyb3VuZC92YWxpZGF0ZUVtYWlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzY3JhcGVyID0gcmVxdWlyZSgnLi9zY3JhcGVyLmpzJyk7XG52YXIgZ2V0QmFzaWNJbmZvID0gcmVxdWlyZSgnLi9nZXRCYXNpY0luZm8uanMnKTtcbnZhciBnZXRNaXNzaW5nTmFtZXMgPSByZXF1aXJlKCcuL2dldE1pc3NpbmdOYW1lcy5qcycpO1xudmFyIHBlcm11dGVFbWFpbHMgPSByZXF1aXJlKCcuL3Blcm11dGVFbWFpbHMuanMnKTtcbnZhciB2YWxpZGF0ZUVtYWlscyA9IHJlcXVpcmUoJy4vdmFsaWRhdGVFbWFpbHMuanMnKTtcblxud2luZG93LnJlc3VsdHMgPSB7XG4gICAgcGVvcGxlOiBbXVxufTtcblxuLy93aW5kb3cucmVzdWx0cyA9IHtcInBlb3BsZVwiOlt7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSm9obiBXYWxsYWNlXCIsXCJmaXJzdFwiOlwiSm9oblwiLFwibGFzdFwiOlwiV2FsbGFjZVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE0NTcyMTAmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXXigKZoSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTQ1NzIxMCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBTVyBFbmdpbmVlcmluZyBSZWNydWl0ZXIgYXQgQXBwbGUgICAgICAgIGlPUyBBcHBzICYgRnJhbWV3b3Jrc1wiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbnRlcm5ldFwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGUgSW5jLlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIllhaG9vISBJbmMuXCIsXCJTb255IENvbXB1dGVyIEVudGVydGFpbm1lbnRcIixcIk9OSSBTeXN0ZW1zIEluYy4gcHVyY2hhc2VkIGJ5IENpZW5hIENvcnAuIGluIDIwMDNcIl0sXCJlZHVjYXRpb25cIjpbXCJNZW5sbyBDb2xsZWdlXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJKb2huV2FsbGFjZUBhcHBsZS5jb21cIixcIkpvaG4uV2FsbGFjZUBhcHBsZS5jb21cIixcIkpXYWxsYWNlQGFwcGxlLmNvbVwiLFwiSi5XYWxsYWNlQGFwcGxlLmNvbVwiLFwiV2FsbGFjZUpvaG5AYXBwbGUuY29tXCIsXCJXYWxsYWNlLkpvaG5AYXBwbGUuY29tXCIsXCJKb2huQGFwcGxlLmNvbVwiLFwiV2FsbGFjZUBhcHBsZS5jb21cIixcIkpXQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkphY29iIENvbndheVwiLFwiZmlyc3RcIjpcIkphY29iXCIsXCJsYXN0XCI6XCJDb253YXlcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNjQ0MzMwJmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2tl4oCmaElkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTE2NDQzMzAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJUZWNobmljYWwgU291cmNpbmcgUmVjcnVpdGVyIC0gV2lyZWxlc3MgU29mdHdhcmUgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIFNhbiBEaWVnbyBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiU3RhZmZpbmcgYW5kIFJlY3J1aXRpbmdcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIk5vdmF0ZWwgV2lyZWxlc3NcIixcIlRhbGVudFdhci5uZXQsIEluYy5cIixcIk5ldHdvcmtlZCBSZWNydWl0ZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJBdWd1c3RhbmEgQ29sbGVnZSAoU0QpXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJKYWNvYkNvbndheUBhcHBsZS5jb21cIixcIkphY29iLkNvbndheUBhcHBsZS5jb21cIixcIkpDb253YXlAYXBwbGUuY29tXCIsXCJKLkNvbndheUBhcHBsZS5jb21cIixcIkNvbndheUphY29iQGFwcGxlLmNvbVwiLFwiQ29ud2F5LkphY29iQGFwcGxlLmNvbVwiLFwiSmFjb2JAYXBwbGUuY29tXCIsXCJDb253YXlAYXBwbGUuY29tXCIsXCJKQ0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJCaWxsIER1ZG5leVwiLFwiZmlyc3RcIjpcIkJpbGxcIixcImxhc3RcIjpcIkR1ZG5leVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQ4MDI4NCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdXTigKZjaElkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTQ4MDI4NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIldyaXRlciBvZiBDb2RlIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUdhbGEgRmFjdG9yeSBTb2Z0d2FyZSBMTENQcmFnbWF0aWMgUHJvZ3JhbW1lcnNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZSBJbmMuXCIsXCJEdWRuZXkuTmV0XCIsXCJWaXJ0dWFzIFNvbHV0aW9uc1wiXSxcImVkdWNhdGlvblwiOltcIlRleGFzIEEmTSBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJCaWxsRHVkbmV5QGFwcGxlLmNvbVwiLFwiQmlsbC5EdWRuZXlAYXBwbGUuY29tXCIsXCJCRHVkbmV5QGFwcGxlLmNvbVwiLFwiQi5EdWRuZXlAYXBwbGUuY29tXCIsXCJEdWRuZXlCaWxsQGFwcGxlLmNvbVwiLFwiRHVkbmV5LkJpbGxAYXBwbGUuY29tXCIsXCJCaWxsQGFwcGxlLmNvbVwiLFwiRHVkbmV5QGFwcGxlLmNvbVwiLFwiQkRAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQ29yZXkgQ2Fyc29uXCIsXCJmaXJzdFwiOlwiQ29yZXlcIixcImxhc3RcIjpcIkNhcnNvblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTk4MTYzNzMmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYXXigKZoSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBOTgxNjM3MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlN5c3RlbXMgRW5naW5lZXJcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIERlbnZlciBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiSG9sY29tYidzIEVkdWNhdGlvbiBSZXNvdXJjZVwiLFwiTWFpemUgVVNEIDI2NlwiXSxcImVkdWNhdGlvblwiOltcIlBpdHRzYnVyZyBTdGF0ZSBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJDb3JleUNhcnNvbkBhcHBsZS5jb21cIixcIkNvcmV5LkNhcnNvbkBhcHBsZS5jb21cIixcIkNDYXJzb25AYXBwbGUuY29tXCIsXCJDLkNhcnNvbkBhcHBsZS5jb21cIixcIkNhcnNvbkNvcmV5QGFwcGxlLmNvbVwiLFwiQ2Fyc29uLkNvcmV5QGFwcGxlLmNvbVwiLFwiQ29yZXlAYXBwbGUuY29tXCIsXCJDYXJzb25AYXBwbGUuY29tXCIsXCJDQ0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTYW1hbnRoYSBLaXNoXCIsXCJmaXJzdFwiOlwiU2FtYW50aGFcIixcImxhc3RcIjpcIktpc2hcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMDI1NDk2NiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTAyNTQ5NjYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJHbG9iYWwgU3VwcGx5IE1hbmFnZXIgLSBDaGFubmVsIFByb2N1cmVtZW50IGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiSm9obnMgTWFudmlsbGVcIixcIkhvbmV5d2VsbFwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gYXQgRGVudmVyXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJTYW1hbnRoYUtpc2hAYXBwbGUuY29tXCIsXCJTYW1hbnRoYS5LaXNoQGFwcGxlLmNvbVwiLFwiU0tpc2hAYXBwbGUuY29tXCIsXCJTLktpc2hAYXBwbGUuY29tXCIsXCJLaXNoU2FtYW50aGFAYXBwbGUuY29tXCIsXCJLaXNoLlNhbWFudGhhQGFwcGxlLmNvbVwiLFwiU2FtYW50aGFAYXBwbGUuY29tXCIsXCJLaXNoQGFwcGxlLmNvbVwiLFwiU0tAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiRGltaXRyaSBHZWllclwiLFwiZmlyc3RcIjpcIkRpbWl0cmlcIixcImxhc3RcIjpcIkdlaWVyXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTIwNjMyOTYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTEyMDYzMjk2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRGltaXRyaSBHZWllciBpcyBhIFNlbmlvciBTb2Z0d2FyZSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJUZWxlY29tbXVuaWNhdGlvbnNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiTW90b3JvbGFcIixcIk5leHRpdmUgU29sdXRpb25zXCIsXCJXYXJuZXIgTXVzaWMgR3JvdXBcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXTDpHQgenUgS8O2bG5cIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIkRpbWl0cmlHZWllckBhcHBsZS5jb21cIixcIkRpbWl0cmkuR2VpZXJAYXBwbGUuY29tXCIsXCJER2VpZXJAYXBwbGUuY29tXCIsXCJELkdlaWVyQGFwcGxlLmNvbVwiLFwiR2VpZXJEaW1pdHJpQGFwcGxlLmNvbVwiLFwiR2VpZXIuRGltaXRyaUBhcHBsZS5jb21cIixcIkRpbWl0cmlAYXBwbGUuY29tXCIsXCJHZWllckBhcHBsZS5jb21cIixcIkRHQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1hdHRoZXcgR2FkZGlzXCIsXCJmaXJzdFwiOlwiTWF0dGhld1wiLFwibGFzdFwiOlwiR2FkZGlzXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTIyMTM5NTMmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY3ODYzNyUyQ1ZTUlB0YXJnZXRJZCUzQTEyMjEzOTUzJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVUkgRW5naW5lZXJpbmcgTWFuYWdlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbnRlcm5ldFwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJTY291dCBMYWJzXCIsXCJQbGF5Q29lZFwiLFwiU2VsZlwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gQm91bGRlclwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiTWF0dGhld0dhZGRpc0BhcHBsZS5jb21cIixcIk1hdHRoZXcuR2FkZGlzQGFwcGxlLmNvbVwiLFwiTUdhZGRpc0BhcHBsZS5jb21cIixcIk0uR2FkZGlzQGFwcGxlLmNvbVwiLFwiR2FkZGlzTWF0dGhld0BhcHBsZS5jb21cIixcIkdhZGRpcy5NYXR0aGV3QGFwcGxlLmNvbVwiLFwiTWF0dGhld0BhcHBsZS5jb21cIixcIkdhZGRpc0BhcHBsZS5jb21cIixcIk1HQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlRyaSBWdW9uZ1wiLFwiZmlyc3RcIjpcIlRyaVwiLFwibGFzdFwiOlwiVnVvbmdcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xNDA2ODI4MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjc4NjM3JTJDVlNSUHRhcmdldElkJTNBMTQwNjgyODIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTb2Z0d2FyZSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVHdpdHRlclwiLFwiWVBcIixcIkJldHRlciBUaGUgV29ybGRcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIFRvcm9udG9cIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIlRyaVZ1b25nQGFwcGxlLmNvbVwiLFwiVHJpLlZ1b25nQGFwcGxlLmNvbVwiLFwiVFZ1b25nQGFwcGxlLmNvbVwiLFwiVC5WdW9uZ0BhcHBsZS5jb21cIixcIlZ1b25nVHJpQGFwcGxlLmNvbVwiLFwiVnVvbmcuVHJpQGFwcGxlLmNvbVwiLFwiVHJpQGFwcGxlLmNvbVwiLFwiVnVvbmdAYXBwbGUuY29tXCIsXCJUVkBhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJLc2hpdGlqIERlc2hwYW5kZVwiLFwiZmlyc3RcIjpcIktzaGl0aWpcIixcImxhc3RcIjpcIkRlc2hwYW5kZVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE5MjkyMTI4JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0ExOTI5MjEyOCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBpT1MgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdyYWNlbm90ZSAoQSBTb255IENvbXBhbnkpXCIsXCJJbmRlcGVuZGVudCBpT1MgRGV2ZWxvcGVyXCIsXCJUZWxlc3RyZWFtXCJdLFwiZWR1Y2F0aW9uXCI6W1wiV3JpZ2h0IFN0YXRlIFVuaXZlcnNpdHlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIktzaGl0aWpEZXNocGFuZGVAYXBwbGUuY29tXCIsXCJLc2hpdGlqLkRlc2hwYW5kZUBhcHBsZS5jb21cIixcIktEZXNocGFuZGVAYXBwbGUuY29tXCIsXCJLLkRlc2hwYW5kZUBhcHBsZS5jb21cIixcIkRlc2hwYW5kZUtzaGl0aWpAYXBwbGUuY29tXCIsXCJEZXNocGFuZGUuS3NoaXRpakBhcHBsZS5jb21cIixcIktzaGl0aWpAYXBwbGUuY29tXCIsXCJEZXNocGFuZGVAYXBwbGUuY29tXCIsXCJLREBhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJQYXVsIFN0dWFydFwiLFwiZmlyc3RcIjpcIlBhdWxcIixcImxhc3RcIjpcIlN0dWFydFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTIwNTQ2MTcyJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2Nzg2MzclMkNWU1JQdGFyZ2V0SWQlM0EyMDU0NjE3MiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlRTRS9Fc2NhbGF0aW9uc3x2Q2xvdWRTdWl0ZXx2U2hpZWxkfEluZnJhc3RydWN0dXJlfE5ldHdvcmt8RmF1bHR8U3RvcmFnZSBhdCBWTXdhcmVcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIERlbnZlciBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlZNd2FyZVRpbWUgV2FybmVyIENhYmxlQXBwbGUgUmV0YWlsXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVk13YXJlXCIsXCJJQk0gR2xvYmFsIFNlcnZpY2VzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiUGFyayBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJQYXVsU3R1YXJ0QGFwcGxlLmNvbVwiLFwiUGF1bC5TdHVhcnRAYXBwbGUuY29tXCIsXCJQU3R1YXJ0QGFwcGxlLmNvbVwiLFwiUC5TdHVhcnRAYXBwbGUuY29tXCIsXCJTdHVhcnRQYXVsQGFwcGxlLmNvbVwiLFwiU3R1YXJ0LlBhdWxAYXBwbGUuY29tXCIsXCJQYXVsQGFwcGxlLmNvbVwiLFwiU3R1YXJ0QGFwcGxlLmNvbVwiLFwiUFNAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiQXpoYXIgU2lrYW5kZXJcIixcImZpcnN0XCI6XCJBemhhclwiLFwibGFzdFwiOlwiU2lrYW5kZXJcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yMTAzMjA5MCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMjEwMzIwOTAlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTb2Z0d2FyZSBFbmdpbmVlciBpbiBUZXN0IGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJCZW50bGV5IFN5c3RlbXNcIixcIlF3ZXN0IENvbW11bmljYXRpb25zXCIsXCJOU0lEQywgVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBhdCBCb3VsZGVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBCb3VsZGVyXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJBemhhclNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiQXpoYXIuU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJBU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJBLlNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiU2lrYW5kZXJBemhhckBhcHBsZS5jb21cIixcIlNpa2FuZGVyLkF6aGFyQGFwcGxlLmNvbVwiLFwiQXpoYXJAYXBwbGUuY29tXCIsXCJTaWthbmRlckBhcHBsZS5jb21cIixcIkFTQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlJhbmppdCBNZW5vblwiLFwiZmlyc3RcIjpcIlJhbmppdFwiLFwibGFzdFwiOlwiTWVub25cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0yNDMzMTY4NiZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9r4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMjQzMzE2ODYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgUmVzZWFyY2ggU2NpZW50aXN0LCBBcHBsZSBNYXBzXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlBhY2lmaWMgR2FzIGFuZCBFbGVjdHJpYyBDb21wYW55XCIsXCJTY2huZWlkZXIgRWxlY3RyaWNcIixcIlRlbHZlbnQgTWluZXIgJiBNaW5lclwiXSxcImVkdWNhdGlvblwiOltcIkluZGlhbiBJbnN0aXR1dGUgb2YgVGVjaG5vbG9neSwgTWFkcmFzXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJSYW5qaXRNZW5vbkBhcHBsZS5jb21cIixcIlJhbmppdC5NZW5vbkBhcHBsZS5jb21cIixcIlJNZW5vbkBhcHBsZS5jb21cIixcIlIuTWVub25AYXBwbGUuY29tXCIsXCJNZW5vblJhbmppdEBhcHBsZS5jb21cIixcIk1lbm9uLlJhbmppdEBhcHBsZS5jb21cIixcIlJhbmppdEBhcHBsZS5jb21cIixcIk1lbm9uQGFwcGxlLmNvbVwiLFwiUk1AYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTGlhbmcgV2VpXCIsXCJmaXJzdFwiOlwiTGlhbmdcIixcImxhc3RcIjpcIldlaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTMwMTAzNTYxJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzMDEwMzU2MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBEYXRhIFNjaWVudGlzdCBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJJbmZvcm1hdGlvbiBUZWNobm9sb2d5IGFuZCBTZXJ2aWNlc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiQ2hlZ2cgSW5jLlwiLFwiQW1hem9uLmNvbVwiLFwiTHVjaWQgQ29tbWVyY2UgKEFjcXVpcmVkIGJ5IEFPTCBpbiAyMDE0KVwiXSxcImVkdWNhdGlvblwiOltcIlRoZSBDb2xsZWdlIG9mIFdpbGxpYW0gYW5kIE1hcnlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIkxpYW5nV2VpQGFwcGxlLmNvbVwiLFwiTGlhbmcuV2VpQGFwcGxlLmNvbVwiLFwiTFdlaUBhcHBsZS5jb21cIixcIkwuV2VpQGFwcGxlLmNvbVwiLFwiV2VpTGlhbmdAYXBwbGUuY29tXCIsXCJXZWkuTGlhbmdAYXBwbGUuY29tXCIsXCJMaWFuZ0BhcHBsZS5jb21cIixcIldlaUBhcHBsZS5jb21cIixcIkxXQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIktyaXN0aW5hIEd1bGlzaFwiLFwiZmlyc3RcIjpcIktyaXN0aW5hXCIsXCJsYXN0XCI6XCJHdWxpc2hcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0zNTY2MzM1NCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBMzU2NjMzNTQlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTdHJhdGVnaWMgU291cmNpbmcgTWFuYWdlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlVuaXRlZCBTdGF0ZXNcIixcImluZHVzdHJ5XCI6XCJDb25zdW1lciBFbGVjdHJvbmljc1wiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJKb2hucyBNYW52aWxsZVwiLFwiS29obGVyIENvLlwiLFwiQm9yZ1dhcm5lclwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgQ29sb3JhZG8gYXQgRGVudmVyXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJLcmlzdGluYUd1bGlzaEBhcHBsZS5jb21cIixcIktyaXN0aW5hLkd1bGlzaEBhcHBsZS5jb21cIixcIktHdWxpc2hAYXBwbGUuY29tXCIsXCJLLkd1bGlzaEBhcHBsZS5jb21cIixcIkd1bGlzaEtyaXN0aW5hQGFwcGxlLmNvbVwiLFwiR3VsaXNoLktyaXN0aW5hQGFwcGxlLmNvbVwiLFwiS3Jpc3RpbmFAYXBwbGUuY29tXCIsXCJHdWxpc2hAYXBwbGUuY29tXCIsXCJLR0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJTb25pYSBTYWluaVwiLFwiZmlyc3RcIjpcIlNvbmlhXCIsXCJsYXN0XCI6XCJTYWluaVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM4NDc3MjI2JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzODQ3NzIyNiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBRQSBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVGltZSBXYXJuZXIgQ2FibGVcIixcIkNvbWNhc3RcIixcIkdyZWJ3ZWJcIl0sXCJlZHVjYXRpb25cIjpbXCJQdW5qYWIgVGVjaG5pY2FsIFVuaXZlcnNpdHlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIlNvbmlhU2FpbmlAYXBwbGUuY29tXCIsXCJTb25pYS5TYWluaUBhcHBsZS5jb21cIixcIlNTYWluaUBhcHBsZS5jb21cIixcIlMuU2FpbmlAYXBwbGUuY29tXCIsXCJTYWluaVNvbmlhQGFwcGxlLmNvbVwiLFwiU2FpbmkuU29uaWFAYXBwbGUuY29tXCIsXCJTb25pYUBhcHBsZS5jb21cIixcIlNhaW5pQGFwcGxlLmNvbVwiLFwiU1NAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWljaGFlbCBUdXJuZXJcIixcImZpcnN0XCI6XCJNaWNoYWVsXCIsXCJsYXN0XCI6XCJUdXJuZXJcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD00MjM2MTE5MSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNDIzNjExOTElMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgJiBPUyBYIFNvZnR3YXJlIEVuZ2luZWVyXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIldheUluXCIsXCJUcm9wcHVzIFNvZnR3YXJlIENvcnBvcmF0aW9uXCIsXCJOYXRpb25hbCBBbmFseXRpY3MsIEluYy5cIl0sXCJlZHVjYXRpb25cIjpbXCJDb2xvcmFkbyBTdGF0ZSBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJNaWNoYWVsVHVybmVyQGFwcGxlLmNvbVwiLFwiTWljaGFlbC5UdXJuZXJAYXBwbGUuY29tXCIsXCJNVHVybmVyQGFwcGxlLmNvbVwiLFwiTS5UdXJuZXJAYXBwbGUuY29tXCIsXCJUdXJuZXJNaWNoYWVsQGFwcGxlLmNvbVwiLFwiVHVybmVyLk1pY2hhZWxAYXBwbGUuY29tXCIsXCJNaWNoYWVsQGFwcGxlLmNvbVwiLFwiVHVybmVyQGFwcGxlLmNvbVwiLFwiTVRAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiR2VvcmdlIEthbGFuZ2lcIixcImZpcnN0XCI6XCJHZW9yZ2VcIixcImxhc3RcIjpcIkthbGFuZ2lcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD01MjkwODA1MyZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNTI5MDgwNTMlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTb2Z0d2FyZSBFbmdpbmVlciBVSSBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhbiBGcmFuY2lzY28gQmF5IEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVJbmZvc3lzXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiVW5pdmVyc2l0eSBvZiBMb3Vpc2lhbmEgYXQgTGFmYXlldHRlXCIsXCJIQ0wgVGVjaG5vbG9naWVzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBMb3Vpc2lhbmEgYXQgTGFmYXlldHRlXCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJHZW9yZ2VLYWxhbmdpQGFwcGxlLmNvbVwiLFwiR2VvcmdlLkthbGFuZ2lAYXBwbGUuY29tXCIsXCJHS2FsYW5naUBhcHBsZS5jb21cIixcIkcuS2FsYW5naUBhcHBsZS5jb21cIixcIkthbGFuZ2lHZW9yZ2VAYXBwbGUuY29tXCIsXCJLYWxhbmdpLkdlb3JnZUBhcHBsZS5jb21cIixcIkdlb3JnZUBhcHBsZS5jb21cIixcIkthbGFuZ2lAYXBwbGUuY29tXCIsXCJHS0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJrIEdvdWxkc21pdGhcIixcImZpcnN0XCI6XCJNYXJrXCIsXCJsYXN0XCI6XCJHb3VsZHNtaXRoXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NjQ3NjEyMjUmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTY0NzYxMjI1JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiVGVjaG5vbG9neSArIE1lZGlhIFByb2R1Y3Rpb25cIixcImxvY2F0aW9uXCI6XCJBdXN0aW4sIFRleGFzIEFyZWFcIixcImluZHVzdHJ5XCI6XCJPbmxpbmUgTWVkaWFcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlbGVzZmlyZS5jb21cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJBcHBsZVwiLFwiSGFydGUtSGFua3MsIEluYy5cIixcIlBlYWsgUGVyZm9ybWVyc1wiXSxcImVkdWNhdGlvblwiOltcIk5ldyBNZXhpY28gU3RhdGUgVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiTWFya0dvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNYXJrLkdvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNR291bGRzbWl0aEBhcHBsZS5jb21cIixcIk0uR291bGRzbWl0aEBhcHBsZS5jb21cIixcIkdvdWxkc21pdGhNYXJrQGFwcGxlLmNvbVwiLFwiR291bGRzbWl0aC5NYXJrQGFwcGxlLmNvbVwiLFwiTWFya0BhcHBsZS5jb21cIixcIkdvdWxkc21pdGhAYXBwbGUuY29tXCIsXCJNR0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJUcmV2b3IgU2hlcmlkYW5cIixcImZpcnN0XCI6XCJUcmV2b3JcIixcImxhc3RcIjpcIlNoZXJpZGFuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NzIxMTg2NDImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTcyMTE4NjQyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiaU9TIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHcm91cG9uXCIsXCJUcmV2b3IgSW5jXCIsXCJTdXJlaWZ5LmNvbVwiXSxcImVkdWNhdGlvblwiOltdLFwicG9zc2libGVFbWFpbHNcIjpbXCJUcmV2b3JTaGVyaWRhbkBhcHBsZS5jb21cIixcIlRyZXZvci5TaGVyaWRhbkBhcHBsZS5jb21cIixcIlRTaGVyaWRhbkBhcHBsZS5jb21cIixcIlQuU2hlcmlkYW5AYXBwbGUuY29tXCIsXCJTaGVyaWRhblRyZXZvckBhcHBsZS5jb21cIixcIlNoZXJpZGFuLlRyZXZvckBhcHBsZS5jb21cIixcIlRyZXZvckBhcHBsZS5jb21cIixcIlNoZXJpZGFuQGFwcGxlLmNvbVwiLFwiVFNAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWFydmluIERlbGEgQ3J1elwiLFwiZmlyc3RcIjpcIk1hcnZpblwiLFwibGFzdFwiOlwiRGVsYVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTgyMDYxMzk3JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E4MjA2MTM5NyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIkVudGVycHJpc2UgU2VydmljZXMgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYWNyYW1lbnRvLCBDYWxpZm9ybmlhIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJEZXB0IG9mIFJlYWwgRXN0YXRlXCIsXCJDYWxpZm9ybmlhIFNlY3JldGFyeSBvZiBTdGF0ZVwiLFwiRWNsaXBzZS9JbnRlcmxvY1NvbHV0aW9uc1wiXSxcImVkdWNhdGlvblwiOltdLFwicG9zc2libGVFbWFpbHNcIjpbXCJNYXJ2aW5EZWxhQGFwcGxlLmNvbVwiLFwiTWFydmluLkRlbGFAYXBwbGUuY29tXCIsXCJNRGVsYUBhcHBsZS5jb21cIixcIk0uRGVsYUBhcHBsZS5jb21cIixcIkRlbGFNYXJ2aW5AYXBwbGUuY29tXCIsXCJEZWxhLk1hcnZpbkBhcHBsZS5jb21cIixcIk1hcnZpbkBhcHBsZS5jb21cIixcIkRlbGFAYXBwbGUuY29tXCIsXCJNREBhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJBemhhciBTaWthbmRlclwiLFwiZmlyc3RcIjpcIkF6aGFyXCIsXCJsYXN0XCI6XCJTaWthbmRlclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTIxMDMyMDkwJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EyMTAzMjA5MCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIGluIFRlc3QgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkJlbnRsZXkgU3lzdGVtc1wiLFwiUXdlc3QgQ29tbXVuaWNhdGlvbnNcIixcIk5TSURDLCBVbml2ZXJzaXR5IG9mIENvbG9yYWRvIGF0IEJvdWxkZXJcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIENvbG9yYWRvIEJvdWxkZXJcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIkF6aGFyU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJBemhhci5TaWthbmRlckBhcHBsZS5jb21cIixcIkFTaWthbmRlckBhcHBsZS5jb21cIixcIkEuU2lrYW5kZXJAYXBwbGUuY29tXCIsXCJTaWthbmRlckF6aGFyQGFwcGxlLmNvbVwiLFwiU2lrYW5kZXIuQXpoYXJAYXBwbGUuY29tXCIsXCJBemhhckBhcHBsZS5jb21cIixcIlNpa2FuZGVyQGFwcGxlLmNvbVwiLFwiQVNAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiUmFuaml0IE1lbm9uXCIsXCJmaXJzdFwiOlwiUmFuaml0XCIsXCJsYXN0XCI6XCJNZW5vblwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTI0MzMxNjg2JmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2vigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EyNDMzMTY4NiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBSZXNlYXJjaCBTY2llbnRpc3QsIEFwcGxlIE1hcHNcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiUGFjaWZpYyBHYXMgYW5kIEVsZWN0cmljIENvbXBhbnlcIixcIlNjaG5laWRlciBFbGVjdHJpY1wiLFwiVGVsdmVudCBNaW5lciAmIE1pbmVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiSW5kaWFuIEluc3RpdHV0ZSBvZiBUZWNobm9sb2d5LCBNYWRyYXNcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIlJhbmppdE1lbm9uQGFwcGxlLmNvbVwiLFwiUmFuaml0Lk1lbm9uQGFwcGxlLmNvbVwiLFwiUk1lbm9uQGFwcGxlLmNvbVwiLFwiUi5NZW5vbkBhcHBsZS5jb21cIixcIk1lbm9uUmFuaml0QGFwcGxlLmNvbVwiLFwiTWVub24uUmFuaml0QGFwcGxlLmNvbVwiLFwiUmFuaml0QGFwcGxlLmNvbVwiLFwiTWVub25AYXBwbGUuY29tXCIsXCJSTUBhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJMaWFuZyBXZWlcIixcImZpcnN0XCI6XCJMaWFuZ1wiLFwibGFzdFwiOlwiV2VpXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MzAxMDM1NjEmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTMwMTAzNTYxJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU2VuaW9yIERhdGEgU2NpZW50aXN0IGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJDaGVnZyBJbmMuXCIsXCJBbWF6b24uY29tXCIsXCJMdWNpZCBDb21tZXJjZSAoQWNxdWlyZWQgYnkgQU9MIGluIDIwMTQpXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVGhlIENvbGxlZ2Ugb2YgV2lsbGlhbSBhbmQgTWFyeVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiTGlhbmdXZWlAYXBwbGUuY29tXCIsXCJMaWFuZy5XZWlAYXBwbGUuY29tXCIsXCJMV2VpQGFwcGxlLmNvbVwiLFwiTC5XZWlAYXBwbGUuY29tXCIsXCJXZWlMaWFuZ0BhcHBsZS5jb21cIixcIldlaS5MaWFuZ0BhcHBsZS5jb21cIixcIkxpYW5nQGFwcGxlLmNvbVwiLFwiV2VpQGFwcGxlLmNvbVwiLFwiTFdAYXBwbGUuY29tXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiS3Jpc3RpbmEgR3VsaXNoXCIsXCJmaXJzdFwiOlwiS3Jpc3RpbmFcIixcImxhc3RcIjpcIkd1bGlzaFwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTM1NjYzMzU0JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0EzNTY2MzM1NCUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlN0cmF0ZWdpYyBTb3VyY2luZyBNYW5hZ2VyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiVW5pdGVkIFN0YXRlc1wiLFwiaW5kdXN0cnlcIjpcIkNvbnN1bWVyIEVsZWN0cm9uaWNzXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkpvaG5zIE1hbnZpbGxlXCIsXCJLb2hsZXIgQ28uXCIsXCJCb3JnV2FybmVyXCJdLFwiZWR1Y2F0aW9uXCI6W1wiVW5pdmVyc2l0eSBvZiBDb2xvcmFkbyBhdCBEZW52ZXJcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIktyaXN0aW5hR3VsaXNoQGFwcGxlLmNvbVwiLFwiS3Jpc3RpbmEuR3VsaXNoQGFwcGxlLmNvbVwiLFwiS0d1bGlzaEBhcHBsZS5jb21cIixcIksuR3VsaXNoQGFwcGxlLmNvbVwiLFwiR3VsaXNoS3Jpc3RpbmFAYXBwbGUuY29tXCIsXCJHdWxpc2guS3Jpc3RpbmFAYXBwbGUuY29tXCIsXCJLcmlzdGluYUBhcHBsZS5jb21cIixcIkd1bGlzaEBhcHBsZS5jb21cIixcIktHQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlNvbmlhIFNhaW5pXCIsXCJmaXJzdFwiOlwiU29uaWFcIixcImxhc3RcIjpcIlNhaW5pXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9Mzg0NzcyMjYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTM4NDc3MjI2JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU3IuIFFBIEVuZ2luZWVyIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJUaW1lIFdhcm5lciBDYWJsZVwiLFwiQ29tY2FzdFwiLFwiR3JlYndlYlwiXSxcImVkdWNhdGlvblwiOltcIlB1bmphYiBUZWNobmljYWwgVW5pdmVyc2l0eVwiXSxcInBvc3NpYmxlRW1haWxzXCI6W1wiU29uaWFTYWluaUBhcHBsZS5jb21cIixcIlNvbmlhLlNhaW5pQGFwcGxlLmNvbVwiLFwiU1NhaW5pQGFwcGxlLmNvbVwiLFwiUy5TYWluaUBhcHBsZS5jb21cIixcIlNhaW5pU29uaWFAYXBwbGUuY29tXCIsXCJTYWluaS5Tb25pYUBhcHBsZS5jb21cIixcIlNvbmlhQGFwcGxlLmNvbVwiLFwiU2FpbmlAYXBwbGUuY29tXCIsXCJTU0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNaWNoYWVsIFR1cm5lclwiLFwiZmlyc3RcIjpcIk1pY2hhZWxcIixcImxhc3RcIjpcIlR1cm5lclwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTQyMzYxMTkxJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E0MjM2MTE5MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcImlPUyAmIE9TIFggU29mdHdhcmUgRW5naW5lZXJcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIkFwcGxlXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiV2F5SW5cIixcIlRyb3BwdXMgU29mdHdhcmUgQ29ycG9yYXRpb25cIixcIk5hdGlvbmFsIEFuYWx5dGljcywgSW5jLlwiXSxcImVkdWNhdGlvblwiOltcIkNvbG9yYWRvIFN0YXRlIFVuaXZlcnNpdHlcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIk1pY2hhZWxUdXJuZXJAYXBwbGUuY29tXCIsXCJNaWNoYWVsLlR1cm5lckBhcHBsZS5jb21cIixcIk1UdXJuZXJAYXBwbGUuY29tXCIsXCJNLlR1cm5lckBhcHBsZS5jb21cIixcIlR1cm5lck1pY2hhZWxAYXBwbGUuY29tXCIsXCJUdXJuZXIuTWljaGFlbEBhcHBsZS5jb21cIixcIk1pY2hhZWxAYXBwbGUuY29tXCIsXCJUdXJuZXJAYXBwbGUuY29tXCIsXCJNVEBhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJHZW9yZ2UgS2FsYW5naVwiLFwiZmlyc3RcIjpcIkdlb3JnZVwiLFwibGFzdFwiOlwiS2FsYW5naVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTUyOTA4MDUzJmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmHigKZJZCUzQTM3MTczODAxNjE0MjE5MTA2ODEwMTElMkNWU1JQdGFyZ2V0SWQlM0E1MjkwODA1MyUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNvZnR3YXJlIEVuZ2luZWVyIFVJIGF0IEFwcGxlXCIsXCJsb2NhdGlvblwiOlwiU2FuIEZyYW5jaXNjbyBCYXkgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCIsXCJjb21wYW55XCI6XCJBcHBsZVwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJBcHBsZUluZm9zeXNcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIixcIkhDTCBUZWNobm9sb2dpZXNcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIExvdWlzaWFuYSBhdCBMYWZheWV0dGVcIl0sXCJwb3NzaWJsZUVtYWlsc1wiOltcIkdlb3JnZUthbGFuZ2lAYXBwbGUuY29tXCIsXCJHZW9yZ2UuS2FsYW5naUBhcHBsZS5jb21cIixcIkdLYWxhbmdpQGFwcGxlLmNvbVwiLFwiRy5LYWxhbmdpQGFwcGxlLmNvbVwiLFwiS2FsYW5naUdlb3JnZUBhcHBsZS5jb21cIixcIkthbGFuZ2kuR2VvcmdlQGFwcGxlLmNvbVwiLFwiR2VvcmdlQGFwcGxlLmNvbVwiLFwiS2FsYW5naUBhcHBsZS5jb21cIixcIkdLQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIk1hcmsgR291bGRzbWl0aFwiLFwiZmlyc3RcIjpcIk1hcmtcIixcImxhc3RcIjpcIkdvdWxkc21pdGhcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD02NDc2MTIyNSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNjQ3NjEyMjUlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJUZWNobm9sb2d5ICsgTWVkaWEgUHJvZHVjdGlvblwiLFwibG9jYXRpb25cIjpcIkF1c3RpbiwgVGV4YXMgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIk9ubGluZSBNZWRpYVwiLFwiY29tcGFueVwiOlwiQXBwbGVcIixcImN1cnJlbnRQb3NpdGlvblwiOlwiQXBwbGVsZXNmaXJlLmNvbVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkFwcGxlXCIsXCJIYXJ0ZS1IYW5rcywgSW5jLlwiLFwiUGVhayBQZXJmb3JtZXJzXCJdLFwiZWR1Y2F0aW9uXCI6W1wiTmV3IE1leGljbyBTdGF0ZSBVbml2ZXJzaXR5XCJdLFwicG9zc2libGVFbWFpbHNcIjpbXCJNYXJrR291bGRzbWl0aEBhcHBsZS5jb21cIixcIk1hcmsuR291bGRzbWl0aEBhcHBsZS5jb21cIixcIk1Hb3VsZHNtaXRoQGFwcGxlLmNvbVwiLFwiTS5Hb3VsZHNtaXRoQGFwcGxlLmNvbVwiLFwiR291bGRzbWl0aE1hcmtAYXBwbGUuY29tXCIsXCJHb3VsZHNtaXRoLk1hcmtAYXBwbGUuY29tXCIsXCJNYXJrQGFwcGxlLmNvbVwiLFwiR291bGRzbWl0aEBhcHBsZS5jb21cIixcIk1HQGFwcGxlLmNvbVwiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIlRyZXZvciBTaGVyaWRhblwiLFwiZmlyc3RcIjpcIlRyZXZvclwiLFwibGFzdFwiOlwiU2hlcmlkYW5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD03MjExODY0MiZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZh4oCmSWQlM0EzNzE3MzgwMTYxNDIxOTEwNjgxMDExJTJDVlNSUHRhcmdldElkJTNBNzIxMTg2NDIlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJpT1MgRW5naW5lZXIgYXQgQXBwbGVcIixcImxvY2F0aW9uXCI6XCJTYW4gRnJhbmNpc2NvIEJheSBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIkFwcGxlXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkdyb3Vwb25cIixcIlRyZXZvciBJbmNcIixcIlN1cmVpZnkuY29tXCJdLFwiZWR1Y2F0aW9uXCI6W10sXCJwb3NzaWJsZUVtYWlsc1wiOltcIlRyZXZvclNoZXJpZGFuQGFwcGxlLmNvbVwiLFwiVHJldm9yLlNoZXJpZGFuQGFwcGxlLmNvbVwiLFwiVFNoZXJpZGFuQGFwcGxlLmNvbVwiLFwiVC5TaGVyaWRhbkBhcHBsZS5jb21cIixcIlNoZXJpZGFuVHJldm9yQGFwcGxlLmNvbVwiLFwiU2hlcmlkYW4uVHJldm9yQGFwcGxlLmNvbVwiLFwiVHJldm9yQGFwcGxlLmNvbVwiLFwiU2hlcmlkYW5AYXBwbGUuY29tXCIsXCJUU0BhcHBsZS5jb21cIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJNYXJ2aW4gRGVsYSBDcnV6XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9ODIwNjEzOTcmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMTkxMDY4MTAxMSUyQ1ZTUlB0YXJnZXRJZCUzQTgyMDYxMzk3JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRW50ZXJwcmlzZSBTZXJ2aWNlcyBFbmdpbmVlciBhdCBBcHBsZVwiLFwibG9jYXRpb25cIjpcIlNhY3JhbWVudG8sIENhbGlmb3JuaWEgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkNvbXB1dGVyIFNvZnR3YXJlXCJ9XX1cbi8vd2luZG93LnJlc3VsdHMgPSB7XCJwZW9wbGVcIjpbe1wibmFtZVwiOntcImZ1bGxcIjpcIkVyaWMgS2ltYmVybGV5XCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTQ5NjA0NDImYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTE0OTYwNDQyJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiTGVhZCBTaXRlY29yZSAuTkVUIEFyY2hpdGVjdCAvIERldmVsb3BlciBhdCBSQkEsIEluYy5cIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIERlbnZlciBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJSQkEgQ29uc3VsdGluZyAoY29udHJhY3QpXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiR29kZnJleSAoY29udHJhY3QpXCIsXCJBZGVjY28gU3RhZmZpbmcgKGNvbnRyYWN0KVwiLFwiTWF5byBDbGluaWMgKGNvbnRyYWN0KVwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgTWlubmVzb3RhLVR3aW4gQ2l0aWVzXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiUmFtb24gR3VlcnJlcm9cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD0xMDY5NDI3NjYmYXV0aFR5cGU9T1VUX09GX05FVFdPUksm4oCmZCUzQTM3MTczODAxNjE0MjIwMzI1NDk4MDIlMkNWU1JQdGFyZ2V0SWQlM0ExMDY5NDI3NjYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJDb25zdWx0YW50IGF0IFJCQSBDb25zdWx0aW5nXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBEZW52ZXIgQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkluZm9ybWF0aW9uIFRlY2hub2xvZ3kgYW5kIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJSQkEsIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiTkdlbml1cyBHYW1lc1wiLFwiQUNUIENvbmZlcmVuY2luZ1wiLFwiRnVqaXRzdSBDb25zdWx0aW5nXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJMdUFubmUgTS5cIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD04MjY5MTc1JmF1dGhUeXBlPU9VVF9PRl9ORVRXT1JLJmF14oCmaElkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTgyNjkxNzUlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJFeGVjdXRpdmUgQXNzaXN0YW50IGF0IFJCQSBDb25zdWx0aW5nXCIsXCJsb2NhdGlvblwiOlwiRGFsbGFzL0ZvcnQgV29ydGggQXJlYVwiLFwiaW5kdXN0cnlcIjpcIkludGVybmV0XCIsXCJjb21wYW55XCI6XCJSQkEsIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiXCIsXCJwYXN0UG9zaXRpb25zXCI6W1wiSERWTVMgKFRydWUuY29tLCBBZFNodWZmbGUsIE1ldHJpYyBJbnRlcmFjdGl2ZSwgJiBILkQuIFZlc3QgSW52ZXN0aWdhdGlvbnMpXCJdLFwiZWR1Y2F0aW9uXCI6W119LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJQaGlsIFcuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTI3MTcxNTEmYXV0aFR5cGU9T1VUX09GX05FVFdPUksmYeKApklkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTEyNzE3MTUxJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiUmVnaW9uYWwgUHJhY3RpY2UgTWFuYWdlciBhdCBSQkEsIEluYy5cIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIE1pbm5lYXBvbGlzLVN0LiBQYXVsIEFyZWFcIixcImluZHVzdHJ5XCI6XCJDb21wdXRlciBTb2Z0d2FyZVwiLFwiY29tcGFueVwiOlwiUkJBLCBJbmMuXCIsXCJjdXJyZW50UG9zaXRpb25cIjpcIlwiLFwicGFzdFBvc2l0aW9uc1wiOltcIlJCQSwgSW5jLlwiLFwiTydSZWlsbHkgTWVkaWFcIixcIk1hbm5pbmcgUHVibGljYXRpb25zIENvLlwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgU3QuIFRob21hc1wiXX0se1wibmFtZVwiOntcImZ1bGxcIjpcIkNsYXJhIFNwb25pdHpcIn0sXCJwcm9maWxlTGlua1wiOlwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Byb2ZpbGUvdmlldz9pZD00ODQ2NTg2JmF1dGhUeXBlPU9QRU5MSU5LJmF1dGhUb2tl4oCmaElkJTNBMzcxNzM4MDE2MTQyMjAzMjU0OTgwMiUyQ1ZTUlB0YXJnZXRJZCUzQTQ4NDY1ODYlMkNWU1JQY21wdCUzQXByaW1hcnlcIixcImhlYWRsaW5lXCI6XCJTZW5pb3IgUmVjcnVpdGVyXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBNaW5uZWFwb2xpcy1TdC4gUGF1bCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJSQkEsIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJSQkEgQ29uc3VsdGluZ1wiLFwiVGVjaC1Qcm9cIixcIkNvbXB1d2FyZSBDb3Jwb3JhdGlvblwiXSxcImVkdWNhdGlvblwiOltcIlVuaXZlcnNpdHkgb2YgTWlubmVzb3RhLVR3aW4gQ2l0aWVzXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiTWljaGFlbCBMYXdyZW5jZVwifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTEyNjMzMDImYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2XigKZoSWQlM0EzNzE3MzgwMTYxNDIyMDMyNTQ5ODAyJTJDVlNSUHRhcmdldElkJTNBMTI2MzMwMiUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNlbmlvciBSZWNydWl0ZXIgQCBSQkFcIixcImxvY2F0aW9uXCI6XCJEYWxsYXMvRm9ydCBXb3J0aCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJSQkEsIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJHb2xkJ3MgR3ltIEludGVybmF0aW9uYWxcIixcIkJlYXJpbmdQb2ludFwiLFwiQnVjaGFuYW4gQXNzb2NpYXRlc1wiXSxcImVkdWNhdGlvblwiOltdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiV20gQW5kcmV3IEcuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9MTExMTE0OSZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdeKApmhJZCUzQTM3MTczODAxNjE0MjIwMzI1NDk4MDIlMkNWU1JQdGFyZ2V0SWQlM0ExMTExMTQ5JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiU29jaWFsIFN0cmF0ZWd5IGF0IFJCQSwgSW5jLiwgRW50ZXJwcmlzZSBHYW1pZmljYXRpb24gU3RyYXRlZ3ksIFBvcnRhbHMgYW5kIENvbGxhYm9yYXRpb24gU3RyYXRlZ3lcIixcImxvY2F0aW9uXCI6XCJEYWxsYXMvRm9ydCBXb3J0aCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiRmluYW5jaWFsIFNlcnZpY2VzXCIsXCJjb21wYW55XCI6XCJSQkEsIEluYy5cIixcImN1cnJlbnRQb3NpdGlvblwiOlwiUkJBLCBJbmMuSXJvbiBIb3JzZSBMYWNyb3NzZVwiLFwicGFzdFBvc2l0aW9uc1wiOltcIkNpdGlcIixcIkNsZWFyIEFsbGlhbmNlc1wiLFwiU2xhbG9tIENvbnN1bHRpbmdcIl0sXCJlZHVjYXRpb25cIjpbXCJUZXhhcyBTdGF0ZSBVbml2ZXJzaXR5LVNhbiBNYXJjb3NcIl19LHtcIm5hbWVcIjp7XCJmdWxsXCI6XCJDcmFpZyBKb25hc1wifSxcInByb2ZpbGVMaW5rXCI6XCJodHRwczovL3d3dy5saW5rZWRpbi5jb20vcHJvZmlsZS92aWV3P2lkPTE2NDEyNDEmYXV0aFR5cGU9T1BFTkxJTksmYXV0aFRva2XigKZoSWQlM0EzNzE3MzgwMTYxNDIyMDMyNTQ5ODAyJTJDVlNSUHRhcmdldElkJTNBMTY0MTI0MSUyQ1ZTUlBjbXB0JTNBcHJpbWFyeVwiLFwiaGVhZGxpbmVcIjpcIlNyLiBJVCBSZWNydWl0ZXIgYXQgUkJBLCBJbmMuXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBNaW5uZWFwb2xpcy1TdC4gUGF1bCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJSQkEsIEluYy5cIixcInBhc3RQb3NpdGlvbnNcIjpbXCJCT1JOL0Z1aml0c3UgQ29uc3VsdGluZ1wiLFwiQk9STlwiXSxcImVkdWNhdGlvblwiOltcIlN0LiBDbG91ZCBTdGF0ZSBVbml2ZXJzaXR5XCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSmFrZSBFc3RhcmVzXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9NDU0MTk4MyZhdXRoVHlwZT1PUEVOTElOSyZhdXRoVG9rZeKApmhJZCUzQTM3MTczODAxNjE0MjIwMzI1NDk4MDIlMkNWU1JQdGFyZ2V0SWQlM0E0NTQxOTgzJTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiQWNjb3VudCBFeGVjdXRpdmUgYXQgUkJBIENvbnN1bHRpbmdcIixcImxvY2F0aW9uXCI6XCJHcmVhdGVyIERlbnZlciBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiQ29tcHV0ZXIgU29mdHdhcmVcIixcImNvbXBhbnlcIjpcIlJCQSwgSW5jLlwiLFwiY3VycmVudFBvc2l0aW9uXCI6XCJcIixcInBhc3RQb3NpdGlvbnNcIjpbXCJOZXVkZXNpY1wiLFwiU3RhdGVyYVwiLFwiQWNjZWxlcmF0ZWQgTmV0d29yayBTb2x1dGlvbnNcIl0sXCJlZHVjYXRpb25cIjpbXCJVbml2ZXJzaXR5IG9mIE5vcnRoZXJuIENvbG9yYWRvXCJdfSx7XCJuYW1lXCI6e1wiZnVsbFwiOlwiSmF5IEwuXCJ9LFwicHJvZmlsZUxpbmtcIjpcImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9wcm9maWxlL3ZpZXc/aWQ9ODg2OTE1OCZhdXRoVHlwZT1PVVRfT0ZfTkVUV09SSyZhdeKApmhJZCUzQTM3MTczODAxNjE0MjIwMzI1NDk4MDIlMkNWU1JQdGFyZ2V0SWQlM0E4ODY5MTU4JTJDVlNSUGNtcHQlM0FwcmltYXJ5XCIsXCJoZWFkbGluZVwiOlwiRHluYW1pY3MgQ1JNIFByYWN0aWNlIERpcmVjdG9yICYgTWljcm9zb2Z0IEFsbGlhbmNlIERpcmVjdG9yXCIsXCJsb2NhdGlvblwiOlwiR3JlYXRlciBNaW5uZWFwb2xpcy1TdC4gUGF1bCBBcmVhXCIsXCJpbmR1c3RyeVwiOlwiSW5mb3JtYXRpb24gVGVjaG5vbG9neSBhbmQgU2VydmljZXNcIn1dfVxuXG5cbndpbmRvdy5jYWxsVGFiQWN0aW9uID0gZnVuY3Rpb24gKHRhYklkLCBhY3Rpb24sIGNhbGxiYWNrLCBhcmdzKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSB7dG86ICdjb250ZW50JywgYWN0aW9uOiBhY3Rpb24sIGFyZ3M6YXJnc307XG4gICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UodGFiSWQsIG1lc3NhZ2UsIGNhbGxiYWNrKVxufTtcblxud2luZG93LmdvID0gZnVuY3Rpb24gKHNldHRpbmdzKSB7XG5cbiAgICAvLyBmb3IgZGVidWdnaW5nXG4gICAgc2V0dGluZ3Muc2NyYXBlci5saW1pdCA9IDEwMDAwO1xuXG4gICAgdmFyIHJvdXRpbmUgPSBbXG4gICAgICAgIHNjcmFwZXIuc3RhcnQuYmluZCh1bmRlZmluZWQsIHNldHRpbmdzLCByZXN1bHRzKSxcbiAgICAgICAgZ2V0QmFzaWNJbmZvLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cyksXG4gICAgICAgIGdldE1pc3NpbmdOYW1lcy5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpXG4gICAgICAgIC8vcGVybXV0ZUVtYWlscy5zdGFydC5iaW5kKHVuZGVmaW5lZCwgc2V0dGluZ3MsIHJlc3VsdHMpXG4gICAgICAgIC8vdmFsaWRhdGVFbWFpbHNfb2xkLnN0YXJ0LmJpbmQodW5kZWZpbmVkLCBzZXR0aW5ncywgcmVzdWx0cylcbiAgICBdO1xuICAgIHJvdXRpbmUucHVzaChkb25lKTtcblxuICAgIGFzeW5jLnNlcmllcyhyb3V0aW5lKTtcbn07XG5mdW5jdGlvbiBkZWJ1Zygpe1xuICAgIGRlYnVnZ2VyO1xufVxuXG5mdW5jdGlvbiBkb25lKCkge1xuICAgIHdpbmRvdy5pc0ZpbmlzaGVkID0gdHJ1ZTtcbn1cblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKG1lc3NhZ2UsIHNlbmRlcil7XG4gICAgaWYobWVzc2FnZS5hY3Rpb24gPT0gXCJvcGVuQXBwXCIpe1xuICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDptZXNzYWdlLnBhdGh9KVxuICAgIH1cbn0pO1xuXG4vL3ZhciBwZXJtdXRlciA9IHJlcXVpcmUoJy4vcGVybXV0ZUVtYWlscy5qcycpO1xuLy92YXIgZmluZF9sYXN0X25hbWVzID0gcmVxdWlyZSgnLi9sYXN0X25hbWVzLmpzJyk7XG4vL3ZhciBlbWFpbF92ZXJpZmllciA9IHJlcXVpcmUoJy4vZW1haWxfY2hlY2suanMnKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWF0dGhldyBvbiAxLzE3LzE1LlxuICovXG52YXIgY3VycmVudFdvcmtpbmdUYWI7XG52YXIgaXNGaW5pc2hlZDtcbnZhciByZXN1bHRzO1xudmFyIG1hc3RlckNhbGxiYWNrO1xudmFyIHNldHRpbmdzO1xudmFyIGkgPSAwO1xudmFyIGN1cnJlbnRQZXJzb247XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG5cbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG5cbiAgICBpdGVyYXRlKClcbn1cblxuZnVuY3Rpb24gZ2V0QmFzaWNJbmZvKHBlcnNvbikge1xuaWYoIWN1cnJlbnRQZXJzb24pe2RlYnVnZ2VyO31cbiAgICBjdXJyZW50UGVyc29uID0gcGVyc29uO1xuICAgIGN1cnJlbnRQZXJzb24uY29tcGFueSA9IHNldHRpbmdzLmdlbmVyYWwuY29tcGFueU5hbWU7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYiB3aXRoIGxpbmsgYXJndW1lbnRcbiAgICBjaHJvbWUudGFicy5jcmVhdGUoe3VybDogcGVyc29uLnByb2ZpbGVMaW5rfSwgZnVuY3Rpb24gKHRhYikge1xuICAgICAgICBjdXJyZW50V29ya2luZ1RhYiA9IHRhYjtcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuICAgIGlmICh0YWJJZCA9PSBjdXJyZW50V29ya2luZ1RhYi5pZCAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcblxuICAgICAgICAvLyBnZXQgdGhlIHJlcXVpcmVkIGRhdGEgZnJvbSB0aGUgdGFiXG4gICAgICAgIGNhbGxUYWJBY3Rpb24oY3VycmVudFdvcmtpbmdUYWIuaWQsIFwiZ2V0QmFzaWNJbmZvXCIsIGhhbmRsZVJlc3BvbnNlKTtcblxuICAgICAgICAvLyBqdXN0IHRvIGJlIHNhZmUsIHJlbW92ZSB0aGUgbGlzdGVuZXJcbiAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHRhYlVwZGF0ZWQpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVSZXNwb25zZShyZXNwb25zZSkge1xuXG4gICAgJC5leHRlbmQoY3VycmVudFBlcnNvbiwgcmVzcG9uc2UpO1xuXG5cbiAgICAvKlxuICAgICB2YXIgbmFtZS5mdWxsID0gcmVzcG9uc2UubmFtZS5mdWxsLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICB2YXIgaGVhZGxpbmUgPSByZXNwb25zZS5oZWFkbGluZTtcblxuICAgICBzd2l0Y2ggKG5hbWUuZnVsbCl7XG4gICAgIGNhc2UgJ2xpbmtlZGluIG1lbWJlcic6XG4gICAgIH1cbiAgICAgKi9cbiAgICAvLyB3ZSdyZSBkb25lIHdpdGggdGhlIHRhYi4gcmVtb3ZlIGl0XG4gICAgY2hyb21lLnRhYnMucmVtb3ZlKGN1cnJlbnRXb3JraW5nVGFiLmlkKTtcblxuICAgIC8vIGRlY2lkZSB3aGV0aGVyIHRvIHJ1biBhZ2FpbiBvciBub3RcbiAgICBpZiAoaSArIDEgIT0gcmVzdWx0cy5wZW9wbGUubGVuZ3RoKSB7XG4gICAgICAgIGl0ZXJhdGUoKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBnZXRCYXNpY0luZm8ocmVzdWx0cy5wZW9wbGVbKytpXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGlzRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzRmluaXNoZWQ7XG4gICAgfSxcbiAgICBzdGFydDogaW5pdFxufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMjEvMTUuXG4gKi9cbnZhciBzZXR0aW5ncywgcmVzdWx0cywgbWFzdGVyQ2FsbGJhY2s7XG52YXIgaSA9IC0xO1xudmFyIGN1cnJlbnRQZXJzb247XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIGl0ZXJhdGUoKVxufVxuXG5mdW5jdGlvbiBpdGVyYXRlKCkge1xuICAgIGN1cnJlbnRQZXJzb24gPSByZXN1bHRzLnBlb3BsZVsrK2ldO1xuICAgIHZhciBjdXJyZW50UGVyc29uRnVsbE5hbWUgPSBjdXJyZW50UGVyc29uLm5hbWUuZnVsbDtcblxuICAgIGlmIChpICsgMSA9PSByZXN1bHRzLnBlb3BsZS5sZW5ndGgpIHtcbiAgICAgICAgbWFzdGVyQ2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc05hbWVIaWRkZW4oY3VycmVudFBlcnNvbkZ1bGxOYW1lKSB8fCBpc05hbWVBYmJyZXZpYXRlZChjdXJyZW50UGVyc29uRnVsbE5hbWUpKSB7XG4gICAgICAgIGdldE1pc3NpbmdOYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBmdWxsTmFtZVNwbGl0ID0gY3VycmVudFBlcnNvbkZ1bGxOYW1lLnNwbGl0KCd8JylbMF0uc3BsaXQoJyAnKTtcbiAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmZpcnN0ID0gZnVsbE5hbWVTcGxpdFswXTtcbiAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmxhc3QgPSBmdWxsTmFtZVNwbGl0WzFdO1xuICAgICAgICBpdGVyYXRlKClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldE1pc3NpbmdOYW1lKGNhbGxiYWNrKSB7XG4gICAgaWYgKCEoY3VycmVudFBlcnNvbiAmJlxuICAgICAgICBjdXJyZW50UGVyc29uLmhlYWRsaW5lICYmXG4gICAgICAgIGN1cnJlbnRQZXJzb24ucGFzdFBvc2l0aW9ucyAmJlxuICAgICAgICBjdXJyZW50UGVyc29uLmVkdWNhdGlvbiAmJlxuICAgICAgICBjdXJyZW50UGVyc29uLmNvbXBhbnkpKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy9kZWJ1Z2dlcjtcbiAgICB2YXIgc2VhcmNoVGV4dCA9IChcbiAgICBcInNpdGU6bGlua2VkaW4uY29tIFwiICtcbiAgICBjdXJyZW50UGVyc29uLmhlYWRsaW5lICsgJyAnICtcbiAgICBjdXJyZW50UGVyc29uLmN1cnJlbnRQb3NpdGlvbiArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5wYXN0UG9zaXRpb25zLmpvaW4oJyAnKSArICcgJyArXG4gICAgY3VycmVudFBlcnNvbi5lZHVjYXRpb24uam9pbignICcpICsgJyAnICtcbiAgICBjdXJyZW50UGVyc29uLmNvbXBhbnkpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMSAkMicpO1xuXG4gICAgdmFyIHVybCA9XG4gICAgICAgIFwiaHR0cDovL2dvb2dsZS5jb21cIiArXG4gICAgICAgIFwiI3E9XCIgK1xuICAgICAgICBzZWFyY2hUZXh0O1xuICAgIHZhciB0YWJpZDtcblxuICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih0YWJVcGRhdGVkKTtcblxuICAgIGZ1bmN0aW9uIHRhYlVwZGF0ZWQodGFiSWQsIGluZm8sIHRhYikge1xuXG4gICAgICAgIGlmICh0YWJJZCA9PSB0YWJpZCAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgIGNhbGxUYWJBY3Rpb24odGFiaWQsIFwiZ2V0TmFtZVwiLCBnb29nbGVSZXN1bHRSZXNwb25zZSk7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5vblVwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGFiVXBkYXRlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnb29nbGVSZXN1bHRSZXNwb25zZShuYW1lKSB7XG4gICAgICAgIGlmKG5hbWUgJiYgbmFtZS5maXJzdCAmJiBuYW1lLmxhc3Qpe1xuICAgICAgICAgICAgY3VycmVudFBlcnNvbi5uYW1lLmxhc3QgPSBuYW1lLmxhc3Q7XG4gICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiaWQpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IHVybH0sIGZ1bmN0aW9uICh0YWIpIHtcbiAgICAgICAgdGFiaWQgPSB0YWIuaWQ7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGlzTmFtZUhpZGRlbihuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT0gXCJsaW5rZWRpbiBtZW1iZXJcIlxufVxuXG5mdW5jdGlvbiBpc05hbWVBYmJyZXZpYXRlZChuYW1lKSB7XG4gICAgcmV0dXJuIG5hbWUuaW5kZXhPZignLicpICE9IC0xXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0XG59IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTUvMTQuXG4gKi9cbi8qKlxuICogQ3JlYXRlZCBieSBtYXR0aGV3IG9uIDEvMjEvMTUuXG4gKi9cbnZhciBzZXR0aW5ncywgcmVzdWx0cywgbWFzdGVyQ2FsbGJhY2s7XG5cbmZ1bmN0aW9uIGluaXQoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgc2V0dGluZ3MgPSBzZXR0aW5nc0FyZztcbiAgICByZXN1bHRzID0gcmVzdWx0c0FyZztcbiAgICBtYXN0ZXJDYWxsYmFjayA9IGNhbGxiYWNrQXJnO1xuICAgIHBlcm11dGVFbWFpbHMoKTtcbn1cblxuZnVuY3Rpb24gcGVybXV0ZUVtYWlscygpIHtcblxuICAgICQuZWFjaChyZXN1bHRzLnBlb3BsZSwgZnVuY3Rpb24gKGluZGV4LCBwZXJzb24pIHtcblxuXG4gICAgICAgIHZhciBuYW1lID0gcGVyc29uLm5hbWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbCA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdDogbmFtZS5maXJzdFswXSxcbiAgICAgICAgICAgICAgICBsYXN0OiBuYW1lLmxhc3RbMF1cblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdHMucGVvcGxlW2luZGV4XS5wb3NzaWJsZUVtYWlscyA9IFtcbiAgICAgICAgICAgIG5hbWUuZmlyc3QgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBuYW1lLmZpcnN0ICsgJy4nICsgbmFtZS5sYXN0LFxuICAgICAgICAgICAgaW5pdGlhbC5maXJzdCArIG5hbWUubGFzdCxcbiAgICAgICAgICAgIGluaXRpYWwuZmlyc3QgKyAnLicgKyBuYW1lLmxhc3QsXG4gICAgICAgICAgICBuYW1lLmxhc3QgKyBuYW1lLmZpcnN0LFxuICAgICAgICAgICAgbmFtZS5sYXN0ICsgJy4nICsgbmFtZS5maXJzdCxcbiAgICAgICAgICAgIG5hbWUuZmlyc3QsXG4gICAgICAgICAgICBuYW1lLmxhc3QsXG4gICAgICAgICAgICBpbml0aWFsLmZpcnN0ICsgaW5pdGlhbC5sYXN0XG4gICAgICAgIF0ubWFwKGZ1bmN0aW9uIChlbWFpbEFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1haWxBZGRyZXNzICsgc2V0dGluZ3MuZ2VuZXJhbC5lbWFpbERvbWFpbjtcbiAgICAgICAgICAgIH0pXG4gICAgfSk7XG4gICAgbWFzdGVyQ2FsbGJhY2soKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnQ6IGluaXRcbn1cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMTIvMTMvMTQuXG4gKi9cbi8vIHJlc3VsdHNcblxuLy8gc2NyYXBlIHN0YXR1c1xudmFyIHJ1bm5pbmcgPSBmYWxzZTtcblxudmFyIHNjcmFwZV90YWIgPSAwO1xuXG52YXIgc2V0dGluZ3M7XG52YXIgbWFzdGVyQ2FsbGJhY2s7XG5cbnZhciBpc0ZpbmlzaGVkID0gZmFsc2U7XG5cbnZhciBzdGF0dXMgPSB7fTtcbnZhciByZXN1bHRzO1xuXG5cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2V0dGluZ3NBcmcsIHJlc3VsdHNBcmcsIGNhbGxiYWNrQXJnKSB7XG4gICAgLy9pbml0aWFsaXphdGlvblxuICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgIHNldHRpbmdzID0gc2V0dGluZ3NBcmc7XG4gICAgcmVzdWx0cyA9IHJlc3VsdHNBcmc7XG4gICAgbWFzdGVyQ2FsbGJhY2sgPSBjYWxsYmFja0FyZztcbiAgICBzdGFydCgpO1xufVxuXG5mdW5jdGlvbiBzdGFydCgpIHtcbiAgICBmdW5jdGlvbiBnZXRCYXRjaChjYWxsYmFjaykge1xuICAgICAgICBhc3luYy5zZXJpZXMoW1xuICAgICAgICAgICAgY3JlYXRlX3NjcmFwZV90YWIsXG4gICAgICAgICAgICBnZXRQcm9maWxlTGlua3MsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHNjcmFwZV90YWIpO1xuICAgICAgICBzY3JhcGVfdGFiID0gZmFsc2U7XG4gICAgICAgIGlzRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICBtYXN0ZXJDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIC8vIHByb2dyYW0gY29udHJvbFxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7XG4gICAgICAgIGdldEJhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzdGF0dXMuZG9uZSkge1xuICAgICAgICAgICAgICAgIGZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBnZXRCYXRjaChjb250cm9sbGVyKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnRyb2xsZXIoKTtcbn1cblxuLy8gY3JlYXRlcyBhIHRhYiB3ZSdsbCB1c2UgZm9yIHNjcmVlbiBzY3JhcGluZ1xuZnVuY3Rpb24gY3JlYXRlX3NjcmFwZV90YWIoY2FsbGJhY2spIHtcbiAgICBpZiAoc2NyYXBlX3RhYikge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9XG4gICAgICAgICdodHRwOi8vbGlua2VkaW4uY29tLycgK1xuICAgICAgICAndnNlYXJjaC8nICtcbiAgICAgICAgJ3A/dGl0bGU9JyArIHNldHRpbmdzLmdlbmVyYWwucG9zaXRpb25GaWx0ZXIgK1xuICAgICAgICAnJmZfQ0M9JyArIHNldHRpbmdzLmdlbmVyYWwuQ29tcGFueUlEcyArXG4gICAgICAgICcmb3BlbkFkdmFuY2VkRm9ybT10cnVlJnRpdGxlU2NvcGU9QyZsb2NhdGlvblR5cGU9SSc7XG5cbiAgICAvLyBjcmVhdGUgdGhlIHRhYlxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiB1cmx9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIHNjcmFwZV90YWIgPSB0YWIuaWQ7XG4gICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcih3YWl0Rm9yVGFiKVxuICAgIH0pO1xuXG4gICAgLy8gYWZ0ZXIgdGFiIGNyZWF0aW9uIHJldHVybiBjb250cm9sIHRvIHRoZSBjYWxsaW5nIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gd2FpdEZvclRhYih0YWJJZCwgaW5mbykge1xuICAgICAgICBpZiAoaW5mby5zdGF0dXMgPT0gXCJjb21wbGV0ZVwiICYmIHRhYklkID09IHNjcmFwZV90YWIpIHtcbiAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih3YWl0Rm9yVGFiKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBnZXRQcm9maWxlTGlua3MoY2FsbGJhY2spIHtcbiAgICAvLyBhc2sgY29udGVudCBzY3JpcHQgZm9yIGFsbCB0aGUgcHJvZmlsZSBsaW5rcyBvbiB0aGUgcGFnZVxuICAgIGNhbGxUYWJBY3Rpb24oc2NyYXBlX3RhYiwgJ3NjcmFwZVByb2ZpbGVMaXN0JywgcHJvY2Vzc0xpbmtCYXRjaCk7XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzTGlua0JhdGNoKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHJlc3BvbnNlIGlzIGVtcHR5LCB3ZSBoYXZlIGFuIGlzc3VlXG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlc3BvbnNlIGZvciBwcm9jZXNzTGlua0JhdGNoIGlzOlwiICsgcmVzcG9uc2UuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc05leHRQYWdlID0gcmVzcG9uc2UuaGFzTmV4dFBhZ2U7XG4gICAgICAgIHZhciBsaW1pdCA9IHNldHRpbmdzLnNjcmFwZXIubGltaXQ7XG5cbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIG1vcmUgcGFnZXMsIHdlJ3JlIGRvbmUhXG4gICAgICAgIGlmICghaGFzTmV4dFBhZ2UpIHtcbiAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHdlJ3JlIGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHJlc3BvbnNlIGFuZCBhIG5leHQgcGFnZS4gd2UnbGwgY2hlY2sgYSBmZXcgdGhpbmdzIGFuZCBrZWVwIGdvaW5nXG4gICAgICAgIGVsc2UgaWYgKHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoICE9IDApIHtcblxuICAgICAgICAgICAgLy8gY29uY2F0ZW5hdGUgdGhlIHJlc3BvbnNlIHRvIG91ciBleGlzdGluZyBhcnJheVxuICAgICAgICAgICAgcmVzdWx0cy5wZW9wbGUgPSByZXN1bHRzLnBlb3BsZS5jb25jYXQocmVzcG9uc2UucmVzdWx0cyk7XG5cblxuICAgICAgICAgICAgaWYgKHJlc3VsdHMucGVvcGxlLmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgIHN0YXR1cy5kb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoe3VybDogXCJodHRwOi8vXCIgKyByZXNwb25zZS5uZXh0UGFnZX0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gcGFnZUNoYW5nZSh0YWJJZCwgaW5mbywgdGFiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gdGFiLnVybDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybCAhPSB1bmRlZmluZWQgJiYgdGFiSWQgPT0gc2NyYXBlX3RhYiAmJiBpbmZvLnN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFnZSBkb25lIGxvYWRpbmcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLm9uVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcihwYWdlQ2hhbmdlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHBhZ2VDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcigncmVhY2hlZCBlbHNlIHN0YXRlbWVudCBpbiBwcm9jZXNzTGlua0JhdGNoJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gdGhlIGFwaSBmb3IgdGhpcyBtb2R1bGVcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0OiBpbml0aWFsaXplLFxuICAgIHByb2ZpbGVMaW5rczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5wcm9maWxlTGlua3NcbiAgICB9LFxuICAgIGlzRmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzRmluaXNoZWRcbiAgICB9XG59O1xuXG5cbmZ1bmN0aW9uIGxvZyhtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcbn1cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hdHRoZXcgb24gMS8yMi8xNS5cbiAqL1xudmFyIHNldHRpbmdzLCByZXN1bHRzLCBtYXN0ZXJDYWxsYmFjaztcbnZhciBnbWFpbFRhYjtcbnZhciBjdXJyZW50UGVyc29uO1xudmFyIHN1Y2Nlc3NmdWxFbWFpbENvbWJvSW5kZXhlcyA9IFtdO1xudmFyIGVtYWlsRm91bmQgPSBmYWxzZTtcblxuZnVuY3Rpb24gaW5pdChzZXR0aW5nc0FyZywgcmVzdWx0c0FyZywgY2FsbGJhY2tBcmcpIHtcbiAgICBzZXR0aW5ncyA9IHNldHRpbmdzQXJnO1xuICAgIHJlc3VsdHMgPSByZXN1bHRzQXJnO1xuICAgIG1hc3RlckNhbGxiYWNrID0gY2FsbGJhY2tBcmc7XG4gICAgdmFsaWRhdGVFbWFpbHMoKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFbWFpbHMoKSB7XG4gICAgdmFyIGkgPSAwO1xuXG4gICAgYXN5bmMuc2VyaWVzKFtcbiAgICAgICAgY3JlYXRlR21haWxUYWIsXG4gICAgICAgIG5leHRQZXJzb25cbiAgICBdKTtcblxuICAgIGZ1bmN0aW9uIG5leHRQZXJzb24oKSB7XG4gICAgICAgIGN1cnJlbnRQZXJzb24gPSByZXN1bHRzLnBlb3BsZVtpXTtcblxuICAgICAgICBhc3luYy5zZXJpZXMoXG4gICAgICAgICAgICBjb21wb3NlTmV3RW1haWwsXG4gICAgICAgICAgICBmaW5kQ3VycmVudFBlcnNvbnNFbWFpbCgpXG4gICAgICAgIClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdtYWlsVGFiKGNhbGxiYWNrKSB7XG4gICAgY2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6IFwiaHR0cHM6Ly9nb29nbGUuY29tXCJ9LCBmdW5jdGlvbiAodGFiKSB7XG4gICAgICAgIGdtYWlsVGFiID0gdGFiLmlkO1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgfSlcbn1cbmZ1bmN0aW9uIGNvbXBvc2VOZXdFbWFpbChjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIHdhaXRGb3JMb2FkKHRhYklkLCBzdGF0dXMpIHtcbiAgICAgICAgaWYgKHRhYklkID09IGdtYWlsVGFiICYmIHN0YXR1cyA9PSBcImNvbXBsZXRlXCIpIHtcblxuICAgICAgICAgICAgY2hyb21lLnRhYnMub25VcGRhdGVkLnJlbW92ZUxpc3RlbmVyKHdhaXRGb3JMb2FkKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB9LCAxMjAwLCBjYWxsYmFjayk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNocm9tZS50YWJzLnVwZGF0ZShnbWFpbFRhYiwge3VybDogXCJodHRwczovL21haWwuZ29vZ2xlLmNvbS9tYWlsL3UvMC8/I2luYm94P2NvbXBvc2U9bmV3XCJ9LCB3YWl0Rm9yTG9hZClcbn1cbmZ1bmN0aW9uIGZpbmRDdXJyZW50UGVyc29uc0VtYWlsKGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgcG9zc2libGVFbWFpbHMgPSBjdXJyZW50UGVyc29uLnBvc3NpYmxlRW1haWxzO1xuICAgIHZhciBwcmlvcml0aXplZENvbWJvSW5kZXhlcztcbiAgICB2YXIgZW1haWwgPSBudWxsO1xuXG4gICAgaWYgKHN1Y2Nlc3NmdWxFbWFpbENvbWJvSW5kZXhlcy5sZW5ndGgpIHtcbiAgICAgICAgcHJpb3JpdGl6ZWRDb21ib0luZGV4ZXMgPSBzdWNjZXNzZnVsRW1haWxDb21ib0luZGV4ZXMuc3BsaWNlKCk7XG5cbiAgICAgICAgdmFyIGluZGV4ID0gcHJpb3JpdGl6ZWRDb21ib0luZGV4ZXMuc3BsaWNlKDAsIDEpO1xuICAgICAgICBlbWFpbCA9IHBvc3NpYmxlRW1haWxzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgdHJ5RW1haWwoZW1haWwsIHByb2Nlc3NSZXNwb25zZSlcbiAgICB9XG5cbiAgICBlbHNlIHtcbiAgICAgICAgZW1haWwgPSBwb3NzaWJsZUVtYWlscy5zcGxpY2UoMCwgMSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJ5RW1haWwoZW1haWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxUYWJBY3Rpb24oZ21haWxUYWIsICd0cnlFbWFpbCcsIHByb2Nlc3NSZXNwb25zZSwge2VtYWlsOmVtYWlsfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjdXJyZW50UGVyc29uLmVtYWlsID0gZW1haWw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
