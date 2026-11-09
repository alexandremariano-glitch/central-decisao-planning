(function (global) {
  let ctx = null;
  let enabled = true;

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function setEnabled(v) {
    enabled = !!v;
  }

  function tone(freq, duration, type, gainValue, when) {
    if (!enabled) return;
    const audio = ensure();
    if (!audio) return;
    const t0 = when || audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(gainValue || 0.08, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  function click() {
    tone(640, 0.08, "triangle", 0.05);
  }

  function unlock() {
    tone(420, 0.12, "sine", 0.06);
    tone(620, 0.18, "sine", 0.05, (ensure() || { currentTime: 0 }).currentTime + 0.08);
  }

  function seal() {
    const audio = ensure();
    if (!audio || !enabled) return;
    tone(520, 0.15, "square", 0.04);
    tone(780, 0.22, "sine", 0.05, audio.currentTime + 0.1);
    tone(1040, 0.28, "sine", 0.04, audio.currentTime + 0.2);
  }

  function whoosh() {
    if (!enabled) return;
    const audio = ensure();
    if (!audio) return;
    const t0 = audio.currentTime;
    const bufferSize = audio.sampleRate * 0.35;
    const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const src = audio.createBufferSource();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, t0);
    filter.frequency.exponentialRampToValueAtTime(2200, t0 + 0.25);
    gain.gain.setValueAtTime(0.05, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35);
    src.buffer = buffer;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(audio.destination);
    src.start(t0);
  }

  function alert() {
    tone(880, 0.1, "square", 0.04);
    tone(660, 0.12, "square", 0.04, (ensure() || { currentTime: 0 }).currentTime + 0.12);
  }

  function success() {
    const audio = ensure();
    if (!audio || !enabled) return;
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.18, "sine", 0.05, audio.currentTime + i * 0.09));
  }

  global.CDCSound = { setEnabled, click, unlock, seal, whoosh, alert, success, ensure };
})(window);
