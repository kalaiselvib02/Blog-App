import { APP_CONSTANTS } from "./constants/constants.js";
import {
  createBlogData,
  addNewBlog,
 removeClass
} from "./blogs/blogs.js";
import { viewMembers } from "./services/viewMembers.js";
import { fetchData } from "./services/fetchApi.js";

const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;
let blogList;

if (window.localStorage.getItem("blogs")) {
  blogList = JSON.parse(localStorage.getItem("blogs"));
} 
else {
   blogList = await fetchData(BLOG_URL)
    window.localStorage.setItem(
    "blogs",
    JSON.stringify(blogList)
  );
}

document.getElementById("addBtn").addEventListener(
  "click",
  function (e) {
    addNewBlog();
  },
  false
);

document
  .querySelector("#viewMembers button")
  .addEventListener("click", viewMembers);

// Get Filter Option Types from Api
export const filterData = () => {
  let data = blogList;
  let filteredArr = [];
  data.map((x) => filteredArr.push(x.type));
  filteredArr = [...new Set(filteredArr)];
  filteredArr = filteredArr.reverse()
  return filteredArr;
};
// Create List From Option Types from Api
const createFilterList = () => {
  let filterListItems = filterData(BLOG_URL);
  const filterBody = document.querySelector(".filter-body");
  filterListItems.forEach((item) => {
    // Dom Selector
    const filterList = document.getElementById("filterList");

    // Create Element DOM - div
    const filterInputItem = document.createElement("div");
    filterInputItem.className = "input-item flex-center-align mb-1";

    // Create Element DOM - input
    const filterInput = document.createElement("input");
    filterInput.setAttribute("type", "checkbox");
    filterInput.className = "blog-filter-type";
    filterInput.setAttribute("checked", true);
    filterInput.value = item;

    // Create Element DOM - label
    const filterLabel = document.createElement("label");
    filterLabel.textContent = item + " Blogs";
    filterLabel.setAttribute("for", item);

    // Append Child filterInput , filterLabel , filterInputItem
    filterInputItem.appendChild(filterInput);
    filterInputItem.appendChild(filterLabel);
    filterBody.appendChild(filterInputItem);
    

    filterInput.addEventListener(
      "change",
      function () {
        getFilteredOptionsList();
      },
      false
    );
  });

};

const modal = document.querySelector("#myModal");
// Function call showModal
export const showModal = (modalSelector) => {
  modalSelector.style.display = "block";
  modalSelector.classList.add("active")
}
// Function call hideModal
export const hideModal = (modalSelector) => {
  console.log(modalSelector)
  modalSelector.style.display = "none";
  modalSelector.classList.remove("active");
}

// Get Selected Values on Change each item and store in array
const getFilteredOptionsList = () => {
  const filteringInputs = document.querySelectorAll(".blog-filter-type");
  let filterSelectedOptions = [];
  if (filteringInputs) {
    filteringInputs.forEach((filterInput) =>
      filterInput.checked ? filterSelectedOptions.push(filterInput.value) : ""
    );
  }
  let filters = [...new Set(filterSelectedOptions)];
  getFilteredBlogList(filters);
};

// Get new Blog List from filters
const getFilteredBlogList = (arr) => {
  let blogLists = document.querySelectorAll(".blog-list-item");
  removeClass(blogLists);
   blogList.filter((blog , index) => {
    if(arr.length){
    return arr.some((type) => {
      let foundElement =  document.querySelectorAll(".blog-list-item")[index];
      if (type && type === blog.type) {
        foundElement.classList.add("filtered-item")
        foundElement.classList.remove("d-none")
        return blog;
      }
      else {
        foundElement.classList.remove("filtered-item")
        foundElement.classList.add("d-none");
        return 
      }
    });
    }
    else{
     let filteredItems =  document.querySelectorAll(".filtered-item");
     filteredItems.forEach(fItem => fItem.classList.add("d-none"))
    }
  });
  addActiveFilter()
};


function addActiveFilter() {
  let filteredItems = document.querySelectorAll(".filtered-item");
  filteredItems[0].classList.add("active") 
  }

//Function call filter list
createFilterList();

