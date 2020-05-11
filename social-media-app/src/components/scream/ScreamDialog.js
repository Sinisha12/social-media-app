import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {getScream, clearErrors } from '../../redux/actions/dataActions'
import moment from 'moment'
import {Link} from 'react-router-dom'

import MyButton from '../../util/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
import { withTheme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

class ScreamDialog extends Component {
    state= {
        open: false,
        oldPath: '',
        newPath: ''
    }
    componentDidMount(){
        if (this.props.openDialog){
            this.handleOpen()
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname

        const {userHandle, screamId} = this.props
        const newPath = `/user/${userHandle}/scream/${screamId}`
        
        if(oldPath === newPath) oldPath = `/users/${userHandle}`
        window.history.pushState(null,null,newPath)
        this.setState({open: true, oldPath, newPath})        
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        window.history.pushState(null,null, this.state.oldPath)   
        this.setState({open: false})
        this.props.clearErrors()
    }

    render() {
        const {classes} = this.props.theme 
        const {screamId, scream: {body, createdAt, userImage, userHandle, likeCount, commentCount, comments},
            UI:{loading}} = this.props
        const dialogMarkUp = loading ? (
            <div style={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
            ):(
                <Grid container spacing={2} >
                    <Grid item sm={5}>
                        <img src={userImage} alt="Profile" style={classes.profile_image} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography component={Link} color="primary" variant="h5" to={`'/users/${userHandle}`}>
                            @{userHandle}
                        </Typography>
                        <hr style={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {moment(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr style={classes.invisibleSeparator} />
                        <Typography varian='body1'>
                            {body}
                        </Typography>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip="comments">
                            <ChatIcon color='primary'/>
                        </MyButton>
                        <span>{commentCount} Comments</span>
                    </Grid>
                    <hr style={classes.visibleSeparator} />
                    <CommentForm screamId={screamId} />
                    <Comments comments={comments} />

                </Grid>
            )
        return (
            <Fragment>
                <MyButton  onClick={this.handleOpen} tip="Expand scream" btnClassName={classes.expandButton} >
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent style={classes.dialogContent} >
                        {dialogMarkUp}
                    </DialogContent>
               </Dialog> 
            </Fragment>
        )
    }
}

ScreamDialog.propTypes ={
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withTheme(ScreamDialog))

