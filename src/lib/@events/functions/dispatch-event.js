export function dispatchEvent(event, data, DOMNodeId = "") {
  const customEvent = new CustomEvent(event, {
    detail: {
      hasAtomicSignature: true,
      data: data
    }
  });

  if (DOMNodeId) {
    const DOMNode = document.getElementById(DOMNodeId);
    if (DOMNode && DOMNode.contentWindow) {
      DOMNode.addEventListener('load', () => {
        DOMNode.contentWindow.dispatchEvent(customEvent);
      });
    }
  } else {
    window.dispatchEvent(customEvent);
  }
}
