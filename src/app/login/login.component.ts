import { Component, OnInit } from '@angular/core';
import {Router, CanActivate} from "@angular/router";
import {DataService} from "../data.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, CanActivate{
  public curUser:any={};
  public message:any={};
  constructor(public router:Router, private data: DataService) { 
    this.curUser.name="";
    this.curUser.memNumber="";
  }
  // login page, basic implementation: just check no empty input
  login(){
    if(!this.curUser.name|| this.curUser.name === "") {
      alert("username can't be empty");
      return;
    }
    if(!this.curUser.memNumber || this.curUser.memNumber === "") {
      alert("user membership number can't be empty");
      return;
    }
    // sync the current input value to service
    this.data.changeMessage(this.curUser);
    alert("Successfully login, we will redirect you to rent system page");
    // redirect to rent system page
    this.canActivate();
  }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }
  canActivate():boolean{
    if(true){
      this.router.navigate(['bookList']);
      return true;
    }
    return false;
  }

}
