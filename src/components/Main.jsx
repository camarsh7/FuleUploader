import React from 'react';

class Main extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            fileURL: '',
        };
        
        this.handleUploadFile = this.handleUploadFile.bind(this);
    }
    
    handleUploadFile(ev) {
        ev.preventDefault();
        
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
        
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
            this.setState({ fileURL: 'http://localhost:8080/${body.file}'});
            });
        });
    }
    
    render () {
        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>
                <div>
                    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                </div>
                <br />
                <div>
                    <button>Upload</button>
                </div>
                <img src={this.state.imageURL} alt="img" />
            </form>
        );
    }
}

export default Main;