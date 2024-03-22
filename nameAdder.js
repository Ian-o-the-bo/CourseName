// ==UserScript==
// @name         Course name adder
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://uview.instructure.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_registerMenuCommand
// ==/UserScript==
/*-- GM_registerMenuCommand (menuName, callbackFunction, accessKey)
*/
(function () {
    'use strict';
    let e = window.location.pathname.match(/^\/courses\/([0-9]*)(.*)/).slice(1, 3)
    let eKey = "classKey" + e[0];
    if (e[0] != null) {
        if (!document.title.includes((localStorage[eKey])) && localStorage[eKey] != null) {
            document.title = localStorage["templateStr"].replaceAll('{original}', document.title).replaceAll('{classname}', localStorage[eKey]) || document.title + " for " + localStorage[eKey];
        } else if (localStorage[eKey] == null && (e[1].at(0) == null || e[1].at(0) == "#")) {
            localStorage[eKey] = document.title
        }
    }
    GM_registerMenuCommand("export", function (e) {
        prompt("Copy this", JSON.stringify((Object.entries(localStorage)).filter((e) => {
            debugger;
            let t = (e[0].toString());
            if (t.includes('classKey')) {
                return t
            }
        })))
    }, "e");
    GM_registerMenuCommand("import", function (e) {
        let data = prompt("Paste data below", "exported class names go here")
        JSON.parse(data).forEach((e) => {
            localStorage[e[0]] = e[1]
        })
    }, "i");
    GM_registerMenuCommand("edit config", function (e) {
        let conf = prompt("Put template string below. {original} will be replaced with the original title of the page, and {classname} will be replaced with the saved coursename", localStorage["templateStr"] || "{original} for {classname}")
        localStorage["templateStr"] = conf;
    }, "c");
    // Your code here...
})();