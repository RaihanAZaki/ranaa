function getVisitorIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const cfIp = req.headers["cf-connecting-ip"];

  let ip =
    cfIp ||
    realIp ||
    (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
    req.socket?.remoteAddress ||
    "unknown";

  if (ip === "::1") {
    ip = "localhost";
  }

  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  return ip;
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({
      status: "OK",
      message: "Visitor API is running",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const body = req.body || {};

    const visitorLog = {
      ip: getVisitorIp(req),

      deviceBrand: body.deviceBrand || null,
      deviceName: body.deviceName || null,
      deviceType: body.deviceType || null,
      osName: body.osName || null,
      osVersion: body.osVersion || null,
      isMobile: body.isMobile ?? null,

      userAgent: body.userAgent || null,
      language: body.language || null,
      languages: body.languages || null,
      platform: body.platform || null,
      maxTouchPoints: body.maxTouchPoints || null,

      screenWidth: body.screenWidth || null,
      screenHeight: body.screenHeight || null,
      viewportWidth: body.viewportWidth || null,
      viewportHeight: body.viewportHeight || null,

      timezone: body.timezone || null,
      page: body.page || null,
      referrer: body.referrer || null,

      accessedAtClient: body.accessedAtClient || null,
      accessedAtServer: new Date().toISOString(),
    };

    console.log("VISITOR_LOG:", JSON.stringify(visitorLog));

    return res.status(201).json({
      message: "Visitor tracked",
      data: visitorLog,
    });
  } catch (error) {
    console.error("Failed to track visitor:", error);

    return res.status(500).json({
      message: "Failed to track visitor",
      error: error.message,
    });
  }
}