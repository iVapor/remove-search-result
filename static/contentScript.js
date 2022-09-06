var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');
s.onload = function() {
    console.log('in content')
    this.remove();
};
(document.head || document.documentElement).appendChild(s);