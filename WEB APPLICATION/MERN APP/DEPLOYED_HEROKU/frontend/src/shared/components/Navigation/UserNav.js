import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../../shared/components/UIElements/Avatar';
import Card from '../../../shared/components/UIElements/Card';
import './UserNav.css';


const UserNav = props => {
  return (
    <li className="usern-item">
      <Card className="usern-item__content">
        <Link to={`/${props.id}/summaries`}>
          <div className="usern-item__image">
            <Avatar image={process.env.REACT_APP_BACKEND_URL+`${props.image}`} alt={props.name} />
          </div>
          <div className="usern-item__info">
            <h2>{props.name}</h2>
            <h3>
              {(props.placeCount) == 'undefined' ? '0': props.placeCount} {props.placeCount === 1 ? 'Summary' : 'Summaries'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserNav;
