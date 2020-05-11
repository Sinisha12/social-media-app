import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core';
import {Link} from 'react-router-dom'
import moment from 'moment'


import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'



class Comments extends Component {
    render(){
        const {classes} = this.props.theme        
        const { comments } = this.props        
        return (
            <Grid container >
                {comments.map((comment,index) => {
                    const {body, createdAt, userImage, userHandle} = comment                    
                    return (
                        <Fragment key={index}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" style={classes.commentImage} />                                        
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div styles={classes.commentData}>
                                            <Typography variant='h5' color="primary"
                                            component={Link} to={`/user/${userHandle}`}>
                                                {userHandle}    
                                            </Typography>
                                            <Typography variant='body2' color='textSecondary'>
                                                {moment(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr style={classes.invisibleSeparator} />
                                            <Typography variant='body1'>{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            { index !== comments.length-1 && <hr style={classes.visibleSeparator} />}
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }

}

Comments.proprTypes = {
    comments: PropTypes.array.isRequired
}


export default withTheme(Comments)