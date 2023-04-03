
import { APP_CONSTANTS } from "../constants/constants.js";
import { fetchData } from "./fetchApi.js";
import { showModal } from "../main.js";
 import {defaultImage} from "../helpers/helper.js";

const MEMBERS_URL = APP_CONSTANTS.FETCH_DATA.MEMBERS;
const membersList =  await fetchData(MEMBERS_URL)



export  function viewMembers() {

    showModal();
    
    const viewMembersTitle = APP_CONSTANTS.MEMBERS;


    const modal = document.getElementById("myModal");

    // Create  DOM element modalContent
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

  
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    
     const h2 = document.createElement("h2");
     h2.textContent = viewMembersTitle;
     modalHeader.appendChild(h2);

        // Get Dom element
     const modalBody = document.createElement("div");
     modalBody.id = "modal-body";
     modalBody.className = "modalBody";

     const membersListFragment = document.createDocumentFragment();

       // Create DOM element
     const membersListItemWrapper = document.createElement("div");
     membersListItemWrapper.className = "member-list-item-wrapper"


    // Member List loop
     membersList.forEach((member , index) => {

     // Create DOM element div
     const membersListItem = document.createElement("div");
     membersListItem.className = "member-list-item d-flex flex-column"; 
 
    // Create DOM element img
     const membersListImage = document.createElement("img");
     membersListImage.src=  APP_CONSTANTS.FETCH_DATA.MEMBERS_IMAGES + member.photo;
     membersListImage.className = "member-img";

    
 
     // Create DOM element p
     const membersListName = document.createElement("p");
     membersListName.textContent = member.name
     membersListName.className = "blog-type text-primary text-sm";

     // Create DOM element p
     const membersListUserName = document.createElement("p");
     membersListUserName.textContent = member.username;
     membersListUserName.className = "blog-description text-truncate para-text";
 
 
 
    // Append membersListImage , membersListName , membersListUserName
     membersListItem.appendChild(membersListImage);
     membersListItem.appendChild(membersListName)
     membersListItem.appendChild(membersListUserName)
     membersListFragment.append(membersListItem)
     });
     // Append membersListFragment , membersListItemWrapper , modalContent
     membersListItemWrapper.appendChild(membersListFragment);
     modalContent.appendChild(membersListItemWrapper); 
     modalBody.appendChild(modalContent)
     modal.appendChild(modalBody)
}