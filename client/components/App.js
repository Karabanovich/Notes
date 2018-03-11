import React, { Component } from 'react';
import './App.css';
import NoteActions from '../actions/NoteActions';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';
import Main from './Main';
import { createStore } from 'redux';
function reducer(state, action) {
  switch (action.type) {
    case 'changeUser': return{user:action.user,folder:state.folder,folders:action.folders};
    case 'changeFolder': return { user: state.user, folder: action.folder, folders: state.folders};
    case 'addFolder':
      {
        if (!state.folders.find((el) => { return el.folderName === action.folder.folderName })){
          NoteActions.addFolder(state.user,action.folder.folderName);
          return { user: state.user, folder: action.folder.folderName, folders: state.folders.concat(action.folder)};
        }
        else
          return state;
      }
    /*case 'deleteFolder':
    {
      if(action.folder!=='Main'){
        let i=state.folders.findIndex((el)=>el===action.folder);
        let nts=[];
        state.Notes.forEach((el)=>{
          if(el.folder!==action.folder)
            nts.push(el);
        })
        return { user: state.user, folder: 'Main', folders: state.folders.slice(0,i).concat(state.folders.slice(i+1)), Notes: nts };
      }
      else 
        return state;
    }
    */
    case 'addNote': 
    {
      NoteActions.addNote(state.user,state.folder,action.note);
      let i=state.folders.findIndex((el)=>el.folderName===state.folder);
      let fldrs=state.folders.slice();
      fldrs[i].Notes.push(action.note);
      return { user: state.user, folder: state.folder, folders: fldrs };
    }
    //case 'deleteNote': return { user: state.user, folder: state.folder, folders: state.folders, Notes: state.Notes.concat(action.note) }
    default: return state;
  }
}
const initialState = { user: '', folder: 'Main', folders: [{folderName:'Main',Notes:[]}]};
const store = createStore(reducer, initialState);
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/Main" render={props => (<Main store={store} />)} />
            <Route path="/" render={props => (<RegForm store={store} />)} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
