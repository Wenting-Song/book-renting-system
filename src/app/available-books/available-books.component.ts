import { Component, OnInit, Input } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {DataService} from '../data.service';
@Component({
  selector: 'app-available-books',
  templateUrl: './available-books.component.html',
  styleUrls: ['./available-books.component.css']
})
export class AvailableBooksComponent implements OnInit {
  public bookList = [];
  public rentList = [];
  curUser: any = {name: '', memNumber: ''};
  public showBookList: boolean;
  public rentModalOpen = false;
  public inputUser: any = {};
  @Input() public curBook: any;
  showSaveButton = false;
  showReturnButton = false;

  constructor(public router: Router, private data: DataService) {

    this.showBookList = true;
    this.rentList = [];
    // this is demo data
    this.bookList = [
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
  getReturnDate(duration: string) {
    if(!duration || duration === '') { return ''; }
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + parseInt(duration));
    return curDate;
  }
  closeModal() {
    this.rentModalOpen = false;
  }
  ngOnInit() {
    // get the user login informtion from service
    this.data.currentMessage.subscribe(message => this.curUser = message);
  }
  // rent method
  rent(index: number) {
    this.rentModalOpen = true;
    this.showSaveButton = true;
    this.curBook = this.bookList[index];
    const curDate = new Date();
    this.curBook.returnDate = curDate.setDate(curDate.getDate() + parseInt(this.bookList[index].duration));
  }

  // return book method
  returnBook(index: number) {
    this.rentModalOpen = true;
    this.showReturnButton = true;
    this.curBook = this.rentList[index];
  }

  return() {
    if (this.curBook.username === this.inputUser.username && this.curBook.membershipNo === this.inputUser.membershipNo) {
      this.rentList = this.rentList.filter(index => this.curBook.bookId !== index.bookId);
      this.bookList.push(this.curBook);
      this.showReturnButton = false;
      this.rentModalOpen = false;
      this.curBook = null;
      alert("you have successfully returned this book")
    }
    else {
      alert("you should input correct username and member No.")
    }
  }

  // redirect back to home page
  logout() {
    this.canActivate();
  }
  save() {
    this.curBook.username = this.inputUser.username;
    this.curBook.membershipNo = this.inputUser.membershipNo;
    this.curBook.returnDate = this.getReturnDate(this.curBook.duration);
    alert(this.inputUser.username + ' with membership No. ' + this.inputUser.membershipNo + ' has successfully rent a book');
    this.rentList.push(this.curBook);
    this.bookList = this.bookList.filter(index => this.curBook.bookId !== index.bookId);
    this.curBook = null;
    this.inputUser = {};
    this.rentModalOpen = false;
    this.showSaveButton = false;
    console.log(this.rentList);
  }

  canActivate(): boolean {
    if (true) {
      this.router.navigate(['home']);
      return true;
    }
    return false;
  }
}
