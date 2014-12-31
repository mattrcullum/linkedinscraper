(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var people = [];
var permuter = require('./permuter.js');
var scraper = scrape();
var last_names = last_name();
var email_checker = email_check()/**
 * Created by matthew on 12/30/14.
 */

},{"./permuter.js":2}],2:[function(require,module,exports){
/**
 * Created by matthew on 12/15/14.
 */
var permute = (function () {
  function start(callback) {
    var domain = '@' + 'apple.com';
    $.each(people, function (index, person) {
      var name = person.name;
      var initial = {
        first: name.first[0],
        last: name.last[0]
      }

      people[index].possible_emails = [
        name.first + name.last,
        name.first + '.' + name.last,
        initial.first + name.last,
        initial.first + '.' + name.last,
        name.last + name.first,
        name.last + '.' + name.first,
        name.first,
        name.last,
        initial.first + initial.last
      ]
    })

    callback()
  }

  return {
    start: start
  }
})
},{}]},{},[1]);
