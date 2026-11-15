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
    slug: "the-holy-art-exhibition-in-nyc",
    title: "The Holy Art Exhibition in NYC",
    date: "November 2026",
    body: [
      "I had an opportunity to exhibit my art at The Holy, a three-day weekend exhibition in a SoHo gallery. Over a thousand people came through and talked about the artwork.",
      "I'm grateful for the chance to show my artwork in front of live gallery attendees. I'll keep improving my techniques, color theory, and design sense, and continue learning from other talented artists around the world.",
    ],
    images: [
      {
        src: "/images/blog/holy-01.jpg",
        alt: "The Relief, a framed portrait, hanging at The Holy Art Gallery in SoHo",
        width: 768,
        height: 1024,
      },
      {
        src: "/images/blog/holy-02.jpg",
        alt: "Visitors looking at paintings during The Holy exhibition",
        width: 682,
        height: 1024,
      },
      {
        src: "/images/blog/holy-03.jpg",
        alt: "Poster for the Holy Art Gallery exhibition in New York, 13 to 16 November 2026",
        width: 576,
        height: 1024,
      },
    ],
  },
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
