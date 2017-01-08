function sendMessageToTab(tabs) {
	browser.tabs.sendMessage(tabs[0].id, {forcecopy: true});
}

function error(msg) {
	console.err("ForceCopy Error: "+msg);
}

function msgHandler(request) {
	if (!request.forceCopyDone) return;
	var options = {
		type: "basic",
		message: browser.i18n.getMessage("notificationText"),
		title: "ForceCopy by MrOnlineCoder"
	};
	var msg = browser.notifications.create(
	  "ForceCopyDone",                  
	  options     
	);
}


function handler() {
  console.log("ForceCopy: Button clicked, sending message to context page");
  var querying = browser.tabs.query({currentWindow: true, active: true});
  querying.then(sendMessageToTab, error);
}

browser.browserAction.onClicked.addListener(handler);
browser.runtime.onMessage.addListener(msgHandler);