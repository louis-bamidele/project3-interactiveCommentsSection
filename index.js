const commentTemplate = document.createElement("template");
const replyTemplate = document.createElement("template");
const sendInput = document.getElementById("name");

commentTemplate.innerHTML = `
<link rel="stylesheet" href="styles.css" />
<div class="edit-comment">
    <div class="form">
      <img src="images/avatars/image-juliusomo.png" alt="" class="avater">
      <textarea name="name"  cols="10" rows="5" placeholder="Add a comment..." required></textarea>
      <input class="btn" type="submit" value="REPLY">
    </div>
</div>
<div class="reply-box">
<div class="reply-comment">
  <div class="vote">
    <div><img src="images/icon-plus.svg" alt="" class="plus"></div>
    <p class="numbers">0</p>
    <div><img src="images/icon-minus.svg" alt="" class="minus"></div>
  </div>

    <div class="profile">
      <img src="images/avatars/image-juliusomo.png" alt="" class="avater">
      <p class="username">juliusomo</p>
      <span class="you">you</span>
      <p class="time">Just now</p>
    </div>
    <div class="reply">
      <p class="delete"><img src="images/icon-delete.svg" alt="" class="delete-icon"> Delete</p>
      <p class="edit"><img src="images/icon-edit.svg" alt="" class="edit-icon"> Edit</p> 
    </div>
    <div class="content">
    <p class="repliedTo"></p><p class="contentt"></p>
    </div>
     
</div>
</div> `;
// my template for send box class
replyTemplate.innerHTML = `
<link rel="stylesheet" href="styles.css" />
<div class="comments">
  <div class="vote">
    <div><img src="images/icon-plus.svg" alt="" class="plus"></div>
    <p class="numbers">0</p>
    <div><img src="images/icon-minus.svg" alt="" class="minus"></div>
  </div>

    <div class="profile">
      <img src="images/avatars/image-juliusomo.png" alt="" class="avater">
      <p class="username">juliusomo</p>
      <span class="you">you</span>
      <p class="time">Just now</p>
    </div>
    <div class="reply">
      <p class="delete"><img src="images/icon-delete.svg" alt="" class="delete-icon"> Delete</p>
      <p class="edit"><img src="images/icon-edit.svg" alt="" class="edit-icon"> Edit</p> 
    </div>
    <div class="content"><p class="contentt"></p>
    </div>
     
</div>`;





// send box
class SendBox extends HTMLElement {
  constructor(){
      super();
      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(replyTemplate.content.cloneNode(true));
      let value = sendInput.value
      this.shadowRoot.querySelector(".contentt").textContent = value
  };
  connectedCallback(){
      this.shadowRoot.querySelector(".plus").addEventListener("click", (e) => increment(e));
      this.shadowRoot.querySelector(".minus").addEventListener("click", (e) => decrement(e));
      this.shadowRoot.querySelector(".delete").addEventListener("click", (e) => deleteComm(e));
      this.shadowRoot.querySelector(".edit").addEventListener("click", (e) => edit(e));
  };
  disconnectedCallback() {
    replybutton.querySelectorAll(".reply-text").removeEventListener();
    this.shadowRoot.querySelector(".btn").removeEventListener();
    this.shadowRoot.querySelector(".plus").removeEventListener();
      this.shadowRoot.querySelector(".minus").removeEventListener();
};
};

// this next line define my custom element to the window
window.customElements.define("send-box", SendBox);


// comment box 
 class CommentBox extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(commentTemplate.content.cloneNode(true));

        this.editComment = this.shadowRoot.querySelector(".edit-comment");
        this.displayComment = this.shadowRoot.querySelector(".reply-box");
        
        this.displayComment.style.display = "none";
    };
    connectedCallback(){
        this.shadowRoot.querySelector(".btn").addEventListener("click", () => this.commentSubmit());
        this.shadowRoot.querySelector(".plus").addEventListener("click", (e) => increment(e));
        this.shadowRoot.querySelector(".minus").addEventListener("click", (e) => decrement(e));
        this.shadowRoot.querySelector(".delete").addEventListener("click", (e) => deleteComment(e));
        this.shadowRoot.querySelector(".edit").addEventListener("click", (e) => edit(e));
    };
    commentSubmit(){
     
      const storedItem = localStorage.getItem("content");
      if (storedItem) {
        this.shadowRoot.querySelector("textarea").value = storedItem;
      }
      const value = this.shadowRoot.querySelector("textarea").value
      localStorage.setItem("content", value);
      // check if the user made an input
      if (!value == "") {
        
      this.shadowRoot.querySelector(".contentt").textContent = value
      this.shadowRoot.querySelector(".repliedTo").innerHTML = replyTo
      this.displayComment.style.display = "grid";
      this.editComment.style.display = "none";
      }
      
    }
    disconnectedCallback() {
      replybutton.querySelectorAll(".reply-text").removeEventListener();
      this.shadowRoot.querySelector(".btn").removeEventListener();
      this.shadowRoot.querySelector(".plus").removeEventListener();
        this.shadowRoot.querySelector(".minus").removeEventListener();
  };
};

