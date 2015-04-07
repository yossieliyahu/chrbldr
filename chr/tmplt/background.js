
if (!window.mntr) {
	window.mntr = {};
}

var mngr = {

	envData: {
		domain: "mash-pot.com",
		prdct: "shopwit",
		vrsn: "1.0.0.1",
		instlDate: 0,
		smplGrp: "na",
		afltId: "na",
		hrdId: 0,
		apps: "",
		ep: "shopwit",
		epid: "shopwitmpvep",
		mmprdct: "shopwitmpvn",
		instlRef: "na",
		prms: "na",
		rnd: 0
	},

	url: "http://cnfg.${domain}/cnfg/inpage.srf?" +
	"prdct=${prdct}" +
	"&vrsn=${vrsn}" +
	"&instlDate=${instlDate}" +
	"&hrdId=${hrdId}" +
	"&apps=${apps}" +
	"&ep=${ep}" +
	// 2do - add hdrmd5
	"&epid=${epid}" +
	"&mmprdct=${mmprdct}" +
	"&smplGrp=${smplGrp}" +
	"&afltId=${afltId}" +
	"&loader=pagePlatformLoader" +
	"&r=${rnd}",

	init: function () {
		debugger;
		if (!window.mntr.envData) {
			window.mntr.envData = mngr.envData; // default
		}

		mngr.strg.init(function () {
			mngr.loadEnv();
		});
	},

	loadEnv: function () {
		mngr.strg.gt("instlDate", function (iDate) {

			if (!window.mntr.envData.hrdId) {
				var hId = mngr.hrdId();
				mngr.strg.st("hrdId", (hId || "123"));
			}

			if (iDate === 0) {
				mngr.rpt("inst");
			}
		});
	},

	pushUrl: function () {
		return mngr.format(mngr.url);
	},

	format: function (txt) {
		return txt.replace(/\${([^{}]*)}/g,
            function (a, b) {
            	var r = window.mntr.envData[b];
            	return r || a;
            }
        );
	},

	strg: {

		bNotInit: true,

		init: function (clbk) {
			mngr.strg.gt("mntr_strg", function (savedData) {
				if (savedData) {
					window.mntr.envData = savedData;
				}
				else {
					chrome.storage.sync.set({ "mntr_strg": window.mntr.envData });
				}
				clbk();
			});
		},

		st: function (k, v) {
			window.mntr.envData[k] = v;
			chrome.storage.sync.set({ "mntr_strg": window.mntr.envData });
		},

		gt: function (k, clbk) {
			if (window.mntr.envData[k] || window.mntr.envData[k] == 0) {
				clbk(window.mntr.envData[k]);
			}
			else if (mngr.strg.bNotInit) {
				chrome.storage.sync.get(k, function (data) {
					try {
						mngr.strg.bNotInit = true;
						if (data && data.mntr_strg) {
							try { clbk(data.mntr_strg); } catch (e) { }
							return;
						}
					}
					catch (e) { }
					clbk(null);
				});
			}
			else {
				clbk(null);
			}
		}
	},

	hrdId: function (clbk) {
		var tmp = "123";
		try {
			tmp = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
				try {
					var r = Math.random() * 16 | 0,
						v = c == "x" ? r : (r & 3 | 8);

					return v.toString(16);
				}
				catch (e) { }
			}).toUpperCase();
		}
		catch (e) { }
		return tmp;
	},

	rpt: function (typ) {
		try {
			var rpt = "";
			if (typ == "inst") {
				rpt = mngr.format("http://cnfg.${domain}/cnfg/instl.srf?" +
					"nsisState=0" +
					"&prdct=${prdct}" +
					"&aflt=${afltId}" +
					"&instlDate=0" +
					"&vrsn=${vrsn}" +
					"&instlRef=${instlRef}" +
					"&hardId=${hrdId}" +
					"&smplGrp=${smplGrp}" +
					"&rd=${rnd}&");
			}

			if (rpt) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", rpt, true);
				xhr.send();
			}
		}
		catch (e) { }
	}
};

// Message from the content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.mntr_sender == "cscript") {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { mntr_sender: "background", mntr_msg: { url: mngr.pushUrl() } });
		});
	}
});
