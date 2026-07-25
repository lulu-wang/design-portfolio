import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9f9f9",
          color: "#050505",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          fontFamily:
            "Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
      >
        LW.
      </div>
    ),
    { ...size },
  );
}
