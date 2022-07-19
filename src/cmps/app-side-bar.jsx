import { Link, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { userService } from '../services/user.service.js'
import { ReactComponent as MondayBlue } from '../assets/svg/monday.blue.svg'
import { ReactComponent as BellSvg } from '../assets/svg/bell.svg'
import { ReactComponent as InboxSvg } from '../assets/svg/inbox.svg'
import { ReactComponent as WorkSvg } from '../assets/svg/work.svg'
import { ReactComponent as StarSvg } from '../assets/svg/star.svg'
import { ReactComponent as LogoutSvg } from '../assets/svg/logout.svg'
import { ReactComponent as MarkerSvg } from '../assets/svg/marker.svg'
import { ReactComponent as MagenSvg } from '../assets/svg/magen.svg'
import { ReactComponent as UserSvg } from '../assets/svg/user2.svg'

export const AppSideBar = () => {
    let { user } = useSelector((storeState) => storeState.userModule)
    let navigate = useNavigate()
    const onLogout = () => {
        userService.logout()
        navigate('/')
    }

    return (
        <div className="app-side-bar-container">
            <div className="app-side-bar-wrapper flex column">
                <div className="logo-container">
                    <div className="logo-wrapper">
                        <Link to={'/'} className="routs-link ">
                            <img className="surface-item-image" src="https://cdn.monday.com/images/logos/monday_logo_icon.png" />
                        </Link>
                    </div>
                </div>
                <div className="sep"> </div>
                <div className="scrollable-navigation-items-area">
                    <div className="top">
                        <div className="btn-rout-wrapper"><div className="btn-rout"><MondayBlue /></div></div>
                        <div className="btn-rout-wrapper"><div className="btn-rout"><BellSvg /></div></div>
                        <div className="btn-rout-wrapper"><div className="btn-rout"><InboxSvg /></div></div>
                        <div className="btn-rout-wrapper"><div className="btn-rout"><WorkSvg /></div></div>
                        <div className="btn-rout-wrapper"><div className="btn-rout"><StarSvg /></div></div>

                    </div>
                    <div className="bottom">
                        <div className="btn-rout-wrapper"><div className="btn-rout"><UserSvg /></div></div>
                        <div className="btn-rout-wrapper"><div className="btn-rout"><MagenSvg /></div></div>
                        <div className="btn-rout-wrapper"><div className="btn-rout"><MarkerSvg /></div></div>
                    </div>
                </div>
                <div className="footer">
                    <div className="sep"> </div>
                    <div className="avatar-menu-component-wrapper" >
                        <div className="footer-navigation-items-area flex column">
                            <div onClick={onLogout} title="Logout" className="logout flex "><LogoutSvg /></div>
                            <div className="avatar-menu-component">
                                <div className="avatar-img">{user ? user.username.charAt(0) : 'G'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}