/** Rasterized from Alek_Tain_Corrected_59_Pages.pdf at 1.75×. */
export const flipnotePageSize = { width: 1071, height: 1386 };

export const flipnoteSummary =
  "A comic I made in collaboration with another artist with Flipnote Studio on a Nintendo DSi. The story is a romance centered around my original character Alek and her original character Tain. The romance developed organically step-by-step as we each contributed more art to the story. Unfinished.";

export const flipnoteOriginalUrl =
  "https://www.sudomemo.net/user/5D364490511FD715@DSi";

export type FlipnotePage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  number: number;
};

export const flipnotePages: FlipnotePage[] = Array.from({ length: 59 }, (_, i) => {
  const number = i + 1;
  return {
    src: `/images/flipnote/page-${String(number).padStart(2, "0")}.jpg`,
    alt: `Alek and Tain, page ${number}`,
    width: flipnotePageSize.width,
    height: flipnotePageSize.height,
    number,
  };
});
