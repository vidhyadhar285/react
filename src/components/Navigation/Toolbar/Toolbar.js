import React from 'react';
import classes from './ToolBar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItem/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const Toolbar=(props)=>(
    <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
    <div className={classes.Logo}>
   
    <Logo></Logo>
    <div>
    </div>
    </div>
    <nav className={classes.DeskTopOnly}>
        <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
    </nav>
    </header>

);
export default Toolbar;