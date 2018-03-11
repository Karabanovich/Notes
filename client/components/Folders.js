import React, { Component } from 'react';
import styled from 'styled-components';
const Folds = styled.div`
    position:fixed;
    top:70px;
    left:0;
    display:flex;
    flex-direction:column;
    width:25%;
    height:calc(100% - 36px);
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
&:hover { background: rgb(53, 167, 110); } 
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
const Li = styled.li`
  
`
class Folders extends Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', f: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => this.forceUpdate());
    }
    render() {
        const store = this.props.store;
        return (
            <Folds>
                {
                    this.state.f ? <Input type="text" onChange={(e) => { this.setState({ Name: e.target.value }) }} /> : null
                }
                <Button onClick={() => {
                    if (this.state.f) {
                        this.setState({f:false});
                        if (this.state.Name) {
                            store.dispatch({ type: 'addFolder', folder: {folderName:this.state.Name,Notes:[]} }); this.forceUpdate()
                        }
                    }
                    else
                        this.setState({f:true});
                }}>Add Folder</Button>
                <ul>
                    {store.getState().folders.map((el) => (
                        <Li onClick={() => { store.dispatch({ type: 'changeFolder', folder: el.folderName }) }}>
                            <p>{el.folderName}</p>
                        </Li>
                    ))}
                </ul>

            </Folds>

        )
    }
}
export default Folders;
