import React from 'react';
import styled from 'styled-components';
import WriteArea from './WriteArea';
import NotesArea from './NotesArea';
import Folders from './Folders';
const Main = styled.div`
    flex: 1 0 auto;
`
const Right_m = styled.div`
    margin-left:25%;
    width:75%;
    display:flex;
    flex-direction:column;
`
export default (props) => {
    
    return (
        <Main>
            <Folders store={props.store} />
            <Right_m>
                <WriteArea store={props.store} />
                <NotesArea store={props.store} />
            </Right_m>
        </Main>

    )
}