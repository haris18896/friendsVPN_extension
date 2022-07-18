// listen for incoming message from the content-script

const ip = '119.152.152.163'

var config = {
  mode: 'pac_script',
  pacScript: {
    data:
      'function FindProxyForURL(url, host) {\n' +
      "  if (host == 'www.google.com')\n" +
      "    return 'PROXY 119.152.152.163:80';\n" +
      "  return 'DIRECT';\n" +
      '}',
  },
}

self.addEventListener('message', function (event) {
  self.clients.matchAll().then(all =>
    all.forEach(client => {
      client.postMessage('Responding to ' + event.data)

      if (event?.data === 'setProxy') {
        chrome.proxy.settings.set({ value: config, scope: 'regular' }, function () {
          console.log('Proxy settings applied.')
        })
      } else if (event?.data === 'unsetProxy') {
        chrome.proxy.settings.set({ value: { mode: 'direct' }, scope: 'regular' }, function () {
          console.log('Proxy settings Reset.')
        })
      }
    })
  )
})

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  if (sender.url !== 'https://*.freindsvpnpro.com/*') return // don't allow other web page access
  if (request.openUrlInEditor) {
    console.log('openUrlInEditor', request.openUrlInEditor)
    openUrl(request.openUrlInEditor)
  }
})
