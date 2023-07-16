import vision from "@google-cloud/vision";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "visitor-management-syste-3f0f7-e8395bfdb89d.json",
  });

  const results = await client.textDetection(
    "https://studymalaysiainfo.com/wp-content/uploads/2016/11/UTAR-University.jpg"
  );
  const text = results[0].textAnnotations;

  return NextResponse.json({ text }, { status: 200 });
}
