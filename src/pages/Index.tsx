import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Shield, Search, MapPin, X, ArrowRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import LibraryMap from "@/components/LibraryMap";
import { Book, sampleBooks } from "@/data/books";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-library.jpg";

const Index = () => {
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/books");
        if (!res.ok) throw new Error("Error al cargar libros");
        const data = await res.json();
        setBooks(data.length > 0 ? data : sampleBooks);
      } catch (error) {
        console.error(error);
        setBooks(sampleBooks);
      }
    };
    
    loadBooks();
  }, []);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setShowMap(false);
    setTimeout(() => {
      document.getElementById("book-detail")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleViewLocation = (book: Book) => {
    setSelectedBook(book);
    setSelectedBlock(book.block);
    setShowMap(true);
    setTimeout(() => {
      document.getElementById("library-map")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const categories = useMemo(() => [...new Set(books.map((b) => b.category))], [books]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="BiblioSearch" className="h-10 w-10" />
            <div>
              <span className="font-display text-lg font-bold text-foreground">BiblioSearch</span>
              <p className="text-xs text-muted-foreground">Sistema de Búsqueda y Ubicación</p>
            </div>
            <div className="hidden sm:block ml-4 pl-4 border-l border-border">
              <img src="/escudo-politecnico.svg" alt="Politécnico Colombiano" className="h-12 w-auto" />
            </div>
          </div>
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Biblioteca" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-background" />
        </div>
        <div className="relative z-10 py-20 md:py-32 px-4">
          <div className="container max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 border border-gold/30 text-sm text-gold mb-2">
              <BookOpen className="h-3.5 w-3.5" />
              Politécnico Colombiano Jaime Isaza Cadavid
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight drop-shadow-lg">
              Encuentra tu próximo
              <br />
              <span className="text-gold">libro</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Busca y localiza material bibliográfico al instante. Escribe título, autor, categoría o ISBN.
            </p>
            <div className="pt-2">
              <SearchBar books={books} onSelectBook={handleSelectBook} />
            </div>
          </div>
        </div>
      </section>

      {/* Selected Book Detail */}
      {selectedBook && (
        <section id="book-detail" className="px-4 py-10">
          <div className="container max-w-2xl">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg animate-fade-in">
              <div className="flex flex-col sm:flex-row">
                {/* Cover */}
                <div className="sm:w-48 h-48 sm:h-auto bg-primary/10 flex items-center justify-center shrink-0">
                  {selectedBook.coverUrl ? (
                    <img src={selectedBook.coverUrl} alt={selectedBook.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 p-6">
                      <BookOpen className="h-14 w-14 text-primary/25" />
                      <p className="font-display text-xs text-primary/40 text-center leading-tight">{selectedBook.title}</p>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-6 space-y-3 flex-1">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground leading-tight">{selectedBook.title}</h2>
                    <p className="text-muted-foreground mt-1">{selectedBook.author}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{selectedBook.category}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{selectedBook.year > 0 ? selectedBook.year : `${Math.abs(selectedBook.year)} a.C.`}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      selectedBook.available ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                    }`}>
                      {selectedBook.available ? "✓ Disponible" : "✗ Prestado"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedBook.description}</p>
                  <p className="text-xs text-muted-foreground">ISBN: {selectedBook.isbn}</p>
                  
                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => handleViewLocation(selectedBook)} className="gap-2">
                      <MapPin className="h-4 w-4" />
                      Ver ubicación
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" onClick={() => { setSelectedBook(null); setShowMap(false); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Library Map — only shown after clicking "Ver ubicación" */}
      {showMap && selectedBook && (
        <section id="library-map" className="px-4 pb-12">
          <div className="container max-w-2xl">
            <LibraryMap
              highlightedBook={selectedBook}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onViewBookLocation={(book) => {
                setSelectedBook(book);
                setSelectedBlock(book.block);
                document.getElementById("book-detail")?.scrollIntoView({ behavior: "smooth" });
              }}
              books={books}
            />
          </div>
        </section>
      )}

      {/* Browse Catalog */}
      <section className="px-4 py-16 bg-card/50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground">Explorar Catálogo</h2>
            <p className="text-muted-foreground mt-2">Descubre todos los materiales disponibles en la biblioteca</p>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 rounded-full bg-primary" />
                <h3 className="font-display text-xl font-bold text-foreground">{cat}</h3>
                <span className="text-sm text-muted-foreground">({books.filter(b => b.category === cat).length} libros)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {books
                  .filter((b) => b.category === cat)
                  .map((book) => (
                    <BookCard key={book.id} book={book} onViewLocation={handleSelectBook} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <span className="font-display font-bold">BiblioSearch</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Sistema de Búsqueda de Material Bibliográfico y Ubicación
          </p>
          <p className="text-xs text-muted-foreground">
            Politécnico Colombiano Jaime Isaza Cadavid — Semillero SIESI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
