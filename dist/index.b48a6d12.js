const API_KEY = "c4c4022663dafa850bc174cd583b0579";
const getUsers = ()=>{
    interceptRequests();
    axios.get("https://api.stlouisfed.org/fred/").then((response)=>{
        displayOutput(response);
        return response;
    }).catch((err)=>console.log(err));
};
const postUser = ()=>{
    interceptRequests();
    axios.post("https://api.stlouisfed.org/fred/", {
        id: 11,
        name: "Tom Brady",
        username: "Brad",
        email: "tombrad@asd.com"
    }).then((response)=>displayOutput(response)).catch((err)=>console.log(err));
};
const concurrentRequests = ()=>{
    interceptRequests();
    axios.all([
        axios.get("https://api.stlouisfed.org/fred/"),
        axios.get("https://api.stlouisfed.org/fred/")
    ]).then(axios.spread((users, albums)=>{
        displayOutput(albums);
    })).catch((err)=>console.log(err));
};
// Interceptors
const interceptRequests = ()=>{
    axios.interceptors.request.use((config)=>{
        const today = new Date();
        console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${today.getHours()} : ${today.getMinutes()}`);
        return config;
    }, (error)=>{
        console.log(error);
    });
};
// Display the output in the browser
const displayOutput = (responseDisplay)=>{
    document.getElementById("responseDisplay").innerHTML = `
<div class="card card-body mb-4">
  <h5>Status: ${responseDisplay.status}</h5>
</div>

<div class="card mt-3">
  <div class="card-header">
    Headers
  </div>
  <div class="card-body">
    <pre>${JSON.stringify(responseDisplay.headers, null, 2)}</pre>
  </div>
</div>

<div class="card mt-3">
  <div class="card-header">
    Data
  </div>
  <div class="card-body">
    <pre>${JSON.stringify(responseDisplay.data, null, 2)}</pre>
  </div>
</div>

<div class="card mt-3">
  <div class="card-header">
    Config
  </div>
  <div class="card-body">
    <pre>${JSON.stringify(responseDisplay.config, null, 2)}</pre>
  </div>
</div>;`;
};
// Event listeners
document.getElementById("get").addEventListener("click", getUsers);
document.getElementById("post").addEventListener("click", postUser);
document.getElementById("concurrent").addEventListener("click", concurrentRequests);

//# sourceMappingURL=index.b48a6d12.js.map
