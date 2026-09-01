import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/client";

const BOT_PATTERN = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless/i;

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") ?? "";
    if (BOT_PATTERN.test(userAgent)) {
      return new NextResponse(null, { status: 204 });
    }

    const raw = await request.text();
    const body = JSON.parse(raw) as { path?: string; referrer?: string };
    const path = String(body.path ?? "").slice(0, 500);
    const referrer = String(body.referrer ?? "").slice(0, 500);

    if (!path || path.startsWith("/admin")) {
      return new NextResponse(null, { status: 204 });
    }

    await prisma.pageView.create({ data: { path, referrer } });
  } catch {
    // Never let tracking failures surface to the visitor.
  }

  return new NextResponse(null, { status: 204 });
}
