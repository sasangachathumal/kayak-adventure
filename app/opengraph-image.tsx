import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Route segment config - use nodejs runtime to allow fs reads
export const runtime = "nodejs";

// Image dimensions
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Read herobg1.png and convert to base64
  const imagePath = path.join(process.cwd(), "public", "herobg1.png");
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  const bgDataUri = `data:image/png;base64,${base64Image}`;

  // Read logo-with-no-text.svg and convert to base64
  const logoPath = path.join(process.cwd(), "public", "logo-with-no-text.svg");
  const logoContent = fs.readFileSync(logoPath, "utf8");
  const base64Logo = Buffer.from(logoContent).toString("base64");
  const logoDataUri = `data:image/svg+xml;base64,${base64Logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 31, 46, 0.85) 0%, rgba(0, 58, 82, 0.9) 60%, rgba(0, 178, 214, 0.45) 100%), url(${bgDataUri})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Header Row (Logo + Domain) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo Brand group */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={logoDataUri}
              alt="Kayak Logo"
              style={{
                width: "64px",
                height: "64px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "36px", fontWeight: "bold", color: "#ffffff", letterSpacing: "1px", fontFamily: "sans-serif" }}>
                KAYAK
              </span>
              <span style={{ fontSize: "11px", fontWeight: "900", color: "#00b2d6", letterSpacing: "5px", fontFamily: "sans-serif", marginTop: "2px" }}>
                ADVENTURE
              </span>
            </div>
          </div>

          {/* Domain tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.12)",
              borderRadius: "100px",
              padding: "10px 24px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00b2d6" }} />
            <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "600", fontFamily: "sans-serif" }}>
              kayakadventure.lk
            </span>
          </div>
        </div>

        {/* Content Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Accent bar */}
          <div style={{ width: "80px", height: "4px", background: "#00b2d6", borderRadius: "2px" }} />

          {/* Title */}
          <div
            style={{
              fontSize: "68px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: "1.1",
              maxWidth: "900px",
              fontFamily: "sans-serif",
            }}
          >
            Nature. Your Adventure.
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "720px",
              lineHeight: "1.5",
              fontFamily: "sans-serif",
            }}
          >
            Guided kayak tours through Sri Lanka&apos;s serene Rathgama lagoon and hidden mangrove paths.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
