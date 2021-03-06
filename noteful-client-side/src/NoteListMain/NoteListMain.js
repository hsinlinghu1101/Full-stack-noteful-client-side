import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import NotefulContext from '../NotefulContext'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType= NotefulContext
  render(){
    const folderId = parseInt(this.props.match.params.folderId)
    const notes = this.context.notes.filter(note => note.folders_id === folderId || !folderId)
  return (
    
    <section className='NoteListMain'>
     
      <ul>
        
        {notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.notes_name}
              modified={note.modified}
            />
          </li>
        )}
       
      </ul>
      
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
      
    </section>
    
    
  )
}
}

NoteListMain.defaultProps = {
  notes: [],
}
