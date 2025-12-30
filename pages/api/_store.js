const store = new Map();

export function createPaste(id, data) {
  store.set(id, data);
}

export function getPaste(id) {
  return store.get(id);
}

export function deletePaste(id) {
  store.delete(id);
}
