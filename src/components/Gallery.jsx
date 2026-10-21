import { useCallback,useEffect,useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";
import SearchBar from "./SearchBar";

const getInitialFavourites = () => {
  try {
    const savedFavourites = localStorage.getItem("favourites");

    return savedFavourites
      ? JSON.parse(savedFavourites)
      : [];
  } catch {
    return [];
  }
};

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photoId = action.payload;

      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      }

      return [...state, photoId];
    }

    default:
      return state;
  }
};

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();

  const [search, setSearch] = useState("");

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );
  useEffect(() => {
  localStorage.setItem(
    "favourites",
    JSON.stringify(favourites)
  );
}, [favourites]);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [photos, search]);

  const toggleFavourite = (id) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: id,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Photo Gallery
        </h1>

        <SearchBar
          search={search}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        )}

        {error && (
          <p className="py-10 text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="text-center text-gray-500">
            No photos found.
          </p>
        )}

      </div>
    </div>
  );
};

export default Gallery;