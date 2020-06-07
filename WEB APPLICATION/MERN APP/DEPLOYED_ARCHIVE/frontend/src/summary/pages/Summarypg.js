import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


import SummaryDetail from '../components/SummaryDetail';

import Summarypg from './Summarypg.css';


const UserSummary = () => {


  const [LoadedSummary, setLoadedSummary] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const summaryId = useParams().summaryId;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`api/summary/${summaryId}`
        );
        console.log(responseData.summarybyid);
        setLoadedSummary(responseData.summarybyid);
        
      } catch (err) {}
    };
    fetchSummary();
  }, [sendRequest, summaryId]);

 

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && LoadedSummary && (
        <ul className="nice-display">

        <SummaryDetail
        key={LoadedSummary.id}
        id={LoadedSummary.id}
        image={LoadedSummary.summary_cover}
        title={LoadedSummary.summary_title}
        description={LoadedSummary.book_description}
        body={LoadedSummary.summary_body}
        creatorId={LoadedSummary.creator_id}
      />
       </ul>

      )}
    </React.Fragment>
  );
};

export default UserSummary;
