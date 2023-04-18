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
let searchInput = document.getElementById("searchBlogs");
const addBlogForm = document.getElementById("add-form");
const confirmCancelEditBtn = document.querySelector("#confirmCancelEdit");
const confirmEditBtn = document.querySelector("#confirmEdit");

let blogListDetail;
let key;
let currentIndex;
let setBlogIndex;
let setBlogDetail;
let currentBlogItem;
let addModal = document.querySelector("#myModal");

const titleValid =
  APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.REQUIRED.BLOG_TITLE.ERROR_MESSAGE;

const descriptionValid =
  APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.REQUIRED.BLOG_DESCRIPTION.ERROR_MESSAGE;

const titleMaxLength =
  APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.TITLE.LENGTH;

const descriptionMaxLength =
  APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.DESCRIPTION.LENGTH;

const titleLengthError =
  APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.TITLE.ERROR_MESSAGE;

const descriptionLengthError =
  APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.DESCRIPTION.ERROR_MESSAGE;

blogEdit.textContent = APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SUBMIT_BTN_TEXT;

blogUpdateSave.textContent =
  APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SAVE_FORM.SAVE;

blogUpdateCancel.textContent =
  APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SAVE_FORM.CANCEL;

// Function createBlogData()

export function createBlogData(list, isMode) {
  // Clear before appending

  let blogListItems = "";

  list.forEach((blogItem) => {
    blogListItems += `<div class="blog-list-item">
    <div class="blog-heading">${blogItem.title}</div>
    <div class="blog-type text-primary text-sm">
    ${blogItem.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${blogItem.details}</p>
    </div>`;
  });

  blogListBody.innerHTML = blogListItems;

  getBlogDetails(false);
}



function getBlogDetails(mode) {
console.log("blog dcetails called")
  let allBlogListItems = document.querySelectorAll(".blog-list-item");

  if (allBlogListItems) {
    allBlogListItems.forEach(function (listItem, index) {
      listItem.addEventListener("click", () => {
        if(mode) {
          console.log("enters if")
          showWarning();
        }
        allBlogListItems.forEach(function (listItem) {
          listItem.classList.remove("active");
        });
        
        listItem.classList.add("active");
        showBlogDetailsData(index);
        
      });
    });
  }
}

// showBlogDetailsData(0)
function showBlogDetailsData(bIndex) {
  let blogListDetail = blogList[bIndex];
  setBlogDetail = blogListDetail;
  setBlogIndex = bIndex;
  // Select present blog image
  let blogImage = document.querySelector(".blog-detail-img");
  blogImage.setAttribute("src", blogListDetail.photo);
  // Select fall back image
  blogImage.setAttribute(
    "onerror",
    "this.onerror=null;this.src='https://dummyimage.com/16:9x1080/';"
  );
  // Select blog heading and set text content
  let blogHeading = document.querySelector(".blog-detail-heading");
  blogHeading.textContent = blogListDetail.title;
  // Select blog description and set text content
  let blogDescription = document.querySelector(".blog-detail-description");
  blogDescription.textContent = blogListDetail.details;

  blogEdit.addEventListener(
    "click",
    function () {
      editBlog(blogListDetail);
    },
    false
  );
}

blogUpdateSave.addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    isEditMode = true;
    if (isEditMode) {
      saveEditBlog(
        "blogEditNewTitle",
        "blogEditNewDescription",
        setBlogIndex,
        setBlogDetail
      );
    }
  },
  false
);

// Function call editBlog
blogUpdateCancel.addEventListener(
  "click",
  function () {
    cancelEdit(blogListDetail);
  },
  false
);

