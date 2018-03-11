import React, { Component } from 'react';
import styled from 'styled-components';
const Folds = styled.div`
    position:fixed;
    top:48px;
    left:0;
    display:flex;
    flex-direction:column;
    width:25%;
    height:calc(100% - 36px);
    overflow:auto;
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
                    this.state.f ? <input type="text" onChange={(e) => { this.setState({ Name: e.target.value }) }} /> : null
                }
                <button onClick={() => {
                    if (this.state.f) {
                        this.setState({f:false});
                        if (this.state.Name) {
                            store.dispatch({ type: 'addFolder', folder: {folderName:this.state.Name,Notes:[]} }); this.forceUpdate()
                        }
                    }
                    else
                        this.setState({f:true});
                }}>Add Folder</button>
                <ul>
                    {store.getState().folders.map((el) => (
                        <li onClick={() => { store.dispatch({ type: 'changeFolder', folder: el.folderName }) }}>
                            <p>{el.folderName}</p>
                        </li>
                    ))}
                </ul>

            </Folds>

        )
    }
}
export default Folders;
