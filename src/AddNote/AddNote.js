import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';

class AddNote extends Component{
    static contextType = ApiContext;
    state = {
        error: null,
    }

//handleChange = (event) => {
 //   this.setState({
 //       folderId: event.target.selectFolder.key.value});
//};

handleSubmit=(event) => {
    event.preventDefault();
    const {name, content, selectFolder} = event.target
    const newNote = {
        name: name.value,
        content: content.value,
       folderId: selectFolder.value
    }
    newNote.propTypes={
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired
    };

    newNote.defaultProps = {
        name: " ",
        content: " ",
       folderId: " "
    }


    this.setState({ error: null})
    fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        body: JSON.stringify(newNote),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }
        return res.json()
    })
    .then(data => {
        name.value = ''
        content.value= ''
       selectFolder.value= ''
        this.context.addNote(data)
        this.props.history.push('/')
    })
    .catch(error => {
        this.setState({error})
    })
    console.log(newNote);
 };

    render() {
        const { folders=[]} = this.context
        return (
        <form className='addNote' onSubmit={this.handleSubmit}>
                 <h2>Create a New Note </h2>
            <div className='noteForm'>
                <div className='form-group'>
                    <label htmlFor='noteName'>
                        Enter Note Name:
                        {' '}
                        </label>
                    <input type='text' className='addNote' name='noteName' id='noteName'/>
                 </div>
            <div className='form-group'>
                <label htmlFor='noteContent'>
                    Enter Note Content:
                    {' '} 
                    </label>
                <textarea name='noteContent' id='noteContent'/>
            </div>
            <div className='addNote'>
                <label htmlFor='selectFolder'>Select a Folder</label>
                <select name='selectFolder' id='selectFolder'>
                 {folders.map((folder) => (
                     <option key={folder.id} value={folder.id}> {folder.name}</option>
                 ))}  
                 
                </select>
            </div>
                 <button type='submit' className='noteForm'>
                     Save
                 </button>
             </div>
        </form>

        );
    }
}

export default AddNote;