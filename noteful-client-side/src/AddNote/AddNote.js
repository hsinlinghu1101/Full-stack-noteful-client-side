import React from 'react';
import config from '../config';
import NotefulContext from '../NotefulContext'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'

export default class Note extends React.Component {
    state={
        noteTitle:{
            value:''
        },
        content:{
            value:''
        },
        folderId:{
            value:''
        }
    };

    setNoteTitle = title =>{
        this.setState({
            noteTitle:{
                value:title
            }
        })
    }
    setContent = text =>{
        this.setState({
            content:{
                value:text
            }
        })
    }
    setFolderId = id =>{
        this.setState({
            folderId:{
                value:id
            }
        })
    }
    
    static contextType= NotefulContext;
    handleNoteSubmit=event =>{
        event.preventDefault();
        let note ={
            notes_name:this.state.noteTitle.value,
            modified: new Date().toISOString(),
           folders_id: this.state.folderId.value,
            content: this.state.content.value
        }

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(res =>{
            if(!res.ok){
                return res.json().then(e => Promise.reject(e));
            }
            return res.json()
        })
        .then(note =>{
            this.context.addNote(note);
            this.props.history.goBack()
        })
        .then((folder) =>{
            this.context.addFolder(folder);
            this.props.history.goBack()
           })
        .catch(error =>{
            console.error({error})
        })
        
    }

    render(){
        return(
            <div>
                <h2>Create new Note</h2>
                <NotefulForm onSubmit={e => this.handleNoteSubmit(e)}>
                    <label>Note Title</label>
                    <input type='text' value={this.state.noteTitle.value} onChange={e => this.setNoteTitle(e.target.value)} required/>
                    <label>Note Content</label>
                    <textarea type='text' value={this.state.content.value} onChange={e => this.setContent(e.target.value)} required/>
                    <label>Select folder</label>
                    <select onChange={e => this.setFolderId(e.target.value)} required>
                        <option value=''>Select the Folder</option>
                        {this.context.folders.map(folder => <option key={folder.id} value={folder.id}> {folder.folder_name}</option>)}
                    </select>
                    <button>Submit</button>
                </NotefulForm>
            </div>
        )
    }
}