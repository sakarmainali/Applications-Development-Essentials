import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Summary.css';

const NewSummary = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      book_description: {
        value: '',
        isValid: false
      },
      summary_title: {
        value: '',
        isValid: false
      },
      summary_body: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: true
      }
     
    },
    false
  );

  const history = useHistory();

  const summarySubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      console.log(auth.token);
      formData.append('book_description', formState.inputs.book_description.value);
      formData.append('summary_title', formState.inputs.summary_title.value);
      formData.append('summary_body', formState.inputs.summary_body.value);
      formData.append('image', formState.inputs.image.value);
      await sendRequest(process.env.REACT_APP_BACKEND_URL+'api/summary', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });

      history.push('/');
    } catch (err) {
      console.log("error occured");
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={summarySubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="book_description"
          element="input"
          type="text"
          label="Book Description"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="summary_title"
          element="input"
          type="text"
          label="Summary Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />

        <Input
          id="summary_body"
          element="textarea"
          label="Summary Body"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD SUMMARY
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewSummary;
