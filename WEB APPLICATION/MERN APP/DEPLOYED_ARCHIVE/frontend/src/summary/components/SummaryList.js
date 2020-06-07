import React from 'react';

import SummaryItem from './SummaryItem';
import Card from '../../shared/components/UIElements/Card';
import './SummaryList.css';

const UsersList = props => {

 
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No summaary found found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(summary => (
        <SummaryItem
          key={summary.id}
          id={summary.id}
          image={summary.summary_cover}
          name={summary.summary_title}
          book={summary.book_description}
          placeCount={summary.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
