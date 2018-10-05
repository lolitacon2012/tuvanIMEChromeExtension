var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    //chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"alert('Ready to use.')"});
  }
  else{
    //chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"alert('Turned off.')"});
  }
});
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active && toggle) {
  	chrome.tabs.executeScript(tab.id, {file:"main.js"});
  }
})