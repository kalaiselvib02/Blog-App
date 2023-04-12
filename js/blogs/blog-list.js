import { showModal, hideModal } from "../main.js";
import { fetchData } from "../services/fetchApi.js";
import { APP_CONSTANTS } from "../constants/constants.js";
import { checkEmpty, checkLength } from "../helpers/helper.js";

// BLOG URL
const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;

// BLOG LIST
let blogList = await fetchData(BLOG_URL);

let activeIndex = 0;

// PRIVATE VARIABLES
let inputItemTitle;
let blogNewTitle;
let inputItemDescription;
let blogNewDescription;
let isEditMode;
let blogEdit = document.getElementById("editBlogBtn");
const blogListBody = document.getElementById("blogListBody");
const blogUpdateCancel = document.getElementById("cancelBlogEdit");
const blogUpdateSave = document.getElementById("saveBlogEdit");
let blogDetailsWrapper = document.getElementById("blogDetailsWrapper");
let blogListDetail;
let key;
let currentIndex;

let currentBlogItem;
let addModal = document.querySelector("#myModal");

// Function createBlogData()

export function createBlogData(list, isMode) {

  // Clear before appending
 
  let blogListItems = "";

  list.forEach((blogItem, index) => {
    blogListItems += `<div class="blog-list-item" data-index=${index}>
    <div class="blog-heading">${blogItem.title}</div>
    <div class="blog-type text-primary text-sm">
    ${blogItem.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${blogItem.details}</p>
    </div>`;
  });
  
  blogListBody.innerHTML = blogListItems;
  let blogListItemList = document.querySelectorAll(".blog-list-item");
  // Add Click Function listener
  blogListItemList.forEach(function (item, key) {
    item.addEventListener(
      "click",
      function (e) {
        setActiveBlog(list, key);
      },
      false
    );
  });
}

const getInputValue = (val) => {
  let inputValue = document.getElementById(val).value;
  return inputValue;
};




// Function call addNewBlog
export function addNewBlog() {
  const addModal = document.querySelector("#myModal");

  showModal(addModal);

  const submitBlogBtn = document.getElementById("submitBlogBtn");
  submitBlogBtn.textContent =
    APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.SUBMIT_BTN_TEXT;

  // Add click listener for submit btn
  document.getElementById("submitBlogBtn").addEventListener(
    "click",
    function (event) {
      submitBlog(event, "blogNewTitle", "blogNewDescription", isEditMode);
    },
    false
  );
}

// Function call submitBlog //
function submitBlog(event, id1, id2 , isMode) {
  event.preventDefault();
  console.log("call")
  // Get Input value for blogNewTitle //
  let title = getInputValue(id1);
  // Get Input value for blogNewDescription //
  let description = getInputValue(id2);

  let listArr = blogList;

  let newBlogData;

  newBlogData = {
    title: title,
    details: description,
    type: APP_CONSTANTS.LOCAL,
    photo: "https://dummyimage.com/16:9x1080/",
  };

  let isValidForm;    
      isValidForm = validateForm(newBlogData.title, newBlogData.details)
    
  

  if (isValidForm) {
    let newBlogElement = document.createElement("div");
    newBlogElement.className="blog-list-item";
    newBlogElement.innerHTML = `
    <div class="blog-heading">${newBlogData.title}</div>
    <div class="blog-type text-primary text-sm">
    ${newBlogData.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${newBlogData.details}</p>
    `;

    blogListBody.prepend(newBlogElement)
    document.getElementById("blogNewTitle").value = "";
    document.getElementById("blogNewDescription").value = "";
    isMode = true
     hideModal(addModal);
  }

}
const titleValid =
    APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.REQUIRED.BLOG_TITLE.ERROR_MESSAGE;

  const descriptionValid =
    APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.REQUIRED.BLOG_DESCRIPTION
      .ERROR_MESSAGE;

  const titleMaxLength =
    APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.TITLE.LENGTH;

  const descriptionMaxLength =
    APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.DESCRIPTION.LENGTH;

  const titleLengthError =
    APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.TITLE.ERROR_MESSAGE;

  const descriptionLengthError =
    APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.DESCRIPTION.ERROR_MESSAGE;
window.onclick = function(event) {
  let currentModal = document.querySelector(".modal.active")
  if (event.target == currentModal) {
    currentModal.style.display = "none";
    currentModal.classList.remove("active")
  }
};


function validateForm(titleVal, descriptionVal) {
  // Get Constants Value
  console.log("val")
  

  // Check If Not Empty and valid character length
  let isValidTitleLength = checkLength(titleVal, titleMaxLength);

  let isValidDescriptionLength = checkLength(
    descriptionVal,
    descriptionMaxLength
  );

  let isValidTitle = checkEmpty(titleVal);
  let isValidDescription = checkEmpty(descriptionVal);
  let isValid;

  

  // Create Error Obj with selectors and messages //
  let errorCheckObj = [{
    title: {
      empty : titleValid,
      length: titleLengthError,
    }, 
    description:{
      empty : descriptionValid,
      length: descriptionLengthError,
    }
  }];

  createError()

  let errorObj = {


    empty: {
      title: {
        selector: "#emptyTitleError",
        message: titleValid,
      },
      description: {
        selector: "#emptyDescriptionError",
        message: descriptionValid,
      },
    },
    validation: {
      title: {
        selector: "#validTitleError",
        message: titleLengthError,
      },
      description: {
        selector: "#validDescriptionError",
        message: descriptionLengthError,
      },
    },
  };

  if (
    isValidTitle &&
    isValidDescription &&
    isValidTitleLength &&
    isValidDescriptionLength
  ) {
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
}

// Function createBlogData
createBlogData(blogList);

function createError() {
  console.log("called")
  let errorData = [
    { blogNewTitle : 
      { 
        errorCollection : [titleValid , titleLengthError]
      }
    }, 
    { blogNewDescription : 
      { 
        errorCollection : [descriptionValid , descriptionLengthError]
      }
    }, 
   
    
  ];
  
  errorData.map(errorItem => {
    let error = document.createElement("p");
    error.className = "error";
    error.textContent = getErrorMessage(errorItem);


    function getErrorMessage(message) {
      
    }
    console.log(error);
   
  });
 
}






