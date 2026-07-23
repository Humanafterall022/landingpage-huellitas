// Client-side analytics tracker for HuellitasIA

let sessionId = '';
let startTime = 0;
let activeTimeSeconds = 0;
let lastActiveTimestamp = 0;
let maxScrollDepth = 0;
let clickedSurvey = false;
let isInitialized = false;

function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
}

function calculateScrollDepth(): number {
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || 1;
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  if (documentHeight <= windowHeight) return 100;
  const depth = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);
  return Math.min(100, Math.max(0, depth));
}

function updateActiveTime() {
  if (document.visibilityState === 'visible' && lastActiveTimestamp > 0) {
    const now = Date.now();
    const elapsed = Math.floor((now - lastActiveTimestamp) / 1000);
    if (elapsed > 0 && elapsed < 60) {
      activeTimeSeconds += elapsed;
    }
    lastActiveTimestamp = now;
  }
}

function sendSessionPayload(useBeacon = false) {
  updateActiveTime();

  const payload = JSON.stringify({
    sessionId,
    durationSeconds: activeTimeSeconds,
    maxScrollDepth,
    clickedSurvey
  });

  if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([payload], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/session', blob);
  } else {
    fetch('/api/analytics/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(() => {
      // Silent error catching for analytics
    });
  }
}

export function initAnalyticsTracker() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  sessionId = generateSessionId();
  startTime = Date.now();
  lastActiveTimestamp = startTime;
  maxScrollDepth = calculateScrollDepth();

  // Handle scroll events
  const handleScroll = () => {
    const currentDepth = calculateScrollDepth();
    if (currentDepth > maxScrollDepth) {
      maxScrollDepth = currentDepth;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Handle tab visibility changes
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      updateActiveTime();
      sendSessionPayload(true);
    } else {
      lastActiveTimestamp = Date.now();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Handle unload
  const handleBeforeUnload = () => {
    sendSessionPayload(true);
  };
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Initial session registration
  sendSessionPayload(false);

  // Heartbeat ping every 10 seconds
  window.setInterval(() => {
    sendSessionPayload(false);
  }, 10000);
}

export function trackSurveyClick() {
  clickedSurvey = true;
  updateActiveTime();

  fetch('/api/analytics/survey-click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
    keepalive: true
  }).catch(() => {});
}
