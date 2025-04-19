const SCROLL_POSITION_KEY = 'scrollPosition';

export function saveScrollPosition() {
  sessionStorage.setItem(SCROLL_POSITION_KEY, window.scrollY.toString());
}

export function restoreScrollPosition() {
  const scrollPos = sessionStorage.getItem(SCROLL_POSITION_KEY);
  if (scrollPos) {
    window.scrollTo(0, Number(scrollPos));
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
  }
}
