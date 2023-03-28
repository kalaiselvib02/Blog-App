
    import { APP_CONSTANTS } from "./constants/constants.js";
    import { addNewBlog, createBlogData } from "./blogs/blog-list.js";

    

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

   
    const MEMBERS_URL = APP_CONSTANTS.FETCH_DATA.MEMBERS;
    const membersList =  await fetchData(MEMBERS_URL)

 

   
      export const showModal = () =>  {
       modal.style.display = "block";
      }
   
 
 
   window.onclick = function(event) {
   if (event.target == modal) {
       modal.style.display = "none";
    const modalFooter = document.getElementById("modalFooter");
   modalFooter.innerHTML = ""
   }
 

   }

   export  function viewMembers() {
    showModal();
    const viewMembersTitle = APP_CONSTANTS.MEMBERS;

     const modalHeader = document.querySelector(".modal-header h2");
     modalHeader.textContent = viewMembersTitle;


     console.log(membersList) ;

     const modalBody = document.getElementById("modalBody");
    
     const membersListFragment = document.createDocumentFragment();

     const membersListItemWrapper = document.createElement("div");
     membersListItemWrapper.className = "member-list-item-wrapper"
   
     membersList.forEach((member , index) => {
 
     const membersListItem = document.createElement("div");
     membersListItem.className = "member-list-item d-flex flex-column"; 
 
 
     const membersListImage = document.createElement("img");
     membersListImage.src=  APP_CONSTANTS.FETCH_DATA.MEMBERS_IMAGES + member.photo;
     membersListImage.className = "member-img"
 
 
     const membersListName = document.createElement("p");
     membersListName.textContent = member.name
     membersListName.className = "blog-type text-primary text-sm";
 
     const membersListUserName = document.createElement("p");
     membersListUserName.textContent = member.username;
     membersListUserName.className = "blog-description text-truncate para-text";
 
 
 
    
     membersListItem.appendChild(membersListImage);
     membersListItem.appendChild(membersListName)
     membersListItem.appendChild(membersListUserName)
     membersListFragment.append(membersListItem)
     });
     membersListItemWrapper.appendChild(membersListFragment);
     modalBody.appendChild(membersListItemWrapper);
     

 }

 getFilterList()

 createBlogData()