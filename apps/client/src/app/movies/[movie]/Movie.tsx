import MovieInfo from "./_components/MovieInfo";
import ScriptLink from "../_components/ScriptLink";
import clsx from "clsx";
import getMovie from "@/app/actions/movies/getMovie";

export default async function MoviePage({ params }: { params: Promise<{ movie: string }> }) {
  const slug = await params;

  const { data: movie } = await getMovie(slug.movie);

  return (
    <main className={clsx("mt-[var(--header-height)] p-3", "flex flex-col gap-[30px]")}>
      <MovieInfo {...movie} />
      <div className="flex flex-col gap-[10px]">
        {movie.scenes.map((scene, index) => (
          <ScriptLink
            key={index}
            index={index}
            movieTitle={movie.title}
            title={scene.title}
            id={scene.id}
          />
        ))}
      </div>
    </main>
  );
}
