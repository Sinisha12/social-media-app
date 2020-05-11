import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import moment  from 'moment'

import {connect} from 'react-redux'

import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'

import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Typography } from '@material-ui/core'
import MyButton from '../../util/MyButton'
import ChatIcon from '@material-ui/icons/Chat'



const styles ={ 
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: { 
        minWidth: 200,
        objectFit: 'cover'
    },
    content: {
        padding: 25
    }
}

class Scream extends Component {  

    render() {        
        const { user: {authenticated, credentials:{handle}}} = this.props                    
        const { classes, scream : {body, createdAt, userImage, userHandle, commentCount, screamId, likeCount} } = this.props 
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream  screamId={screamId}/>
        ) : (null) 
        return (
            <Card className={classes.card} >
                <CardMedia className={classes.image} image={userImage} title="Profile image"/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link}
                    to={`/user/${userHandle}`} color="primary">
                    {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {moment(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>                    
                    <MyButton tip="comments">
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes ={
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired    
}
const mapStateToProps = (state) => ({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Scream))
