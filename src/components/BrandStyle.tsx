import {
  Fraunces,
  Instrument_Sans,
  Plus_Jakarta_Sans,
} from "next/font/google";
import RichText from "./RichText";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const faceClass: Record<string, string> = {
  Inter: "font-[family-name:var(--font-inter)]",
  "SF Pro": "font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif]",
  Fraunces: fraunces.className,
  "Instrument Sans": instrumentSans.className,
  "Plus Jakarta Sans": plusJakarta.className,
};

export type BrandStyleData = {
  intro: string;
  colors: { name: string; hex: string; role: string }[];
  typefaces: { name: string; role: string; weights?: string }[];
  typography: string;
  palette: string;
  messaging?: string;
};

export default function BrandStyle({
  branding,
  subhead,
  body,
  bodyMuted,
}: {
  branding: BrandStyleData;
  subhead: string;
  body: string;
  bodyMuted: string;
}) {
  return (
    <>
      <div className="mt-10">
        <h3 className={subhead}>Color palette</h3>
        <p className={`mt-3 max-w-2xl ${bodyMuted} [&_strong]:text-foreground`}>
          <RichText>{branding.palette}</RichText>
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
          {branding.colors.map((color) => (
            <div key={`${color.name}-${color.hex}`} className="min-w-0">
              <div
                className="aspect-[4/3] w-full rounded-sm border border-black/[0.08]"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
              <p className="mt-2.5 text-sm font-semibold tracking-tight">
                {color.name}
              </p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-foreground/40">
                {color.hex}
              </p>
              <p className="font-secondary mt-1 text-[13px] leading-snug text-foreground/50">
                {color.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h3 className={subhead}>Typography</h3>
        <p className={`mt-3 max-w-2xl ${bodyMuted} [&_strong]:text-foreground`}>
          <RichText>{branding.typography}</RichText>
        </p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-12">
          {branding.typefaces.map((face) => {
            const specimen = faceClass[face.name] ?? "";
            return (
              <div key={face.name} className="min-w-0 border-t border-black/[0.07] pt-6">
                <p className={`text-3xl font-semibold tracking-tight sm:text-4xl ${specimen}`}>
                  {face.name}
                </p>
                <p className={`mt-3 ${body}`}>
                  <RichText>{face.role}</RichText>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {branding.messaging && (
        <div className="mt-14 max-w-2xl">
          <h3 className={subhead}>Voice</h3>
          <p className={`mt-3 ${bodyMuted} [&_strong]:text-foreground`}>
            <RichText>{branding.messaging}</RichText>
          </p>
        </div>
      )}
    </>
  );
}
