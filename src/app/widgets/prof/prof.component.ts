import {Component, OnInit} from '@angular/core';
import {FireService} from '../../srv/fire.service';
import {Observable} from 'rxjs';


export interface PersonTest {
  id: string;
  count: number;
  token: string;
  link: string;
  data?: any;
}


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss']
})
export class ProfComponent implements OnInit {

  persons: PersonTest[] | undefined;

  stream$: Observable<PersonTest[]> | undefined;

  person: PersonTest = {
    id: '',
    count: 0,
    token: 'dvach',
    link: 'thisIsLink'
  };
  personUp: PersonTest = {
    id: '',
    count: 1,
    token: 'thisIsToken1',
    link: 'thisIsLink1'
  };

  constructor(private pService: FireService) {
  }

  ngOnInit() {
    this.stream$ = this.pService.getPersons(this.person.token);

    // .subscribe(data => {
    // console.log('1', data);
    // this.persons = data.map(person => {
    //   console.log('2', person);
    //   return {
    //     id: person.payload.doc.id,
    //     link: person.payload.doc.data().link
    //   } as PersonTest;
    // });


    console.log('3', this.persons);

    // });
  }

  create() {
    this.pService.createPerson(this.person);
  }

  update() {
    this.pService.updatePerson(this.personUp);
  }

  delete(id: string, token: string) {
    this.pService.deletePerson(id, token);
  }

}
