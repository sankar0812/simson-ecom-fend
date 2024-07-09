import { NetWorkError } from "@router/components/NetWorkError";
import PageNotFound from "@router/components/PageNotFound";
import UserSignin from "@modules/Auth/Partials/UserSignin";
import { Example } from "@modules/Example";
import { BusinessProfile } from "@modules/Admin/BusinessProfile/Partials/BusinessProfile";
import { AddProducts } from "@modules/Products/AddProducts/Partials/AddProducts";
import { AdminProfile } from "@modules/Admin/AdminProfile/Partials/AdminProfile";
import { ChangeAdminPassword } from "@modules/Admin/AdminProfile/Partials/ChangeAdminPassword";
import { ViewProducts } from "@modules/Products/ViewProducts/Partials/ViewProducts";
import ViewVariations from "@modules/Products/ViewVariations/Partials/ViewVariations";
import { AddVariation } from "@modules/Products/AddProducts/Partials/AddVariations";
import ViewCategory from "@modules/Products/ViewCategory/Partials/ViewCategory";
import ViewBrand from "@modules/Products/ViewBrand/Partials/ViewBrand";
import ViewIndividualProduct from "@modules/Products/ViewProducts/Partials/ViewIndividualProduct";
import { EditProducts } from "@modules/Products/AddProducts/Partials/EditProducts";
import { DemoProduct } from "@modules/Products/AddProducts/Partials/DemoProduct";
import { Discount } from "@modules/Discount/Partials/Discount";
import UpdateDiscount from "@modules/Discount/Partials/UpdateDiscount";
import { StockManagement } from "@modules/StockManagement/Partials/StockManagement";
import UpdateStock from "@modules/StockManagement/Partials/ViewStockUpdate";
import UserList from "@modules/UserList/Partials/UserList";
import AddDescription from "@modules/Products/ViewProducts/Partials/AddDescription";
import Dashboard1 from "@modules/Dashboard/Partials/Dashboard1/Dashboard1";
import Dashboard2 from "@modules/Dashboard/Partials/Dashboard2/Dashboard2";
import ChangeOrderStatus from "@modules/Orders/ViewOrders/Partials/ViewOrder";
import ViewDashboard1 from "@modules/Dashboard/Partials/Dashboard1/ViewDashboard1";
import ViewDashboard3 from "@modules/Dashboard/Partials/Dashboard3/ViewDashboard3";
import ViewDashboard4 from "@modules/Dashboard/Partials/Dashboard4/ViewDashboard4";
import ViewDiscount from "@modules/Discount/ViewDiscount.jsx";
import { ViewAllProductDiscount } from "@modules/Discount/ViewDiscount.jsx/Partials/ViewAllproductDiscount";
import OrderUserList from "@modules/Orders/OrderBasedUserlists/Partials/OrderUserList";
import Orders from "@modules/Orders";
import Cards_Dasboard from "@modules/Dashboard/Partials/ThisDashboard/DashboardCard";
import AllReports from "@modules/Reports";
import { ViewOrderList } from "@modules/Orders/ViewOrders/Partials/ViewOrderList";
import ViewContactList from "@modules/UserList/Partials/ViewContactList";
import ViewSize from "@modules/Products/ViewSize/Partials/ViewSize";

export const anonymous = [
  {
    routePath: "/signin",
    Component: UserSignin,
  },
  {
    // ----------- Page Not Found
    routePath: "*",
    Component: PageNotFound,
  },
  {
    // ----------- Network Error
    routePath: "networkerror",
    Component: NetWorkError,
  },
 
  // {
  //     routePath: '/register',
  //     Component: RegisterMenu,
  // },
  // {
  //     routePath: '/password',
  //     Component: PasswordForm,
  // },
];

export const adminAuthenticated = [
  {
    // ----------- Page Not Fonund
    routePath: "*",
    Component: PageNotFound,
  },
  {
    routePath: "demo",
    Component: DemoProduct,
  },
  {
    // ----------- Network Error
    routePath: "networkerror",
    Component: NetWorkError,
  },
  {
    routePath: "business_profile",
    Component: BusinessProfile,
  },
  {
    routePath: "",
    Component: Cards_Dasboard,
  },
  {
    routePath: "add_products/",
    Component: AddProducts,
  },
  {
    routePath: "edit_products_update/:id",
    Component: EditProducts,
  },
  {
    routePath: "view_products",
    Component: ViewProducts,
  },
  {
    routePath: "view_individual_products/:id",
    Component: ViewIndividualProduct,
  },
  {
    routePath: "view_variants",
    Component: ViewVariations,
  },
  {
    routePath: "add_variants",
    Component: AddVariation,
  },
  {
    routePath: "view_category",
    Component: ViewCategory,
  },
  {
    routePath: "view_brand",
    Component: ViewBrand,
  },
  {
    routePath: "view_size",
    Component: ViewSize,
  },
  {
    routePath: "admin_profile",
    Component: AdminProfile,
  },
  {
    routePath: "change_admin_password",
    Component: ChangeAdminPassword,
  },
  {
    routePath: "discount",
    Component: Discount,
  },
  {
    routePath: "update_discount/:id",
    Component: UpdateDiscount,
  },
  {
    routePath: "view_discount_product",
    Component: ViewDiscount,
  },
  // {
  //   routePath:'view_discount/:id',
  //   Component:ViewDiscount,
  // },
  {
    routePath: "stock_management",
    Component: StockManagement,
  },
  {
    routePath: "update_stock/:id",
    Component: UpdateStock,
  },
  {
    routePath: "user_list",
    Component: UserList,
  },
  {
    routePath:"contact_details",
    Component:ViewContactList,
  },
  {
    routePath: "add_description/:id",
    Component: AddDescription,
  },
  {
    routePath: "dashboard1",
    Component: Dashboard1,
  },
  {
    routePath: "view_dashboard1",
    Component: ViewDashboard1,
  },
  {
    routePath: "dashboard2",
    Component: Dashboard2,
  },
  {
    routePath: "view_dashboard2",
    Component: Dashboard2,
  },
  {
    routePath: "view_dashboard3",
    Component: ViewDashboard3,
  },
  {
    routePath: "view_dashboard4",
    Component: ViewDashboard4,
  },
  // =================   Orders =============================

  { routePath: "view_orders", 
   Component: Orders,         //>>>>>>>>>>>>   Order based user list
  },
  {
   routePath:"view_order_details",
   Component:ViewOrderList,
  },
  {
    routePath: "all_orders_status/:id",
    Component: Orders,              // >>>>>>>>>>>>  All order view/return list
  },
  {
    routePath: "report/",
    Component: AllReports,              // >>>>>>>>>>>>  All order view/return list
  },
];

export const userAuthenticated = [
  {
    // ----------- Page Not Fonund
    routePath: "*",
    Component: PageNotFound,
  },
  {
    // ----------- Network Error
    routePath: "networkerror",
    Component: NetWorkError,
  },
];
