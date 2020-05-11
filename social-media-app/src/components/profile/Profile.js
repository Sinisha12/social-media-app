import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import moment  from 'moment'
import {uploadImage, logoutUser} from '../../redux/actions/userActions'
import EditDetails from './EditDetails'
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton'


import { withTheme } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'


import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'


class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0]                
        const formData = new FormData()                
        formData.append('image', image, image.name)        
        this.props.uploadImage(formData)
    }

    handleEditPicture = () =>{
        const fileinput = document.getElementById('imageInput')
        fileinput.click()
    }

    handleLogout = () => {
        this.props.logoutUser()
    }
    render() {
        const { classes } = this.props.theme 
        const { loading, user:{authenticated, credentials:{handle, createdAt, imageUrl, bio, website, location}}} = this.props        
        let profileMarkup = !loading ? (authenticated ? (
            <Paper style={classes.paper}>
                <div>
                    <div style={classes.profile['& .image-wrapper']}>
                        <img src={imageUrl} style={classes.profile['& .profile-image']} alt="profile" />
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden" />
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture}
                        btnClassName={classes.profile['& .image-wrapper']['& button']}>
                            <EditIcon color="primary"/>
                        </MyButton>
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
                    <MyButton tip="Logout" onClick={this.handleLogout}>
                        <KeyboardReturn color="primary"/>
                    </MyButton>  
                    <EditDetails />                                      
                </div>
            </Paper>
        ) : (
            <Paper style={classes.paper}>
                <Typography variant="body2" align="center">
                No profile found, please login again</Typography>
                <div style={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>
                        Login
                    </Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>
                        Signup
                    </Button>                   
                </div>
            </Paper>
        ) ) : (<ProfileSkeleton />)
        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired    
}

const mapStateToProps = (state) => ({
    user: state.user,
    loading: state.data.loading
})

const mapActionsToProps = { logoutUser, uploadImage}
    

export default connect(mapStateToProps, mapActionsToProps)(withTheme(Profile));