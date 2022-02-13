function push(url) {
  history.pushState('', null, url);
}

export function createRouter() {
  return {
    push
  }
}