import { showModal, hideModal , filterData} from "../main.js";
import { fetchData } from "../services/fetchApi.js";
import { APP_CONSTANTS } from "../constants/constants.js";
import { checkEmpty, checkLength } from "../helpers/helper.js";

// BLOG URL
const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;

// BLOG LIST


// PRIVATE VARIABLES

let isEditMode = false;
let blogListDetail;
let setBlogIndex;
let setBlogDetail;
let blogList;


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

submitBlogBtn.textContent =
  APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.SUBMIT_BTN_TEXT;

if (window.localStorage.getItem("blogs")) {
  blogList = JSON.parse(localStorage.getItem("blogs"));
  createBlogData(blogList);
} 
else {
   blogList = await fetchData(BLOG_URL)
    window.localStorage.setItem(
    "blogs",
    JSON.stringify(blogList)
  );
}

createBlogData(blogList);
// Function createBlogData()

export function createBlogData(list) {
  // Clear before appending
  let blogListItems = "";
  // Create list item for each data from api
  list.forEach((blogItem, index) => {
    blogListItems += `<div class="blog-list-item" data-index=${index}>
    <div class="blog-heading">${blogItem.title}</div>
    <div class="blog-type text-primary text-sm">
    ${blogItem.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${blogItem.details}</p>
    </div>`;
  });
  // set inner html blogListItems
  blogListBody.innerHTML = blogListItems;

  let noData = document.createElement("p");
  noData.className = "d-none no-data";
  noData.textContent = "Sorry , No Data Found";

  blogListBody.appendChild(noData)
  //  getBlogDetails
  getBlogDetails(false);
}

// function getBlogDetails()
function getBlogDetails(mode) {
  let allBlogListItems = document.querySelectorAll(".blog-list-item");

  if (allBlogListItems) {
    allBlogListItems.forEach(function (listItem) {
      listItem.addEventListener("click", () => {
        if (isEditMode) {
          showWarning();
        }
        else {
          allBlogListItems.forEach(function (listItem) {
            listItem.classList.remove("active");
          });
          listItem.classList.add("active");
          let dIndex = listItem.getAttribute("data-index");
          showBlogDetailsData(dIndex);
        }
      });
    });
  }
}

// function showBlogDetailsData()
export function showBlogDetailsData(bIndex) {

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

  // event listener for edit button  //
  blogEdit.addEventListener(
    "click",
    function () {
      editBlog(blogListDetail);
    },
    false
  );
}

// event listener for saveEditBlog //
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

// event listener for cancelEdit //
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

// Function call addNewBlog //
export function addNewBlog() {
  const addModal = document.querySelector("#myModal");
  showModal(addModal);
  submitBlogBtn.setAttribute("disabled" , true)
  validateForm("#add-form .form-input", submitBlogBtn);

}

// Add click listener for submit btn
submitBlogBtn.addEventListener(
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
  // initialise new item as newBlogData //
  let newBlogData;
  // set values from input elements for newBlogData //
  newBlogData = {
    title: title,
    details: description,
    type: APP_CONSTANTS.LOCAL,
    photo: "https://dummyimage.com/16:9x1080/",
  };
  // Create new newBlogElement node //
  let newBlogElement = document.createElement("div");
  // set attribute for newBlogElement //
  newBlogElement.setAttribute("data-index", allBlogListLength++);
  // set class name for new blog element //
  newBlogElement.className = "blog-list-item";
  // create new blog element //
  newBlogElement.innerHTML = `
    <div class="blog-heading">${newBlogData.title}</div>
    <div class="blog-type text-primary text-sm">
    ${newBlogData.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${
      newBlogData.details
    }</p>
    `;
  // Add to first in the dom list //
  blogListBody.prepend(newBlogElement);
  // Push to blogList array //
  blogList.push(newBlogData);
  // Check if local checkbox is already present 
  let isLocalPresent = document.querySelector(".blog-filter-type[value='Local']");
  // create local filter type
   if(!isLocalPresent) addLocalFilter()
  // Function  getBlogDetails //
  getBlogDetails();
  // get index of this element from data-index attribute //
  let newIndex = newBlogElement.getAttribute("data-index");
  // Function  showBlogDetailsData //
  showBlogDetailsData(newIndex);
  // Function  setActiveClass //
  setActiveClass(setBlogIndex);
  // update local storage with new bloglist  //
  window.localStorage.setItem("blogs", JSON.stringify(blogList));
  // reset values of form //
  addBlogForm.reset();
  isMode = true;
  // hide modal //
  hideModal(addModal);
}

