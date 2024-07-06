import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from '../../../manage-users/services/users.service';
export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status:'Complete' , title: 'Hydrogen', user: "1.0079", deadline:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', user: "4.0026", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', user: "6.941", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', user: "9.0122", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Boron', user: "10.811", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', user: "12.010", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', user: "14.006", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', user: "15.999", deadline:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', user: "18.998", deadline:"10-11-2022" },
  { status:'Complete' , title: 'Neon', user: "20.179",deadline:"10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource = ELEMENT_DATA;
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:'667984d80bf39644a1e0bf5c'},
    {name:"Ali" , id:'667987400bf39644a1e0bf61'},
    {name:"Yousef" , id:'667aa24a1b6e77da0b25b6b5'},
    {name:"Amir Burger" , id:'667bff73ecbc9033d5ebac5e'},
    
    
    
  ]

  status:any = [
    {name:this.translate.instant("tasks.complete") },
    {name:"In-Progress" },
  ]
  constructor(private tasksService:TasksService, private userService:UsersService, private dialog:MatDialog, private toastr:ToastrService, private translate:TranslateService) {
this.getUsers()
this.getDataFromSubject()

   }

  ngOnInit(): void {
 this.getAllTasks();
  }

 
  getAllTasks() {
    
    this.tasksService.getAllTasks(this.filtration).subscribe( (res:any) => {
      // console.log(res.tasks)
      this.dataSource = this.mappingTasks(res.tasks);
      this.total = res.totalItems;
      
      
    });
  }

  getUsers() {
    this.userService.getAllUsers()
  }
  getDataFromSubject() {
    this.userService.usersData.subscribe((res:any) => {
      this.users = res.dataSource
      console.log(this.users)
    })
  }
  // addTask() {
  //     const dialogRef = this.dialog.open(AddTaskComponent, {
  //       width: '750px',
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       if(result) {
  //         this.getAllTasks()
  //       }
  //     })
  // }
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'750px',
      disableClose: true,
      
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res == true) {
        this.getAllTasks();
      }
      
    })
  }

  mappingTasks(data:any[]) {
    let newTasks = data.map(res => {
      return {
        ...res,
        user:res.userId.username,
      }
    })
    
    return newTasks;
  }


  deleteTask(i:number) {
   
    this.tasksService.deleteTask(i).subscribe(res => {

      this.getAllTasks();
      this.toastr.success('Task Successfully Deleted','Delete task')
      

    })
  }

  editTask(element:any) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'750px',
      data:element,
      disableClose: true,
      
    })

    dialogRef.afterClosed().subscribe(res => {
      if(res ==true) {
        this.getAllTasks();
      }
      
    })


    // this.tasksService.editTask(element).subscribe(res => {

    // }, err => {

    // })
  }


page:any = 1;

filtration:any = {
  page:this.page,
  limit:10,

}
timeOutId:any;

total:any;


  search(event:any) {
    this.page = 1;
  this.filtration['page'] = 1

this.filtration['keyword'] = event.value;
clearTimeout(this.timeOutId)

this.timeOutId = setTimeout( ()=> {
this.getAllTasks();
}, 2000)


  }

  selectUser(event:any) {
    this.filtration['userId'] = event.value;
    this.page = 1;
    this.filtration['page'] = 1
    this.getAllTasks();

  }


  selectStatus(event:any) {
    this.filtration['status'] = event.value.trim()
    this.page = 1;
    this.filtration['page'] = 1
    this.getAllTasks();
  }

selectDate(event:any, type:string) {
  this.page = 1;
  this.filtration['page'] = 1
  this.filtration[type] = moment(event.value).format('DD-MM-YYYY')
  if(type == "toDate" && this.filtration['toDate'] !== "Invalid date") {
    this.getAllTasks();
  }
}

changePage(event:any) {
  this.page = event;
  this.filtration['page'] = event
  this.getAllTasks();

}



}
