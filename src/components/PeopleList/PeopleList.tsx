import React from 'react';
import { Person } from '../../types/Person';
import './PeopleList.css';


type Props = {
  people: Person[];
  onSelect: (url: string) => void;
}

export const PeopleList: React.FC<Props> = ({ people, onSelect }) => {
  return (
    <div>
      <h2 className='title'>Characters List</h2>
      <ul className='list'>
        {people.map(person => (
          <li className='item'
            key={person.url} 
            onClick={() => onSelect(person.url)}
          >
            {person.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
