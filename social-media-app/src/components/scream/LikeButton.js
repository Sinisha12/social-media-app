import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import {likeScream, unlikeScream} from '../../redux/actions/dataActions'
import { connect} from 'react-redux'

import MyButton from '../../util/MyButton'
import {Link} from 'react-router-dom'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'



class LikeButton extends Component {
    likedScream = () => {        
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)){
            return true
        }        
        else {
            return false
        }
    } 
    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId)
    }
    render() {                      
        const { user: {authenticated}} = this.props 
        const likeButton = (!authenticated ? (
            <Link to='/login'>
                <MyButton tip="like">                
                    <FavoriteBorder color='primary' />                
                </MyButton>
            </Link>
        ):(
            this.likedScream() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color='primary'/>
                </MyButton>
            ):(
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color='primary'/>
                </MyButton>
            )
        )        
        )

        return (
            <Fragment>
                {likeButton}
                
            </Fragment>
        )
    }
}

LikeButton.propTypes ={
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
}

const mapActionsToProps = ({
    likeScream,
    unlikeScream
})
const mapStateToProps = (state) => ({
    user: state.user    
})

export default connect(mapStateToProps,mapActionsToProps)(LikeButton)
