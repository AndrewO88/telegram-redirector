import {Component, OnInit} from '@angular/core';
import { CheckService, Person} from '../../srv/check.service';
import {filter, switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {


  constructor(private checkSrv: CheckService) {
  }

  ngOnInit(): void {
  }


}
