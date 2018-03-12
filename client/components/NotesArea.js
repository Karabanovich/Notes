import React, { Component } from 'react';
import styled from 'styled-components';
const Notes = styled.div`
    margin-top:10px;
    margin-left:15%;
    width:50%;
    height:100%;
`

const Note = styled.div`
    display:flex;
    flex-direction: column;
    margin: 10px 20px 10px 20px;
    width:50px;
`
const Ul = styled.ul`
    display: inline-block;
    list-style:none;
    width:100%;
`
const Li= styled.li`
display: inline-block;
margin: 2%;
width: fit-content;
`
const Label = styled.div`
    width:10px;
    height:10px;
    background:red;
`

class NotesArea extends Component {
    constructor(props) {
        super(props);
        //this.state = { Name: '', f: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => this.forceUpdate());
    }
    render() {
        const store = this.props.store;
        return (
            <Notes>
                <Ul>
                    {store.getState().folders.map((el) => {
                        
                        if(el.folderName === store.getState().folder){
                            return el.Notes.map((el) => (
                                <Li>
                                    <Note>
                                    {el.label ? <Label></Label> : null}

                                    <div>{el.title}</div>
                                    <div>{el.text}</div>
                                    </Note>
                                </Li>

                            ))
                        }
                    })}
                </Ul>

            </Notes>

        )
    }
}
export default NotesArea;
