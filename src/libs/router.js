const CHNAGE_ROUTE_EVENT = 'locationChange';

const changeRoute = (url) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent(CHNAGE_ROUTE_EVENT));
}

export { changeRoute }