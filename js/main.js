
import { APP_CONSTANTS } from "./constants/constants.js";
 import { createBlogData } from "./blogs/blog-list.js";

 const APP_TITLE = APP_CONSTANTS.APP_TITLE;


    
   
   
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

 

   createBlogData()






