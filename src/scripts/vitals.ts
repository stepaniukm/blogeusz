import {
  onCLS,
  onFCP,
  onFID,
  onTTFB,
  onLCP,
  onINP,
  type Metric,
} from "web-vitals";

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
  params: string;
};

function sendToAnalytics(metric: Metric, options: Options) {
  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path
  );

  const body = {
    dsn: options.analyticsId,
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  if (options.debug) {
    console.log("[Analytics]", metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
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

export function webVitals(options: Options) {
  try {
    onFID(metric => sendToAnalytics(metric, options));
    onTTFB(metric => sendToAnalytics(metric, options));
    onLCP(metric => sendToAnalytics(metric, options));
    onCLS(metric => sendToAnalytics(metric, options));
    onFCP(metric => sendToAnalytics(metric, options));
    onINP(metric => sendToAnalytics(metric, options));
  } catch (err) {
    console.error("[Analytics]", err);
  }
}
