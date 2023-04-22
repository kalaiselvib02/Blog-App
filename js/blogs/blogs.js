import { showModal, hideModal } from "../main.js";
import { fetchData } from "../services/fetchApi.js";
import { APP_CONSTANTS } from "../constants/constants.js";
import { checkEmpty, checkLength } from "../helpers/helper.js";

// BLOG URL
const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;

// BLOG LIST

let activeIndex = 0;

// PRIVATE VARIABLES

let isEditMode = false;
let blogListDetail;
let setBlogIndex;
let setBlogDetail;

// Dom Selections
const addModal = document.querySelector("#myModal");
const blogEdit = document.getElementById("editBlogBtn");
const searchInput = document.getElementById("searchBlogs");
const blogListBody = document.getElementById("blogListBody");
const blogUpdateCancel = document.getElementById("cancelBlogEdit");
const blogUpdateSave = document.getElementById("saveBlogEdit");
const addBlogForm = document.getElementById("add-form");
const confirmCancelEditBtn = document.querySelector("#confirmCancelEdit");
const confirmEditBtn = document.querySelector("#confirmEdit");
const submitBlogBtn = document.getElementById("submitBlogBtn");

// Constants values

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

let blogList;
if (window.localStorage.getItem("blogs")) {
  blogList = JSON.parse(localStorage.getItem("blogs"));
  createBlogData(blogList);

} 
else {
  window.localStorage.setItem(
    "blogs",
    JSON.stringify(await fetchData(BLOG_URL))
  );
  createBlogData(blogList);
}

// Function createBlogData()

export function createBlogData(list, isMode) {
  // Clear before appending
  let blogListItems = "";
  //
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

  getBlogDetails(false);
}

function getBlogDetails(mode) {
  let allBlogListItems = document.querySelectorAll(".blog-list-item");

  if (allBlogListItems) {
    allBlogListItems.forEach(function (listItem) {
      listItem.addEventListener("click", () => {
        if (isEditMode) {
          showWarning();
        }
        allBlogListItems.forEach(function (listItem) {
          listItem.classList.remove("active");
        });
        listItem.classList.add("active");
        let dIndex = listItem.getAttribute("data-index");
        showBlogDetailsData(dIndex);
      });
    });
  }
}

// showBlogDetailsData(0)
function showBlogDetailsData(bIndex) {
  let blogListDetail = bIndex ? blogList[bIndex] : blogList[0];
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

  // Function editBlog //
  blogEdit.addEventListener(
    "click",
    function () {
      editBlog(blogListDetail);
    },
    false
  );
}

// Funcrion saveEditBlog //
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
// Function getInputValue //
const getInputValue = (val) => {
  let inputValue = document.getElementById(val).value;
  return inputValue;
};

// Function call addNewBlog
export function addNewBlog() {
  const addModal = document.querySelector("#myModal");
  showModal(addModal);

  validateForm("#add-form .form-input", submitBlogBtn);
}
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

// Function call submitBlog //
function submitBlog(event, id1, id2, isMode) {
  let allBlogListLength = blogList.length;
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

  let newBlogElement = document.createElement("div");
  newBlogElement.setAttribute("data-index", allBlogListLength++);
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
  blogList.push(newBlogData);
  getBlogDetails();
  let newIndex = newBlogElement.getAttribute("data-index");
  showBlogDetailsData(newIndex);
  setActiveClass(setBlogIndex);
  window.localStorage.setItem("blogs", JSON.stringify(blogList));

  addBlogForm.reset();
  isMode = true;
  hideModal(addModal);
}

window.onclick = function (event) {
  let currentModal = document.querySelector(".modal.active");
  if (event.target == currentModal) {
    currentModal.style.display = "none";
    currentModal.classList.remove("active");
  }
};

function validateForm(inpList, saveBtn) {
  let inputList = document.querySelectorAll(inpList + " " + ".blog-input");


  for (let i = 0; i < inputList.length; i++) {
    let nameVal = inputList[i].name;
    let ch;

    inputList[i].addEventListener("change", function (e) {
      ch = handleMouseChange(e, inpList, nameVal);
      ch
        ? saveBtn.setAttribute("isDisabled", false)
        : saveBtn.setAttribute("isDisabled", true);
    });
  }
}

function handleMouseChange(event, inpList, nameVal) {
  let result;
  result = handleChange(event, inpList, nameVal);

  return result;
}

