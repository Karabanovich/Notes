import React, { Component } from 'react';
import styled from 'styled-components';
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
`
const Ul = styled.ul`
    display: inline-block;
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
    border: 3px solid #303f9f;
`
const Title = styled.div`
    width: 150px;
    min-width:120px;
    height:20px;
`
const Text = styled.div`
    border: 1px solid rgba(5, 5, 5, .5);
    border-top:0px;
    height: 180px;
    word-wrap:break-word; 
`
const Button = styled.button` 
    background-color:white;
    cursor:pointer;
    font-family: Verdana, Geneva, sans-serif; 
    font-weight:bold; 
    padding:0;
    text-align:center;
    color:red;
    border-none;
    height:20px;
    width:20px;
    border-radius:3px;
`
const Label = styled.label`
    width:20px;
`
class NotesArea extends Component {
    constructor(props) {
        super(props);
        this.state = { filter: ''};
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
                                return el.Notes.map((el) => (
                                    <Li>
                                        <Note>
                                            <Head>
                                                {el.label ? <Label><input type="checkbox"/></Label> : null}
                                                <Title>
                                                    {el.title}
                                                </Title>
                                                <Button>X</Button>
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
