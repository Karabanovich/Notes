import React, { Component } from 'react';
import styled from 'styled-components';
const Write = styled.div`
    position: fixed;
    right:0;
    top:70px;
    margin-right:3%;
    width:15%;
    display:flex;
    flex-direction:column;
    align-items:center;
 
`

const Textarea = styled.textarea`
    width:100%;
    height:100px;
    border-radius:7px;
    resize: none;
    border: 2px solid rgba(5, 5, 5, .5);
    background-color: rgba(5,5,136,0.035);
`
const Header = styled.textarea`
    margin:10px 0px 10px 0px;
    height:20px;
    width:100%;
    border-radius:7px;
    resize: none;
    border: 2px solid rgba(5, 5, 5, .5);
    background-color: rgba(5,5,136,0.035);
`
const Label = styled.label`  
    font-weight: 650;     
    width:100%;
    text-align: center;
    cursor:pointer;
    user-select:none; 
    transition: 0.2s;  
    &:hover {
        background: #c5cdff7a; 
    } 
    &:active { 
        background: #c5cdff; 
        box-shadow: 0 3px #c5cdff inset; 
    }
`
const Button = styled.a` 
    margin-top:20px;
    cursor: pointer;
    user-select:none; 
    font-weight: 400; 
    color: white; 
    text-decoration: none; 
    padding: .8em 1em calc(.8em + 3px); 
    border-radius: 3px; 
    background: #4d61e4; 
    box-shadow: 0 -3px #374bca inset; 
    transition: 0.2s;  
    &:hover {
        background: #374bca; 
    } 
    &:active { 
        background: #2e41c2; 
        box-shadow: 0 3px #2e41c2 inset; 
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
                <Label><input type="checkbox" checked={this.state.label} onClick={(e) => { this.setState({ label: e.target.checked }) }} />Mark as important!</Label>
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
