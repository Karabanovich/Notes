import React, { Component } from 'react';
import './App.css';
import NoteActions from '../actions/NoteActions';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RegForm from './RegForm';
import Main from './Main';
import { createStore } from 'redux';
const initialState = { user: '', folder: 'Main', folders: [{ folderName: 'Main', Notes: [] }], lastAction: '', books: true, isMobile: false };
function reducer(state, action) {
  switch (action.type) {
    case 'changeUser': {
      if (action.user)
        return { user: action.user, folder: state.folder, folders: action.folders, lastAction: 'changeUser', books: !state.isMobile, isMobile: state.isMobile };
      else
        return { user: '', folder: 'Main', folders: [{ folderName: 'Main', Notes: [] }], lastAction: '', books: state.books, isMobile: state.isMobile };
    }
    case 'changeFolder': return { user: state.user, folder: action.folder, folders: state.folders, lastAction: 'changeFolder', books: state.books, isMobile: state.isMobile };
    case 'addFolder':
      {
        if (!state.folders.find((el) => { return el.folderName === action.folder.folderName })) {
          NoteActions.addFolder(state.user, action.folder.folderName);
          let fldrs = state.folders.slice();
          fldrs.unshift(action.folder);
          return { user: state.user, folder: action.folder.folderName, folders: fldrs, lastAction: 'addFolder', books: state.books, isMobile: state.isMobile };
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
          return {
            user: state.user,
            folder: fld,
            folders: state.folders.slice(0, i).concat(state.folders.slice(i + 1)),
            lastAction: 'deleteFolder',
            books: state.books,
            isMobile: state.isMobile
          };
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
          if (j !== -1)
            fldrs[i].Notes.splice(j, 0, action.note);
          else
            fldrs[i].Notes.push(action.note);
        }

        return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'addNote', books: state.books, isMobile: state.isMobile };
      }
    case 'deleteNote':
      {
        let i = state.folders.findIndex((el) => el.folderName === state.folder);
        let j = action.id;
        NoteActions.deleteNote(state.user, i, j);
        let fldrs = state.folders.slice();
        fldrs[i].Notes.splice(j, 1);
        return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'deleteNote', books: state.books, isMobile: state.isMobile };
      }
    case 'addLabel':
      {
        let i = state.folders.findIndex((el) => el.folderName === state.folder);
        let j = action.id;
        let label = action.label;
        NoteActions.addLabel(state.user, i, j, label);
        let fldrs = state.folders.slice();
        let ind = 0;
        if (!action.label) {
          ind = fldrs[i].Notes.findIndex((el) => {
            return !el.label;
          });
          if (ind === -1) {
            let d = fldrs[i].Notes.splice(j, 1)[0];
            fldrs[i].Notes.push(d);
            ind = fldrs[i].Notes.length - 1;
          }
          else {
            fldrs[i].Notes.splice(ind - 1, 0, fldrs[i].Notes.splice(j, 1)[0]);
            ind = ind - 1;
          }
        }
        else
          fldrs[i].Notes.unshift(fldrs[i].Notes.splice(j, 1)[0]);
        fldrs[i].Notes[ind].label = action.label;
        return { user: state.user, folder: state.folder, folders: fldrs, lastAction: 'addLabel', books: state.books, isMobile: state.isMobile };
      }
    case 'sendNote':
      {
        if (action.user !== state.user)
          NoteActions.sendNote(state.user, action.note, action.user, state).then((res, rej) => {
            if (res) {
              store.dispatch({ type: 'okSend' });
            }
            else {
              store.dispatch({ type: 'erSend' });
            }
          })
        return Object.assign(state,{lastAction:'nothing'});

      }
    case 'okSend':
      {
        return { user: state.user, folder: state.folder, folders: state.folders, lastAction: 'okSend', books: state.books, isMobile: state.isMobile };
      }
    case 'erSend':
      {
        return { user: state.user, folder: state.folder, folders: state.folders, lastAction: 'erSend', books: state.books, isMobile: state.isMobile };
      }
    case 'dispBooks':
      {
        return { user: state.user, folder: state.folder, folders: state.folders, lastAction: 'dispBooks', books: action.disp, isMobile: state.isMobile };
      }
    case 'mobile':
      {
        return { user: state.user, folder: state.folder, folders: state.folders, lastAction: 'mobile', books: state.books, isMobile: !state.isMobile }
      }
    default: return state;
  }
}

const store = createStore(reducer, initialState);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMobile: window.innerWidth < 500 };
    if (this.state.isMobile) {
      store.dispatch({ type: 'mobile' });
      store.dispatch({ type: 'dispBooks', disp: false });
    }
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
  }
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  handleWindowSizeChange() {
    let f = this.state.isMobile;
    if (window.innerWidth < 500)
      this.setState({ isMobile: true });
    else
      this.setState({ isMobile: false });
    if (f !== this.state.isMobile) {
      store.dispatch({ type: 'mobile' })
      if (this.state.isMobile)
        store.dispatch({ type: 'dispBooks', disp: false })
      else
        store.dispatch({ type: 'dispBooks', disp: true })
    }


  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" render={props => (<Header store={store} />)} />
        </Switch>
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