// Close modal when clicked outside //
document.body.onclick = function (event) {
  let currentModal = document.querySelector(".modal.active");
  let isForm = currentModal.querySelector("form") ? currentModal.querySelector("form") : "";
 
  if (event.target == currentModal) {
    currentModal.style.display = "none";
    currentModal.classList.remove("active");
    if(currentModal && isForm) {
    isForm.reset()
    }
  }
};

function addLocalFilter() {
  const filterBody = document.querySelector(".filter-body");
  let newFilterType = document.createElement("div");
  newFilterType.className = "filter-list-items"
  newFilterType.innerHTML = `<div class="input-item flex-center-align mb-1"><input type="checkbox" class="blog-filter-type" checked="true" value="Local"><label for="Local">Local Blogs</label></div>`
  filterBody.prepend(newFilterType)
}

// Close modal when clicked outside //
function validateForm(inpList, btn) {
  // Get all inputs
  let inputList = document.querySelectorAll(inpList + " " + ".blog-input");

  for (let i = 0; i < inputList.length; i++) {
    // Get name value of input
    let nameVal = inputList[i].name;
    let ch;
    inputList[i].addEventListener("change", function (e) {
      ch = handleMouseChange(e, inpList, nameVal , btn);
    });
    
  }
}
// Function  handleMouseChange when input changes //
function handleMouseChange(event, inpList, nameVal , btn) {
  let result;
  // return value from handlechange function //
  result = handleChange(event, inpList, nameVal , btn);
  result
        ? btn.removeAttribute("disabled", false)
        : btn.setAttribute("disabled", true);
  return result;
}
// Function handleChange //
function handleChange(evt, iList, nv) {
  let checkValids;
  let val = evt.target.value;
  // Check empty value
  let isRequired = checkEmpty(val);
  // Check isValidLength
  let isValidLength = checkLength(val, maxLengthObj.rules[nv].maxLength);
  // Check ifErrorPresent
  let ifErrorPresent = document.querySelector(iList + " " + ".error");
  // Check parentSelectorValue
  let parentSelectorValue = document.querySelector(iList + "." + nv);

  if (!isRequired) {
    if (!ifErrorPresent) {
      // Function generateErrorElement() //
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
        // Function generateErrorElement() //
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
// Set formValueObj for messages from constant //
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
// Set maxLengthObj for messages from constant //
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

// Close modal when clicked outside //
function generateErrorElement(tag, cls, val, selector) {
  // create error element //
  let error = document.createElement(tag);
  // set class name //
  error.className = cls;
  // set text content for error  //
  error.textContent = val;
  // append child to parent //
  selector.appendChild(error);
}
// Function call editBlog
function editBlog(blogListDetail) {
  isEditMode = true;
  // Function validate form ()
  if (isEditMode) {
    blogUpdateSave.setAttribute("disabled" , true)
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
  // Function call toggleInputs
  toggleInputs(".show-details", ".show-inputs", "editMode");

  // select blog edit image //
  let blogEditImage = document.querySelector(".show-inputs img");
  // set attribute value from object //
  blogEditImage.setAttribute("src", listDetailValue.photo);
  // setAttribute for fallback image //
  blogEditImage.setAttribute(
    "onerror",
    "this.onerror=null;this.src='https://dummyimage.com/16:9x1080/';"
  );
  // select heading input value //
  let headingInputValue = document.querySelector("#blogEditNewTitle");
  // set heading value from object //
  headingInputValue.value = listDetailValue.title;
  // set description value from object //
  let headingDescriptionValue = document.querySelector(
    "#blogEditNewDescription"
  );
  // set text content for description from object //
  headingDescriptionValue.value = listDetailValue.details;
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

  // set newBlogData and replace in current index of blogList array //
  blogList[bIndex] = newBlogData;
  // update local storage when edited  //
  window.localStorage.setItem("blogs", JSON.stringify(blogList));
  // set new blog data  //

  let newIndex = bIndex.toString();
   // select updatedBlogItem  //
  let updatedBlogItem = document.querySelector(
    '[data-index = "' + newIndex + '"]'
  );
  // update updatedBlogItem  innerhtml  //
  updatedBlogItem.innerHTML = `
  <div class="blog-heading">${newBlogData.title}</div>
  <div class="blog-type text-primary text-sm">
  ${newBlogData.type.toUpperCase()}
  </div>
  <p class="blog-description text-truncate para-text">${newBlogData.details}</p>
  `;
 // function cancelEdit
  cancelEdit(blogItem);
   // function getBlogDetails //
  getBlogDetails(bIndex);
   // function setActiveClass //
  setActiveClass(bIndex);
}
// Show blog popup
function showWarning() {
  // query select dom element
  let warningModal = document.querySelector("#warningModal");
  // function call showModal
  showModal(warningModal);
}

// Function searchBlogsList()
const searchBlogsList = function (event) {
  // get input value from seacrh field
  const keyword = searchInput.value.toLowerCase();
  // select blog list items
  const blogLists = document.querySelectorAll(".blog-list-item");
  removeClass(blogLists);
    if (blogLists) {
        blogLists.forEach((blog) => {
            if (blog.innerHTML.toLowerCase().indexOf(keyword) > -1) {
              blog.classList.remove("d-none");
              blog.classList.add("searched-item");
            } else {
              blog.classList.add("d-none");
              blog.classList.remove("searched-item");
            }
        });
    }      
    getSearchedItems();
};
// function to add active class to searched list first item
function getSearchedItems() {
  let searchedItems = document.querySelectorAll(".searched-item");
  searchedItems[0].classList.add("active");
  let searchedItemIndex = searchedItems[0].getAttribute("data-index");
  showBlogDetailsData(searchedItemIndex)
  }

// Function setActiveClass
export function setActiveClass(currentIndex) {
  // get all blog elements
  let allBlogListItems = document.querySelectorAll(".blog-list-item");
  // convert node list to array
  let blogArray = Array.from(allBlogListItems);
  // find blog based on index
  let findBlog = blogArray.find(
    (blog) => blog.getAttribute("data-index") == currentIndex
  );
  // Function removeClass()
  removeClass(allBlogListItems);
  // add active class
  findBlog.classList.add("active");
}
;
// add event listener for search input element
searchInput.addEventListener("keyup", searchBlogsList);
// searchInput.addEventListener("keyup", test);
// add event listener for cancel button on blog popup element
confirmCancelEditBtn.addEventListener("click", confirmCancel);
// add event listener for confirm button on blog popup element
confirmEditBtn.addEventListener("click", confirmEdit);

// Function confirmCancel //
function confirmCancel() {
  isEditMode = false;
  // getBlogDetails
  getBlogDetails(false);
  // hideModal
  hideModal(warningModal);
  // toggleInputs
  toggleInputs(".show-details", ".show-inputs", "readMode");
  // Toggle buttons
  blogEdit.classList.remove("d-none");
  blogUpdateCancel.classList.remove("d-block");
  blogUpdateSave.classList.remove("d-block");
}
// Function confirmEdit
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
// Function showBlogDetailsData
showBlogDetailsData(0);
// Function setActiveClass
setActiveClass(0);

// Function setActiveBlog
export function setActiveBlog(ind) {
  let activeBlog;
  if (ind) {
    activeBlog = document.querySelectorAll(".blog-list-item")[ind];
    activeBlog.classList.add("active");
  }
}
// Function removeClass
export function removeClass(items) {
  items.forEach(function (listItem) {
    listItem.classList.remove("active");
  });
}

