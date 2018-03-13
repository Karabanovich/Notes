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
const Img =styled.img`
    position: relative;
    bottom:20px;
    opacity:0.5;
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
                    {
                        store.getState().folders.map((el) => {

                            if (el.folderName === store.getState().folder) {
                                return el.Notes.map((el) => (
                                    <Li>
                                        <Note>
                                            <Head>
                                                {el.label ? <Img src={image} width="20px" height="25px"/> : null}
                                                <Title>
                                                    {el.title}
                                                </Title>
                                                <I className="material-icons">delete</I>
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
