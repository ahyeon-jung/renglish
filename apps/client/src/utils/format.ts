export function formatDate(dateInput: Date | string, format: string = "yyyy-MM-dd"): string {
  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const options: Intl.DateTimeFormatOptions = {};

  switch (format) {
    case "yyyy-MM-dd":
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
    case "MM/dd/yyyy":
      options.month = "2-digit";
      options.day = "2-digit";
      options.year = "numeric";
      break;
    case "dd-MM-yyyy":
      options.day = "2-digit";
      options.month = "2-digit";
      options.year = "numeric";
      break;
    case "long":
      options.year = "numeric";
      options.month = "long";
      options.day = "numeric";
      break;
    default:
      options.year = "numeric";
      options.month = "2-digit";
      options.day = "2-digit";
      break;
  }

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatTitle(title: string) {
  const decodedTitle = decodeURIComponent(title);
  const formattedTitle = decodedTitle
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedTitle;
}
