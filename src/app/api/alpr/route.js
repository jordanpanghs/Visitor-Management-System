import vision from "@google-cloud/vision";
import { NextResponse } from "next/server";

export async function GET() {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: "visitor-management-syste-3f0f7-e8395bfdb89d.json",
  });

  const results = await client.labelDetection(
    "https://studymalaysiainfo.com/wp-content/uploads/2016/11/UTAR-University.jpg"
  );
  const labels = results[0].labelAnnotations;

  console.log(labels);

  return NextResponse.json({ labels }, { status: 200 });
}
