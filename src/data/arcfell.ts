/** Rasterized from Arcfell_Lulu_Wang.pdf, resized to 1200px wide. */
export const arcfellPageSize = { width: 1200, height: 1553 };

export const arcfellSummary =
  "A comic about Arcfell, a city in a terraced landscape. Its founding, and the life beyond its walls, is a mystery to the people who live there. I submitted it to the San Jose Graphic Novel Making Contest, which limited entries to 8 pages.";

export const arcfellPages = Array.from({ length: 8 }, (_, i) => {
  const number = i + 1;
  return {
    src: `/images/arcfell/page-${String(number).padStart(2, "0")}.jpg`,
    alt: `Arcfell, page ${number}`,
    width: arcfellPageSize.width,
    height: arcfellPageSize.height,
    number,
  };
});
