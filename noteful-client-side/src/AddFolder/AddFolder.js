import React from 'react';
import config from '../config';
import NotefulContext from '../NotefulContext'
import NotefulForm from '../NotefulForm/NotefulForm'

export default class AddFolder extends React.Component{
state={
 folderName:{
    value:'',
 }
    

}
static contextType = NotefulContext;

setFolderName= name =>{
    this.setState({
        folderName:{
            value:name
        }
        
    })
}

handleSubmit=event=>{
    event.preventDefault();
    let folder={
        folder_name:this.state.folderName.value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
        method:'POST',
        headers:{
         'Content-Type': 'application/json'
        },
        body:JSON.stringify(folder)
    })
    .then(res =>{
        if(!res.ok){
            return res.json().then(error =>{
                throw error
            })
        }
        return res.json()
    })
    .then(() =>{
     this.context.addFolder(folder);
     this.props.history.goBack()
    })
    .catch(error =>{
        console.log(error)
    })
}
render(){
    return(
        <div>
        <h2> Add New Folder</h2>
        <NotefulForm onSubmit={event => this.handleSubmit(event)}>
            <label htmlFor='folder-title'>Folder Name</label>
            <input type='text' name='folder-title' value={this.state.folderName.value} onChange={e => this.setFolderName(e.target.value)}
            />
            <button>Submit</button>
        </NotefulForm>
        </div>
        
        
    )
}
   
}