// Jest 통합 테스트 설정
require('@testing-library/jest-dom');

// HTML5 미디어 요소 모의 설정
window.HTMLMediaElement.prototype.load = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn().mockImplementation(() => Promise.resolve());
window.HTMLMediaElement.prototype.pause = jest.fn();

// 이벤트 리스너 모의 설정
window.HTMLMediaElement.prototype.addEventListener = jest.fn();
window.HTMLMediaElement.prototype.removeEventListener = jest.fn();

// 미디어 속성 모의 설정
Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
  get: function() { return this._currentTime || 0; },
  set: function(time) { this._currentTime = time; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
  get: function() { return this._duration || 0; },
  set: function(duration) { this._duration = duration; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'volume', {
  get: function() { return this._volume || 1; },
  set: function(volume) { this._volume = volume; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'muted', {
  get: function() { return this._muted || false; },
  set: function(muted) { this._muted = muted; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'playbackRate', {
  get: function() { return this._playbackRate || 1; },
  set: function(rate) { this._playbackRate = rate; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'paused', {
  get: function() { return this._paused !== false; }
});

Object.defineProperty(window.HTMLMediaElement.prototype, 'ended', {
  get: function() { return this._ended || false; }
});
