document.getElementById('loginButton')?.addEventListener('click', () => {
  console.log('scotttest hits inside popup');
  chrome.runtime.sendMessage({ type: 'login' });
});
