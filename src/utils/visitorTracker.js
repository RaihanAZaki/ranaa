export async function trackVisitor() {
  try {
    const trackingUrl =
      import.meta.env.VITE_TRACKING_API_URL || "/api/visitor";

    const visitorData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      page: window.location.href,
      referrer: document.referrer || null,
      accessedAtClient: new Date().toISOString(),
    };

    const response = await fetch(trackingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    });

    if (!response.ok) {
      console.error("Failed to track visitor:", response.status);
      return;
    }

    const result = await response.json();
    console.log("Visitor tracked successfully:", result);
  } catch (error) {
    console.error("Error tracking visitor:", error);
  }
}