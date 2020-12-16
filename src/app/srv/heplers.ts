import {AnswerPerson, Person} from './check.service';

export const getId = (value: AnswerPerson): [string, Person] => {
  return Object.entries(value)[0];
};
