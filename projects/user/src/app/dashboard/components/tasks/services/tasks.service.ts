import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks() {
    
  }
  getUserTasks(userId:string, userParams:any) {
    let params = new HttpParams();

    Object.entries(userParams).forEach(([key, value]:any) => {
      params =   params.append(key, value)
    })
    return this.http.get('https://task-bend.onrender.com/tasks/user-tasks/' + userId , {params})
  }

  completeTask(model:object) {
    return this.http.put("https://task-bend.onrender.com/tasks/complete", model)
  }


  getTaskDetails(id:any) {
    return this.http.get('https://task-bend.onrender.com/tasks/task/'+id)
  }
}
