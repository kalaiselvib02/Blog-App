
    import { APP_CONSTANTS } from "./constants/constants.js";
    import { addNewBlog, createBlogData } from "./blogs/blog-list.js";
    import { viewMembers } from "./services/viewMembers.js";
    import { fetchData } from "./services/fetchApi.js";
    import { filterData } from "./filters/filter-list.js";

    const modal = document.getElementById("myModal");
    
    const BLOG_URL = APP_CONSTANTS.FETCH_DATA.BLOG;
    

    document.getElementById("addBtn").addEventListener("click" , addNewBlog);

    document.querySelector("#viewMembers button").addEventListener("click" , viewMembers);


    let blogList
    const createFilterList = async () => {

       let filterListItems =  await filterData(BLOG_URL);

        blogList = await fetchData(BLOG_URL);

       
        filterListItems.forEach(item => {
           
            // Dom Selector 
            const filterList = document.getElementById("filterList");
           
             // Create Element DOM - div 
            const filterInputItem = document.createElement("div");
            filterInputItem.className = "input-item flex-center-align mb-1";
    
             // Create Element DOM - input
            const filterInput = document.createElement("input");
            filterInput.setAttribute("type" , "checkbox");
            filterInput.className = "blog-filter-type"
            filterInput.setAttribute("checked" , true)

            // Create Element DOM - label
            const filterLabel = document.createElement("label");
            filterLabel.textContent = item;
    
            // Append Child filterInput , filterLabel , filterInputItem
            filterInputItem.appendChild(filterInput);
            filterInputItem.appendChild(filterLabel);
            filterList.appendChild(filterInputItem);
          
             
            filterInput.addEventListener("change", function () {
                getFilteredList(blogList);
            }, false);

        });

       
  
    }

    const getFilteredList = () => {

        const nodeList = document.querySelectorAll(".blog-filter-type") ;
       
        for (let i = 0; i < nodeList.length; i++) {
          if(nodeList[i].checked ===  false) {
             return 
          }
          else {
           console.log(nodeList)
          }
        }
    }

  
    // Function call showModal
    export const showModal = () =>   modal.style.display = "block";

     // Function call hideModal
    export const hideModal = () =>  modal.style.display = "none";

   // hideModal when clicked outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
                modal.innerHTML = ""
            }
    }


   

    createFilterList()








