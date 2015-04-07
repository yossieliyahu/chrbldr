

// message from the background page and popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	if (request.mntr_sender == "background") {
		var d_ = document.createElement("script");
		d_.src = request.mntr_msg.url;
		document.body.appendChild(d_);

		var e_ = document.createElement("div");
		e_.setAttribute("style", "width:100%;height:60px;border:1px solid black;background-color:white;position:absolute;left:0px;top:0px;z-index:999999");
		e_.innerText = request.mntr_msg.url;
		document.body.appendChild(e_);
	}

	// chrome.runtime.sendMessage({ mntr_sender: "cscript", mntr_msg: "Hello background from cscript" });
});

(function () {
	// ask for the link to inject
	chrome.runtime.sendMessage({ mntr_sender: "cscript" });
})();


