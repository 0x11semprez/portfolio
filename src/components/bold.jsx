// Renders **bold**, *italic* and ~~colored~~ from a data string.
export default function bold(text) {
  return text.split(/(\*\*[^*]+\*\*)/).flatMap((segment, i) => {
    if (segment.startsWith("**")) {
      return [<strong key={`b${i}`} className="font-bold">{segment.slice(2, -2)}</strong>];
    }
    return segment.split(/(\*[^*]+\*|~~[^~]+~~)/).map((part, j) => {
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={`${i}-${j}`} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("~~") && part.endsWith("~~")) {
        return <span key={`${i}-${j}`} style={{ color: "#CC0000" }}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  });
}
