import { useNotes } from '@/context/NoteContext';
import { Note } from '@prisma/client';
import { HiTrash, HiPencil } from 'react-icons/hi';

const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div className="bg-black text-white p-4 my-2 flex justify-between rounded-lg border-2">
      <div>
        <h1 className='text-2xl font-bold'>{note.title}</h1>
        <p>{note.content}</p>
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
      <div className='flex gap-x-2'>
        <button onClick={async () => { if (confirm("Are you sure you want to delete?")) await deleteNote(Number(note.id))}}>
          <HiTrash className="text-2xl text-red-600" />
        </button>
        <button onClick={() => setSelectedNote(note)}>
          <HiPencil className="text-2xl text-yellow-600" />
        </button>
      </div>
    </div>
  )
}

export default NoteCard;