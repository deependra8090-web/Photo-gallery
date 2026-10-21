const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      
      <img
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        className="h-64 w-full object-cover"
      />

      <div className="flex items-center justify-between p-4">
        <p className="font-medium text-gray-800">
          {photo.author}
        </p>

        <button
          onClick={() => onToggleFavourite(photo.id)}
          className="text-2xl"
          aria-label="Toggle favourite"
        >
          {isFavourite ? "❤️" : "♡"}
        </button>
      </div>

    </div>
  );
};

export default PhotoCard;