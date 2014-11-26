chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    {
      id: 'mainWindow',
      state: "maximized"
    },
    function(win) {
        win.maximize();
    });
});
