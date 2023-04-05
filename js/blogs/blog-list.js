import {  showModal , hideModal} from "../main.js";
import { fetchData } from "../services/fetchApi.js";
import {APP_CONSTANTS } from "../constants/constants.js";
import { checkEmpty , checkLength} from "../helpers/helper.js";


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
let blogEdit;
let blogUpdateCancel;
let blogUpdateSave;

// Function createBlogData()

export  function createBlogData(list) {
    // Get blogListBody DOM element
    const blogListBody = document.getElementById("blogListBody");
    // Clear before appending
    blogListBody.innerHTML = "";


    let blogListItems = ''; 
    list.forEach((blogItem , index) => {
    blogListItems += `<div class="blog-list-item">
    <div class="blog-heading">${blogItem.title}</div>
    <div class="blog-type text-primary text-sm">
    ${blogItem.type.toUpperCase()}
    </div>
    <p class="blog-description text-truncate para-text">${blogItem.details}</p>
    </div>`;
    }); 

    blogListBody.innerHTML = blogListItems;

     // Function Call getBlogDetails //
    getBlogDetails(list , 0);
    // const blogListItem = document.querySelectorAll(".blog-list-item");
    // // Add Click Function listener
    // blogListItem.addEventListener("click", function () {
    //     setActiveBlog(list , index);   
    // }, false);


}
// Function setActiveBlog //
 function setActiveBlog (list , index) {
    const currentBlogItem = index;
    let blogListItem = document.querySelectorAll(".blog-list-item");

    blogListItem.forEach(function (item , key) {
        item.addEventListener(
        "click",
        function (e) {
            blogListItem.forEach(function (item) {
            item.classList.remove("active");
            });
            item.classList.add("active");
            console.log(e.target);
        },
        false
        );
    });
    // Function call getBlogDetails // 
   getBlogDetails(list , currentBlogItem);

}
// Function call getBlogDetails // 
export function  getBlogDetails(list , currentBlogItem) {
    isEditMode = false; 
    // Get blogDetailsWrapper DOM element
     const blogDetailsWrapper = document.getElementById("blogDetailsWrapper");
     // Get blogListDetail
     const blogListDetail = currentBlogItem > 0 ? list[currentBlogItem] : list[0]
      // Set blogDetailsWrapper
    if(!isEditMode){
        blogDetailsWrapper.innerHTML = `
        <form id="a-form">
            <img src=${blogListDetail.photo} class="blog-detail-img mb-1"></img>
            <h1 class="blog-detail-heading mb-1" id="blogNewTitles">${blogListDetail.title}</h1>
            <p class="blog-detail-description para-text" id="blogNewDescriptions">${blogListDetail.details}</p>
        </form>
        `
    }
    else {
        console.log("Closed")
    }
     // Create blogEdit DOM element
    const footerButtonsWrapper = document.createElement("div");
    footerButtonsWrapper.className = "blog-edit-actions";

    // Create blogEdit DOM element
    blogEdit = document.createElement("button");
    blogEdit.className = "btn btn-sm btn-secondary"
    blogEdit.textContent = APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SUBMIT_BTN_TEXT;

    // Function call editBlog
    blogEdit.addEventListener("click", editBlog);


     // Create buttonsWrapper DOM element
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.className = "d-flex";

    // Create blogUpdateCancel DOM element
    blogUpdateCancel = document.createElement("button");
    blogUpdateCancel.className = "btn btn-sm btn-secondary d-none mr-2"
    blogUpdateCancel.textContent = APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SAVE_FORM.CANCEL;

    blogUpdateCancel.addEventListener("click", cancelEdit);

    // Create blogUpdateSave DOM element
    blogUpdateSave = document.createElement("button");
    blogUpdateSave.className = "btn btn-sm btn-primary text-white d-none"
    blogUpdateSave.textContent = APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SAVE_FORM.SAVE;
    blogUpdateSave.setAttribute("type", "submit");
    blogUpdateSave.setAttribute("form" , "a-form");

    blogUpdateSave.addEventListener("click", function (event) {
        submitBlog(event , "blogNewTitless" , "blogNewDescriptionss");
    }, false);


    // Append Footer  Blog Buttons
    buttonsWrapper.appendChild(blogEdit);
    buttonsWrapper.appendChild(blogUpdateCancel);
    buttonsWrapper.appendChild(blogUpdateSave);
    footerButtonsWrapper.appendChild(buttonsWrapper)
    blogDetailsWrapper.appendChild(footerButtonsWrapper);

    // Function call editBlog
    function editBlog() {
        isEditMode = true;
        console.log("edit mode on")
        blogEdit.classList.add("d-none");
        blogUpdateCancel.classList.add("d-block");
        blogUpdateSave.classList.add("d-block");
       if(isEditMode) {
        showEditModeInputs()
       }
    }
    // Function call showEditModeInputs
    function showEditModeInputs() {
        blogDetailsWrapper.innerHTML = `
        <img src=${blogListDetail.photo} class="blog-detail-img mb-1"></img>
        <input type="text" class="blog-detail-heading mb-1 border-0 outline-0" id="blogNewTitless" value='${blogListDetail.title}'></input>
        <textarea class="blog-detail-description para-text border-0 outline-0 w-100" rows=20 id="blogNewDescriptionss">${blogListDetail.details}</textarea>
     `;
     blogDetailsWrapper.appendChild(footerButtonsWrapper)   
    }
  // Function call cancelEdit
  
   
}
 // Function call addNewBlog  
