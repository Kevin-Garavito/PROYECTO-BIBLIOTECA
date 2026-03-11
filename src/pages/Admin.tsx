import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Plus, Pencil, Trash2, Lock, Upload, Image, X } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, coverUrl: reader.result as string });
      toast.success("Imagen de portada cargada");
    };
    reader.readAsDataURL(file);
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
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground">Panel Admin</h1>
              <p className="text-sm text-muted-foreground">Ingresa la contraseña para gestionar libros</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
              <Button type="submit" className="w-full h-11 font-semibold">Ingresar</Button>
            </form>
            <div className="text-center space-y-2">
              <Link to="/" className="text-sm text-primary hover:underline transition-colors">
                ← Volver al inicio
              </Link>
              <p className="text-xs text-muted-foreground">Demo: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
            </Link>
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">Admin</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>Cerrar sesión</Button>
        </div>
      </header>

      <div className="container px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Gestión de Libros</h2>
            <p className="text-sm text-muted-foreground">{books.length} libros registrados</p>
          </div>
          {!isAdding && (
            <Button onClick={() => { setIsAdding(true); setForm(emptyBook); setEditingBook(null); }} className="gap-2">
              <Plus className="h-4 w-4" /> Agregar libro
            </Button>
          )}
        </div>

        {/* Form */}
        {isAdding && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8 animate-fade-in space-y-5">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {editingBook ? "Editar libro" : "Nuevo libro"}
            </h3>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Foto de portada</label>
              <div className="flex items-start gap-4">
                <div className="w-28 h-36 rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center overflow-hidden shrink-0">
                  {form.coverUrl ? (
                    <div className="relative w-full h-full group">
                      <img src={form.coverUrl} alt="Portada" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setForm({ ...form, coverUrl: "" })}
                        className="absolute top-1 right-1 p-1 rounded-full bg-foreground/70 text-background opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-2">
                      <Image className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                      <p className="text-xs text-muted-foreground/60 mt-1">Sin portada</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2 flex-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Subir imagen
                  </Button>
                  <p className="text-xs text-muted-foreground">O pega una URL:</p>
                  <Input
                    value={form.coverUrl.startsWith("data:") ? "" : form.coverUrl}
                    onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
                    placeholder="https://ejemplo.com/portada.jpg"
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

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
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">
                <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="rounded" />
                Disponible
              </label>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Descripción</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="px-6">{editingBook ? "Guardar cambios" : "Agregar libro"}</Button>
              <Button variant="outline" onClick={() => { setIsAdding(false); setEditingBook(null); setForm(emptyBook); }}>Cancelar</Button>
            </div>
          </div>
        )}

        {/* Books Table */}
        <div className="border border-border rounded-2xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/70">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Portada</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Libro</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Categoría</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Ubicación</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2">
                      <div className="w-10 h-14 rounded-md bg-primary/10 overflow-hidden flex items-center justify-center">
                        {book.coverUrl ? (
                          <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-primary/30" />
                        )}
                      </div>
                    </td>
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
