chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ timezones: [], images: [] });
});