import { Injectable, OnInit } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LocalStorageService {

  private missionAnnouncedSource = new Subject<string>();
  private logoutAnnoucedSource   = new Subject<string>();
  private roleAnnouncedSource    = new Subject<string>();
  


  loginAnnounced$  = this.missionAnnouncedSource.asObservable();
  logoutAnnounced$ = this.logoutAnnoucedSource.asObservable();


  roleAnnounced$ = this.roleAnnouncedSource.asObservable();
  announceLogin(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }    

  announceLogout(){
    this.logoutAnnoucedSource.next(null);
  }
    announceRole(Role: string) {
    this.roleAnnouncedSource.next(Role);
  }    


}