function handleChange(evt, iList, nv) {
  let checkValids;
  let val = evt.target.value;
  let isRequired = checkEmpty(val);
  let isValidLength = checkLength(val, maxLengthObj.rules[nv].maxLength);
  let ifErrorPresent = document.querySelector(iList + " " + ".error");
  let parentSelectorValue = document.querySelector(iList + "." + nv);

  if (!isRequired) {
    if (!ifErrorPresent) {
      generateErrorElement(
        "p",
        "error",
        formValueObj.messages[nv].required,
        parentSelectorValue
      );
    }
    checkValids = false;
  } else {
    if (!isValidLength) {
      if (!ifErrorPresent) {
        generateErrorElement(
          "p",
          "error",
          formValueObj.messages[nv].maxLength,
          parentSelectorValue
        );
        checkValids = false;
      }
    } else {
      if (ifErrorPresent) {
        ifErrorPresent.remove();
      }
      checkValids = true;
    }
  }
  return checkValids;
}
let formValueObj = {
  messages: {
    blogNewTitle: {
      required: titleValid,
      maxLength: titleLengthError,
    },
    blogNewDescription: {
      required: descriptionValid,
      maxLength: descriptionLengthError,
    },
  },
};

let maxLengthObj = {
  rules: {
    blogNewTitle: {
      maxLength: titleMaxLength,
    },
    blogNewDescription: {
      maxLength: descriptionMaxLength,
    },
  },
};

function generateErrorElement(tag, cls, val, selector) {
  let error = document.createElement(tag);
  error.className = cls;
  error.textContent = val;
  selector.appendChild(error);
}

// Function call editBlog
function editBlog(blogListDetail) {
  isEditMode = true;

  if (isEditMode) {
    validateForm("#blogEditDetailsWrapper ", blogUpdateSave);
  }

  // Function getBlogDetails()
  getBlogDetails(true);
  // Toggle Buttons //
  blogEdit.classList.add("d-none");
  blogUpdateCancel.classList.add("d-block");
  blogUpdateSave.classList.add("d-block");

  // Function call showEditModeInputs
  showEditModeInputs(blogListDetail);
}

// Function call showEditModeInputs
function showEditModeInputs(listDetailValue) {
  // Toggle details and inputs  //
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

  // set new blog data  //
  newBlogData = {
    title: title,
    details: description,
    type: blogItem.type,
    photo: blogItem.photo,
  };

  blogList[bIndex] = newBlogData;
  window.localStorage.setItem("blogs", JSON.stringify(blogList));
  let newIndex = bIndex.toString();
  let updatedBlogItem = document.querySelector(
    '[data-index = "' + newIndex + '"]'
  );
  updatedBlogItem.innerHTML = `
  <div class="blog-heading">${newBlogData.title}</div>
  <div class="blog-type text-primary text-sm">
  ${newBlogData.type.toUpperCase()}
  </div>
  <p class="blog-description text-truncate para-text">${newBlogData.details}</p>
  `;

  cancelEdit(blogItem);
  getBlogDetails(bIndex);
  setActiveClass(bIndex);
}
// Show blog popup
function showWarning() {
  let warningModal = document.querySelector("#warningModal");
  showModal(warningModal);
}
// Function searchBlogsList()
const searchBlogsList = function (event) {
  // Function searchBlogsList()
  const keyword = searchInput.value.toLowerCase();
  // select blog list items
  const blogLists = document.querySelectorAll(".blog-list-item");

  if (blogLists) {
    blogLists.forEach((blog) => {
      if (blog.innerHTML.toLowerCase().indexOf(keyword) > -1) {
        blog.style.display = "";
      } else {
        blog.style.display = "none";
      }
    });
  }
};

// Function setActiveClass
export function setActiveClass(currentIndex) {
  let allBlogListItems = document.querySelectorAll(".blog-list-item");

  let blogArray = Array.from(allBlogListItems);

  let findBlog = blogArray.find(
    (blog) => blog.getAttribute("data-index") == currentIndex
  );

  removeClass(allBlogListItems);

  findBlog.classList.add("active");
}
// Invoke search function
searchInput.addEventListener("keyup", searchBlogsList);

confirmCancelEditBtn.addEventListener("click", confirmCancel);

confirmEditBtn.addEventListener("click", confirmEdit);
// Function confirmCancel //
function confirmCancel() {
  isEditMode = false;
  // getBlogDetails
  getBlogDetails(false);
  hideModal(warningModal);
  toggleInputs(".show-details", ".show-inputs", "readMode");
  // Toggle inputs
  blogEdit.classList.remove("d-none");
  blogUpdateCancel.classList.remove("d-block");
  blogUpdateSave.classList.remove("d-block");
}

function confirmEdit() {
  hideModal(warningModal);
  isEditMode = true;
}

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

showBlogDetailsData();
setActiveClass(0);

// Function setActiveBlog
export function setActiveBlog(ind) {
  let activeBlog;
  if (ind) {
    activeBlog = document.querySelectorAll(".blog-list-item")[ind];
    activeBlog.classList.add("active");
  }
}

function removeClass(items) {
  items.forEach(function (listItem) {
    listItem.classList.remove("active");
  });
}
