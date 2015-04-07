
alert("data loaded");

if (!window.mntr) {
	window.mntr = {};
}

setTimeout(function (){ mngr.init();}, 500);

window.mntr.envData = 