import React, { Component } from 'react';
import styled from 'styled-components';
const Write = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100%;
    overflow:auto;
`


class WriteArea extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', text: '', label: false };
    }
    componentDidMount() {
        this.props.store.subscribe(() => this.forceUpdate());
    }
    render() {
        const store = this.props.store;
        return (
            <Write>
                <label><input type="checkbox" checked={this.state.label} onClick={(e) => { this.setState({ label: e.target.checked }) }} />Это ВАЖН0</label>
                <input type="text" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                <input type="text" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }) }} />
                <button onClick={() => {
                    if (this.state.text) {
                        this.setState({ title: '', text: '', label: false });
                        store.dispatch({
                            type: 'addNote',
                            note: {
                                title: this.state.title,
                                text: this.state.text,
                                label: this.state.label
                            }
                        });
                    }
                }}>Add Note</button>
            </Write>

        )
    }
}
export default WriteArea;
