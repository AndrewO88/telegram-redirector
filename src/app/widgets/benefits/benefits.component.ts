import {Component, OnInit} from '@angular/core';
import {AnswerPerson, CheckService, Person} from '../../srv/check.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {getId} from '../../srv/heplers';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {
  testPerson: Person = {
    link: 'lol',
    count: 0
  };

  constructor(private checkSrv: CheckService) {
  }

  ngOnInit(): void {
  }

  onLoad(): void {
    this.checkSrv.create(this.testPerson).subscribe((res) => {
      console.log(res);
    });
  }


  onCheck($event: MouseEvent): void {

    $event.preventDefault();

    this.checkSrv.check(this.testPerson).pipe(
      filter((p) => !!p),
      switchMap((person: AnswerPerson) => this.checkSrv.increaseCount(getId(person)[1], getId(person)[0])),
    ).subscribe((res) => {
      console.log(res.count);
      console.log('res', res.count % 10);

      if (res.count % 10 === 0) {
        location.replace('https://yandex.ru');
      }


    });
  }
}
