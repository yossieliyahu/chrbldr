

var copy = require('directory-copy'),
	fs = require("fs");


var bldr = {

	prms: {
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

	run: function (request, response) {

		var prms = request.query;
		if (prms.domain) {
			bldr.prms.domain = prms.domain;
		}

		bldr.prms.prdct = prms.prdct;
		bldr.prms.ep = prms.ep;
		bldr.prms.epid = prms.epid;
		bldr.prms.mmprdct = prms.mmprdct;

		bldr.createClient(function (rslt) {
			response.jsonp(rslt);
		});
		
	},

	createClient: function (clbk) {

		// copy the template to folder name bldr.prms.prdct
		try {
			var path = __dirname + '\\..\\..\\public\\prdcts\\' + bldr.prms.prdct;
			fs.mkdir(path, function (e) {
				if (!e || (e && e.code === 'EEXIST')) {

					copy({
						src: __dirname + '\\..\\..\\chr\\tmplt\\', dest: path, excludes: [/^\./] // Exclude hidden files
					},
					function () {
						fs.appendFile(path + "\\data.js", JSON.stringify(bldr.prms), function (err) {
							if (err) {
								clbk({ "err": err });
							}
							else {
								clbk({ msg: "done and saved" });
							}
						});

						
					  })
					  .on('log', function (msg, level) {
			  			// Level is debug, info, warn or error 
			  			console.log(level + ': ' + msg)
					  });

				} else {
					clbk({ err: "Product already exist" });
				}
			});
		}
		catch (e) {
			console.log(e);
		}
		// edit data.js inside this folder with structure bldr.prms

		// 
	}

};


module.exports = bldr;