import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appStore } from '../../../shared/service/appStore.service';
import { appCRUDservice } from '../../../shared/service/appCRUD.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-each-motif',
  templateUrl: './each-motif.component.html',
  styleUrls: ['./each-motif.component.scss']
})
export class EachMotifComponent implements OnInit, AfterViewInit {

  leftPage = '';
  rightPage = '';
  // motifId = this.appStoreService.select('workMotifId').value;
  motifID;
  portraitPicArr;
  private unsubscribeAll = new Subject();

  constructor(
    private router: Router,
    private activatRoute: ActivatedRoute,
    private appRequestService: appCRUDservice
  ) { }

  ngOnInit(): void {
    /***需要链接一个service，从后端拿信息，比如每张图及id是一个{}record，根据组别，拿到相应的[{}{}{}...]
      subscribe之后，loop到页面上
    ***/
    this.activatRoute.paramMap.subscribe((param) => {
      this.motifID = param.get('id');
      console.log(this.motifID);
      if (this.motifID === '1') {
        this.leftPage = '';
        this.rightPage = 'Landscape >';
      } else if (this.motifID === '2') {
        this.leftPage = '< Portrait';
        this.rightPage = 'Life >';
      } else {
        this.leftPage = '< Landscape';
        this.rightPage = '';
      }
      this.appRequestService.getPortrait(this.motifID)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe((port) => {
          this.portraitPicArr = port.portraitData;
          console.log(this.portraitPicArr);
          })
    });
  }
  
  ngAfterViewInit() {
   
  }


  
  routemotif(value) {
    let routeId;
    if (value === 0) {
      routeId = +this.motifID - 1
    } else {
      routeId = +this.motifID + 1
    }
    this.router.navigate(['/main/works/each-motif/' + routeId]);
  }


}
