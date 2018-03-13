import React, { Component } from 'react';
import styled from 'styled-components';
const Notes = styled.div`
    margin-top:10px;
    margin-left:15%;
    width:60%;
    height:100%;
`

const Note = styled.div`
    display:flex;
    flex-direction: column;
    margin: 10px 20px 10px 20px;
    width:150px;
`
const Ul = styled.ul`
    display: inline-block;
    list-style:none;
    width:100%;
`
const Li = styled.li`
display: inline-block;
margin: 2%;
width: fit-content;
`
const Head = styled.div`
    display:flex;
    border: 1px solid rgba(0,0,255, 0.8);
`
const Title = styled.div`
    width:70%;
    border-right: 1px solid rgba(0,0,255, 0.8);
    min-height:20px;
`
const Toolbar = styled.div`
    align-items:center;
    width:30%;
    display:flex;
    justify-content:flex-end;
`
const Text = styled.div`
    border: 1px solid rgba(5, 5, 5, .5);
    border-top:0px;
    height: 150px; 
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

                        if (el.folderName === store.getState().folder) {
                            return el.Notes.map((el, i) => (
                                <Li id='i'>
                                    <Note>
                                        <Head>
                                            <Title>
                                                {el.title}
                                            </Title>
                                            <Toolbar>
                                                {el.label ? <input type="checkbox"></input> : null}
                                                <button onClick={() => store.dispatch({ type: 'deleteNote', id: i })}>D</button>
                                            </Toolbar>
                                        </Head>
                                        <Text>{el.text}</Text>
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
