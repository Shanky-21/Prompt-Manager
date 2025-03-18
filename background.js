// Updated background.js with more logging
chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked');
  if (chrome.sidePanel) {
    console.log('Attempting to open side panel');
    chrome.sidePanel.open({
      windowId: tab.windowId
    }).then(() => {
      console.log('Side panel opened successfully');
    }).catch((error) => {
      console.error('Error opening side panel:', error);
    });
  } else {
    console.error('Side Panel API not available');
  }
});

chrome.commands.onCommand.addListener((command) => {
  console.log('Keyboard command received:', command);
  if (command === 'open_sidebar') {
    console.log('Open sidebar command triggered');
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        console.log('Active tab found');
        chrome.sidePanel.open({
          windowId: tabs[0].windowId
        }).then(() => {
          console.log('Side panel opened successfully');
        }).catch((error) => {
          console.error('Error opening side panel:', error);
        });
      } else {
        console.error('No active tab found');
      }
    });
  }
});