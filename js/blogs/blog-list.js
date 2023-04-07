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
  blogListBody.innerHTML = "";
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

  // // Function Call getBlogDetails //
  // getBlogDetails(list , 0);
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

// Function setActiveBlog //
function setActiveBlog(list, index) {
  currentBlogItem = index;
  let blogListItem = document.querySelectorAll(".blog-list-item");

  blogListItem.forEach(function (item, key) {
    item.addEventListener(
      "click",
      function (e) {
        blogListItem.forEach(function (item) {
          cancelEdit(blogListDetail);
          item.classList.remove("active");
        });
        item.classList.add("active");
      },
      false
    );
  });

  // Function call getBlogDetails //

  getBlogDetails(list, currentBlogItem);
}

// Function call getBlogDetails //
export function getBlogDetails(list, blogIndex) {
  currentIndex = blogIndex;
  isEditMode = false;
  // Get blogDetailsWrapper DOM element
  // Get blogListDetail
  blogListDetail = blogIndex > 0 ? list[blogIndex] : list[0];

  // Set blogDetailsWrapper
  if (!isEditMode) {
    showBlogDetailsData(blogListDetail);
  }
  // Create blogEdit DOM element

  blogEdit.textContent =
    APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SUBMIT_BTN_TEXT;

  // Function call editBlog
  blogEdit.addEventListener("click", editBlog);

  blogUpdateCancel.textContent =
    APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SAVE_FORM.CANCEL;

  blogUpdateCancel.addEventListener(
    "click",
    function () {
      isEditMode = true;
      cancelEdit(blogListDetail);
    },
    false
  );

  blogUpdateSave.textContent =
    APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SAVE_FORM.SAVE;

  blogUpdateSave.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      isEditMode = true;
      if (isEditMode) {
        saveEditBlog(
          "blogEditNewTitle",
          "blogEditNewDescription",
          currentIndex,
          blogListDetail,
          isEditMode
        );
      }
    },
    false
  );
}

// Function showBlogDetailsData
function showBlogDetailsData(val) {
  blogDetailsWrapper.innerHTML = `
        <img src=${val.photo} class="blog-detail-img mb-1"></img>
        <h1 class="blog-detail-heading mb-1" id="blogNewTitles">${val.title}</h1>
        <p class="blog-detail-description para-text" id="blogNewDescriptions">${val.details}</p>
    `;
  // Select present blog image
  let blogImage = document.querySelector(".blog-detail-img");
   // Select fall back image
  blogImage.setAttribute(
    "onerror",
    "this.onerror=null;this.src='https://dummyimage.com/16:9x1080/';"
  );
}

// Function cancelEdit
function cancelEdit(blogListDetail) {
  isEditMode = false;
  showBlogDetailsData(blogListDetail);
  blogEdit.classList.remove("d-none");
  blogUpdateCancel.classList.remove("d-block");
  blogUpdateSave.classList.remove("d-block");
}

// Function call editBlog
function editBlog() {

  blogEdit.classList.add("d-none");
  blogUpdateCancel.classList.add("d-block");
  blogUpdateSave.classList.add("d-block");

  // Function call showEditModeInputs
  showEditModeInputs();

  let blogListItemList = document.querySelectorAll(".blog-list-item");
  // Add Click Function listener
  blogListItemList.forEach(function (item, key) {
    item.addEventListener(
      "click",
      function (e) {
        //  setActiveBlog(list , key);

        showWarning();
      },
      false
    );
  });
}

// Function call showEditModeInputs
function showEditModeInputs() {
  blogDetailsWrapper.innerHTML = `
    <img src=${blogListDetail.photo} class="blog-detail-img mb-1"></img>
    <input type="text" class="blog-detail-heading mb-1 border-0 outline-0" id="blogEditNewTitle" value='${blogListDetail.title}'></input>
    <p class="error" id="emptyTitleError"></p>
    <p class="error" id="validTitleError"></p>
    <textarea class="blog-detail-description para-text border-0 outline-0 w-100" id="blogEditNewDescription">${blogListDetail.details}</textarea>
    <p class="error" id="emptyDescriptionError"></p>
    <p class="error" id="validDescriptionError"></p>
    `;
}

const getInputValue = (val) => {
  let inputValue = document.getElementById(val).value;
  return inputValue;
};
// Function call submitBlog //
function saveEditBlog(id1, id2, bIndex, blogItem, isMode) {
  let listArr = blogList;
  console.log(isMode)
  if (isMode) {
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
    // Function call validateForm()
    let isValidEditForm = validateForm(newBlogData.title, newBlogData.details);

    if (isValidEditForm) {
      // Push to selected Index // 
      listArr[bIndex] = newBlogData;
      cancelEdit(blogItem);
      blogList = listArr;

      createBlogData(blogList, isMode);
      getBlogDetails(blogList, bIndex);
      setActiveClass(bIndex);
      isMode = false;
    }
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
  console.log(isMode)
  event.preventDefault();
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
  if(!isMode) { isValidForm = validateForm(newBlogData.title, newBlogData.details)};

  if (isValidForm) {
    hideModal(addModal);
    // Push to beginning of list 
    listArr.unshift(newBlogData);

    blogList = listArr;
    // Function createBlogData();

    createBlogData(blogList);
    getBlogDetails(blogList);
    setActiveClass();
  }
}
window.onclick = function(event) {
  let currentModal = document.querySelector(".modal.active")
  if (event.target == currentModal) {
    currentModal.style.display = "none";
    currentModal.classList.remove("active")
  }
};

function showWarning() {
  let warningModal = document.querySelector("#warningModal");
  showModal(warningModal);
}

function validateForm(titleVal, descriptionVal) {
  // Get Constants Value
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
    if (!isValidTitle) {
      setError(errorObj.empty.title);
    } else {
      removeError(errorObj.empty.title);
    }
    if (!isValidDescription) {
      setError(errorObj.empty.description);
    } else {
      removeError(errorObj.empty.description);
    }
    if (isValidTitle && !isValidTitleLength) {
      setError(errorObj.validation.title);
    } else {
      removeError(errorObj.validation.title);
    }
    if (isValidDescription && !isValidDescriptionLength) {
      setError(errorObj.validation.description);
    } else {
      removeError(errorObj.validation.description);
    }
    isValid = false;
  }

  function setError(errorDetail) {
    document.querySelector(errorDetail.selector).textContent =
      errorDetail.message;
  }
  function removeError(errorDetail) {
    document.querySelector(errorDetail.selector).textContent = "";
  }

  return isValid;
}

// Cancel Btn in blog popup // 
 let confirmCancelEditBtn =  document.getElementById("confirmCancelEdit");
 confirmCancelEditBtn.addEventListener("click" , confirmCancelEdit)

function confirmCancelEdit() {
let thisModal = document.querySelector(".modal.active");
hideModal(thisModal);
setActiveBlog()
}

// Function createBlogData
createBlogData(blogList);
getBlogDetails(blogList, 0);
setActiveClass();
