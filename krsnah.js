var KrsnahMode = localStorage.getItem('KrsnahMode') === 'enabled';

function applyKrsnahMode() {
  if(!document.getElementById('dark-mode-style')){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('krsnah.css');
    link.id = 'dark-mode-style';
    document.head.appendChild(link);
  }
}

function removeKrsnahMode() {
  const link = document.getElementById('dark-mode-style');
  if(link) {
    link.remove();
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.action === 'toggleDarkMode') {
    KrsnahMode = !KrsnahMode;
    localStorage.setItem('KrsnahMode', KrsnahMode ? 'enabled': 'disabled');

    if(KrsnahMode) {
      applyKrsnahMode();
    }else{
      removeKrsnahMode();
    }
  }
});

if(KrsnahMode){
  applyKrsnahMode();
}