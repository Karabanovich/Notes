import React, { Component } from 'react';
import styled from 'styled-components';
const Write = styled.div`
    position: fixed;
    right:0;
    width:200px;
    display:flex;
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
            <Write>
                <Label><input type="checkbox" checked={this.state.label} onClick={(e) => { this.setState({ label: e.target.checked }) }} />PRESS TO LABEL</Label>
                <NoteForm>
                    <Title type="text" maxLength="23" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                    <Textarea type="text" maxLength="184" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }) }} />
                </NoteForm>
                <Button onClick={() => {
                    if (this.state.text) {
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
                }}>Add Note</Button>
            </Write>

        )
    }
}
export default WriteArea;
