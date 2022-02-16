export function phoenixDebugStatusGet() {
  const data = localStorage.getItem(`PHOENIXDEBUG`);
  return JSON.parse(data) || false;
}

export const RemoteAppsConfig = {
  get() {
    const data = localStorage.getItem(`micro-apps_origin`);
    return JSON.parse(data) || false;
  },
  set(data) {
    localStorage.setItem(`micro-apps_remote`, JSON.stringify(data));
  }
}

export function createAppsConfig(key) {
  return {
    get() {
      const data = localStorage.getItem(`micro-apps_${key}`);
      return JSON.parse(data);
    },
    set(data) {
      localStorage.setItem(`micro-apps_${key}`, JSON.stringify(data));
    },
  }
}