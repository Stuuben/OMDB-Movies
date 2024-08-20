import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ImdbInterface } from "../models/ImbdInterface";

export const MovieView = () => {
  const location = useLocation();
  const movie = location.state?.movie || null;
  console.log("movie", movie);
  const series = location.state?.series || null;
  console.log("series", series);

  const apiKey = import.meta.env.VITE_API_KEY;

  const [film, setFilm] = useState<ImdbInterface | null>(null);

  const id = movie?.imdbID || series?.imdbID;

  const getMovie = () => {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data view", data);
        setFilm(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (!movie && !series) {
    return <div>No movie found</div>;
  }
  // if (!series) {
  //   return <div>No series found</div>;
  // }

  console.log("film", film);

  if (!film) {
    return <div>Loading...</div>;
  }

  const filmDetails = [
    { label: "Year", value: film.Year },
    { label: "imdbRating", value: film.imdbRating },
    { label: "Genre", value: film.Genre },
    { label: "Director", value: film.Director },
    { label: "Actors", value: film.Actors },
    { label: "Writer", value: film.Writer },
    { label: "Runtime", value: film.Runtime },
    { label: "Awards", value: film.Awards },
    { label: "Type", value: film.Type },
    { label: "Plot", value: film.Plot },
  ];

  return (
    <div className="border-t-2 p-2 m-2">
      <div key={film.imdbID}>
        <h3 className="text-5xl text-center p-2 m-2">{film.Title}</h3>
        <div className="flex justify-center">
          <img src={film.Poster} alt="" width={300} height={400} />
        </div>
        <div className="flex justify-center">
          <table className="m-2">
            {filmDetails.map((detail) => (
              <tr key={detail.label}>
                <td className="text-start border border-gray-800 p-2">
                  <p>{detail.label}</p>
                </td>
                <td className="text-center border border-gray-800 p-2">
                  <p>{detail.value}</p>
                </td>
                <tr>
                  <td className="text-center w-21"></td>
                </tr>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};
