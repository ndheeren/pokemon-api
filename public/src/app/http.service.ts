import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // adding HttpClient here is a dependency injection
  // our service depends on HttpClient to make http requests
  // by making make HttpClient an attribute in this class, our service may refer to HttpClient and use its methods
  constructor(private _http: HttpClient)
  {
    this.getTasks();
    this.getTaskByID('5dc5bec3ce7fd80c5086a469');
  }

  // Write functions in the service that make AJAX requests to all get routes in the Restful Task API
  // /allTasks
  getTasks()
  {
    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get('/allTasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got our tasks!", data));
  }

  // /tasks/:id
  getTaskByID(id: string)
  {
    let tempObservable = this._http.get(`/tasks/${id}`);
    tempObservable.subscribe(data => console.log(`Got task by ID of ${id}!`, data));
  }

  // /tasks
  createTask()
  {
    let tempObservable = this._http.get(`/tasks`);
    tempObservable.subscribe(data => console.log(`Created a task!`, data));
  }

  // /tasks/:id
  editTask(id: string)
  {
    let tempObservable = this._http.get(`/tasks`);
    tempObservable.subscribe(data => console.log(`Edited the task with ID of ${id}!`, data));
  }

  // /tasks/:id/
  deleteTask(id: string)
  {
    let tempObservable = this._http.get(`/tasks`);
    tempObservable.subscribe(data => console.log(`Deleted the task with ID of ${id}!`, data));
  }
}
