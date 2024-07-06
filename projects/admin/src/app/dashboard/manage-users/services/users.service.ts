import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';
export interface changeStatus {
  id:string,
  status:string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersData = new BehaviorSubject({})

  constructor(private http:HttpClient) { }



  getAllUserz(model:any) {
    let params = new HttpParams()
    if(model){
      Object.entries(model).forEach(([key,value] : any) =>{
        if(value) {
           params = params.append(key, value)
         }
         })
    }
    return this.http.get(environment.baseApi.replace('tasks', 'auth') + '/users',{params})
  }
  deleteUsers(id:string) {
    return this.http.delete(environment.baseApi.replace('tasks', 'auth') + '/user/'+id)
  }
  changeStatus(model:changeStatus) {
    return this.http.put(environment.baseApi.replace('tasks', 'auth') + '/user-status', model)
  }


  getAllUsers(model?:any) {
    this.getAllUserz(model).subscribe((res:any)=> {

      this.usersData.next(
        {
          dataSource:res.users,
          totalItems:res.totalItems
        }
      )
      
      
    })
  }


}
