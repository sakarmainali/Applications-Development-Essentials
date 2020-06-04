import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import SummaryItem from './SummaryDetail';
import Button from '../../shared/components/FormElements/Button';
import './TopSummaries.css';

const TopSummaries = props => {

  

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No summary found. Maybe create one?</h2>
          <Button to="/summary/new">Create Summary</Button>
        </Card>
      </div>
    );
  }

  const data = Array.from(props.items);

  return (
    <ul className="place-list">
      {data.map(summary => (
        <SummaryItem
          key={summary.id}
          id={summary.id}
          image={summary.summary_cover}
          title={summary.summary_title}
          description={summary.book_description}
          body={summary.summary_body}
          creatorId={summary.creator_id}
          onDelete={props.onDeleteSummary}
        />
      ))}
    </ul>
  );
};

export default TopSummaries ;
