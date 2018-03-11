import React, { Component } from 'react';
import styled from 'styled-components';
const Notes = styled.div`
    display:flex;
    width:50%;
    height:100%;
    overflow:auto;
`
const Li = styled.li`
    display:flex;

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
                <ul>
                    {store.getState().folders.map((el) => {
                        
                        if(el.folderName === store.getState().folder){
                            return el.Notes.map((el) => (
                                <Li >
                                    {el.label ? <Label></Label> : null}

                                    <div>{el.title}</div>
                                    <div>{el.text}</div>
                                </Li>

                            ))
                        }
                    })}
                </ul>

            </Notes>

        )
    }
}
export default NotesArea;