// this next line define my custom element to the window
window.customElements.define("comment-box", CommentBox);



// document event listeners 
// add event listener to reply button 
const replybutton = document.getElementsByClassName("reply-text");
replybutton[0].addEventListener("click", (e) => reply(e));
replybutton[1].addEventListener("click", (e) => reply(e));
replybutton[2].addEventListener("click", (e) => reply2(e));

// add event listener to delete button 
const deleteCommentt = document.getElementsByClassName("delete");
 for( const deleteIcon of deleteCommentt){
  deleteIcon.addEventListener("click", (e) => deleteComment(e));
 }
 
// add event listener to plus button 
const plus = document.getElementsByClassName("plus");
  for (const pluss of plus){
    pluss.addEventListener("click", (e) => increment(e));
};

// add event listener to minus button 
const minus = document.getElementsByClassName("minus");
  for (const minuss of minus){
    minuss.addEventListener("click", (e) => decrement(e));
};

// add event listener to edit button 
const editbutton = document.getElementsByClassName("edit");
for (const editbuttonn of editbutton){
  editbuttonn.addEventListener("click", (e) => edit(e))
} 
// all my fuctions 



var replyTo = "@louis "
function reply(e) {
//The path property of Event objects is non-standard. 
//The standard equivalent is composedPath,
// which is a method. But it's new.
// So you may want to try falling back to composedPath
// about the above, we would get the path if we can
let path = e.path || (e.composedPath && e.composedPath());

  replyTo = "@" + path[2].children[1].childNodes[3].innerText + " ";
  let parentHasClass = e.target.closest('.comments');
        parentHasClass.insertAdjacentHTML('afterend', '<comment-box> </comment-box>');
  
}
function reply2(e) {
  let path = e.path || (e.composedPath && e.composedPath());
  replyTo = "@" + path[2].children[1].childNodes[3].innerText + " ";
  let parentHasClass = e.target.closest('.reply-box');
        parentHasClass.insertAdjacentHTML('afterend', '<comment-box> </comment-box>');
        replyTo = "@ramsesmiron ";
}


function edit(e){
  let path = e.path || (e.composedPath && e.composedPath());
  const editPath = path[2].childNodes[7];
  editPath.setAttribute("contentEditable", "true");
  var butt = document.createElement('BUTTON');
  var butter = document.createElement('DIV');
	var buttext = document.createTextNode('UPDATE');
	butt.appendChild(buttext);
  butter.appendChild(butt);
  butt.setAttribute("class", "btn")
  butter.setAttribute("id", "update")
  editPath.insertAdjacentElement("afterend", butter);
	butter.onclick = editRemove;
  function editRemove(){
      editPath.removeAttribute("contentEditable");
      butter.remove()
    }
}
function increment(e) {
  
  var defaultLikes = e.target.closest('.vote').children[1].innerHTML;
      defaultLikes = Number(defaultLikes);
      defaultLikes++
      e.target.closest('.vote').children[1].innerHTML = defaultLikes
 
  
}
function decrement(e) {
  var decrementlikes = e.target.closest('.vote').children[1].innerHTML;
  decrementlikes = Number(decrementlikes);
  decrementlikes--
  var zero = 0;
  if (decrementlikes >= zero) {
    e.target.closest('.vote').children[1].innerHTML = decrementlikes
  } else {
    e.target.closest('.vote').children[1].innerHTML = zero
  }
      
}

function send(e){
  let send = e.target.closest('.footer');
  if (!sendInput.value == "") {
    send.insertAdjacentHTML('beforebegin',  '<send-box> </send-box>'); 
    sendInput.value = "";
  }
  
}

function deleteComment(e) {
  let path = e.path || (e.composedPath && e.composedPath());
  let modal = document.getElementById("myModal");
  let child = path[3];
  modal.style.display = "grid";
  let close = document.querySelector(".modal .close");
  let proceed = document.querySelector(".modal .proceed");
  close.addEventListener("click", () =>{
    modal.style.display = "none";
  });
  proceed.addEventListener("click", () =>{
    child.remove();
    modal.style.display = "none";
  });
}
function deleteComm(e) {
  let path = e.path || (e.composedPath && e.composedPath());
  let modal = document.getElementById("myModal");
  let secondChild = path[2];
  modal.style.display = "grid";
  let close = document.querySelector(".modal .close");
  let proceed = document.querySelector(".modal .proceed");
  close.addEventListener("click", () =>{
    modal.style.display = "none";
  });
  proceed.addEventListener("click", () =>{
    secondChild.remove();
    modal.style.display = "none";
  });
}

//save text to local storage
const saveContentToStorage = () =>{
  localStorage.setItem("content", value)
}