// Renders **bold**, *italic*, ~~colored~~ and ~~**colored bold**~~ from a data string.
export default function bold(text) {
  return text.split(/(~~\*\*[^~]+\*\*~~|~~[^~]+~~|\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith("~~**") && part.endsWith("**~~")) {
      return <strong key={i} className="font-bold" style={{ color: "#CC0000" }}>{part.slice(4, -4)}</strong>;
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return <span key={i} style={{ color: "#CC0000" }}>{part.slice(2, -2)}</span>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
