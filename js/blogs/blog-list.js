import { fetchData , showModal} from "../main.js";
import {APP_CONSTANTS } from "../constants/constants.js"


const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;


export async function createBlogData() {

    const blogListWrapper = document.getElementById("blogListWrapper")
    let blogList = await fetchData(BLOG_URL);

     getBlogDetails(blogList , 0)

    const blogListFragment = document.createDocumentFragment();
   
    blogList.forEach((blogItem , index) => {

    const blogListItem = document.createElement("div");
    blogListItem.className = "blog-list-item"; 

    blogListItem.addEventListener("click", function () {
        setActiveBlog(blogList , index)
    }, false);

    const blogListHeading = document.createElement("div");
    blogListHeading.textContent= blogItem.title;
    blogListHeading.className = "blog-heading"


    const blogListType = document.createElement("div");
    blogListType.textContent = blogItem.type.toUpperCase()
    blogListType.className = "blog-type text-primary text-sm";

    const blogListDescription = document.createElement("p");
    blogListDescription.textContent = blogItem.details;
    blogListDescription.className = "blog-description text-truncate para-text";



    blogListItem.appendChild(blogListHeading);
    blogListItem.appendChild(blogListType);
    blogListItem.appendChild(blogListDescription)
    blogListFragment.appendChild(blogListItem)

    });

    blogListWrapper.appendChild(blogListFragment);

}

 function setActiveBlog (list , index) {
    const currentBlogItem = index
   getBlogDetails(list , currentBlogItem)
}



export function  getBlogDetails(list , currentBlogItem) {
     const blogDetailsWrapper = document.getElementById("blogDetailsWrapper");
     const blogListDetail = currentBlogItem > 0 ? list[currentBlogItem] : list[0]
     blogDetailsWrapper.innerHTML = `
        <img src=${blogListDetail.photo} class="blog-detail-img mb-1"></img>
        <h1 class="blog-detail-heading mb-1">${blogListDetail.title}</h1>
        <p class="blog-detail-description para-text">${blogListDetail.details}</p>
     `
    const blogEdit = document.createElement("button");
    blogEdit.className = "btn"
    blogEdit.textContent = APP_CONSTANTS.FORM_INPUTS.EDIT_BLOG_FORM.SUBMIT_BTN_TEXT

    blogDetailsWrapper.appendChild(blogEdit)
}

export function addNewBlog() {
   const blogFormTitle = APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.FORM_TITLE
    showModal();
    const modalHeader = document.querySelector(".modal-header h2")
    const modalBody = document.getElementById("modalBody");
    const modalFooter = document.getElementById("modalFooter");
    modalHeader.textContent = blogFormTitle;
    // modalBody.innerHTML = `
    // <form class="d-flex flex-column" id="a-form">
    //         <input type="text" value="r" class="blog-new-title border-0 outline-0" placeholder="Name your blog" id="blogNewTitle" ></input>
    //         <textarea rows="20" id="blogNewDescription" class="blog-new-description border-0 outline-0" placeholder="Write Content Here..."></textarea>
    // </form>
    // `
    
    const submitBlogBtn = document.createElement("button");
    submitBlogBtn.className = "btn btn-md btn-primary text-white";
    submitBlogBtn.setAttribute("type", "submit");
    submitBlogBtn.setAttribute("form" , "a-form")
    submitBlogBtn.textContent = APP_CONSTANTS.FORM_INPUTS.ADD_BLOG_FORM.SUBMIT_BTN_TEXT;

    modalFooter.append(submitBlogBtn);


    submitBlogBtn.addEventListener("submit" , submitBlog)

    const blogAddFragment = document.createDocumentFragment();
   
    const blogForm = document.createElement("form")

    const blogNewTitle = document.createElement("input");
    blogNewTitle.type = "text";
    blogNewTitle.value = "";
    blogNewTitle.className = "blog-new-title border-0 outline-0";
    blogNewTitle.id = "blogNewTitle"
    blogNewTitle.setAttribute("placeholder" , "Name your blog");

    blogNewTitle.addEventListener("change", function () {
        getInputValue("blogNewTitle")
    }, false);

    const blogNewDescription = document.createElement("textarea");
    blogNewDescription.value = "";
    blogNewDescription.className = "blog-new-description border-0 outline-0";
    blogNewDescription.setAttribute("placeholder" , "Write Content Here...");
    blogNewDescription.setAttribute("rows" , 20);
    blogNewDescription.id = "blogNewDescription";

    blogForm.appendChild(blogNewTitle);
    blogForm.appendChild(blogNewDescription)
    blogAddFragment.appendChild(blogForm)



    modalBody.appendChild(blogAddFragment);
    modalFooter.appendChild(submitBlogBtn)
   

}

function submitBlog() {
 
    const newBlogData = {
        
    }
    
   
}


const getInputValue = (val) => {
const inputValue = document.getElementById(val).value;
console.log(inputValue)
return inputValue
}




   



