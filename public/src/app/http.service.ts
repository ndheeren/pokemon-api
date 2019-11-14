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
    // this.getTasks();
    // this.getTaskByID('5dc5bec3ce7fd80c5086a469');

    this.getPokemon();
  }

  getPokemon()
  {
    let charmanderTempObservable = this._http.get('https://pokeapi.co/api/v2/pokemon/4/');

    charmanderTempObservable.subscribe(data => {
        console.log(`Got our ${data['name']} data!`, data);

        let movesToFocusOn = [];

        // Next, parse through the data to generate a string that contains the most interesting data about your Pokemon. For example, "Bulbasaur's abilities are chlorophyll and overgrow."
        for(let move of data['moves'])
        {
          // console.log(move);
          
          if (move.move['name'] == "ember" || move.move['name'] == "scratch" || move.move['name'] == "flamethrower")
          {
            movesToFocusOn.push(move);
          }
        }

        console.log(`Here are some of Charmander's iconic moves!`);
        for (let move of movesToFocusOn)
        {
          console.log(move.move['name']);

          // Finally, use the data to make another API request to print how many Pokemon share your Pokemon's abilities. For example, "23 Pokemon have the overgrow ability."
          let moveURL = move.move['url'];
          console.log(`moveURL = ${moveURL}`);
          let moveTempObservable = this._http.get(moveURL);
          moveTempObservable.subscribe(moveData => {
            console.log(`Got our move data!`, moveData);
          });

        }

        // didn't include this functionality: // Finally, use the data to make another API request to print how many Pokemon share your Pokemon's abilities. For example, "23 Pokemon have the overgrow ability."
        // I didn't readily see a property in the move URL for this property; I could have looped thru every pokemon from, say, IDs 1-151, checking if they had this move and increasing the count for each successful case, but that seemed like a lot of API calls...
      });
  }

  // Write functions in the service that make AJAX requests to all get routes in the Restful Task API
  // /allTasks
  // getTasks()
  // {
  //   // our http response is an Observable, store it in a variable
  //   let tempObservable = this._http.get('/allTasks');
  //   // subscribe to the Observable and provide the code we would like to do with our data from the response
  //   tempObservable.subscribe(data => console.log("Got our tasks!", data));
  // }

  // // /tasks/:id
  // getTaskByID(id: string)
  // {
  //   let tempObservable = this._http.get(`/tasks/${id}`);
  //   tempObservable.subscribe(data => console.log(`Got task by ID of ${id}!`, data));
  // }

  // // /tasks
  // createTask()
  // {
  //   let tempObservable = this._http.get(`/tasks`);
  //   tempObservable.subscribe(data => console.log(`Created a task!`, data));
  // }

  // // /tasks/:id
  // editTask(id: string)
  // {
  //   let tempObservable = this._http.get(`/tasks`);
  //   tempObservable.subscribe(data => console.log(`Edited the task with ID of ${id}!`, data));
  // }

  // // /tasks/:id/
  // deleteTask(id: string)
  // {
  //   let tempObservable = this._http.get(`/tasks`);
  //   tempObservable.subscribe(data => console.log(`Deleted the task with ID of ${id}!`, data));
  // }
}
