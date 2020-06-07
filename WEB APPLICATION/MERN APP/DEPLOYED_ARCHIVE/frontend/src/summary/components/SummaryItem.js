import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './SummaryItem.css';

const SummaryItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/summary`}>
          <div className="user-item__image">
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
          <h5><b>{props.book}</b></h5>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default SummaryItem;
