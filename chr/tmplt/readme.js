

/*

plugins are running outside the sandbox of the browser and interacting with the browser
extensions runs within the browser 

Background page


UI pages


Content script 



--------------------------

chrome.storage - objects - not just strings.
chrome.storage.syc - data from the cloud (for local instance: chrome.storage.local)

chrome.notification

*/

/*
	,

	"background":{
		"scripts":["background.js"],
		"persistent":true
	},

	"options_page" : "options.html",

	"content_scripts":[
		{
			"matches":["http://*/*","https://*/*"],
	"js":["cscript.js","jquery-1.10.2.js"],
	"css":["cscript.css"]
}
],

"permissions":[
	"tabs",
	"storage",
	"notifications",
	"contextMenus"
]
*/