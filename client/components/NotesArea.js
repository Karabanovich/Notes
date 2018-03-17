import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/label.png';
import WriteArea from './WriteArea';

const NotesAndSearch = styled.div`
    margin-left:${props => props.isMobile ? '0' : '200px'};
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
`
const SearchBox = styled.div`
    position:sticky;
    display:flex;
    align-items:center;
    top:48px;
    height:48px;
    z-index:1;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    background-color:white;
    border: 1px solid white;
`
const SearchIcon = styled.i`
    margin-left:20px;
    color: #00000069;
`
const Search = styled.input`
    border:none;
    margin: 3px 20px 3px 0px;
    width:100%;
`
const Note = styled.div`
    display:flex;
    flex-direction: column;
    margin: 0px 10px 10px 10px;
    width:200px;
    height:230px;
    border-radius:4px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
`
const Notes = styled.div`
    margin-top:15px;
    text-align:${props => props.align ? 'center' : 'default'};
`

// width: fit-content; ???

const Li = styled.li`
    display: inline-block;
    margin: 0px 20px 20px 20px;
    position:relative;
`
const Head = styled.div`
    display:flex;
    justify-content:space-between;
    background-color:#f1f5f4;
    height:15%;
    align-items:center;
    
`
const Title = styled.div`
    width: 150px;
    text-align:center;
    height:85%;
    font-weight: 700; 
`
const Text = styled.div`
    border-top:0px;
    height: 180px;
    word-wrap:break-word; 
`
const DelIcon = styled.i`
    user-select:none;
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
const Popup = styled.div`
    width:100%;
    min-height:100%;
    background-color: rgba(0,0,0,0.5);
    overflow:hidden;
    position:fixed;
    top:48px;
    left:0;
    z-index:5;
`
const PopupCont = styled.div`
    margin:8em auto 0% auto;
    width:200px;
    padding:5px;
    background-color: #c5c5c5;
    border-radius:5px;
    box-shadow: 0px 0px 10px #000;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Menu = styled.div`
    position:absolute;
    top:15%;
    right:13px;
    padding:5px 0px 5px 0px;
    width:80px;
    background:white;
    display:flex;
    flex-direction:column;
    border-radius:3px;
    box-shadow: 0 0 2px rgba(0,0,0,0.5);
    &::after {
        content: ''; 
        position: absolute; /* Абсолютное позиционирование */
        right: 5px;
        top: -10px; /* Положение треугольника */
        border: 5px solid transparent; /* Прозрачные границы */
        border-bottom: 5px solid #e2e2e2; /* Добавляем треугольник */
    }
    
`
const MenuSend = styled.div` 
    padding-left:5px; 
    cursor:pointer;
    user-select:none;
    &:hover {
        background:#edeef0;
    }
`
const MenuDel = styled.div`
    padding-left:5px; 
    cursor:pointer;
    user-select:none;
    &:hover {
        background:#edeef0;
    } 
    color:#a2040b;
`
const Button = styled.a` 
    cursor: pointer;
    margin:10px 10px 5px 10px;
    height:20px;
    user-select:none; 
    font-weight: 700; 
    color: white; 
    text-decoration: none; 
    padding: .4em 1em calc(.4em + 1px); 
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

const Input = styled.input`
    margin:10px 10px 0px 10px;   
    padding-left:1em;
    height:30px;
    resize: none;
    border:none;
    border-radius: 5px; 
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    background-color: white;
`

class NotesArea extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: '', usSend: false, note: null, username: null, wrongUser: false, usOpenMenu: false, noteMenu: null };
    }
    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            if (this.refs.notes && this.props.store.getState().lastAction !== 'nothing')
                this.forceUpdate();
            if (this.props.store.getState().lastAction === 'okSend') {
                console.log('OK');
                this.setState({ usSend: false, wrongUser: false, username: null });
            }
            else if (this.props.store.getState().lastAction === 'erSend') {
                this.setState({ wrongUser: true });
            }
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const store = this.props.store;
        return (
            <NotesAndSearch isMobile={store.getState().isMobile} onClick ={()=>{this.setState({usOpenMenu:false, noteMenu:null})}}>
                {
                    this.state.usSend ?
                        <Popup id='Popup' onClick={(e) => {
                            if (e.target.id === 'Popup')
                                this.setState({ usSend: false, username: null, wrongUser: false });
                        }}>
                            <PopupCont >
                                <div >Send to:</div>
                                {
                                    this.state.wrongUser ?
                                        <div>invalid username</div>
                                        : null
                                }
                                <Input  placeholder="username" value={this.state.username} onChange={(e) => {
                                    this.setState({ username: e.target.value })
                                }} />

                                <Button onClick={() => {
                                    if (this.state.username === store.getState().user)
                                        this.setState({ wrongUser: true })
                                    else
                                        store.dispatch({
                                            type: 'sendNote', note: this.state.note, user: this.state.username
                                        });

                                }}>
                                    OK</Button>
                            </PopupCont>
                        </Popup>
                        : null
                }
                <SearchBox>
                    <SearchIcon className="material-icons">search</SearchIcon>
                    <Search placeholder="Search" onChange={(e) => {
                        this.setState({ filter: e.target.value });
                    }} />
                </SearchBox>
                <Notes ref='notes' align={store.getState().isMobile}>
                    {
                        store.getState().folder !== 'Inbox' ?
                            <WriteArea store={this.props.store} />
                            : null
                    }
                    {
                        store.getState().folders.map((el) => {
                            if (el.folderName === store.getState().folder) {
                                return el.Notes.map((el, i) => {
                                    if (el.title.search(this.state.filter) !== -1)
                                        return (
                                            <Li>
                                                {
                                                    el.from ?
                                                        <div>From:{el.from}</div>
                                                        : null
                                                }

                                                {
                                                    el === this.state.noteMenu && this.state.usOpenMenu ?
                                                        <Menu >
                                                            <MenuSend  onClick={() => {
                                                                this.setState({ usSend: true, note: el });
                                                            }}>Send</MenuSend>
                                                            <MenuDel  onClick={() => {
                                                                store.dispatch({
                                                                    type: 'deleteNote', id: i
                                                                })
                                                            }}>Delete</MenuDel>
                                                        </Menu>
                                                        : null
                                                }
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

                                                        <DelIcon className="material-icons" onClick={(event) => {
                                                            this.state.usOpenMenu ?
                                                                this.state.noteMenu === el ?
                                                                    this.setState({ usOpenMenu: false, noteMenu: null }) :
                                                                    this.setState({ usOpenMenu: true, noteMenu: el }) :
                                                                this.setState({ usOpenMenu: true, noteMenu: el })
                                                        
                                                                event.stopPropagation();
                                                        }}>
                                                            more_horiz</DelIcon>
                                                    </Head>
                                                    <Text>{el.text}</Text>

                                                </Note>
                                            </Li>

                                        )
                                })
                            }
                        })
                    }

                </Notes>

            </NotesAndSearch>

        )
    }
}
export default NotesArea;
