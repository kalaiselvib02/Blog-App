import { fetchData } from "../main.js";
import {APP_CONSTANTS} from "../constants/constants.js"


const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG


export async function createBlogData() {
const blogListWrapper = document.getElementById("blog-list-wrapper")
 let blogList = await fetchData(BLOG_URL);
 console.log(blogList)
 blogList.forEach(blogItem => {
    blogListWrapper.innerHTML += `
    <div class="blog-list-item">
        <div class="blog-heading">${blogItem.title}</div>
        <div class="blog-type text-primary text-sm">${blogItem.type.toUpperCase()}</div>
        <div class="blog-description text-truncate para-text">${blogItem.details}</div>
    </div>
`
 });
}