// Function cancelEdit
function cancelEdit() {
  isEditMode = false;
  document.querySelector(".show-details").classList.remove("d-none");
  document.querySelector(".show-inputs").classList.add("d-none");
  showBlogDetailsData(setBlogIndex);
  blogEdit.classList.remove("d-none");
  blogUpdateCancel.classList.remove("d-block");
  blogUpdateSave.classList.remove("d-block");
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
function submitBlog(event, id1, id2, isMode) {
  event.preventDefault();
  // Get Input value for blogNewTitle //
  let title = getInputValue(id1);
  // Get Input value for blogNewDescription //
  let description = getInputValue(id2);

  let newBlogData;

  newBlogData = {
    title: title,
    details: description,
    type: APP_CONSTANTS.LOCAL,
    photo: "https://dummyimage.com/16:9x1080/",
  };

  let isValidForm;
  isValidForm = validateForm(newBlogData.title, newBlogData.details);

  if (isValidForm) {
    let newBlogElement = document.createElement("div");
    newBlogElement.className = "blog-list-item";
    newBlogElement.innerHTML = `
    <div class="blog-heading">${newBlogData.title}</div>
    <div class="blog-type text-primary text-sm">
    ${newBlogData.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${
      newBlogData.details
    }</p>
    `;

    blogListBody.prepend(newBlogElement);
    blogList.unshift(newBlogData);
    localStorage.setItem("blogs" , JSON.stringify(blogList))
    // showBlogDetailsData(dIndex++)
    addBlogForm.reset();
    isMode = true;
    hideModal(addModal);
  }
}

window.onclick = function (event) {
  let currentModal = document.querySelector(".modal.active");
  if (event.target == currentModal) {
    currentModal.style.display = "none";
    currentModal.classList.remove("active");
  }
};
function validateForm(titleVal, descriptionVal) {
  // Check If Not Empty and valid character length
  let isValidTitleLength = checkLength(titleVal, titleMaxLength);

  let isValidDescriptionLength = checkLength(
    descriptionVal,
    descriptionMaxLength
  );

  let isValidTitle = checkEmpty(titleVal);
  let isValidDescription = checkEmpty(descriptionVal);
  let isValid;

  let errorData = [
    {
      ".title-input": {
        presence: isValidTitle,
        message: titleValid,
      },
    },
    {
      ".description-input": {
        presence: isValidDescription,
        message: descriptionValid,
      },
    },
  ];

  // createError()

  if (
    isValidTitle &&
    isValidDescription &&
    isValidTitleLength &&
    isValidDescriptionLength
  ) {
    isValid = true;
  } else {
    createError(errorData);
    isValid = false;
  }
  return isValid;
}

function createError(errorArrData) {
  errorArrData.forEach((errorData) => {
    for (const [key, value] of Object.entries(errorData)) {
      let errorEntry = value;
      let parentErrorDiv = document.querySelector(key);
      let error;
      let errorElement = document.querySelector(key + " .error");
      if (errorEntry.presence === false) {
        error = "";
        error = document.createElement("p");
        error.className = "error";
        for (const [key, value] of Object.entries(errorEntry)) {
          error.textContent = value;
          if (!errorElement) {
            error.className = "error d-block";
            parentErrorDiv.appendChild(error);
          }
        }
      } else {
        errorElement.className = "error d-none";
      }
    }
  });
}

// Function call editBlog
function editBlog(blogListDetail) {
  console.log("edit blog called")
  isEditMode = true;
  getBlogDetails(true)
  blogEdit.classList.add("d-none");
  blogUpdateCancel.classList.add("d-block");
  blogUpdateSave.classList.add("d-block");


  // Function call showEditModeInputs
  showEditModeInputs(blogListDetail);
}

// Function call showEditModeInputs
function showEditModeInputs(listDetailValue) {
  document.querySelector(".show-details").classList.add("d-none");
  document.querySelector(".show-inputs").classList.remove("d-none");

  let blogEditImage = document.querySelector(".show-inputs img");
  blogEditImage.setAttribute("src", listDetailValue.photo);
  blogEditImage.setAttribute(
    "onerror",
    "this.onerror=null;this.src='https://dummyimage.com/16:9x1080/';"
  );

  let headingInputValue = document.querySelector("#blogEditNewTitle");
  headingInputValue.value = listDetailValue.title;

  let headingDescriptionValue = document.querySelector(
    "#blogEditNewDescription"
  );
  headingDescriptionValue.textContent = listDetailValue.details;
}

function saveEditBlog(id1, id2, bIndex, blogItem) {
  // Get Input value for blogNewTitle //
  let title = getInputValue(id1);

  // Get Input value for blogNewDescription //
  let description = getInputValue(id2);

  let newBlogData;

  // set newBlogData //
  newBlogData = {
    title: title,
    details: description,
    type: blogItem.type,
    photo: blogItem.photo,
  };

  blogList[bIndex] = newBlogData;
  localStorage.setItem("blogs" , JSON.stringify(blogList))

  // Push to selected Index //
  let allBlogListItems = document.querySelectorAll(".blog-list-item");
  let thisIndex = allBlogListItems[bIndex];
  thisIndex.innerHTML = `
      <div class="blog-heading">${newBlogData.title}</div>
      <div class="blog-type text-primary text-sm">
      ${newBlogData.type.toUpperCase()}
      </div>
      <p class="blog-description text-truncate para-text">${
        newBlogData.details
      }</p>
    `;
  document.querySelector(".show-details").classList.remove("d-none");
  document.querySelector(".show-inputs").classList.add("d-none");

  blogEdit.classList.remove("d-none");
  blogUpdateCancel.classList.remove("d-block");
  blogUpdateSave.classList.remove("d-block");
  showBlogDetailsData(bIndex);
  isEditMode = false;
}

function showWarning() {
  console.log("warning called");
  let warningModal = document.querySelector("#warningModal");
  showModal(warningModal);
}

const searchBlogsList = function(event){
  const keyword = searchInput.value.toLowerCase();
  const  blogLists = document.querySelectorAll(".blog-list-item");
  if(blogLists) {
    blogLists.forEach(blog => {
      if (blog.innerHTML.toLowerCase().indexOf(keyword) > -1) {
        blog.style.display = "";
    } else {
        blog.style.display = "none";
    }
    })
  }
}


// Function setActiveClass
export function setActiveClass(currentIndex) {
  let activeBlog;
  if (currentIndex) {
    activeBlog = document.querySelectorAll(".blog-list-item")[currentIndex];
  } else {
    activeBlog = document.querySelectorAll(".blog-list-item")[0];
  }
  activeBlog.classList.add("active");
}

searchInput.addEventListener("keyup", searchBlogsList);

confirmCancelEditBtn.addEventListener("click", confirmCancel);

confirmEditBtn.addEventListener("click", confirmEdit);

function confirmCancel() {
  console.log("cancel called")
  isEditMode = false;
  getBlogDetails(false);
  hideModal(warningModal);
  toggleInputs(".show-details", ".show-inputs", "readMode");
  blogEdit.classList.remove("d-none");
  blogUpdateCancel.classList.remove("d-block");
  blogUpdateSave.classList.remove("d-block");
 
  console.log(isEditMode)
}

function confirmEdit() {
  hideModal(warningModal);
  isEditMode = true;
}

// Function createBlogData
createBlogData(blogList);

function toggleInputs(container1, container2, mode) {
  let c1 = document.querySelector(container1);
  let c2 = document.querySelector(container2);

  mode === "readMode"
    ? c1.classList.remove("d-none")
    : c1.classList.add("d-none");
  mode === "readMode"
    ? c2.classList.add("d-none")
    : c2.classList.remove("d-none");
}

function toggleButtons(mode) {
  mode === "readMode"
    ? blogEdit.classList.add("d-none")
    : blogEdit.classList.remove("d-none");
  mode === "readMode"
    ? blogUpdateCancel.classList.add("d-none")
    : blogUpdateCancel.classList.remove("d-none");
  mode === "readMode"
    ? blogUpdateSave.classList.add("d-none")
    : blogUpdateCancel.classList.remove("d-none");
}

showBlogDetailsData(0);
setActiveClass();




