import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Shield } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import LibraryMap from "@/components/LibraryMap";
import { Book, sampleBooks } from "@/data/books";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [books] = useState<Book[]>(sampleBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setSelectedBlock(book.block);
    setShowMap(true);
    // Scroll to map
    setTimeout(() => {
      document.getElementById("library-map")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleViewLocation = (book: Book) => {
    handleSelectBook(book);
  };

  const categories = useMemo(() => [...new Set(books.map((b) => b.category))], [books]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="font-display text-xl font-bold text-foreground">BiblioSearch</span>
          </div>
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero + Search */}
      <section className="py-16 md:py-24 px-4">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Sistema de Búsqueda
            <br />
            <span className="text-primary">Bibliográfica</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Encuentra y localiza material bibliográfico de forma rápida. Busca por título, autor, categoría o ISBN.
          </p>
          <SearchBar books={books} onSelectBook={handleSelectBook} />
        </div>
      </section>

      {/* Selected Book Detail */}
      {selectedBook && (
        <section className="px-4 pb-8">
          <div className="container max-w-2xl">
            <div className="bg-card border border-border rounded-xl p-6 flex gap-6 animate-fade-in">
              <div className="w-24 h-32 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                {selectedBook.coverUrl ? (
                  <img src={selectedBook.coverUrl} alt={selectedBook.title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <BookOpen className="h-10 w-10 text-primary/30" />
                )}
              </div>
              <div className="space-y-1.5 min-w-0">
                <h2 className="font-display text-xl font-bold text-foreground">{selectedBook.title}</h2>
                <p className="text-sm text-muted-foreground">{selectedBook.author} · {selectedBook.year > 0 ? selectedBook.year : `${Math.abs(selectedBook.year)} a.C.`}</p>
                <p className="text-sm text-muted-foreground">{selectedBook.category} · ISBN: {selectedBook.isbn}</p>
                <p className="text-sm text-muted-foreground">{selectedBook.description}</p>
                <div className="flex items-center gap-3 pt-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    selectedBook.available ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                  }`}>
                    {selectedBook.available ? "Disponible" : "Prestado"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    📍 Bloque {selectedBook.block} · Estante {selectedBook.shelf} · Posición {selectedBook.position}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Library Map */}
      {showMap && (
        <section id="library-map" className="px-4 pb-12">
          <div className="container max-w-2xl">
            <LibraryMap
              highlightedBook={selectedBook}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onViewBookLocation={handleViewLocation}
              books={books}
            />
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section className="px-4 pb-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">Explorar Catálogo</h2>
          <p className="text-center text-muted-foreground mb-8">Descubre todos los materiales disponibles</p>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4 border-b border-border pb-2">{cat}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {books
                  .filter((b) => b.category === cat)
                  .map((book) => (
                    <BookCard key={book.id} book={book} onViewLocation={handleViewLocation} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Sistema de Búsqueda de Material Bibliográfico y Ubicación — Politécnico Colombiano Jaime Isaza Cadavid
        </p>
      </footer>
    </div>
  );
};

export default Index;
