import MoviePage from "./Movie";

export default async function Movie({ params }: { params: Promise<{ movie: string }> }) {
  return <MoviePage params={params} />;
}
