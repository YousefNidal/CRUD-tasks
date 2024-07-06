import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  tasksId:any
  tasksDetails:any = []

  constructor(private route:ActivatedRoute, private tasksService:TasksService, private toastr:ToastrService, private router:Router) {
    this.route.paramMap.subscribe((res:any)=> {
      this.tasksId = res.params['id']
    })

   }
  ngOnInit(): void {
    this.getDetailsOfTask()
  }

  getDetailsOfTask() {
    this.tasksService.getTaskDetails(this.tasksId).subscribe((res:any)=> {
      
      this.tasksDetails = res.tasks;
    })
  }

  complete(id:any) {
    const MODEL = { 
      id:id
    }
    this.tasksService.completeTask(MODEL).subscribe(res => {
      this.router.navigate(['/tasks'])
      this.toastr.success("Task completed", "Success")
    })

  }



}
