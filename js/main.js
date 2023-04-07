import { APP_CONSTANTS } from "./constants/constants.js";
import {
  createBlogData,
  addNewBlog,
  setActiveClass,
} from "./blogs/blog-list.js";
import { viewMembers } from "./services/viewMembers.js";
import { fetchData } from "./services/fetchApi.js";

const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;
let blogList = await fetchData(BLOG_URL);

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
const filterData = (url) => {
  let data = blogList;
  let filteredArr = [];
  data.map((x) => filteredArr.push(x.type));
  filteredArr = [...new Set(filteredArr)];
  return filteredArr;
};
// Create List From Option Types from Api
const createFilterList = () => {
  let filterListItems = filterData(BLOG_URL);

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
    filterLabel.textContent = item;
    filterLabel.setAttribute("for", item);

    // Append Child filterInput , filterLabel , filterInputItem
    filterInputItem.appendChild(filterInput);
    filterInputItem.appendChild(filterLabel);
    filterList.appendChild(filterInputItem);

    filterInput.addEventListener(
      "change",
      function () {
        getFilteredOptionsList(blogList);
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
  modalSelector.style.display = "none";
  modalSelector.classList.remove("active")
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
  let resultArr = blogList.filter((blog) => {
    return arr.some((type) => {
      if (type === blog.type) {
        return blog;
      }
    });
  });
  createBlogData(resultArr);
  setActiveClass();
};

//Function call filter list
createFilterList();
