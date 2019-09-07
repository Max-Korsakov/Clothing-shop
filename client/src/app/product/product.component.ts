import { Component, OnInit } from '@angular/core';
import {CatalogItem} from '../models';
import { HttpServiceService } from "../services/http-service.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
public catalogItem: CatalogItem;
  constructor(private httpService: HttpServiceService,  private route: ActivatedRoute,  private router: Router) { 

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => { 
    this.httpService.getById(params.id).subscribe(data => {
      this.catalogItem = data;})
  })
  }

  public backToCatalog() {
    this.router.navigate(['/catalog']);
  }
}
