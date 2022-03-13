function saveItem(key, value) {
  localStorage.setItem(key, value);
}

function loadItem(key) {
  return localStorage.getItem(key);
}

function clearItem(key) {
  return localStorage.removeItem(key);
}

export { saveItem, loadItem, clearItem };
