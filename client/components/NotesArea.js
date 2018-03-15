import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/label.png';

const NotesAndSearch = styled.div`
    margin-left:200px;
    margin-right:200px;
    height:100%;
    width:100%;
    border:0.5px dashed black;

    display:flex;
    flex-direction:column;
`
const SearchBox = styled.div`
    position:sticky;
    display:flex;
    align-items:center;
    left:200px;
    right:200px;
    top:48px;
    height:35px;
    z-index:1;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    background-color:white;
    border: 1px solid white;
`
const SearchIcon = styled.i`
`
const Search = styled.input`
    margin: 3px 20px 3px 0px;
    width:100%;
    border:0.4px solid black;
    border-radius:15px;

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
const Notes = styled.div`
    margin-top:10px;
`

// width: fit-content; ???

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
const DelIcon = styled.i`
    cursor:pointer;
    color:#266473a3;
    &:hover {
        color:#266473;
    }
`
const Img = styled.img`
    position: relative;
    bottom: 10px;
    height: 37px;
    width: 25px;
    opacity: ${(props) => props.op === 1 ? 0.8 : 0.1}
    cursor:pointer;
    &:hover {
       opacity:0.4
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
            <NotesAndSearch>
                <SearchBox>
                <SearchIcon className="material-icons">search</SearchIcon>
                    <Search />
                </SearchBox>
                <Notes>
                    {
                        store.getState().folders.map((el) => {
                            if (el.folderName === store.getState().folder) {
                                return el.Notes.map((el, i) => (
                                    <Li>
                                        <Note>
                                            <Head>
                                                <Img op={el.label ? 1 : 0} src={image} onClick={() => {
                                                    store.dispatch({
                                                        type: 'addLabel', id: i, label: !el.label
                                                    })
                                                }} />
                                                <Title>
                                                    {el.title}
                                                </Title>
                                                <DelIcon className="material-icons" onClick={() => {
                                                    store.dispatch({
                                                        type: 'deleteNote', id: i
                                                    })
                                                }}>delete</DelIcon>
                                            </Head>
                                            <Text>{el.text}</Text>
                                        </Note>
                                    </Li>

                                ))
                            }
                        })
                    }
                </Notes>

            </NotesAndSearch>

        )
    }
}
export default NotesArea;
