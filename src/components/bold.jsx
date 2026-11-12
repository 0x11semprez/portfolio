// Renders **bold** and *italic* from a data string.
export default function bold(text) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <strong key={i} className="font-bold">
        {part.slice(2, -2)}
      </strong>
    ) : part.startsWith("*") ? (
      <em key={i} className="italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  );
}
