import {  showModal , hideModal} from "../main.js";
import { fetchData } from "../services/fetchApi.js";
import {APP_CONSTANTS } from "../constants/constants.js"


const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;
let data = []
let blogList




export async function createBlogData(data) {

    // Get blogListWrapper DOM element
    const blogListWrapper = document.getElementById("blogListWrapper");

    if(data) {
        blogList = data;
    }
    else{
        blogList = await fetchData(BLOG_URL);
    }
     // Function Call getBlogDetails //

    getBlogDetails(blogList , 0);
    // Create  DOM element blogListFragment
    const blogListFragment = document.createDocumentFragment();
    // Loop through fetched list
    blogList.forEach((blogItem , index) => {

    // Create  DOM element blogListItem
    const blogListItem = document.createElement("div");
    blogListItem.className = "blog-list-item"; 

    
    // Add Click Function listener
    blogListItem.addEventListener("click", function () {
        setActiveBlog(blogList , index)
    }, false);

    // Create  DOM element blogListHeading
    const blogListHeading = document.createElement("div");
    blogListHeading.textContent= blogItem.title;
    blogListHeading.className = "blog-heading"


    // Create  DOM element blogListType
    const blogListType = document.createElement("div");
    blogListType.textContent = blogItem.type.toUpperCase()
    blogListType.className = "blog-type text-primary text-sm";

    // Create  DOM element blogListDescription
    const blogListDescription = document.createElement("p");
    blogListDescription.textContent = blogItem.details;
    blogListDescription.className = "blog-description text-truncate para-text";


    // append blogListHeading , blogListType , blogListDescription , blogListItem
    blogListItem.appendChild(blogListHeading);
    blogListItem.appendChild(blogListType);
    blogListItem.appendChild(blogListDescription)
    blogListFragment.appendChild(blogListItem)

    });

    blogListWrapper.appendChild(blogListFragment);

}

// Function setActiveBlog //
 function setActiveBlog (list , index) {
    const currentBlogItem = index
    // Function call getBlogDetails // 
   getBlogDetails(list , currentBlogItem)
}


// Function call getBlogDetails // 
export function  getBlogDetails(list , currentBlogItem) {
    // Get blogDetailsWrapper DOM element
     const blogDetailsWrapper = document.getElementById("blogDetailsWrapper");
     // Get blogListDetail
     const blogListDetail = currentBlogItem > 0 ? list[currentBlogItem] : list[0]
      // Set blogDetailsWrapper
     blogDetailsWrapper.innerHTML = `
        <img src=${blogListDetail.photo} class="blog-detail-img mb-1"></img>
        <h1 class="blog-detail-heading mb-1">${blogListDetail.title}</h1>
        <p class="blog-detail-description para-text">${blogListDetail.details}</p>
     `
     // Create blogEdit DOM element
    const blogEdit = document.createElement("button");
    blogEdit.className = "btn"
    blogEdit.textContent = APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SUBMIT_BTN_TEXT

    blogDetailsWrapper.appendChild(blogEdit)
}


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
    const blogNewTitle = document.createElement("input");
    blogNewTitle.type = "text";
    blogNewTitle.value = "";
    blogNewTitle.className = "blog-new-title border-0 outline-0";
    blogNewTitle.id = "blogNewTitle"
    blogNewTitle.setAttribute("placeholder" , "Name your blog");

    // Create blog description input
    const blogNewDescription = document.createElement("textarea");
    blogNewDescription.value = "";
    blogNewDescription.className = "blog-new-description border-0 outline-0";
    blogNewDescription.setAttribute("placeholder" , "Write Content Here...");
    blogNewDescription.setAttribute("rows" , 20);
    blogNewDescription.id = "blogNewDescription";

    // Create submit button
    const submitBlogBtn = document.createElement("button");
    submitBlogBtn.className = "btn btn-md btn-primary text-white";
    submitBlogBtn.setAttribute("id", "submitBlog");
    submitBlogBtn.setAttribute("type", "submit");
    submitBlogBtn.setAttribute("form" , "a-form")
    submitBlogBtn.textContent = APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.SUBMIT_BTN_TEXT;


    // Create submit button
    blogForm.appendChild(blogNewTitle);
    blogForm.appendChild(blogNewDescription)
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
    document.getElementById("submitBlog").addEventListener("click" , submitBlog)

}

const getInputValue = (val) => {
    const inputValue = document.getElementById(val).value;
    return inputValue
}
// Function call submitBlog // 
async function  submitBlog(event) {
    event.preventDefault()
    // Get Input value for blogNewTitle // 
    let title =  getInputValue("blogNewTitle");

    // Get Input value for blogNewDescription // 
    let description =  getInputValue("blogNewDescription");

    // Create newBlogData Object //
    let newBlogData = {
        title :  title,
        details : description,
        type:"National",
        photo:""
    }
    // Function  call hideModall()
    hideModal()
    const modal = document.getElementById("myModal");
     // Empty Modal HTML on submit ()
    modal.innerHTML = ""
      // Push new data into blog list // 
    blogList.push(newBlogData);
    // Function createBlogData();
    createBlogData(blogList)

    
}







   



