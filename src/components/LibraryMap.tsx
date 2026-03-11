import { Book, LibraryBlock, libraryBlocks, sampleBooks } from "@/data/books";
import { BookOpen, X } from "lucide-react";
import BookCard from "./BookCard";

interface LibraryMapProps {
  highlightedBook: Book | null;
  selectedBlock: string | null;
  onSelectBlock: (blockId: string | null) => void;
  onViewBookLocation: (book: Book) => void;
  books: Book[];
}

const LibraryMap = ({ highlightedBook, selectedBlock, onSelectBlock, onViewBookLocation, books }: LibraryMapProps) => {
  const activeBlockId = highlightedBook?.block || selectedBlock;
  const booksInBlock = activeBlockId
    ? books.filter((b) => b.block === activeBlockId)
    : [];

  const blockInfo = activeBlockId
    ? libraryBlocks.find((bl) => bl.id === activeBlockId)
    : null;

  return (
    <div className="space-y-6">
      {/* Map Title */}
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Mapa de la Biblioteca</h2>
        <p className="text-sm text-muted-foreground mt-1">Selecciona un bloque para ver los libros ubicados en él</p>
      </div>

      {/* Map Grid */}
      <div className="relative bg-card border border-border rounded-xl p-6 md:p-8">
        {/* Entrance label */}
        <div className="text-center mb-6">
          <span className="text-xs font-body font-semibold tracking-widest uppercase text-muted-foreground">
            ← Entrada Principal →
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {libraryBlocks.map((block) => {
            const isActive = block.id === activeBlockId;
            const bookCount = books.filter((b) => b.block === block.id).length;
            const hasHighlighted = highlightedBook?.block === block.id;

            return (
              <button
                key={block.id}
                onClick={() => onSelectBlock(isActive && !highlightedBook ? null : block.id)}
                className={`shelf-block flex flex-col items-center justify-center p-4 md:p-6 cursor-pointer text-center min-h-[100px] ${
                  isActive
                    ? "ring-2 ring-gold shadow-lg scale-105"
                    : ""
                } ${hasHighlighted ? "ring-2 ring-accent" : ""}`}
              >
                <BookOpen className={`h-6 w-6 mb-1 ${isActive ? "text-gold" : "text-primary-foreground/70"}`} />
                <span className="font-display text-sm font-bold text-primary-foreground">{block.name}</span>
                <span className="text-xs text-primary-foreground/70 mt-0.5">{block.label}</span>
                <span className="text-xs text-primary-foreground/60 mt-1">{bookCount} libros</span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-shelf inline-block" /> Bloque
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-gold inline-block" /> Seleccionado
          </span>
          {highlightedBook && (
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-accent inline-block" /> Libro encontrado
            </span>
          )}
        </div>
      </div>

      {/* Shelf Detail */}
      {activeBlockId && blockInfo && (
        <div className="bg-card border border-border rounded-xl p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {blockInfo.name} — {blockInfo.label}
              </h3>
              <p className="text-sm text-muted-foreground">{booksInBlock.length} libros en este bloque</p>
            </div>
            <button
              onClick={() => onSelectBlock(null)}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Shelves visualization */}
          <div className="space-y-3">
            {Array.from({ length: blockInfo.shelves }, (_, i) => i + 1).map((shelfNum) => {
              const shelfBooks = booksInBlock.filter((b) => b.shelf === shelfNum);
              return (
                <div key={shelfNum}>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Estante {shelfNum}</p>
                  {shelfBooks.length > 0 ? (
                    <div className="grid gap-2">
                      {shelfBooks.map((book) => (
                        <div
                          key={book.id}
                          className={`${
                            highlightedBook?.id === book.id
                              ? "ring-2 ring-accent rounded-lg"
                              : ""
                          }`}
                        >
                          <BookCard book={book} onViewLocation={onViewBookLocation} compact />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground/60 italic pl-2">Vacío</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryMap;
