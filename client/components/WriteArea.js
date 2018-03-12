import React, { Component } from 'react';
import styled from 'styled-components';
const Write = styled.div`
    position: fixed;
    right:0;
    top:70px;
    margin-right:3%;
    display:flex;
    flex-direction:column;
    align-items:center;
 
`

const Textarea = styled.textarea`
    width:40%;
    min-width:150px;
    height:100px;
    border-radius:10px;
    resize: none;
    border: 5px solid rgba(5, 5, 5, .5);
    background-color: rgba(5,5,136,0.035);
`
const Header = styled.textarea`
    margin:10px 0px 10px 0px;
    height:20px;
    width:40%;
    min-width:150px;
    border-radius:10px;
    resize: none;
    border: 5px solid rgba(5, 5, 5, .5);
    background-color: rgba(5,5,136,0.035);
`
const Label = styled.label`
    text-align: center;
`
const Button = styled.a` 
    margin-top:30px;
    cursor: pointer;
    user-select:none; 
    font-weight: 700; 
    color: white; 
    text-decoration: none; 
    padding: .8em 1em calc(.8em + 3px); 
    border-radius: 3px; 
    background: rgb(64,199,129); 
    box-shadow: 0 -3px rgb(53,167,110) inset; 
    transition: 0.2s;  
    &:hover {
        background: rgb(53, 167, 110); 
    } 
    &:active { 
        background: rgb(33,147,90); 
        box-shadow: 0 3px rgb(33,147,90) inset; 
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
                <Label><input type="checkbox" checked={this.state.label} onClick={(e) => { this.setState({ label: e.target.checked }) }} />Important</Label>
                <Header type="text" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                <Textarea type="text" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }) }} />
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
