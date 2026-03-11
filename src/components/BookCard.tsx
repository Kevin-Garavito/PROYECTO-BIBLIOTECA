import { Book } from "@/data/books";
import { MapPin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: Book;
  onViewLocation: (book: Book) => void;
  compact?: boolean;
}

const BookCard = ({ book, onViewLocation, compact = false }: BookCardProps) => {
  if (compact) {
    return (
      <button
        onClick={() => onViewLocation(book)}
        className="book-card flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left w-full"
      >
        <div className="w-10 h-14 rounded-md bg-primary/15 flex items-center justify-center shrink-0 overflow-hidden">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="h-5 w-5 text-primary/60" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-foreground truncate">{book.title}</p>
          <p className="text-xs text-muted-foreground">{book.author}</p>
        </div>
        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full shrink-0 ${
          book.available ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
        }`}>
          {book.available ? "Disp." : "Prest."}
        </span>
      </button>
    );
  }

  return (
    <div className="book-card rounded-xl border border-border bg-card overflow-hidden group">
      <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <BookOpen className="h-10 w-10 text-primary/25" />
            <p className="font-display text-xs text-primary/40 leading-tight">{book.title}</p>
          </div>
        )}
        <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium ${
          book.available ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"
        }`}>
          {book.available ? "Disponible" : "Prestado"}
        </span>
      </div>
      <div className="p-3.5 space-y-1.5">
        <h3 className="font-display font-semibold text-sm text-foreground leading-tight line-clamp-2">{book.title}</h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <div className="pt-1.5">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5 text-xs h-8"
            onClick={() => onViewLocation(book)}
          >
            <MapPin className="h-3 w-3" />
            Ver detalles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
