import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit3, Save, X, NotebookPen, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Note {
  id: number;
  title: string;
  content: string;
  location?: string;
  date: string;
  category: string;
  createdAt: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    location: '',
    category: 'general'
  });

  const categories = [
    { id: 'all', name: 'All Notes', icon: '📝' },
    { id: 'general', name: 'General', icon: '📄' },
    { id: 'itinerary', name: 'Itinerary', icon: '🗓️' },
    { id: 'places', name: 'Places', icon: '📍' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'activities', name: 'Activities', icon: '🎯' },
    { id: 'tips', name: 'Tips', icon: '💡' }
  ];

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('travelNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Initialize with sample notes
      const sampleNotes: Note[] = [
        {
          id: 1,
          title: 'Paris Itinerary Day 1',
          content: 'Visit Eiffel Tower in the morning, then walk along Seine River. Lunch at local bistro near Louvre.',
          location: 'Paris, France',
          date: '2024-02-15',
          category: 'itinerary',
          createdAt: '2024-01-10T10:00:00Z'
        },
        {
          id: 2,
          title: 'Best Tapas Bars in Barcelona',
          content: 'Cal Pep - amazing counter seating and fresh seafood. Quimet & Quimet - tiny place with incredible montaditos.',
          location: 'Barcelona, Spain',
          date: '2024-03-10',
          category: 'food',
          createdAt: '2024-01-12T14:30:00Z'
        },
        {
          id: 3,
          title: 'Packing Checklist',
          content: 'Passport, travel insurance, comfortable walking shoes, portable charger, first aid kit, eco-friendly water bottle.',
          location: '',
          date: '',
          category: 'tips',
          createdAt: '2024-01-08T09:15:00Z'
        }
      ];
      setNotes(sampleNotes);
      localStorage.setItem('travelNotes', JSON.stringify(sampleNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('travelNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        location: newNote.location,
        date: new Date().toISOString().split('T')[0],
        category: newNote.category,
        createdAt: new Date().toISOString()
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', location: '', category: 'general' });
      setIsCreating(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setNewNote({
      title: note.title,
      content: note.content,
      location: note.location || '',
      category: note.category
    });
  };

  const saveEdit = () => {
    if (editingId && newNote.title.trim() && newNote.content.trim()) {
      setNotes(notes.map(note => 
        note.id === editingId 
          ? { ...note, title: newNote.title, content: newNote.content, location: newNote.location, category: newNote.category }
          : note
      ));
      setEditingId(null);
      setNewNote({ title: '', content: '', location: '', category: 'general' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setNewNote({ title: '', content: '', location: '', category: 'general' });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (note.location && note.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Travel Notes</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Keep all your travel memories, plans, and discoveries in one place - accessible offline
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div>
            {/* Add Note Button */}
            <Button 
              onClick={() => setIsCreating(true)}
              className="w-full mb-6 bg-gradient-forest text-white hover:opacity-90"
              disabled={isCreating || editingId !== null}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>

            {/* Categories */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="text-lg">📂 Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                      {category.id !== 'all' && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          ({notes.filter(note => note.category === category.id).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offline Status */}
            <Card className="nature-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Notes saved locally</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your notes are automatically saved and available offline
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Create/Edit Form */}
            {(isCreating || editingId) && (
              <Card className="nature-card mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <NotebookPen className="h-5 w-5 text-primary" />
                    {editingId ? 'Edit Note' : 'Create New Note'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Note title..."
                      value={newNote.title}
                      onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location (optional)</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={newNote.location}
                        onChange={(e) => setNewNote({...newNote, location: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newNote.category}
                        onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Write your note here..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={editingId ? saveEdit : addNote}
                      className="bg-gradient-nature text-white hover:opacity-90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? 'Save Changes' : 'Save Note'}
                    </Button>
                    <Button variant="outline" onClick={cancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes List */}
            <div className="space-y-4">
              {filteredNotes.length === 0 ? (
                <Card className="nature-card">
                  <CardContent className="text-center py-12">
                    <NotebookPen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No notes found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm ? 'Try adjusting your search terms' : 'Start by creating your first travel note'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotes.map(note => {
                  const category = categories.find(c => c.id === note.category);
                  return (
                    <Card key={note.id} className="nature-card">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">{note.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                {category?.icon} {category?.name}
                              </span>
                              {note.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {note.location}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(note.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditing(note)}
                              disabled={isCreating || editingId !== null}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNote(note.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;