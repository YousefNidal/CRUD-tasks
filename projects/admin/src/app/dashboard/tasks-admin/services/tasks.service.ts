import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTask } from '../context/DTO';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }


getAllTasks(filter:any) {
  let params = new HttpParams()

  Object.entries(filter).forEach(([key,value] : any) =>{
 if(value) {
    params = params.append(key, value)
  }
  })
 
  
  
   
 return this.http.get(environment.baseApi + '/all-tasks', {params});


}

createNewTask(modal:any) {
  return this.http.post(environment.baseApi + '/add-task', modal)
}

deleteTask(index:number) {
  return this.http.delete(environment.baseApi + '/delete-task/' + index)
}
editTask(model:any, id:any) {
  return this.http.put(environment.baseApi + '/edit-task/' + id, model)
}




}
 