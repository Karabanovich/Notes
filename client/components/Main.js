import React from 'react';
import styled from 'styled-components';
import NotesArea from './NotesArea';
import Folders from './Folders';
const Main = styled.div`
    flex: 1 0 auto;
    display:flex;
    justify-content:space-around;
`

export default (props) => {
    
    return (
        <Main>
            <Folders store={props.store} />
            <NotesArea store={props.store} />
        </Main>

    )
}