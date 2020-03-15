import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import NotefulContext from '../NotefulContext'
import { findNote } from '../notes-helpers'

export default class NotePageMain extends React.Component {
static defaultProps ={
  match:{
    params:{}
  }
}

static contextType = NotefulContext;

handleDeleteNote = (noteId) =>{
  this.props.history.push('/')
}


  render(){

    const { notes=[] } =this.context;
    
    const { noteId }= this.props.match.params;
    const note = findNote(notes, parseInt(noteId)) || { id: noteId, content: ''};
    
    //const note = findNote(notes, noteId) || { id: 0, content: ''};
  return (
    <section className='NotePageMain'>
      <Note
        id={(note.id)}
        name={note.notes_name}
        modified={note.modified}
        onDeleteNote={this.handleDeleteNote}
      />
      
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
