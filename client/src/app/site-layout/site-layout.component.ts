import { Component, OnInit } from '@angular/core';
import { PopupServiceService } from '../services/popup-service.service';
@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {
  constructor(public popupService: PopupServiceService) {}

  ngOnInit() {}
  public openSignUpDialog(): void {
    this.popupService.openSignUpDialog().subscribe(data => {
      console.log(data)
    });
  }
}
