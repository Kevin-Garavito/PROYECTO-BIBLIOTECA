import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Plus, Pencil, Trash2, Lock } from "lucide-react";
import { Book, sampleBooks } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ADMIN_PASSWORD = "admin123"; // Demo only — use Lovable Cloud for real auth

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [books, setBooks] = useState<Book[]>(sampleBooks);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const emptyBook: Omit<Book, "id"> = {
    title: "", author: "", category: "", isbn: "", year: 2024,
    available: true, coverUrl: "", block: "A", shelf: 1, position: 1, description: "",
  };
  const [form, setForm] = useState<Omit<Book, "id">>(emptyBook);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Sesión iniciada");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  const handleSave = () => {
    if (!form.title || !form.author) {
      toast.error("Título y autor son obligatorios");
      return;
    }
    if (editingBook) {
      setBooks((prev) => prev.map((b) => (b.id === editingBook.id ? { ...form, id: editingBook.id } : b)));
      toast.success("Libro actualizado");
    } else {
      setBooks((prev) => [...prev, { ...form, id: Date.now().toString() }]);
      toast.success("Libro agregado");
    }
    setEditingBook(null);
    setIsAdding(false);
    setForm(emptyBook);
  };

  const handleDelete = (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast.success("Libro eliminado");
  };

  const startEdit = (book: Book) => {
    const { id, ...rest } = book;
    setForm(rest);
    setEditingBook(book);
    setIsAdding(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <Lock className="h-12 w-12 text-primary mx-auto" />
            <h1 className="font-display text-2xl font-bold text-foreground">Panel de Administración</h1>
            <p className="text-sm text-muted-foreground">Ingresa la contraseña para continuar</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">Ingresar</Button>
          </form>
          <div className="text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Volver al inicio
            </Link>
          </div>
          <p className="text-xs text-center text-muted-foreground">Demo: contraseña es <code className="bg-muted px-1 rounded">admin123</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
            </Link>
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">Admin — BiblioSearch</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>Cerrar sesión</Button>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Gestión de Libros</h2>
          {!isAdding && (
            <Button onClick={() => { setIsAdding(true); setForm(emptyBook); setEditingBook(null); }} className="gap-2">
              <Plus className="h-4 w-4" /> Agregar libro
            </Button>
          )}
        </div>

        {/* Form */}
        {isAdding && (
          <div className="bg-card border border-border rounded-xl p-6 mb-8 animate-fade-in space-y-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {editingBook ? "Editar libro" : "Nuevo libro"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Título *</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Autor *</label>
                <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Categoría</label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">ISBN</label>
                <Input value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Año</label>
                <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">URL de portada</label>
                <Input value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Bloque</label>
                <Input value={form.block} onChange={(e) => setForm({ ...form, block: e.target.value.toUpperCase() })} maxLength={1} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Estante</label>
                <Input type="number" value={form.shelf} onChange={(e) => setForm({ ...form, shelf: Number(e.target.value) })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Posición</label>
                <Input type="number" value={form.position} onChange={(e) => setForm({ ...form, position: Number(e.target.value) })} />
              </div>
              <div className="space-y-1.5 flex items-end gap-3">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                  <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="rounded" />
                  Disponible
                </label>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Descripción</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSave}>{editingBook ? "Guardar cambios" : "Agregar"}</Button>
              <Button variant="outline" onClick={() => { setIsAdding(false); setEditingBook(null); setForm(emptyBook); }}>Cancelar</Button>
            </div>
          </div>
        )}

        {/* Books Table */}
        <div className="border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Libro</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Ubicación</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-display font-semibold text-sm text-foreground">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{book.category}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                      Bloque {book.block} · Est. {book.shelf}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        book.available ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                      }`}>
                        {book.available ? "Disp." : "Prest."}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(book)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(book.id)}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
