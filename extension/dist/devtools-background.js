chrome.devtools.panels.create(
  'Phoenix', 'icons/icon.png', 'front/out/index.html',
  panel => {
    // panel loaded
    // panel.onShown.addListener(onPanelShown)
    // panel.onHidden.addListener(onPanelHidden)

    // const l = localStorage.getItem('PHOENIXDEBUG');
    // console.log('localStorage', l);
    // console.log('window---------------', window.HOOK);
  },
)