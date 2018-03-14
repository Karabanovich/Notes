import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/book.png';

const Left =styled.div`
    width:15%;
    position:fixed;
    top:70px;
    left:0;
    display:flex;
    flex-direction:column;
    height:calc(100% - 120px);
`
const Folds = styled.div`
    margin-top:10px;
    display:flex;
    flex-direction: column;
    width:100%;
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
        background: rgba(53, 167, 110,0.1);
   } 
   &:active { 
       background: rgba(33,147,90, 0.2); 
   }
`;


const FolderName = styled.div`
    min-height:30px;
    user-select:none; 
    word-wrap:break-word;
`

const Button = styled.a` 
    cursor: pointer;
    user-select:none; 
    font-weight: 700; 
    color: white; 
    text-decoration: none; 
    padding: .8em 1em calc(.8em + 3px); 
    border-radius: 3px; 
    background: #303f9f; 
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
            if (this.refs.fldrs&&(a === 'addFolder' || a === 'deleteFolder' || a === 'changeUser'))
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
                    this.state.f ? <Input type="text" onChange={(e) => { this.setState({ Name: e.target.value }) }} /> : null
                }
                <Folds>
                        {store.getState().folders.map((el) => (
                            <Li clr={store.getState().folder===el.folderName? 'blue':'white'}  onClick={() => { store.dispatch({ type: 'changeFolder', folder: el.folderName }) }}>
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
