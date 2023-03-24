export const APP_CONSTANTS = {
  APP_TITLE : "Little Book",
  FILTER_DETAILS:{
    TITLE:"Filter",
    FILTER_OPTIONS: [
      {
          name : "Regional Blogs",
          value : "Regional",
          isChecked:false
      },
      {
          name : "National Blogs",
          value : "National",
          isChecked:true
      },
      {
          name : "International Blogs",
          value : "International",
          isChecked:true
      },
    ],
  },
  VIEW_MEMBERS : "View Members",
  FORM_INPUTS:{
    SEARCH_BLOG_FORM:{
        INPUT:{
            PLACEHOLDER:"Search Blogs"
        },
        SUBMIT_BTN_TEXT:"New"
    },
    ADD_BLOG_FORM:{
        FORM_TITLE:"Add New Blog",
        BLOG_TITLE:{
            INPUT_PLACEHOLDER:"Name you blog"
        },
        BLOG_DESCRIPTION:{
            INPUT_PLACEHOLDER:"Write Content Here"
        },
        SUBMIT_BTN_TEXT:"Add"
    },
    EDIT_BLOG_FORM:{
        SUBMIT_BTN_TEXT:"Edit Content",
        SAVE_FORM:{
            CANCEL:"Cancel",
            SAVE:"Save Content"
        }
    }
  },
  MODE:{
    DEFAULT:"Switch to Dark Mode",
    DARK:"Switch to Light Mode"
  } ,
  FETCH_DATA:{
    BLOG:"https://jsonmockserver.vercel.app/api/blogs"
  }
}
