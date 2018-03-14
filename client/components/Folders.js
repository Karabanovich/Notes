import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/book.png';

const Left =styled.div`
    width:200px;
    position:fixed;
    top:70px;
    left:0;
    display:flex;
    flex-direction:column;
    height:calc(100% - 120px);
    border: 0.2px solid black;
`
const Folds = styled.div`
    margin:10px 10px 0px 10px;
    display:flex;
    flex-direction: column;
    overflow:auto;
`
const Li = styled.div`
    background:${props => props.clr};
    cursor:pointer;
    user-select:none; 
    min-height:30px;
    margin:0px 0px 0px 5px;
    display:flex;
    &:hover {
        background: #f1f5f4c2;
   } 
   &:active { 
       background: #f1f5f4; 
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
const Input = styled.input`
    margin:10px 0px 5px 0px;   
    height:30px;
    border-radius:5px;
    resize: none;
    border: 2px solid rgba(5, 5, 5, .5);
    background-color: rgba(5,5,136,0.035);
`

class Folders extends Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', f: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => {
            let a = this.props.store.getState().lastAction;
            if (this.refs.fldrs&&(a === 'addFolder' || a === 'deleteFolder' || a === 'changeUser'||a==='changeFolder'))
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
                    this.state.f ? <Input type="text" maxLength="23" onChange={(e) => { this.setState({ Name: e.target.value }) }} /> : null
                }
                <Folds>
                        {store.getState().folders.map((el) => (
                            <Li clr={store.getState().folder===el.folderName? '#f1f5f4':'white'}  onClick={() => { store.dispatch({ type: 'changeFolder', folder: el.folderName }) }}>
                                <img src={image} width="20px" height="20px" />
                                <FolderName>{el.folderName}</FolderName>
                            </Li>
                        ))}
                </Folds>
            </Left>

        )
    }
}
export default Folders;
