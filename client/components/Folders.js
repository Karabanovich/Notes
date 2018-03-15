import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/book.png';

const Left = styled.div`
    width:200px;
    position:fixed;
    left:0;
    z-index:2;
    display:flex;
    background-color:#fafafa;
    flex-direction:column;
    height:calc(100% - 48px);
`
const Folds = styled.div`
    margin:10px 10px 35px 10px;
    display:flex;
    background:#fafafa;
    flex-direction: column;
    overflow:auto;
`
const Li = styled.div`
    background:${props => props.clr};
    position:relative;
    cursor:pointer;
    user-select:none; 
    min-height:30px;
    margin:0px 0px 0px 5px;
    display:flex;
    &:hover {
        background:rgb(255,255,255);
   } 
   &:active { 
       background: rgb(255,255,255); 
   }
`;


const FolderName = styled.div`
    min-height:30px;
    user-select:none; 
    word-wrap:break-word;
`

const Button = styled.a` 
    cursor: pointer;
    margin:10px 10px 10px 10px;
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
    margin:0px 10px 0px 10px;   
    padding-left:1em;
    height:30px;
    resize: none;
    border:none;
    border-radius: 5px; 
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    background-color: white;
`
const DelIcon = styled.i`
    position:absolute;
    right:5px;
    top:3px;
    cursor:pointer;
    color:#266473a3;
    &:hover {
        color:#266473;
    }
`
const Popup = styled.div`
    width:100%;
    min-height:100%;
    background-color: rgba(0,0,0,0.5);
    overflow:hidden;
    position:fixed;
    top:0px;
`
const PopupCont = styled.div`
    margin:300px auto 0px auto;
    width:200px;
    padding:5px;
    background-color: #c5c5c5;
    border-radius:5px;
    box-shadow: 0px 0px 10px #000;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const DeleteText = styled.div`
    text-align:center;
`
const DelButton = styled.a` 
    height:10px;
    cursor: pointer;
    user-select:none; 
    font-weight: 700; 
    color: white; 
    text-decoration: none; 
    padding: .1em 1em calc(.8em + 3px); 
    border-radius: 5px; 
    background: #701919;
    box-shadow: 0 -3px #0e0404 inset;
    transition: 0.2s;  
    &:hover {
        background: #a83535; 
    } 
    &:active { 
        background: #701919; 
        box-shadow: 0 3px #a83535 inset; 
    }
`
class Folders extends Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', f: false, del: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => {
            let a = this.props.store.getState().lastAction;
            if (this.refs.fldrs && (a === 'addFolder' || a === 'deleteFolder' || a === 'changeUser' || a === 'changeFolder'))
                this.forceUpdate()
        });
    }
    render() {
        const store = this.props.store;
        return (
            <Left ref="fldrs">
                <Button onClick={() => {
                    if (this.state.f) {
                        this.setState({ f: false });
                        if (this.state.Name) {
                            store.dispatch({ type: 'addFolder', folder: { folderName: this.state.Name, Notes: [] } }); this.forceUpdate()
                        }
                    }
                    else
                        this.setState({ f: true });
                }}>Add Book</Button>
                {
                    this.state.f ? <Input placeholder="Book name" type="text" maxLength="23" onChange={(e) => { this.setState({ Name: e.target.value }) }} /> : null
                }
                <Folds>
                    {store.getState().folders.map((el) => (
                        <Li clr={store.getState().folder === el.folderName ? 'rgb(255,255,255)' : '#fafafa'} onClick={() => { store.dispatch({ type: 'changeFolder', folder: el.folderName }) }}>
                            <img src={image} width="20px" height="20px" />
                            <FolderName>{el.folderName}</FolderName>
                            {store.getState().folder === el.folderName && el.folderName !== 'Main' ?
                                <DelIcon className="material-icons" onClick={() => {
                                    this.setState({ del: true });
                                }}>cancel</DelIcon>
                                : null
                            }
                        </Li>
                    ))}
                </Folds>
                {
                    this.state.del ?
                        <Popup id='Popup' onClick={(e) => {
                            if (e.target.id === 'Popup')
                                this.setState({ del: false });
                        }}>
                            <PopupCont >
                                <DeleteText>Are you sure you want to delete this Book?</DeleteText>
                                    <DelButton onClick={() => {
                                        store.dispatch({
                                            type: 'deleteFolder', folder: store.getState().folder
                                        });
                                        this.setState({ del: false });
                                    }}>
                                        Yes</DelButton>
                            </PopupCont>
                        </Popup>
                                : null
                        }
            </Left>

                            )
                        }
                    }
                    export default Folders;
