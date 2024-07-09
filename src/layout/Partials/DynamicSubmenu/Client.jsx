import { AiFillMoneyCollect, AiOutlineDashboard, AiOutlineTags } from "react-icons/ai";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { MenuText } from "@layout/Partials/Style";


export const clientItems = (collapsed)=>{

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    let items =[
        getItem('Dashboard', '', <AiOutlineDashboard />),
    
        getItem(<MenuText>{collapsed ? null : 'ERP'}</MenuText>, 'menu', null,
            [
                getItem('Client Profile', 'sub1', <AiOutlineTags />, [
                    getItem('Client Profile', 'clientprofile', <BsFillPersonVcardFill />),
                ]),

            ], 'group'),
    ]

    return items;
}

export const clientKeys = ['sub1'];