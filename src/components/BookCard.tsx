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
        <div className="w-10 h-14 rounded-sm bg-primary/15 flex items-center justify-center shrink-0">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover rounded-sm" />
          ) : (
            <BookOpen className="h-5 w-5 text-primary/60" />
          )}
        </div>
        <div className="min-w-0">
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
    <div className="book-card rounded-xl border border-border bg-card overflow-hidden">
      <div className="aspect-[3/4] bg-primary/10 flex items-center justify-center relative">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <BookOpen className="h-12 w-12 text-primary/30" />
            <p className="font-display text-sm text-primary/50 leading-tight">{book.title}</p>
          </div>
        )}
        <span className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full ${
          book.available ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"
        }`}>
          {book.available ? "Disponible" : "Prestado"}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-display font-semibold text-foreground leading-tight line-clamp-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <p className="text-xs text-muted-foreground">{book.category} · {book.year > 0 ? book.year : `${Math.abs(book.year)} a.C.`}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{book.description}</p>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={() => onViewLocation(book)}
          >
            <MapPin className="h-3.5 w-3.5" />
            Ver ubicación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
