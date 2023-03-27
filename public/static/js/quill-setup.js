import { exit } from "process";
import Quill from "quill";
import "quill/dist/quill.snow.css";

// var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

var quill;

document.addEventListener("DOMContentLoaded", function () {
   quill = new Quill("#editor", {
    modules: {
      toolbar: toolbarOptions,
    },
    theme: "snow",
  });
});

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["image", "video", "link", "formula"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

var saveButton = document.getElementById("save-button");
var titleContainer = document.getElementById("title-container");
var quill = document.getElementById("editor");

saveButton.addEventListener("click", function () {
  var title = titleContainer.value;
  var content = editor.textContent;
  var delta = quill.getContents();
  var images = [];
  var links = [];
  var videos = [];
  var formulas = [];
   
  if (title.trim() === "") {
    alert("Please enter a title.");
    return;
  }

  if (content.trim() === "") {
    alert("Please enter some content.");
    return;
  }

  // Check if delta is empty
  if (delta.ops.length === 0) {
    alert("Please add some content.");
    return;
  }




  // Iterate over Delta to find any images
  delta.ops.forEach(function (op) {
    if (op.insert && op.insert.image) {
      images.push(op.insert.image); // add image object to images array
    } else if (op.insert && op.insert.link) {
      links.push(op.insert.link);
    } else if (op.insert && op.insert.video) {
      videos.push(op.insert.video);
    } else if (op.insert && op.insert.formula) {
      formulas.push(op.insert.formula);
    }
  });

  // Create data object to send to server, including images
  var data = {
    title: title,
    text: content,
    images: images,
    links : links,
    videos : videos,
    formulas : formulas,
    delta : delta,
  };

  fetch("/saveArticle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      response.json().then(function (data) {
        if(response.status==200){
            alert("Saved");
            location.reload();
        } else {
            alert("Error occurred. Contact the administrator.");
        }
     
      });
    })
    .catch(function (error) {
    console.log(error);
      alert("Error occurred. Contact the administrator.");
    });
});

// const editor = new Quill('#editor', {
//     modules: {
//       toolbar: [
//         [{ 'header': [1, 2, 3, 4, false] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'align': [] }],
//         ['link', 'image', 'video'],
//         ['clean']
//       ]
//     },
//     placeholder: 'Write something...',
//     theme: 'snow'
//   });

//   var quill = new Quill('#editor', {
//     theme: 'snow'
//   });
