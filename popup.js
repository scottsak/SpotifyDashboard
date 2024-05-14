document.getElementById('loginButton')?.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'login' });
});
