export function dispatchFreshStore(store, data) {
  const dispatchFreshStoreData = {
    hasAtomicSignature: true,
    event: "store",
    name: store,
    data: data,
  };

  window.postMessage(dispatchFreshStoreData);
}