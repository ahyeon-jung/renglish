export function parseText(text: string, spanClassName?: string) {
  return text
    .split(/(<p>.*?<\/p>)/g)
    .filter(Boolean)
    .map((paragraph, index) => {
      if (paragraph.startsWith('<p>')) {
        const content = paragraph
          .replace(/^<p>/, '')
          .replace(/<\/p>$/, '')
          .split(/(<span class='keypoint'>.*?<\/span>)/g)
          .map((part, i) => {
            if (part.startsWith("<span class='keypoint'>")) {
              return (
                <span key={i} className={spanClassName}>
                  {part.replace(/<\/?span.*?>/g, '')}
                </span>
              );
            }
            return part;
          });

        return <p key={index}>{content}</p>;
      }
      return paragraph;
    });
}
