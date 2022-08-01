export { }

type Info = {

}
type Tab = {

}

let lastTabId = 0;
// chrome.tabs.query({
//   active: true,
//   currentWindow: true
// }, (tabs) => {
//   let message = {
//     info: '来自popup的情书💌'
//   }
//   chrome.tabs.sendMessage(tabs[0].id, message, res => {
//     console.log('popup=>content')
//     console.log(res)
//   })
// })

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
  let message = {
    info
  }
  const { id = 0 } = tab || {};
  chrome.tabs.sendMessage(id, message, res => {
    console.log('popup=>content')
    console.log(res)
  })
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.pageAction.show(tabId);
  }
});

console.log("chrome", window.chrome);
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  console.log("????????????", tabs);

  lastTabId = tabs[0].id || 0;
  chrome.pageAction.show(lastTabId);
});

// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript(
//     tab.id,
//     {code: 'window.print();'});
// });

// chrome.runtime.onInstalled.addListener(function () {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { urlContains: '' },
//           })
//         ],
//         actions: [new chrome.declarativeContent.ShowPageAction()]
//       }
//     ]);
//   });
// });

chrome.contextMenus.create({
  title: "测试右键菜单",
  contexts: ['all'],
  onclick: () => {
    chrome.pageAction.show(lastTabId)
  }
});

