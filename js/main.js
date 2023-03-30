
    import { APP_CONSTANTS } from "./constants/constants.js";
    import { addNewBlog, createBlogData } from "./blogs/blog-list.js";
    import { viewMembers } from "./services/viewMembers.js";

    

    const modal = document.getElementById("myModal");

    

    document.getElementById("addBtn").addEventListener("click" , addNewBlog)

    document.querySelector("#viewMembers button").addEventListener("click" , viewMembers)

    const getFilterList = () => {
        const filterList = document.getElementById("filterList");
        const filterListOptions = APP_CONSTANTS.FILTER_DETAILS.FILTER_OPTIONS;

        filterListOptions.forEach(item => {
            filterList.innerHTML += `
            <div class="input-item flex-center-align mb-1">
                <input type="checkbox" value=${item.value} checked=${item.isChecked}></input>
                <label>${item.name}</label>
            </div>
    `
        });
    }
   

    export const showModal = () =>  {
    modal.style.display = "block";
    }
    export const hideModal = () =>  {
    modal.style.display = "none";
    }
   
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
                modal.innerHTML = ""
            }
    }

   

 getFilterList()

 createBlogData()





