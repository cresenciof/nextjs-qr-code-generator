// https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from "next/server";

import { QRCodeCanvas, Options } from "@loskir/styled-qr-code-node";

const options: Partial<Options> = {
  width: 400,
  height: 400,
  data: "https://developers.facebook.com/",
  // NOTE: png and jpg formats only.
  image:
    "https://www.citypng.com/public/uploads/preview/hd-meta-facebook-white-logo-png-116403446124ydgyipr3u.png",
  dotsOptions: { type: "extra-rounded", color: "#242424" },
  backgroundOptions: {
    color: "#fff",
  },
  cornersSquareOptions: { type: "extra-rounded", color: "#281728" },
  cornersDotOptions: {
    color: "#928192",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    hideBackgroundDots: true,
    imageSize: 0.3,
  },
};

export async function GET() {
  try {
    const qrCode = new QRCodeCanvas(options);

    const file = await qrCode.toDataUrl("png");

    return NextResponse.json({
      pngFile: file,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 }
    );
  }
}
