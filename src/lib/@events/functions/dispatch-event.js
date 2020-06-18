export function dispatchEvent(event, data, DOMNodeIds = []) {
  const messageData = {
    hasAtomicSignature: true,
    event: event,
    data: data
  }

  if (DOMNodeIds) {
    DOMNodeIds.forEach(DOMNodeId => {
      const DOMNode = document.getElementById(DOMNodeId);
      if (DOMNode && DOMNode.contentWindow) {
        DOMNode.contentWindow.postMessage(messageData, '*');
      }
    });
  } else {
    window.postMessage(messageData);
  }
  
}
