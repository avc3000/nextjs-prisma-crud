"use client"

import { useState, useRef, useEffect } from 'react';
import { useNotes } from './../context/NoteContext';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || '');
    }
  }, [selectedNote]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (selectedNote) {
      await updateNote(selectedNote.id, { title, content });
      setSelectedNote(null);
    } else {
      await createNote({ title, content });
    }

    setTitle('');
    setContent('');
    titleRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='text-purple-500 text-2xl font-bold text-center'>CRUD TASKS</h2>
      <input type="text" name="title" autoFocus placeholder='title' onChange={(e) => setTitle(e.target.value)} ref={titleRef} value={title} className='w-full px-4 py-2 text-black bg-white rounded-md my-2' />
      <textarea name="content" rows={3} placeholder='Content' onChange={(e) => setContent(e.target.value)} value={content} className='w-full px-4 py-2 text-black bg-white rounded-md my-2'></textarea>
      <div className='flex justify-end gap-x-2'>
        <button type='submit' disabled={!title || !content} className='px-5 py-2 text-white bg-green-600 rounded-md w-full font-bold hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed'>
          {
            selectedNote ? "UPDATE" : "CREATE"
          }
        </button>
        {
          selectedNote && (
            <button type='button' onClick={() => {setSelectedNote(null); setTitle(''); setContent('');}} className='px-5 py-2 text-white bg-blue-600 rounded-md w-full font-bold hover:bg-blue-800'>CANCEL</button>
          )
        }
      </div>
    </form>
  )
}

export default NoteForm;