import React from 'react'
import noImg from '../images/noimg.png'
import withTheme from '@material-ui/core/styles/withTheme';

import Paper from '@material-ui/core/Paper'



import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'


const ProfileSkeleton = (props) => {
    const { classes } = props.theme    
    return (
        <Paper style={classes.paper} >
            <div  />
            <div style={classes.profile['& .image-wrapper']}>
                <img src={noImg} alt='profile' style={classes.profile['& .profile-image']} />
            </div>
            <hr />
            <div style={classes.profile['& .profile-details']} >
                <div style={classes.handleProfileSkeleton} />
                <hr />
                <div style={classes.halfLine} /> 
                <div style={classes.fullLine} />
                <hr />
                <LocationOn color='primary' /> <span>Location</span>
                <hr />
                <LinkIcon color='primary' />https://website.com
                <hr />
                <CalendarToday color='primary' /> Joined date
            </div>
        </Paper>
    )
}

export default withTheme(ProfileSkeleton)
