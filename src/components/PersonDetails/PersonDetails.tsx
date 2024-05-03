import React, { useCallback, useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Starship } from '../../types/Starship';

type Props = {
  person: Person;
};

export const PersonDetails: React.FC<Props> = ({ person }) => {
  const [closeModal, setCloseModal] = useState(false);
  const [starshipInfo, setStarshipInfo] = useState<Starship | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setCloseModal(true);
  };

  const stopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const fetchStarshipInfo = useCallback(async () => {
    setIsLoading(true);
    setStarshipInfo(null);
    if (person.starships && person.starships.length > 0) {
      const starshipUrl = person.starships[0];
      try {
        const response = await fetch(starshipUrl);
        if (response.ok) {
          const data: Starship = await response.json();
          setStarshipInfo(data);
        }
      } catch (error) {
        console.error('Error fetching starship info:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [person]);

  useEffect(() => {
    setCloseModal(false);
    fetchStarshipInfo();
    setIsLoading(false);
  }, [fetchStarshipInfo]);

  if (isLoading) {
    return <p style={{ color: 'red' }}>Loading...</p>;
  }

  return (
    <div className={`modal ${closeModal ? '' : 'is-active'}`} onClick={onClose}>
      <div className="modal-background"></div>
      <div className="modal-card" onClick={stopPropagation}>
        <header className="modal-card-head">
          <p className="modal-card-title">Details</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>
            <strong>Name:</strong> {person.name}
          </p>
          <p>
            <strong>Birth Year:</strong> {person.birth_year}
          </p>
          <p>
            <strong>Gender:</strong> {person.gender}
          </p>
          {starshipInfo && (
            <>
              <p>
                <strong>Starship:</strong> {starshipInfo.name}
              </p>
              <p>
                <strong>Model:</strong> {starshipInfo.model}
              </p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
