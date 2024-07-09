// (Mention API Names on page)
const GETEXAMPLE = 'example/'; // ( Mention request )

// =======  Auth Start ======
const LOGIN = '/admin/login'; // ( Auth Login Post)
const SENDPDF = 'send-pdf';
const ADMINCHANGEPASSWORD = 'admin/changepassword'
// =======  Auth End ======

//===== DashBoard ======================//
const GET_DASHBOARD_CARD = 'getDashboardPageDetails'
const GET_DASHBOARD_YEAR_COUNT = 'sales/count/year'
const GET_DASHBOARD_CUSTOMER_COUNT = 'customerCount'
const GET_DASHBOARD_OUTOFSTOCK = 'outOfStock/details'
const GET_DASHBOARD_DISCOUNT = 'currentMonth/Discountdetails'
const GET_DASHBOARD_PERCENTAGE = 'orderCount/details'
const GET_DASHBOARD_HIGHORDER = 'highestMovingProduct/details'
const GET_DASHBOARD_RETURNPRODUCT = 'order/return/details'

// ======= Business Profile Start ======= 
const POSTBUSINESSPROFILE = 'companyProfile/save'
const GETBUSINESSPROFILE = 'company'
const PUTBUSINESSPROFILE = 'company/edit/'
// ======= Business Profile Ends ======= 

// ======= Category Starts ==========
const POST_CATEGORY = 'categoryImage/save'
const GET_CATEGORY = 'category'
const GET_CATEGORY_PRODUCT = 'product/category/view'
const PUT_CATEGORY = 'categoryDetail/edit'

// ======= Category Ends ==========

// =========== Stock =============//
const POST_ADDSTOCK = "Stock/save"
const GET_STOCK = 'productStockDetails'   //>>>>>>>>>>>>  PRODUCT BASED STOCK URL
const GET_ALLSTOCK = 'StockListDetailByCurrentDate'
// ======= Brand Starts ==========
const POST_BRAND = 'brand/save'
const GET_BRAND = 'brand/view'
const PUT_BRAND = 'brand/edit'


// ======= Brand Ends ==========

// ======= Variations Starts ==========
const POST_VARIATION = 'varient/save'
const GET_VARIATION = 'varient/view'
const PUT_VARIATION = 'varient/edit'
const DEL_VARIATION = 'varient/delete'

// ======= Variations Ends ==========

// ======= Size Starts ==========

const POST_SIZE = '/size/save'
const GET_SIZE = '/size/view'
const PUT_SIZE = '/size/edit/'

// ======= Size Ends ==========


// ======= Product Starts ==========
const POST_PRODUCT = 'product/save'
const DEMO_POST_PRODUCT = 'demo/save'
const GET_PRODUCTS = 'product/views'
const PUT_PRODUCTS = 'product/edit'
const PATCH_PRODUCTS = 'product/patch'
const INDIVIDUAL_PRODUCT_IMG_EDIT = 'productImage/edit'
const POST_MORE_PRODUCT_IMG = 'product/images/save'

// ======= Product Ends ==========

// ======= User Starts ==========

const GET_USER_LIST = 'user/view'
const GET_CONTACT_LIST ='contact'
const DELETE_CONTACT ='contact/delete'
// ======= User Ends ==========

// ======= Dashboard Starts ==========
const POST_DASHBOARD1 = 'dashboard1/save'
const POST_DASHBOARD2 = 'dashboard2/save'
const POST_DASHBOARD3 ='carousel/save'
const POST_DASHBOARD4 = 'carousel2/save'
const GET_DASHBOARD1 = 'dashboard1/view'
const GET_DASHBOARD2 = 'dashboard2/view'
const GET_DASHBOARD3 = 'carousel/view/admin'
const GET_DASHBOARD4 = 'carousel2/view'
const PUT_DASHBOARD1 = 'dashboard1/edit'
const PUT_DASHBOARD2 = 'dashboard2/edit'
const PUT_DASHBOARD3 = 'dashboard3/edit'
const PUT_DASHBOARD4 = 'dashboard4/edit'
const PUT_DASHBOARD1_STATUS = "dashboard1/status"
const PUT_DASHBOARD3_STATUS= "dashboard3/status"

// ======= Dashboard Ends ==========

// ======== Orders Starts ===========

