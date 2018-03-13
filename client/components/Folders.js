import React, { Component } from 'react';
import styled from 'styled-components';
import image from '../pic/1.jpeg';
const Folds = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
    height:calc(100% - 106px);
    overflow:auto;
`
const Button = styled.a` 
    cursor: pointer;
    user-select:none; 
    font-weight: 700; 
    color: white; 
    text-decoration: none; 
    padding: .8em 1em calc(.8em + 3px); 
    border-radius: 3px; 
    background: rgb(64,199,129); 
    box-shadow: 0 -3px rgb(53,167,110) inset; 
    transition: 0.2s;  
    &:hover {
         background: rgb(53, 167, 110);
    } 
    &:active { 
        background: rgb(33,147,90); 
        box-shadow: 0 3px rgb(33,147,90) inset; 
    }
`
const Input = styled.input`
    margin:10px 0px 20px 0px;   
    height:30px;
    border-radius:5px;
    resize: none;
    border: 2px solid rgba(5, 5, 5, .5);
    background-color: rgba(5,5,136,0.035);
`
const Li = styled.div`
    cursor:pointer;
    margin: 5px 0 5px 5px;
    display :flex;
`;

const Left = styled.div`
    width:15%;
    position:fixed;
    top:70px;
    left:0;
    display:flex;
    flex-direction:column;
    height:calc(100% - 106px);
`
class Folders extends Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', f: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => {
            let a = this.props.store.getState().lastAction;
            if (this.refs.myRef && (a === 'addFolder' || a === 'deleteFolder' || a === 'changeUser'))
                this.forceUpdate()
        });
    }
    render() {
        const store = this.props.store;
        return (
            <Left ref="myRef">
                <Button onClick={() => {
                    if (this.state.f) {
                        this.setState({ f: false });
                        if (this.state.Name) {
                            store.dispatch({ type: 'addFolder', folder: { folderName: this.state.Name, Notes: [] } }); this.forceUpdate()
                        }
                    }
                    else
                        this.setState({ f: true });
                }}>Add Folder</Button>
                {
                    this.state.f ? <Input type="text" onChange={(e) => { this.setState({ Name: e.target.value }) }} /> : null
                }
                <Folds>
                    {store.getState().folders.map((el, i) => (
                        <Li key={i} onClick={() => { store.dispatch({ type: 'changeFolder', folder: el.folderName }) }}>
                            <img src={image} width="20px" height="20px" />
                            {el.folderName}
                        </Li>
                    ))}
                </Folds>
            </Left>

        )
    }
}
export default Folders;
