import React, { useState } from 'react';
import { getPeople, getPersonInfo } from './api';
import { Person } from './types/Person';
import { PeopleList } from './components/PeopleList';
import { PersonDetails } from './components/PersonDetails';
import { Loader } from './components/Loader';

import './App.css';
import 'bulma/css/bulma.css';

const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(false);


  const fetchPeople = async () => {
    try {
      setLoading(true);
      const response = await getPeople();
      setPeople(response.results);
    } catch (error) {
      console.error('Error fetching people data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonDetails = async (personId: number) => {
    try {
      const response = await getPersonInfo(personId);
      setSelectedPerson(response);
      console.log(response)
    } catch (error) {
      console.error('Error fetching person details:', error);
    }
  };

  const handlePersonSelect = (url: string) => {
    const personId = parseInt(url.split('/').filter(Boolean).pop() || '0', 10);
    fetchPersonDetails(personId);
  };

  return (
    <div className='App'>
         {loading && <Loader />}
      <h1 className='title' style={{textAlign: 'center'}}>Star Wars Characters</h1>
      <div>
        <PeopleList people={people} onSelect={handlePersonSelect} />
        {selectedPerson && <PersonDetails person={selectedPerson} />}
      </div>
      <button className='button' onClick={fetchPeople}>Load Characters</button>
    </div>
  );
};

export default App;
