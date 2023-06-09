export const APP_CONSTANTS = {
  APP_TITLE: "Little Book",
  LOCAL: "Local",
  FILTER_DETAILS: {
    TITLE: "Filter",
    FILTER_OPTIONS: [
      {
        name: "Regional Blogs",
        value: "Regional",
        isChecked: false,
      },
      {
        name: "National Blogs",
        value: "National",
        isChecked: true,
      },
      {
        name: "International Blogs",
        value: "International",
        isChecked: true,
      },
    ],
  },
  VIEW_MEMBERS: "View Members",
  MEMBERS: "Members",
  FORM_INPUTS: {
    SEARCH_BLOG_FORM: {
      INPUT: {
        PLACEHOLDER: "Search Blogs",
      },
      SUBMIT_BTN_TEXT: "New",
    },
    ADD_BLOG_FORM: {
      FORM_TITLE: "Add New Blog",
      BLOG_TITLE: {
        INPUT_PLACEHOLDER: "Name you blog",
      },
      BLOG_DESCRIPTION: {
        INPUT_PLACEHOLDER: "Write Content Here",
      },
      SUBMIT_BTN_TEXT: "Add",
    },
    EDIT_BLOG_FORM: {
      SUBMIT_BTN_TEXT: "Edit Content",
      SAVE_FORM: {
        CANCEL: "Cancel",
        SAVE: "Save Content",
      },
    },
    VALIDATIONS: {
      REQUIRED: {
        BLOG_TITLE: {
          ERROR_MESSAGE: "Please enter blog title",
        },
        BLOG_DESCRIPTION: {
          ERROR_MESSAGE: "Please enter blog description",
        },
      },
      LENGTH: {
        TITLE: {
          LENGTH: 60,
          ERROR_MESSAGE: "Please enter title of 60 characters",
        },
        DESCRIPTION: {
          LENGTH: 256,
          ERROR_MESSAGE: "Please enter description of 256 characters",
        },
      },
    },
  },
  MODE: {
    DEFAULT: "Switch to Dark Mode",
    DARK: "Switch to Light Mode",
  },
  FETCH_DATA: {
    BLOG: "https://jsonmockserver.vercel.app/api/blogs",
    MEMBERS: "https://jsonmockserver.vercel.app/api/users",
    MEMBERS_IMAGES: "https://jsonmockserver.vercel.app/",
  },
};
