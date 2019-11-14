import { Component, OnInit } from '@angular/core';
import {Router, CanActivate} from "@angular/router"
import {DataService} from "../data.service";
@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css']
})
export class AvailableBooksComponent implements OnInit {
  public bookList: any= [];
  public rentList: any= [];
  public curUser:any = {name: "", memNumber: ""};
  public showBookList:boolean;
  public rentModalOpen = false;
  public inputUser: any = {};
  constructor(public router:Router, private data: DataService) { 
    this.showBookList=true;
    this.rentList=[];
    // this is demo data
    this.bookList=[
      {
        "bookId": 1,
        "bookName": "Harry Potter",
        "username":"",
        "membershipNo":"",
        "duration":12,
        "returnDate":""
      },
      {
        "bookId": 2,
        "bookName": "Hero",
        "username":"",
        "membershipNo":"",
        "duration":12,
        "returnDate":""
      },
      {
        "bookId": 3,
        "bookName": "Gone with the wind",
        "username":"",
        "membershipNo":"",
        "duration":12,
        "returnDate":""
      },
      {
        "bookId": 4,
        "bookName": "War and Peace by Leo Tolstoy",
        "username":"",
        "membershipNo":"",
        "duration":15,
        "returnDate":""
      },
      {
        "bookId": 5,
        "bookName": "The Odyssey",
        "username":"",
        "membershipNo":"",
        "duration":7,
        "returnDate":""
      },
      {
        "bookId": 6,
        "bookName": "Madame Bovary",
        "username":"",
        "membershipNo":"",
        "duration":30,
        "returnDate":""
      }
    ];
  }
  getReturnData(duration:string){
    if(!duration || duration === "") return "";
    let curDate=new Date();
    curDate.setDate(curDate.getDate()+ parseInt(duration));
    return curDate;
  }
  closeModal() {
    this.rentModalOpen = false;
  }
  ngOnInit() {
    // get the user login informtion from service
    this.data.currentMessage.subscribe(message => this.curUser = message)
  }
  // rent method
  rent(index: number){
    this.rentModalOpen = true;
    const curBook = this.bookList[index];
    console.log("curBook" + curBook);
    curBook.username=this.curUser.name;
    curBook.membershipNo=this.curUser.memNumber;
    curBook.returnDate=this.getReturnData(curBook.duration);
    this.bookList.splice(index,1);
    this.rentList.push(curBook);
    // just print out for debug
    console.log("rentBook: "+ curBook);
  }

  // return book method
  returnBook(index: number){
    const curBook=this.rentList[index];
    curBook.username="";
    curBook.membershipNo="";
    curBook.returnDate="";
    // just print out for debug
    console.log("returnBook: "+ curBook);
    this.rentList.splice(index,1);
    this.bookList.push(curBook);
  }

  // redirect back to home page
  logout(){
    this.canActivate();
  }
  save(index: number) {
    console.log(this.inputUser.username);
    console.log(this.inputUser.membershipNo);
    this.bookList[index].username = this.inputUser.username;
    console.log(this.bookList[index].username)
    alert(this.inputUser.username + ' with membership No. ' + this.inputUser.membershipNo + ' has successfully rent a book');
  }

  canActivate():boolean{
    if(true){
      this.router.navigate(['home']);
      return true;
    }
    return false;
  }
}
