import Field from "@/components/Field";
import Text from "@/components/Text";

export type MovieType = {
  title: string;
  imageUrl: string;
  studiedAt: string;
  description: string;
};
type Scene = {
  movie: MovieType;
  setMovie: (movie: MovieType) => void;
};

export default function Scene({ movie, setMovie }: Scene) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  return (
    <div>
      <Text as="h3" typography="display-md">
        Scene Information
      </Text>
      <Field>
        <Field.Label>Title</Field.Label>
        <Field.Input value={movie.title} name="title" onChange={handleChange} />
      </Field>
      <Field>
        <Field.Label>Image Address</Field.Label>
        <Field.Input
          value={movie.imageUrl}
          name="imageUrl"
          onChange={handleChange}
        />
      </Field>
      <Field>
        <Field.Label>Description</Field.Label>
        <Field.Input
          value={movie.description}
          name="description"
          onChange={handleChange}
        />
      </Field>
    </div>
  );
}
