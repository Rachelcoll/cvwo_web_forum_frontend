import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Dashboard } from './pages/dashboard';
import axios from 'axios';
import { Profile } from './pages/profile';
import { NavbarHome } from './navbar';
import { CreatePost } from './pages/Articles/createPost';
import { EditPost } from './pages/Articles/editPost';
import { ViewPost } from './pages/Articles/viewPost';
import { Articles } from './pages/dashboard';
// import { Provider } from 'react-redux';
// import { store } from './store';
import { ViewGames } from './pages/Games/viewGames';
import { Game } from './pages/Games/game'
import { Test } from './test';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

function App() {

  const [loggedInStatus, setLoggedInStatus] = useState<string>("not logged in")
  const [user, setUser] = useState<{ [key: string]: string | number | undefined, }>({})

  const checkLoginStatus = () => {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(
        (res) => {
          if (loggedInStatus === "not logged in" && res.data.logged_in) {
            setLoggedInStatus("user logged in")
            setUser(res.data.user)
          } else if (loggedInStatus === "user logged in" && !res.data.logged_in) {
            setLoggedInStatus("not logged in")
            setUser({})
          }
        }
      )
      .catch(err => console.log(err))
  }

  useEffect(() => {
    checkLoginStatus();
  }, [loggedInStatus])

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarHome loggedInStatus={loggedInStatus} user={user} setLoggedInStatus={setLoggedInStatus} setUser={setUser} />
        <Routes>
          <Route path="/" element={React.createElement(Home, { loggedInStatus, setLoggedInStatus, user, setUser })} />
          <Route path='/dashboard' element={React.createElement(Dashboard, { loggedInStatus, user, setLoggedInStatus, setUser })} />
          <Route path='/profile/:id' element={React.createElement(Profile, { loggedInStatus, user, setLoggedInStatus, setUser })} />
          <Route path='/createPost' element={React.createElement(CreatePost, { loggedInStatus, user, setLoggedInStatus, setUser })} />
          <Route path='/editPost/:id' element={React.createElement(EditPost)} />
          <Route path='/viewPost/:id' element={React.createElement(ViewPost, { user })} />
          <Route path="/all" element={<Articles tag="all" />} />
          <Route path="/mobile" element={<Articles tag="mobile" />} />
          <Route path="/console" element={<Articles tag="console" />} />
          <Route path="/steam" element={<Articles tag="steam" />} />
          <Route path="/games" element={<ViewGames />} />
          <Route path='/game/:id' element={React.createElement(Game, {user})} />
          <Route path='/test' element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
