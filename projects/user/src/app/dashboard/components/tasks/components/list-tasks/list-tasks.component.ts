import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup
  totalItems:any;
  userData:any;
  currentStatus:string = 'In-Progress'
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(private tasksService:TasksService, private fb:FormBuilder, private toastr:ToastrService) { }
  page:number = 1;

  ngOnInit(): void {
      this.createForm()
      this.getUserData()
      this.getAllTasks()
  }

  changePage(event:any) {
    this.page = event;
    
  }

  createForm() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }


  getUserData() {
    let token = JSON.stringify(localStorage.getItem('token'))
    this.userData = JSON.parse(window.atob(token.split(".")[1]))

  }
  getAllTasks() {
    let params = {
      page:this.page,
      limit:10,
      status:this.currentStatus,
    }
    this.tasksService.getUserTasks(this.userData.userId,params).subscribe( (res:any) => {
      this.dataSource = res.tasks;
      this.totalItems = res.totalItems
      console.log(res.tasks)
    }, err => {
      this.dataSource =[];
    })
  }
  complete(item:any) {
    const MODEL = { 
      id:item._id
    }
    this.tasksService.completeTask(MODEL).subscribe(res => {
      this.toastr.success("Task completed", "Success")
    })

  }

  


}
