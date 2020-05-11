import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withTheme } from '@material-ui/core/styles';
import moment from 'moment'
import {Link} from 'react-router-dom'

import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

const StaticProfile = (props) => { 
    
    const {classes} = props.theme
    const {profile: {handle, createdAt, imageUrl, bio, website, location}} = props    
    return (
        <Paper style={classes.paper}>
        <div>
            <div style={classes.profile['& .image-wrapper']}>
                <img src={imageUrl} style={classes.profile['& .profile-image']} alt="profile" />
            </div>
            <hr style={classes.profile['& hr']}/>
            <div style={classes.profile['& .profile-details']}>
                <MuiLink component={Link} to={`users/${handle}`} color="primary" variant="h5">
                    @{handle}
                </MuiLink>
                <hr style={classes.profile['& hr']} />
                {bio && <Typography variant='body2'>{bio}</Typography>}
                <hr style={classes.profile['& hr']}/>
                {location && (
                    <Fragment>
                        <LocationOn color="primary"/> <span style={classes.profile['& .profile-details']['& a']}>{location}</span>
                        <hr style={classes.profile['& hr']}/>
                    </Fragment>
                )}
                {website && (
                    <Fragment>
                        <LinkIcon color="primary" />
                        <a style={classes.profile['& .profile-details']['& a']} href={website} target="_blank" rel="noopener noreferrer">{'  '}{website}</a>
                        <hr style={classes.profile['& hr']} />                            
                    </Fragment>
                )}
                <CalendarToday color='primary' />{' '}
                <span>Joined {moment(createdAt).format('MMM YYYY')}</span>                        
            </div>                                      
        </div>
    </Paper>
    )
    
}

StaticProfile.propTypes =  {
    profile: PropTypes.object.isRequired ,

}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(StaticProfile))
