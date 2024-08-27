import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ImdbInterface } from "../models/ImbdInterface";

export const MovieView = () => {
  const location = useLocation();

  const movie = location.state?.movie || null;
  const series = location.state?.series || null;

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

  if (!film) {
    return <div>Loading...</div>;
  }

  const filmDetails = [
    { label: "Writer", value: film.Writer },
    { label: "Director", value: film.Director },
    { label: "Actors", value: film.Actors },
    { label: "Runtime", value: film.Runtime },
    { label: "Awards", value: film.Awards },
    { label: "Type", value: film.Type },
    { label: "Plot", value: film.Plot },
  ];

  return (
    <div className="border-t-2 p-2 m-2">
      <div key={film.imdbID}>
        <h3 className="text-5xl text-center p-2 m-2">{film.Title}</h3>
        <div className="flex justify-center p-4">
          <img
            src={film.Poster}
            alt=""
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "noimages.png";
            }}
            width={400}
            height={500}
          />
        </div>
        <div className="flex justify-between border-b-2 p-2 ">
          <div className=" flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54"
              height="54"
              viewBox="0 0 24 24"
              fill="rgb(51, 166, 211)"
            >
              <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
            </svg>
            <div className="pt-2">
              <p className="text-3xl">{film.imdbRating}/10</p>
            </div>
          </div>
          <p className="text-3xl p-2">{film.Genre}</p>
          <p className="text-3xl p-2">{film.Year}</p>
        </div>

        <div className="flex justify-center">
          <table className="m-2 w-2/3">
            {filmDetails.map((detail) => (
              <tr key={detail.label}>
                <td className="text-start border-b border-gray-900 p-2 ">
                  <p className="font-bold text-lg">{detail.label}</p>
                </td>
                <td className="text-start border-b border-gray-900 p-2 w-1/2">
                  <p className="text-lg">{detail.value}</p>
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
