(function (global) {
  const KEY = "cdc-planning-progress-v3";

  const defaultState = () => ({
    version: 3,
    phase: "intro",
    currentCell: null,
    visited: {},
    quiz: {},
    soundEnabled: true,
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const s = { ...defaultState(), ...JSON.parse(raw) };
      if (s.phase === "cell" && !s.currentCell) s.phase = "map";
      return s;
    } catch (e) {
      return defaultState();
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function clear() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
  }

  global.CDCStorage = { load, save, clear, defaultState };
})(window);
