export interface Podcast {
    id: number;
    title: string;
    description: string;
    seasons: number;
    image: string;
    genreIds: number[];
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
    episodes: number[];
  }