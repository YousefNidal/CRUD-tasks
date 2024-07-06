import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'projects/admin/src/app/auth/services/login.service';
import { UsersService, changeStatus } from '../../services/users.service';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { name: 'Hydrogen', email: "1.0079", tasksAssigned:"10-11-2022" },
//   { name: 'Helium', email: "4.0026", tasksAssigned:"10-11-2022" },
//   { name: 'Lithium', email: "6.941", tasksAssigned:"10-11-2022" },
//   { name: 'Beryllium', email: "9.0122", tasksAssigned:"10-11-2022" },
//   { name: 'Boron', email: "10.811", tasksAssigned:"10-11-2022" },
//   { name: 'Carbon', email: "12.010", tasksAssigned:"10-11-2022" },
//   { name: 'Nitrogen', email: "14.006", tasksAssigned:"10-11-2022" },
//   { name: 'Oxygen', email: "15.999", tasksAssigned:"10-11-2022" },
//   { name: 'Fluorine', email: "18.998", tasksAssigned:"10-11-2022" },
//   {  name: 'Neon', email: "20.179", tasksAssigned:"10-11-2022" },
// ];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  
  constructor(private usersService:UsersService, private toastr:ToastrService) {
    this.getDataFromSubject();
   }
  users:any;
dataSource:any;
totalItems:any;
  ngOnInit(): void {
    this.getUser()
  }

  

  deleteUser(item:any) {
    if(item.assignedTasks > 0) {
      this.toastr.error("You can not delete this user", "Error")
    }else {
      this.usersService.deleteUsers(item._id).subscribe(res => {
        this.toastr.success("User Deleted Successfully", "Success")
        this.getUser()
      })
    }
  }
  page:any

  changePage(event:any) {
    this.page = event
    this.getUser()
  }

  changeStatus(item:any) {
    let MODEL:changeStatus = {
      id: item._id,
      status: item.status
    }
    if(item.assignedTasks > 0) {
      this.toastr.error("You can not delete this user", "Error")
    }else {
      this.usersService.changeStatus(MODEL).subscribe(res => {
        this.toastr.success("Status changed successfully", "Success")
        this.page = 1;
        this.getUser();
      })
    }

  
    
  }
  getUser() {
    const MODEL = {
      page:this.page,
      limit:2,
      name:''
    }
      this.usersService.getAllUsers(MODEL)
    }

    getDataFromSubject() {
      this.usersService.usersData.subscribe((res:any) => {
        this.dataSource = res.dataSource
        this.totalItems = res.totalItems
      })
    }


}
