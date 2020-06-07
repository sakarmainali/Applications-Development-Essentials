import React,{Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Landing from './shared/misc/Landing';
import Users from './user/pages/Users';
import Summary from './summary/pages/Summary';



//import NewSummary from './summary/pages/NewSummary';
//import UserSummary from './summary/pages/UserSummary';
//import UpdateSummary from './summary/pages/UpdateSummary';
//import Summarypg from './summary/pages/Summarypg';

import Auth from './user/pages/Auth';
import GAuth from './user/pages/GAuth';
import MainNavigation from './shared/components/Navigation/MainNavigation'; 

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';


//const Users=React.lazy(()=>import('./user/pages/Users'));
//const Landing=React.lazy(()=>import('./shared/misc/Landing'));
//const Summary=React.lazy(()=>import('./summary/pages/Summary'));
const NewSummary=React.lazy(()=>import('./summary/pages/NewSummary'));
const UserSummary=React.lazy(()=>import('./summary/pages/UserSummary'));
const UpdateSummary=React.lazy(()=>import('./summary/pages/UpdateSummary'));
const Summarypg=React.lazy(()=>import('./summary/pages/Summarypg'));
//const Auth=React.lazy(()=>import('./user/pages/Auth'));
//const GAuth=React.lazy(()=>import('./user/pages/GAuth'));



const App = () => {
  const { token, login, logout, userId , uname,img,ns} = useAuth();

  let routes;


  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/summary" exact>
          <Summary />
        </Route>

        <Route path="/:userId/summaries" exact>
          <UserSummary />
        </Route>
        <Route path="/:summaryId/summary" exact>
          <Summarypg />
        </Route>
        

        <Route path="/summary/new" exact>
          <NewSummary />
        </Route>
        <Route path="/summary/:summaryId">
          <UpdateSummary />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/summary" exact>
          <Summary />
        </Route>
        <Route path="/:summaryId/summary" exact>
          <Summarypg />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/gauth">
          <GAuth/>
        </Route>
        <Redirect to="/auth" />

      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username:uname,
        pimg:img,
        nsum:ns,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={
        <div className="center">
          <LoadingSpinner/>
        </div>
        }
        >
          {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
