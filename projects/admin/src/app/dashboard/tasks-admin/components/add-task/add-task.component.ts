import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder , public dialog: MatDialogRef<AddTaskComponent> , public matDialog:MatDialog, 
    private tasksService:TasksService, private toastr:ToastrService, private userService:UsersService
    
  ) { 
    this.getDataFromSubject()
  }
  newTaskForm!:FormGroup;
  users:any = [
   
    
  ]
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newTaskForm = this.fb.group({
      title:[ this.data?.title ||'',[Validators.required, Validators.minLength(5)]],
      userId:[this.data?.userId._id ||'',Validators.required],
      image:[this.data?.image ||'',Validators.required],
      description: [this.data?.description ||'',Validators.required],
      deadline:[this.data? new Date(this.data?.deadline.split('-').reverse().join("-")).toISOString():'',Validators.required],
    })

    this.formValues = this.newTaskForm.value;
  }
  imageName:string = '';
  formValues:any;
  selectImage(event:any) {
    
    
    this.imageName = event.target.files[0].name
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  createTask() {
    
    
    let modal = this.prepFormData();
    this.tasksService.createNewTask(modal).subscribe(res => {
      this.toastr.success('Task created successfully', 'success')
      
      this.dialog.close(true);
    })
  }

  prepFormData() {
    
    let newData = moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY');
    
    let formData = new FormData();  
    Object.entries(this.newTaskForm.value).forEach(([key, value] :any )=> {

      if(key == "deadline") {
        formData.append(key, newData)
      }
      else {
        formData.append(key, value);
      }
    })
    return formData;
  }
  updateTask() {
  
    
    let modal = this.prepFormData();
    this.tasksService.editTask(modal, this.data._id).subscribe(res => {
      this.toastr.success('Task updated successfully', 'Success')
      
      this.dialog.close(true);
    }, )
  }

  close() {
    let change = false;
      Object.keys(this.formValues).forEach(item=> {
        if(this.formValues[item] !== this.newTaskForm.value[item]) {
          change = true;
          
        }

        
        
      })
      if(change) {
          

        const dialogRef = this.matDialog.open(ConfirmationComponent, {
          width: '700px',
        }) 

        dialogRef.afterClosed().subscribe(res =>  {
           if(res == true) {

          }
        }
         
        )
      }else {
        this.dialog.close();
      }
  }
  getDataFromSubject() {
    this.userService.usersData.subscribe((res:any) => {
      this.users = this.reformData(res.dataSource)
      
    })
  }
  reformData(data:any[]) {
    let newArray = data.map(item => {
      return {
        name:item.username,
      id:item._id
      }
    })
    return newArray
  }
 
}
