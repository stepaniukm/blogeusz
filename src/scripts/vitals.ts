// src/scripts/vitals.js

import { onCLS, onFCP, onFID, onTTFB, onLCP, Metric } from "web-vitals";

const vitalsUrl = "https://vitals.vercel-analytics.com/v1/vitals";

function getConnectionSpeed(): string {
  return "connection" in navigator &&
    navigator["connection"] &&
    typeof navigator["connection"] === "object" &&
    "effectiveType" in navigator["connection"]
    ? (navigator["connection"]["effectiveType"] as string)
    : "";
}

type Options = {
  analyticsId: string;
  path: string;
  debug: boolean;
};

function sendToAnalytics(metric: Metric, options: Options) {
  const body = {
    dsn: options.analyticsId, // qPgJqYH9LQX5o31Ormk8iWhCxZO
    id: metric.id, // v2-1653884975443-1839479248192
    page: options.path, // /blog/my-test
    href: location.href, // https://my-app.vercel.app/blog/my-test
    event_name: metric.name, // TTFB
    value: metric.value.toString(), // 60.20000000298023
    speed: getConnectionSpeed(), // 4g
  };

  if (options.debug) {
    console.log("[Analytics]", metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: "application/x-www-form-urlencoded",
  });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: "POST",
      credentials: "omit",
      keepalive: true,
    });
}

export function webVitals(options: any) {
  try {
    onFID(metric => sendToAnalytics(metric, options));
    onTTFB(metric => sendToAnalytics(metric, options));
    onLCP(metric => sendToAnalytics(metric, options));
    onCLS(metric => sendToAnalytics(metric, options));
    onFCP(metric => sendToAnalytics(metric, options));
  } catch (err) {
    console.error("[Analytics]", err);
  }
}
