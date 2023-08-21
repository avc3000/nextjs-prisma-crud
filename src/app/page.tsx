"use client"

import { useEffect } from 'react';
import NoteForm from "@/components/NoteForm";
import { useNotes } from './../context/NoteContext';
import NoteCard from '@/components/NoteCard';
import { Note } from '@prisma/client';

const HomePage = () => {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="flex justify-center items-center p-2">
      <div>
        <NoteForm />
        {
          notes.map((note: Note) => (
            <NoteCard key={note.id} note={note}/>
          ))
        }
      </div>
    </div>
  )
}

export default HomePage;