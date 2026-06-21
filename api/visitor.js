function getVisitorIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfIp = request.headers.get("cf-connecting-ip");

  let ip =
    cfIp ||
    realIp ||
    (forwardedFor ? forwardedFor.split(",")[0].trim() : null) ||
    "unknown";

  if (ip === "::1") {
    ip = "localhost";
  }

  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  return ip;
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "GET") {
      return Response.json({
        status: "OK",
        message: "Visitor API is running",
      });
    }

    if (request.method !== "POST") {
      return Response.json(
        {
          message: "Method not allowed",
        },
        {
          status: 405,
        }
      );
    }

    try {
      const body = await request.json();

      const visitorLog = {
        ip: getVisitorIp(request),
        userAgent: body.userAgent || null,
        language: body.language || null,
        languages: body.languages || null,
        platform: body.platform || null,
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

      return Response.json(
        {
          message: "Visitor tracked",
          data: visitorLog,
        },
        {
          status: 201,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      console.error("Failed to track visitor:", error);

      return Response.json(
        {
          message: "Failed to track visitor",
        },
        {
          status: 500,
        }
      );
    }
  },
};