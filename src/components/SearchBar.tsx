import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Book } from "@/data/books";

interface SearchBarProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const SearchBar = ({ books, onSelectBook }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.isbn.includes(q)
    );
    setSuggestions(filtered.slice(0, 8));
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [query, books]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onSelectBook(suggestions[selectedIndex]);
      setIsOpen(false);
      setQuery("");
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (book: Book) => {
    onSelectBook(book);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="search-glow relative flex items-center rounded-lg border-2 border-border bg-card overflow-hidden">
        <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && suggestions.length > 0 && setIsOpen(true)}
          placeholder="Buscar por título, autor, categoría o ISBN..."
          className="w-full bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground outline-none font-body text-base"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setSuggestions([]); setIsOpen(false); }}
            className="mr-3 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-card shadow-xl overflow-hidden animate-fade-in">
          {suggestions.map((book, index) => (
            <button
              key={book.id}
              onClick={() => handleSelect(book)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                index === selectedIndex ? "bg-primary/10" : "hover:bg-muted"
              }`}
            >
              <div className="w-8 h-10 rounded-sm bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">
                {book.title[0]}
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-foreground truncate">{book.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {book.author} · {book.category} · Bloque {book.block}
                </p>
              </div>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full shrink-0 ${
                book.available ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
              }`}>
                {book.available ? "Disponible" : "Prestado"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
