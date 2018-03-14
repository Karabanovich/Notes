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
    case 'changeUser': return { user: action.user, folder: state.folder, folders: action.folders, lastAction: 'changeUser' };
    case 'changeFolder': return { user: state.user, folder: action.folder, folders: state.folders, lastAction: 'changeFolder' };
    case 'addFolder':
      {
        if (!state.folders.find((el) => { return el.folderName === action.folder.folderName })) {
          NoteActions.addFolder(state.user, action.folder.folderName);
          let fldrs = state.folders.slice();
          fldrs.unshift(action.folder);
          return { user: state.user, folder: action.folder.folderName, folders: fldrs, lastAction: 'addFolder' };
        }
        else
          return state;
      }
    case 'deleteFolder':
      {
        if (action.folder !== 'Main') {
          let i = state.folders.findIndex((el) => el.folderName === action.folder);
          NoteActions.deleteFolder(state.user, i);
          let fld = state.folder;
          if (action.folder === state.folder)
            fld = 'Main';
          return { user: state.user, folder: fld, folders: state.folders.slice(0, i).concat(state.folders.slice(i + 1)), lastAction: 'deleteFolder' };
        }
        else
          return state;
      }

    case 'addNote':
      {
        let i = state.folders.findIndex((el) => el.folderName === state.folder);
        NoteActions.addNote(state.user, i, action.note);
        let fldrs = state.folders.slice();
        if (action.note.label)
          fldrs[i].Notes.unshift(action.note);
        else {
          let j = fldrs[i].Notes.findIndex((el) => {
            return !el.label;
          });
          if(j!==-1)
            fldrs[i].Notes.splice(j, 0, action.note);
          else
            fldrs[i].Notes.push(action.note);
        }

        return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'addNote' };
      }
    case 'deleteNote':
      {
        let i = state.folders.findIndex((el) => el.folderName === state.folder);
        let j = action.id;
        NoteActions.deleteNote(state.user, i, j);
        let fldrs = state.folders.slice();
        fldrs[i].Notes.splice(j, 1);
        return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'deleteNote' };
      }
    case 'addLabel':
      {
        let i = state.folders.findIndex((el) => el.folderName === state.folder);
        let j = action.id;
        let label = action.label;
        NoteActions.addLabel(state.user, i, j, label);
        let fldrs = state.folders.slice();
        let ind = 0;
        if (!action.label){
          ind = fldrs[i].Notes.findIndex((el) => {
            return !el.label;       
          });
          if(ind===-1){
            let d=fldrs[i].Notes.splice(j,1)[0];
            fldrs[i].Notes.push(d);
            ind=fldrs[i].Notes.length-1;
          }
          else{
            fldrs[i].Notes.splice(ind-1,0,fldrs[i].Notes.splice(j,1)[0]);
            ind=ind-1;
          }
        }
        else
          fldrs[i].Notes.unshift(fldrs[i].Notes.splice(j,1)[0]);
        fldrs[i].Notes[ind].label=action.label;
        return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'addLabel' };
      }
    case 'sendNote':
      {
        NoteActions.sendNote(state.user, action.note, action.user);
        if (state.user === action.user) {
          if (state.folders[state.folders.length - 1].folderName !== 'Inbox')
            return {
              user: state.user,
              folder: state.folder,
              folders: state.folders.concat({ folderName: 'Inbox', Notes: [Object.assign(action.note, { from: state.user })] }),
              lastAction: 'sendNote'
            };
          let fldrs = state.folders.slice();
          fldrs[fldrs.length - 1].Notes.push(Object.assign(action.note, { from: state.user }));
          return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'sendNote' };
        }
        return state;
      }
    default: return state;
  }
}
const initialState = { user: '', folder: 'Main', folders: [{ folderName: 'Main', Notes: [] }], lastAction: '' };
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
