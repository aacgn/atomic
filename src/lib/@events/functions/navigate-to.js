export function navigateTo(path) {
    const navigateData = { 
        hasAtomicSignature: true,
        event: 'navigate',
        data: path
    };

    window.postMessage(navigateData);
}