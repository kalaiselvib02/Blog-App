import { APP_CONSTANTS } from "../constants/constants.js";
import { fetchData } from "./fetchApi.js";
import { showModal } from "../main.js";

const MEMBERS_URL = APP_CONSTANTS.FETCH_DATA.MEMBERS;
const membersList = await fetchData(MEMBERS_URL);

let membersModal = document.querySelector("#membersModal");

export function viewMembers() {
  showModal(membersModal)

  // Create  DOM element modalContent
  const modalBody = document.querySelector("#membersModal .modal-body");

  // Clearing to check no duplicates are created
  modalBody.innerHTML = ""

  const membersListFragment = document.createDocumentFragment();

  // Create DOM element
  const membersListItemWrapper = document.createElement("div");
  membersListItemWrapper.className = "member-list-item-wrapper";

  // Member List loop
  membersList.forEach((member, index) => {
    // Create DOM element div
    const membersListItem = document.createElement("div");
    membersListItem.className = "member-list-item mb-1 d-flex flex-column";

    // Create DOM element img
    const membersListImage = document.createElement("img");
    membersListImage.setAttribute(
      "onerror",
      "this.onerror=null;this.src='https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=1060&t=st=1680836103~exp=1680836703~hmac=095437f08b2b3fda1f2afade4200258ba41e516ad795c703c3cf4972df69b8a5';"
    );
    membersListImage.src =
      APP_CONSTANTS.FETCH_DATA.MEMBERS_IMAGES + member.photo;
    membersListImage.className = "member-img";

    // Create DOM element p
    const membersListName = document.createElement("p");
    membersListName.textContent = member.name;
    membersListName.className = "member-name text-primary text-sm";

    // Create DOM element p
    const membersListUserName = document.createElement("p");
    membersListUserName.textContent = member.username;
    membersListUserName.className = "member-role text-truncate para-text";

    // Append membersListImage , membersListName , membersListUserName
    membersListItem.appendChild(membersListImage);
    membersListItem.appendChild(membersListName);
    membersListItem.appendChild(membersListUserName);
    membersListFragment.appendChild(membersListItem);
  });

  // Append membersListFragment , membersListItemWrapper , modalContent
  membersListItemWrapper.appendChild(membersListFragment);
  modalBody.appendChild(membersListItemWrapper);
}

window.addEventListener("click", function (event, modal) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
