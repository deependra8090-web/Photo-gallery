const SearchBar = ({ search, onSearch }) => {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={search}
        onChange={onSearch}
        placeholder="Search by author name..."
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;