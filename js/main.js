
import { APP_CONSTANTS } from "./constants/constants.js";
import { createBlogData } from "./blogs/blog-list.js";

const APP_TITLE = APP_CONSTANTS.APP_TITLE;

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
   
    export const fetchData = async (url) => {  
        let data = []
        try {
            let response = await fetch(url);
            data = await response.json();
        } catch(err) {
            console.log(err);
        }
        return data
    }

    


   getFilterList()

   createBlogData()

 






