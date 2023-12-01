export interface Podcast {
  id: number;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: string[];
  updated: string;
}

// description
// : 
// "Something Was Wrong is an Iris Award-winning true-crime docuseries about the discovery, trauma, and recovery from shocking life events and abusive relationships."
// genres
// : 
// (2) [1, 2]
// id
// : 
// "10716"
// image
// : 
// "https://content.production.cdn.art19.com/images/cc/e5/0a/08/cce50a08-d77d-490e-8c68-17725541b0ca/9dcebd4019d57b9551799479fa226e2a79026be5e2743c7aef19eac53532a29d66954da6e8dbdda8219b059a59c0abe6dba6049892b10dfb2f25ed90d6fe8d9a.jpeg"
// seasons
// : 
// 14
// title
// : 
// "Something Was Wrong"
// updated
// : 
// "2022-11-03T07:00:00.000Z"
  
export interface PodcastShow {
  id: number;
  title: string;
  image: string;
  description: string;
  seasons: Season[];
}

// description
// : 
// "This podcast might not actually kill you, but it covers so many things that can. Each episode tackles a different disease, from its history, to its biology, and finally, how scared you need to be. Ecologists and epidemiologists Erin Welsh and Erin Allmann Updyke make infectious diseases acceptable fodder for dinner party conversation and provide the perfect cocktail recipe to match."
// genres
// : 
// (3) ['All', 'Featured', 'Personal Growth']
// id
// : 
// "10276"
// image
// : 
// "https://content.production.cdn.art19.com/images/f5/16/e0/99/f516e099-4c64-4737-9fdb-55f4d45a4003/6d14be58e0a54d21128c239dd933e0f3c36ca00f85ea7294cbea91a2b214d2384361c2a765842eef66e8583b2c21302c8fd2b1eb4d32e3805481292d758f20aa.jpeg"
// seasons
// : 
// (5) [{…}, {…}, {…}, {…}, {…}]
// title
// : 
// "This Podcast Will Kill You"
// updated
// : 
// "2022-10-25T07:01:00.000Z"

export interface Season {
  season: number;
  title: string;
  image: string;
  episodes: Episode[];
}

// seasons
// : 
// Array(5)
// 0
// : 
// {season: 1, title: 'Season 1', image: 'https://content.production.cdn.art19.com/images/f5…8b39a74224268f1b69e88bf19db720c9e52d8a4f612a.jpeg', episodes: Array(10)}
// 1
// : 
// {season: 2, title: 'Season 2', image: 'https://content.production.cdn.art19.com/images/f5…8b39a74224268f1b69e88bf19db720c9e52d8a4f612a.jpeg', episodes: Array(10)}
// 2
// : 
// {season: 3, title: 'Season 3', image: 'https://content.production.cdn.art19.com/images/f5…8b39a74224268f1b69e88bf19db720c9e52d8a4f612a.jpeg', episodes: Array(10)}
// 3
// : 
// {season: 4, title: 'Season 4', image: 'https://content.production.cdn.art19.com/images/f5…8b39a74224268f1b69e88bf19db720c9e52d8a4f612a.jpeg', episodes: Array(10)}
// 4
// : 
// {season: 5, title: 'Season 5', image: 'https://content.production.cdn.art19.com/images/f5…8b39a74224268f1b69e88bf19db720c9e52d8a4f612a.jpeg', episodes: Array(10)}


export interface Episode {
  title: string;
  description?: string;
  episode: number;
  file: string;
  date?: string | null;
}
  
// 0
// : 
// description
// : 
// "What's the difference between a physician and a pretender, a magician and a poisoner? That's a question we'll try and answer in today's episode! We are very excited to bring you our first botanical poison crossover episode with our good friend Matt Candeias of the awesome podcast and website, In Defense of Plants. This week, we'll talk about Wolfsbane, or Monkshood, or Aconitum, or any of its various common names. The point is, get ready to learn about a pretty gnarly poison, its history, how it affects your body, and why on earth a plant would make such deadly compounds from an ecological and evolutionary perspective. "
// episode
// : 
// 1
// file
// : 
// "https://podcast-api.netlify.app/placeholder-audio.mp3"
// title
// : 
// "Ep 13 Don't Tread on my Monkshood: Crossover w/ IDOP"
