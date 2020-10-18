import React, {Component} from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import PropTypes from 'prop-types';

class AddFolder extends Component{
    static contextType = ApiContext;
    state ={
        error: null,
    }

    handleSubmit=(event)=> {
        event.preventDefault()
        const {folderName} = event.target
        const newFolder ={
            name: folderName.value,
            id: '_' + Math.random().toString(36).substr(2, 9)
        }
        newFolder.propTypes={
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired
        };

        this.setState({error: null})
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            body: JSON.stringify(newFolder),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw console.error();
                })
            }
            return res.json()
        })
        .then(data => {
            folderName.value=''
            this.context.addFolder(data)
            this.props.history.push('/')
        })
        .catch(error => {
            this.setState({error})
        })
        console.log(newFolder);
    }
    render() {
        return (
             <form className='addFolder' onSubmit={this.handleSubmit}>
                 <h2>Create a New Folder </h2>
                 <label htmlFor='folderName'>Enter Folder Name:</label>
                 <input type='text' className='folderName' name='folderName' id='folderName' required/>
                 <button type='submit' className='addFolder'>
                     Save
                 </button>
             </form>
        );
    }
}

export default AddFolder;