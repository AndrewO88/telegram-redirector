import { Component, OnInit } from '@angular/core';
import {CheckService, Person} from '../../srv/check.service';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {
 testPerson: Person  = {
   id : 'kek',
 };
  constructor(private checkSrv: CheckService) { }

  ngOnInit(): void {
  }

  onLoad(): void {
    this.checkSrv.load(this.testPerson).subscribe((res)=> {
      console.log(res);
    });
  }

  onCheck(): void {
    this.checkSrv.check(this.testPerson).subscribe((res)=> {
      console.log(res);
    });
  }
}
