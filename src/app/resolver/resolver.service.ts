import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TransferService } from '../services/transfer.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService  implements Resolve<any> {

  id: any;

  constructor(private transferService: TransferService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let id = route.paramMap.get('id');
    return this.transferService.getId(id);
  }
}
