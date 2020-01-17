import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
    const attatchedClasses = props.show ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];

    return (
        <React.Fragment>
            <BackDrop show={props.show} closed={props.closed} />
            <div className={attatchedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;