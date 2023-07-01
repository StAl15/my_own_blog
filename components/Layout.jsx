import Header from "@/components/Header";
import {memo} from "react";

const Layout = ({children}) => {
    return (
        <>
            <Header/>
            {children}
        </>
    );
};

export default Layout;
