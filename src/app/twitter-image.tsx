import { ImageResponse } from "next/og";
import { siteConfig } from "../../config/site";

export const runtime = "edge";
export const alt = "PIX Online - Gerador de QR Code PIX";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(to bottom, #2563eb, #3b82f6)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              marginBottom: 20,
            }}
          >
            PIX Online
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: "medium",
              color: "white",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            Gerador de QR Code PIX Gratuito
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #e5e7eb",
              borderRadius: 12,
              padding: 20,
              background: "white",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="#2563eb"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
              <path d="M7 5v4" />
              <path d="M17 5v4" />
              <rect width="4" height="4" x="15" y="14" />
              <path d="M13 14h-2" />
              <path d="M13 18h-2" />
              <path d="M9 14H7" />
              <path d="M9 18H7" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "white",
              marginTop: 40,
              textAlign: "center",
            }}
          >
            {siteConfig.url}
          </div>
        </div>
      </div>
    ),
    size
  );
}
