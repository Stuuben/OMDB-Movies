import { useState } from "react";
import { Link } from "react-router-dom";
import { ImdbInterface } from "../models/ImbdInterface";
import "./Movies.css";

export const Movies = () => {
  const [movies, setMovies] = useState<ImdbInterface[]>([]);
  const [searchParams, setSearchParams] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  console.log("movies1", movies);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getMovies = () => {
    setSearchClicked(true);

    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchParams}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setMovies(data.Search);
        setSearchClicked(false);
      })
      .catch((error) => {
        console.error(error);
        setMovies([]);
      });
  };

  return (
    <div className="border-t-2">
      {searchClicked ? (
        <div className="flex justify-end  p-2 m-2 bg-black rounded">
          <input
            type="text"
            onChange={(e) => setSearchParams(e.target.value)}
            placeholder="Search Movie"
            onKeyDown={(e) => e.key === "Enter" && getMovies()}
            className="p-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
          />
          <button
            onClick={getMovies}
            style={{ backgroundColor: "rgb(51, 166, 211)" }}
            className=" text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Search
          </button>
        </div>
      ) : (
        <div className="flex justify-end  p-2 m-2 bg-black rounded">
          <svg
            onClick={() => setSearchClicked(!searchClicked)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 ml-3 text-gray-400 hover:text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {movies === undefined ? (
          <div className="flex flex-col items-center p-5 rounded m-2">
            <h3 className="text-xl">No movies found</h3>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => (
              <Link state={{ movie }} to={`/${movie.imdbID}`}>
                <div
                  key={movie.imdbID}
                  className="flex flex-col justify-center w-96 items-center p-5 rounded m-2 bg-black cursor-pointer"
                >
                  <h3 className="text-xl text-ellipsis overflow-hidden whitespace-nowrap max-w-xs">
                    {movie.Title}
                  </h3>

                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    style={{ width: "300px", height: "440px" }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "noimages.png";
                    }}
                  />

                  <p>{movie.Year}</p>
                  <p>{movie.Plot}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
