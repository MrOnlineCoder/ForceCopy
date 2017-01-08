console.log("ForceCopy: Attached content script");

function returnTrue() {
	return true;
}

function enableSelectionOnTab() {
	document.onmousedown = returnTrue;
	console.log("ForceCopy: onmousedown for document removed.");
	document.oncontextmenu = returnTrue;
	console.log("ForceCopy: oncontextmenu for document removed.");
	console.log("ForceCopy: Removing listeners for general text tags");
	var matches = document.querySelectorAll("p, article, li, body");
	for (var i=0;i<matches.length;i++) {
		var item = matches[i];
		item.style.userSelect = "auto";
		item.style.MozUserSelect = "auto";
		item.onmousedown = returnTrue;
		item.oncontextmenu = returnTrue;
	}

	console.log("ForceCopy: Proccessed "+matches.length+" elements.");
	document.body.oncopy = returnTrue;
	document.body.oncut = returnTrue;
	document.body.onpaste = returnTrue;
	console.log("ForceCopy: Fixed on copy/paste/cut in document.body");
	console.log("ForceCopy: Done. Now try to select the text");
	var options = {
		type: "basic",
		message: "Done. Probably, now you can select content on the page!",
		title: "ForceCopy by MrOnlineCoder"
	};
	browser.runtime.sendMessage({forceCopyDone: true});
	var msg = browser.notifications.create(
	  "ForceCopyDone",                  
	  options     
	);
}


function handleMessage(request, sender, sendResponse) {
  console.log(request);
  if (request.forcecopy) {
  	console.log("ForceCopy: Received message from Background script.");
  	console.log("ForceCopy: Calling enableSelectionOnTab()");
  	enableSelectionOnTab();
  }
}

browser.runtime.onMessage.addListener(handleMessage);