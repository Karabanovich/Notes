import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/label.png';
const Notes = styled.div`
    margin-top:22px;
    margin-left:15%;
    width:70%;
    height:100%;
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
const Ul = styled.ul`
    list-style:none;
    width:100%;
`
const Li = styled.li`
    display: inline-block;
    margin: 0px 20px 20px 20px;
    width: fit-content;
    transition: 0.2s;  
`
const Head = styled.div`
    display:flex;
    justify-content:space-between;
    background-color:rgba(0, 0, 0, 0.034);
    height:30px;
    align-items:center;
    
`
const Title = styled.div`
    width: 150px;
    min-width:120px;
    height:30px;
    font-weight: 700; 
`
const Text = styled.div`
    border-top:0px;
    height: 180px;
    word-wrap:break-word; 
`
const Label = styled.label`
    width:20px;
`
const I = styled.i`
    cursor:pointer;
    color:#303f9f83;
`
const Img = styled.img`
    position: relative;
    bottom: 12px;
    height: 37px;
    width: 25px;
    opacity: ${(props) => props.op}
    cursor:pointer;
    &:hover {
       opacity:0.3;
    }

`
class NotesArea extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: '' };
    }
    componentDidMount() {
        this.props.store.subscribe(() => this.forceUpdate());
    }
    render() {
        const store = this.props.store;
        return (
            <Notes>
                <Ul>
                    {
                        store.getState().folders.map((el) => {
                            if (el.folderName === store.getState().folder) {
                                return el.Notes.map((el, i) => (
                                    <Li>
                                        <Note>
                                            <Head>
                                                <Img op={el.label ? 0.8 : 0.1} src={image} onClick={() => {
                                                    store.dispatch({
                                                        type: 'addLabel', id: i, label: !el.label
                                                    })
                                                }} />
                                                <Title>
                                                    {el.title}
                                                </Title>
                                                <I className="material-icons" onClick={() => {
                                                    store.dispatch({
                                                        type: 'deleteNote', id: i
                                                    })
                                                }}>delete</I>
                                            </Head>
                                            <Text>{el.text}</Text>
                                        </Note>
                                    </Li>

                                ))
                            }
                        })
                    }
                </Ul>

            </Notes>

        )
    }
}
export default NotesArea;
