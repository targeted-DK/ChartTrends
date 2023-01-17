//Get request
import { get } from "axios";

get("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
      displayOutput(response)
    })
    .catch((err) => console.log(err));


    document.getElementById("get").addEventListener("click", getUsers);
    document.getElementById("post").addEventListener("click", postUser);
    document.getElementById("concurrent").addEventListener("click", concurrentRequests);
    
    