import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image dimensions
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamically generated Open Graph image served at /opengraph-image.png
 * This replaces any static /public/og-image.png and keeps the OG image
 * in sync with brand changes automatically.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #001f2e 0%, #003a52 60%, #00b2d6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Subtle wave decoration */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "rgba(0,178,214,0.12)",
            transform: "translate(160px, -160px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: "120px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(0,178,214,0.08)",
            transform: "translateY(100px)",
          }}
        />

        {/* Brand accent line */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#00b2d6",
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        />

        {/* Headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "600",
            color: "#ffffff",
            lineHeight: "1.05",
            letterSpacing: "-0.5px",
            marginBottom: "20px",
            maxWidth: "800px",
          }}
        >
          Nature.{"\n"}
          <span style={{ fontStyle: "italic", color: "#38d1eb" }}>
            Your Adventure.
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.75)",
            marginBottom: "40px",
            maxWidth: "640px",
            lineHeight: "1.5",
            fontFamily: "sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          Guided kayak tours through Sri Lanka's most breathtaking waterways.
        </div>

        {/* Domain badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "100px",
            padding: "10px 24px",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#00b2d6",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            kayakadventure.lk
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
