import {
  AiFillCarryOut,
  AiFillFolderOpen,
  AiOutlineDashboard,
} from "react-icons/ai";
import {
  BsAmd,
  BsCart4,
  BsCartCheckFill,
  BsFillPersonVcardFill,
  BsStack,
  BsStackOverflow,
} from "react-icons/bs";
import { MenuText } from "@layout/Partials/Style";
import {
  RiDashboardLine,
  RiLuggageCartFill,
  RiShieldUserFill,
} from "react-icons/ri";
import {
  TbCarouselHorizontal,
  TbExchange,
  TbPencilDiscount,
  TbReportSearch,
  TbShoppingBagDiscount,
  TbShoppingCartDiscount,
} from "react-icons/tb";
import {
  MdAccountBalanceWallet,
  MdOutlineContactPhone,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import {
  BiSolidCategoryAlt,
  BiSolidDiscount,
  BiSolidUserAccount,
} from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { GiTatteredBanner, GiVerticalBanner } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa6";

export const adminItems = (collapsed) => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  let items = [
    getItem("Dashboard", "", <AiOutlineDashboard />),

    getItem(
      <MenuText>{collapsed ? null : "SIMSON"}</MenuText>,
      "menu",
      null,
      [
        getItem("Profile", "business_profile", <BsFillPersonVcardFill />),

        getItem("Products", "sub2", <BsCart4 />, [
          getItem("Add Products", "add_products", <BsCartCheckFill />),
          getItem("View Products", "view_products", <RiLuggageCartFill />),
          // getItem("View Variants", "view_variants", <BsAmd />),
          getItem("View Size", "view_size", <BsAmd />),
          getItem("View Category", "view_category", <BiSolidCategoryAlt />),
          getItem("View Brand", "view_brand", <SiBrandfolder />),

        ]),


        getItem("Orders", "view_orders", <TbExchange />),

        // getItem("Account Profile", "sub4", <MdAccountBalanceWallet />, [
        //   getItem("Account Profile", "account_profile", <AiFillCarryOut />),
        // ]),

        // getItem("Users", "sub5", <HiMiniUsers />, [

        // ]),

        getItem("Discount(Offer)", "sub6", <BiSolidDiscount />, [
          getItem("Discount", "discount", <TbShoppingCartDiscount />),
          getItem(
            "View Discount",
            "view_discount_product",
            <TbShoppingBagDiscount />
          ),
        ]),

        getItem("Stock Management", "stock_management", <BsStack />),

        getItem("Dashboard Details", "sub8", <GiTatteredBanner />, [
          // getItem("Dashboard 1", "view_dashboard1", <RxDashboard />),
          // getItem(
          //   "Dashboard 2",
          //   "view_dashboard2",
          //   <MdOutlineSpaceDashboard />
          // ),
          getItem("Dashboard 3", "view_dashboard3", <TbCarouselHorizontal />),
          // getItem("Dashboard 4", "view_dashboard4", <RiDashboardLine />),
        ]),
      ],
      "group"
    ),
    getItem("User Details", "sub9", <FaUsers />, [
      getItem("User Profile", "user_list", <BiSolidUserAccount />),
      getItem("Contact Us", "contact_details", <MdOutlineContactPhone />),
    ]),

    getItem("Report", "report", <TbReportSearch />),
  ];

  return items;
};

export const adminKeys = [
  "sub1",
  "sub2",
  "sub3",
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
  "sub9",
];