const GET_ORDERS = 'userPurchaseDetails/demo'
const PATCH_ORDERS_STATUS= 'order/status'
const INVOICE_STATUS = '/orderItemList/pdf/'
const PATCH_ORDERS_RETURN_STATUS= 'orderReturn/status'
const PATCH_ORDERS_REFUND_STATUS = 'orderrefund/status'
const GET_RETURN_ORDERS ='orderReturn/view'
const GET_REFUND_USERLIST = 'order/refund'
// ======== Orders Ends ===========

//================  Discount  OFFER ===============//
const POSTDISCOUNT ='discount/save';
const GET_DISCOUNT = 'discountDetail/view'
const DELETE_DICOUNT ='discount/delete'

// ==============Reports  Date Search 

const POST_DISCOUNT_DATE = 'findDiscountListByDateRange'
const POST_STOCKREPORT_DATE = 'findStockListByDateRange'
const POST_ORDERREPORT_DATE = 'findOrderListByDateRange'

//============== Invoice Print ================//
const POST_INVOICE = 'invoice/save'
const GET_INVOICEPRINT = 'invoice/detail/view'

// ==========  Notification Alert Quantity =========//



export const APIURLS = {
    // Auth 
    LOGIN: LOGIN,  // --> Auth Login Post
    SENDPDF:SENDPDF,

    // Example
    GETEXAMPLE,  //  --> Example
    
    // Dash board 
    GET_DASHBOARD_CARD,
    GET_DASHBOARD_YEAR_COUNT,
    GET_DASHBOARD_CUSTOMER_COUNT,
    GET_DASHBOARD_OUTOFSTOCK,
    GET_DASHBOARD_DISCOUNT,
    GET_DASHBOARD_PERCENTAGE,
    GET_DASHBOARD_HIGHORDER,
    GET_DASHBOARD_RETURNPRODUCT,

    // Business Profile
    POSTBUSINESSPROFILE,
    GETBUSINESSPROFILE,
    PUTBUSINESSPROFILE,
    ADMINCHANGEPASSWORD,

    // Category
    POST_CATEGORY,
    GET_CATEGORY,
    GET_CATEGORY_PRODUCT,
    PUT_CATEGORY,


    // Brand
    POST_BRAND,
    GET_BRAND,
    PUT_BRAND,

    // Variations
    POST_VARIATION,
    GET_VARIATION,
    DEL_VARIATION,
    PUT_VARIATION,

    // Size

    POST_SIZE,
    GET_SIZE,
    PUT_SIZE,

    // Products
    POST_PRODUCT,
    DEMO_POST_PRODUCT,
    GET_PRODUCTS,
    PUT_PRODUCTS,
    PATCH_PRODUCTS,
    INDIVIDUAL_PRODUCT_IMG_EDIT,
    POST_MORE_PRODUCT_IMG,
    GET_CATEGORY_PRODUCT,

    // Stock
    POST_ADDSTOCK,
    GET_STOCK,
    GET_ALLSTOCK,

    // User List
    GET_USER_LIST,
    GET_CONTACT_LIST,
    DELETE_CONTACT,

    // Dashboard
    POST_DASHBOARD1,
    POST_DASHBOARD2,
    POST_DASHBOARD3,
    POST_DASHBOARD4,
    GET_DASHBOARD1,
    GET_DASHBOARD2,
    GET_DASHBOARD3,
    GET_DASHBOARD4,
    PUT_DASHBOARD1,
    PUT_DASHBOARD2,
    PUT_DASHBOARD3,
    PUT_DASHBOARD4,
    PUT_DASHBOARD1_STATUS,
    PUT_DASHBOARD3_STATUS,


    // Orders 
    GET_ORDERS,
    GET_RETURN_ORDERS,
    GET_REFUND_USERLIST,
    PATCH_ORDERS_STATUS,
    INVOICE_STATUS,
    PATCH_ORDERS_RETURN_STATUS,
    PATCH_ORDERS_REFUND_STATUS,

    //  Discount  OFFER

    POSTDISCOUNT,
    GET_DISCOUNT,
    DELETE_DICOUNT,

    // All Reports

    POST_DISCOUNT_DATE,
    POST_STOCKREPORT_DATE,
    POST_ORDERREPORT_DATE,

    // Invoice Print  
    GET_INVOICEPRINT,
    POST_INVOICE,

}