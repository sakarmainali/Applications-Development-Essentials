import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TopSummaries from '../components/TopSummaries';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserSummary = () => {

  const [LoadedSummaries, setLoadedSummaries] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`api/summary/user/${userId}`
        );
        setLoadedSummaries(responseData.summarys);
      } catch (err) {}
    };
    fetchSummary();
  }, [sendRequest, userId]);

  const summaryDeletedHandler = deletedSummaryId => {
    setLoadedSummaries(prevSummary =>
      prevSummary.filter(summary => summary.id !== deletedSummaryId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && LoadedSummaries && (
        <TopSummaries items={LoadedSummaries} onDeleteSummary={summaryDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserSummary;
