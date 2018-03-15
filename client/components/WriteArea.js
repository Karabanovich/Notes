import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/label.png';
const Write = styled.div`

    width:200px;
    display:inline-block;
    flex-direction:column;
    align-items:center;
    background-color:#fafafa;
    height:calc(100% - 48px);
`
const NoteForm = styled.div`
    width:80%;
    margin-top:10px;
    display:flex;
    flex-direction:column;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    height:170px;
    border-radius:2px; 
`
const Textarea = styled.textarea`
    border:none;
    height:150px;
    resize: none;
`
const Title = styled.textarea`
    border:none;
    background-color:#f1f5f4;
    height:20px;
    resize: none;
    
`
const Label = styled.label`  
    font-weight: 650;     
    width:80%;
    text-align: center;
    cursor:pointer;
    user-select:none; 
    transition: 0.2s;  
    &:hover {
        background: #f1f5f4c2; 
    } 
    &:active { 
        background:  #f1f5f4;
    }
`
const Button = styled.a` 
    width:60%;
    margin-top:10px;
    cursor: pointer;
    user-select:none; 
    font-weight: 700; 
    color: white; 
    text-decoration: none; 
    padding: .8em 1em calc(.8em + 3px); 
    border-radius: 5px; 
    background: #3b787f; 
    box-shadow: 0 -3px #1b4f52 inset; 
    transition: 0.2s;  
    &:hover {
        background: #4b8890; 
    } 
    &:active { 
        background: #2e5d63; 
        box-shadow: 0 3px #3b787f inset; 
    }
`
const Li = styled.li`
    display: inline-block;
    margin: 0px 20px 20px 20px;
    
    transition: 0.2s;  
`
const Head = styled.div`
    display:flex;
    justify-content:space-between;
    background-color:#f1f5f4;
    height:30px;
    align-items:center;
    
`
const Note = styled.div`
    display:flex;
    flex-direction: column;
    margin: 0px 10px 10px 10px;
    width:180px;
    height:200px;
    border-radius:2px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
`
const Img = styled.img`
    position: relative;
    bottom: 10px;
    height: 37px;
    width: 25px;
    opacity: ${(props) => props.op === 1 ? 0.8 : 0.1}
    cursor:pointer;
    &:hover {
       opacity:0.4;
    }

`
const AddIcon = styled.i`
    cursor:pointer;
    color:#266473a3;
    &:hover {
        color:#266473;
    }
`
class WriteArea extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', text: '', label: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => this.forceUpdate());
    }
    render() {
        const store = this.props.store;
        return (
            <Li>
                <Note>
                    <Head>
                        <Img op={this.state.label ? 1 : 0} src={image} onClick={() => {
                            this.setState({ label: !this.state.label });
                        }} />
                        <Title value={this.state.title} onChange={(e) => {
                            this.setState({ title: e.target.value });
                        }}></Title>
                        <AddIcon className="material-icons" onClick={() => {
                            if (this.state.text && this.state.title) {
                                this.setState({ title: '', text: '', label: false });
                                store.dispatch({
                                    type: 'addNote',
                                    note: {
                                        title: this.state.title,
                                        text: this.state.text,
                                        label: this.state.label
                                    }
                                });
                            }
                        }}>note_add</AddIcon>
                    </Head>
                    <Textarea value={this.state.text} onChange={(e) => {
                        this.setState({ text: e.target.value });
                    }}></Textarea>
                </Note>
            </Li>

        )
    }
}
export default WriteArea;
