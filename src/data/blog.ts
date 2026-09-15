export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  body: string[];
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
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
