import { fetchData } from "../main.js";
import {APP_CONSTANTS} from "../constants/constants.js"


const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG




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


function addBlogItem() {
    
}