export function addNewBlog() {
   const blogFormTitle = APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.FORM_TITLE;
    showModal();
    
    const modal = document.getElementById("myModal");

    // Create  DOM element modalContent
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Create  DOM element modalHeader
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    
    // Create  DOM h2
    const h2 = document.createElement("h2");

    // Create  DOM element modalBody
    const modalBody = document.createElement("div");
    modalBody.id = "modal-body";
    modalBody.className = "modalBody";

    // Create  DOM element modalFooter
    const modalFooter = document.createElement("div");
    modalFooter.id = "modal-footer";
    modalFooter.className = "modalFooter";

    // Set Id and class for modal-footer
    modalFooter.id = "modal-footer";
    modalFooter.className = "modalFooter";
   
    h2.textContent = blogFormTitle;
    modalHeader.appendChild(h2);
   
    // Create  DOM element blogAddFragment
    const blogAddFragment = document.createDocumentFragment();

    // Create  DOM element blogForm
    const blogForm = document.createElement("form")
    blogForm.setAttribute("id" , "a-form")

    // Create blog title input
    createInputs(blogForm)

    // Create submit button
    const submitBlogBtn = document.createElement("button");
    submitBlogBtn.className = "btn btn-md btn-primary text-white";
    submitBlogBtn.setAttribute("id", "submitBlog");
    submitBlogBtn.setAttribute("type", "submit");
    submitBlogBtn.setAttribute("form" , "a-form")
    submitBlogBtn.textContent = APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.SUBMIT_BTN_TEXT;


    // Create submit button
    blogAddFragment.appendChild(blogForm)

    // Append modalHeader , modalBody , modalFooter
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // Create submit button
    modal.appendChild(modalContent);
    modalBody.appendChild(blogAddFragment);
    modalFooter.appendChild(submitBlogBtn);
   // Add click listener for submit btn
    document.getElementById("submitBlog").addEventListener("click", function (event) {
        submitBlog(event , "blogNewTitle" , "blogNewDescription");
    }, false);

}
const getInputValue = (val) => {
    console.log(val)
    const inputValue = document.getElementById(val).value;
    console.log(inputValue)
    return inputValue
}

const createInputs = (appendDiv) => {
    // appendDiv.innerHTML = `
    //         <form id="a-form">
    //             <div class="input-item">
    //                 <input type="text" class="blog-new-title border-0 outline-0" id="blogNewTitle" placeholder="Name your blog" />
    //             </div>
    //             <div class="input-item">
    //                 <textarea class="blog-new-description border-0 outline-0 w-100" placeholder="Write Content Here..." rows="20" id="blogNewDescription"></textarea>
    //             </div>
    //         </form>
    //     `
}

// Function call submitBlog // 
 function  submitBlog(event , id1 , id2) {
    let listArr = blogList;
    event.preventDefault()
    // Get Input value for blogNewTitle // 
    let title =  getInputValue(id1);

    // Get Input value for blogNewDescription // 
    let description =  getInputValue(id2);

    // Create newBlogData Object //
    let newBlogData = {
        title :  title,
        details : description,
        type: APP_CONSTANTS.LOCAL,
        photo:"https://dummyimage.com/16:9x1080/"
    }

    console.log({newBlogData})

    // Get Constants Value
    const titleValid = APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.REQUIRED.BLOG_TITLE.ERROR_MESSAGE;
    const descriptionValid = APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.REQUIRED.BLOG_DESCRIPTION.ERROR_MESSAGE;
    const titleMaxLength = APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.TITLE.LENGTH;
    const descriptionMaxLength = APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.DESCRIPTION.LENGTH;
    const titleLengthError = APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.TITLE.ERROR_MESSAGE;
    const descriptionLengthError = APP_CONSTANTS.FORM_INPUTS.VALIDATIONS.LENGTH.DESCRIPTION.ERROR_MESSAGE;

    // Check If Not Empty and valid character length
    let isValidTitleLength = checkLength(newBlogData.title , titleMaxLength);
    let isValidDescriptionLength = checkLength(newBlogData.details , descriptionMaxLength);
    let isValidTitle = checkEmpty(newBlogData.title);
    let isValidDescription = checkEmpty(newBlogData.details);

    // Check Condition and createErrorMessage
   if(!isValidTitle) createErrorMessage( inputItemTitle , titleValid , isValidTitle) ;
   if(!isValidDescription) createErrorMessage( inputItemDescription , descriptionValid , isValidDescription);
   if(isValidTitle && !isValidTitleLength) createErrorMessage(inputItemTitle , titleLengthError , isValidTitleLength)
   if(isValidDescription && !isValidDescriptionLength) createErrorMessage(inputItemDescription , descriptionLengthError , isValidDescriptionLength)

   
   // If Form is valid 
   if(isValidTitle && isValidDescription && isValidTitleLength && isValidDescriptionLength) {

        //  Function  call hideModall()
        hideModal()
        const modal = document.getElementById("myModal");
        // Empty Modal HTML on submit ()
        modal.innerHTML = ""
        // Push new data into blog list in first position// 
      
        listArr.unshift(newBlogData);
    
        blogList = listArr
        // Function createBlogData();
        createBlogData(blogList);
          setActiveClass();
        
   }

   function findBlog() {

   }
  
   cancelEdit();
   
    
}
// Function createErrorMessage
const createErrorMessage = (div , message , bool) => {
        const error = document.createElement("p");
        error.className="error d-block";
        error.textContent = message;    
        div.appendChild(error);   
} 

// Function setActiveClass
function setActiveClass() {
    const firstBlog = document.querySelector(".blog-list-item");
    firstBlog.classList.add("active")
}

// Function createBlogData
createBlogData(blogList);


// Function setActiveClass
setActiveClass()


function cancelEdit() {
    console.log("edit mode off")
    isEditMode = false;
    blogEdit.classList.remove("d-none");
    blogUpdateCancel.classList.remove("d-block");
    blogUpdateSave.classList.remove("d-block");
}


   

   

