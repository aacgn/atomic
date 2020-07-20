import { AtomicPublicEvents } from "../../@core/enums/atomic-public-events.enum";

export function dispatchEvent(event, data, DOMNodeIds) {
  const messageData = {
    hasAtomicSignature: true,
    event: event,
    data: data
  }

  DOMNodeIds.forEach(DOMNodeId => {
    const DOMNode = document.getElementById(DOMNodeId);
    if (DOMNode && DOMNode.contentWindow) {
      DOMNode.contentWindow.postMessage(messageData, '*');
    }
  });
  
}
