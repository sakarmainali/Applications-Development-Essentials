import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Summary.css';

const UpdateSummary = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [LoadedSummary, setLoadedSummary] = useState();
  const summaryId = useParams().summaryId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      body: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        console.log("sdsand,msadnas,");
        console.log(summaryId);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`api/summary/${summaryId}`
        );
        setLoadedSummary(responseData.summarybyid);
        console.log(responseData.summarybyid);
        setFormData(
          {
            title: {
              value: responseData.summarybyid.summary_title,
              isValid: true
            },
            description: {
              value: responseData.summarybyid.book_description,
              isValid: true
            },
            body:{
              value: responseData.summarybyid.summary_body,
              isValid: true
              
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, summaryId, setFormData]);

  const summaryUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL+`api/summary/${summaryId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          body: formState.inputs.body.value,
          
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/' + auth.userId + '/summaries');
    } catch (err) {
      console.log("error aayo");
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!LoadedSummary && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place haha!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && LoadedSummary && (
        <form className="place-form" onSubmit={summaryUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={LoadedSummary.summary_title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter  description ."
            onInput={inputHandler}
            initialValue={LoadedSummary.book_description}
            initialValid={true}
          />
           <Input
            id="body"
            element="textarea"
            label="Body"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter  description ."
            onInput={inputHandler}
            initialValue={LoadedSummary.summary_body}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE SUMMARY
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateSummary;
