export interface ImdbInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
  Plot: string;
  Awards: string;
  imdbRating: string;
  Actors: string;
  Runtime: string;
  Country: string;
  Director: string;
  Writer: string;
  Released: string;
  imdbVotes: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Ratings: { Source: string; Value: string }[];
}
