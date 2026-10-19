export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  body: string[];
  images?: BlogImage[];
};

export const posts: BlogPost[] = [
  {
    slug: "my-first-art-show-in-a-cafe",
    title: "My first art show in a cafe",
    date: "May 2026",
    body: [
      "Being around the San Francisco tech and creative community meant being surrounded by some talented and innovative folks. I was fortunate to have the opportunity to showcase my artwork at Spike's Coffee and Tea, a cozy neighborhood coffee shop located in San Francisco's Castro neighborhood, known for their specialty coffee and warm nonjudgemental space.",
      "It was my first time showcasing my art in a public space, and I'm super grateful for the experience to put my work in front of people's eyes!",
    ],
    images: [
      {
        src: "/images/blog/art-show-01.jpg",
        alt: "Framed drawings and prints hanging under a shelf of Spike's mugs",
        width: 1024,
        height: 768,
      },
      {
        src: "/images/blog/art-show-02.jpg",
        alt: "A framed portrait against a red background hanging at Spike's Coffee",
        width: 768,
        height: 1024,
      },
      {
        src: "/images/blog/art-show-03.jpg",
        alt: "A row of framed illustrations along the cafe wall",
        width: 1024,
        height: 768,
      },
      {
        src: "/images/blog/art-show-04.jpg",
        alt: "Lulu seated in front of the artwork at Spike's Coffee",
        width: 768,
        height: 1024,
      },
      {
        src: "/images/blog/art-show-05.jpg",
        alt: "Lulu outside Spike's Coffee and Tea in the Castro",
        width: 646,
        height: 862,
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
