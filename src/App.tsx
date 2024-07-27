import "./App.css";
import { Card } from "./components/Card";
import { Navbar } from "./components/Navbar";

const movies = [
  {
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 8.3,
    imageUrl: "https://images5.alphacoders.com/573/573475.jpg",
    genre: "Adventure, Science Fiction, Action",
    tagline: "Part of the journey is the end.",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
  {
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 8.3,
    imageUrl: "https://images5.alphacoders.com/573/573475.jpg",
    genre: "Adventure, Science Fiction, Action",
    tagline: "Part of the journey is the end.",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
  {
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 8.3,
    imageUrl: "https://images5.alphacoders.com/573/573475.jpg",
    genre: "Adventure, Science Fiction, Action",
    tagline: "Part of the journey is the end.",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
  {
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 8.3,
    imageUrl: "https://images5.alphacoders.com/573/573475.jpg",
    genre: "Adventure, Science Fiction, Action",
    tagline: "Part of the journey is the end.",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
  {
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 8.3,
    imageUrl: "https://images5.alphacoders.com/573/573475.jpg",
    genre: "Adventure, Science Fiction, Action",
    tagline: "Part of the journey is the end.",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
  {
    title: "The Avengers",
    releaseDate: "2012-04-25",
    rating: 8.3,
    imageUrl: "https://images5.alphacoders.com/573/573475.jpg",
    genre: "Adventure, Science Fiction, Action",
    tagline: "Part of the journey is the end.",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
  },
];

function App() {
  return (
    <>
      <Navbar />
      <h3 className="font-bold ml-10 mt-7 text-lg">Home</h3>
      <div className="p-4  min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {movies.map((movie, index) => (
            <Card
              key={index}
              title={movie.title}
              releaseDate={movie.releaseDate}
              rating={movie.rating}
              imageUrl={movie.imageUrl}
              genre={movie.genre}
              tagline={movie.tagline}
              description={movie.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
