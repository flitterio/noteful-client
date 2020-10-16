import React, {Component} from 'react';

class AddFolder extends Component{
    render() {
        return (
             <form className='addFolder'>
                 <h2>Create a New Folder </h2>
                 <label htmlFor='folderName'>Enter Folder Name:</label>
                 <input type='text' className='folderName' name='folderName' id='folderName'/>
                 <button type='submit' className='addFolder'>
                     Save
                 </button>
             </form>
        );
    }
}

export default AddFolder;