import { ApiResponse } from './types/ApiResponse';
import { Person } from './types/Person';
const BASE_URL = 'https://swapi.dev/api';

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

async function get<T>(url: string): Promise<T> {
  const fullURL = BASE_URL + url;

  await wait(300);

  const res = await fetch(fullURL);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return await res.json();
}

export const getPeople = async (): Promise<ApiResponse<Person[]>> => {
  const response = await get('/people/');
  return response as ApiResponse<Person[]>;
};

export const getPersonInfo = async (userId: number): Promise<Person> => {
  const response = await get(`/people/${userId}/`);
  return response as Person;
};
