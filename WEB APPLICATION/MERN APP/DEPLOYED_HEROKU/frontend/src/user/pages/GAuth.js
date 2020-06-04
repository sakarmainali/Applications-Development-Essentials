import React, { useState, useContext } from 'react';
import axios from 'axios';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';


const GAuth = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  


  const gloginhandler =  async event => {

    
    const response= await axios.get('/api/current_user/',{ crossdomain: true });
    console.log(response.data);
    const responseData = await sendRequest(
      process.env.REACT_APP_BACKEND_URL+'api/users/login',
      'POST',
      JSON.stringify({
        email: response.data.email,
        password: response.data.gid
      }),
      {
        'Content-Type': 'application/json'
      }
    );
    console.log("GRES:");
    console.log(responseData);
    auth.username=response.data.name;
    console.log(auth.username);
    auth.login(responseData.userId, responseData.token,response.data.name,response.data.image);

    const dest= await axios.get('/api/logout/',{ crossdomain: true });
    

 
  };  


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && < LoadingSpinner asOverlay />}
        <h2>WELCOME TO BOOKMIN  </h2>
        <h5>BEGIN YOUR SUMMARY WRITING & EXPLORING JOURNEY</h5>
        <hr/>
      
        <Button onClick={gloginhandler} >
        GET STARTED NOW 
        </Button>
        
      </Card>
    </React.Fragment>
  );
};

export default GAuth;