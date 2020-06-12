export function dispatchEvent(event, data, DOMNodeId = "") {
  const messageData = {
    hasAtomicSignature: true,
    event: event,
    data: data
  }

  if (DOMNodeId) {
    const DOMNode = document.getElementById(DOMNodeId);
    if (DOMNode && DOMNode.contentWindow) {
      DOMNode.addEventListener('load', () => {
        DOMNode.contentWindow.postMessage(messageData, '*');
      });
    }
  } else {
    window.postMessage(messageData);
  }
}
