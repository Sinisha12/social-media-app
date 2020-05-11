import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import moment  from 'moment'
import {markNotificationsRead} from '../../redux/actions/userActions'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'


class Notifications extends Component {
    state = {
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({anchorEl: event.target})
    }
    handleClose = () => {
        this.setState({anchorEl: null})
    }
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications.filter( not => !not.read)
        .map(not => not.notificationId)
        this.props.markNotificationsRead(unreadNotificationsIds)
    }
    render() {
        const notifications = this.props.notifications        
        const anchorEl = this.state.anchorEl        
        let notificationsIcon
        if (notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0 
                ? (notificationsIcon = (
                    <Badge badgeContent={notifications.filter(not => not.read === false).length}
                    color="secondary" >
                        <NotificationsIcon />
                    </Badge>
                    )
                ) : 
                (
                    notificationsIcon = <NotificationsIcon />
                )
        }else {
            notificationsIcon = <NotificationsIcon />
        }
        let notificationMarkUp = (notifications && notifications.length>0) ? (
            notifications.map((not,index) => {                
                const verb = not.type === 'like' ? 'liked' : 'commented on'
                const time = moment(not.createdAt).fromNow()
                const iconColor = not.read ? 'primary' : 'secondary'
                const icon = not.type === 'like' ? (
                    <FavoriteIcon color={iconColor} style={{marginRight: 10}}/>
                ):(
                    <ChatIcon color={iconColor} style={{marginRight: 10}} />
                )
                return (
                    <MenuItem key={index} onClick={this.handleClose}>
                        {icon}
                        <Typography component={Link} color='primary' variant='body1'
                        to={`/user/${not.recipient}/scream/${not.screamId}`}>
                            {not.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                )

            })
        ): (<MenuItem onClick={this.handleClose}>You have no notifications yet</MenuItem>)

        return (
            <Fragment>
                <Tooltip placement='top' title='Notifications'>
                    <IconButton aria-owns={anchorEl ? 'simple-menu': undefined}
                        aria-haspopup='true' onClick={this.handleOpen}
                    >{notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}
                onEntered={this.onMenuOpened}>
                    {notificationMarkUp}
                </Menu>                
            </Fragment>            
        )

    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})


export default connect(mapStateToProps, {markNotificationsRead})(Notifications)
