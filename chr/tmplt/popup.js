

$(function () {

	// send message to the content script
	$('#msgToCt').click(function () {
		// OK
    	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    		chrome.tabs.sendMessage(tabs[0].id, { mntr_sender: "popup", mntr_msg: "Hello content script from popup" });
    	});
    });

	// send message to the background page
	$('#msgToBg').click(function () {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { mntr_sender: "popup", mntr_msg: "Hello background from popup" });
		});
	});
	
	//  || 

	// listen to messages from the content script
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

		return;
    	if (request.mntr_sender == "cscript") {
    		console.log("[pp.js] popup page receive a message from [" + request.mntr_sender + "] -- MSG: [" + request.mntr_msg + "]");
    		alert("[pp.js - cscript] " + request.mntr_msg);
    	}
    	else if(request.mntr_sender == "background"){
    		console.log("[pp.js] popup page receive a message from [" + request.mntr_sender + "] -- MSG: [" + request.mntr_msg + "]");
    		alert("[pp.js - background] " + request.mntr_msg);
    	}
    });

	/*
    $('#name').keyup(function () {
    	$('#greeting').text('Hi, ' + $('#name').val() + '!');
    });
	*/
});


/*
$(function () {
    chrome.storage.sync.get(['total','goal'], function (items) {
        $('#total').text(items.total);
        $('#goal').text(items.goal);
    });


    $('#addAmount').click(function () {
        chrome.storage.sync.get(['total','goal'], function (items) {
            var newTotal = 0;
            if (items.total) {
                newTotal += parseInt(items.total);
            }

            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({ 'total': newTotal });
            $('#total').text(newTotal);
            $('#amount').val('');

            if (newTotal >= items.goal) {
                var opt = {
                    type: "basic",
                    title: "Goal reached!",
                    message: "You reached your goal of " + items.goal + "!",
                    iconUrl: "icon.png"
                }

                chrome.notifications.create('goalReached', opt, function () { });
            }
        });
    });
});
*/