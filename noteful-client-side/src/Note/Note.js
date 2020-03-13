import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import NotefulContext from '../NotefulContext'
import config from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default class Note extends React.Component {

  static defaultProps ={
    deleteTheNote:()=>{}
  }

  static contextType= NotefulContext;

  handleDelete= (event)=>{
  event.preventDefault()
    let noteId= this.props.id
    console.log(noteId)

   fetch(`${config.API_ENDPOINT}/notes/${noteId}`,{
     method:'DELETE',
     header:{
       'content-type':'application/json'
     },
   })
   .then(res =>{
     if(!res.ok){
       throw new Error(res.statusText)
     }
   })
   .then(()=>{
     this.context.deleteNote(noteId)
     this.props.deleteTheNote(noteId)
   })
   .catch(error =>{
     console.log({error})
   })
  }
  render(){

  const {name, id, modified}=this.props
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={ this.handleDelete}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
}