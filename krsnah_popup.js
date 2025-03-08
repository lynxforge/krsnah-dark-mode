document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('krsnah-mode');

    toggleButton.addEventListener('click', async() => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if(!tab) return;

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["krsnah.js"]
        });

        chrome.tabs.sendMessage(tab.id, {action: 'toggleDarkMode'});
    });
});