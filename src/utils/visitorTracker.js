function getDeviceInfo() {
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const maxTouchPoints = navigator.maxTouchPoints || 0;

  let deviceBrand = "Unknown";
  let deviceName = "Unknown";
  let deviceType = "desktop";
  let osName = "Unknown";
  let osVersion = "Unknown";

  const isIphone = /iPhone/i.test(userAgent);
  const isIpad =
    /iPad/i.test(userAgent) ||
    (platform === "MacIntel" && maxTouchPoints > 1);

  const isAndroid = /Android/i.test(userAgent);
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent);
  const isWindows = /Win32|Win64|Windows|WinCE/i.test(platform);
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(userAgent);

  if (isIphone) {
    deviceBrand = "Apple";
    deviceName = "iPhone";
    deviceType = "mobile";
    osName = "iOS";

    const match = userAgent.match(/OS\s([\d_]+)/i);
    if (match) {
      osVersion = match[1].replace(/_/g, ".");
    }
  } else if (isIpad) {
    deviceBrand = "Apple";
    deviceName = "iPad";
    deviceType = "tablet";
    osName = "iPadOS";

    const match = userAgent.match(/OS\s([\d_]+)/i);
    if (match) {
      osVersion = match[1].replace(/_/g, ".");
    }
  } else if (isAndroid) {
    deviceBrand = "Android";
    deviceType = isMobile ? "mobile" : "tablet";
    osName = "Android";

    const versionMatch = userAgent.match(/Android\s([\d.]+)/i);
    if (versionMatch) {
      osVersion = versionMatch[1];
    }

    const modelMatch = userAgent.match(/Android\s[\d.]+;\s?([^;)]+)/i);
    if (modelMatch) {
      deviceName = modelMatch[1].replace(/Build.*/i, "").trim();
    } else {
      deviceName = "Android Device";
    }
  } else if (isMac) {
    deviceBrand = "Apple";
    deviceName = "Mac";
    deviceType = "desktop";
    osName = "macOS";
  } else if (isWindows) {
    deviceBrand = "Microsoft";
    deviceName = "Windows PC";
    deviceType = "desktop";
    osName = "Windows";
  }

  return {
    deviceBrand,
    deviceName,
    deviceType,
    osName,
    osVersion,
    isMobile,
    platform,
    maxTouchPoints,
  };
}

export async function trackVisitor() {
  try {
    const trackingUrl = "/api/visitor";

    const deviceInfo = getDeviceInfo();

    const visitorData = {
      ...deviceInfo,

      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      page: window.location.href,
      referrer: document.referrer || null,
      accessedAtClient: new Date().toISOString(),
    };

    console.log("Sending visitor data:", visitorData);

    const response = await fetch(trackingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    });

    const result = await response.json();

    console.log("Visitor tracked successfully:", result);
  } catch (error) {
    console.error("Error tracking visitor:", error);
  }
}