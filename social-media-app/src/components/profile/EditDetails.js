import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions'



import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit'




class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentDidMount(){
        const {credentials} = this.props
        this.mapUserDetailesToState(credentials)
    }

    handleOpen = () => {
        const {credentials} = this.props
        this.setState({open: true})
        this.mapUserDetailesToState(credentials)
    }

    handleClose = () => {
        this.setState({open : false})
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })        
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        }
        this.props.editUserDetails(userDetails)
        this.handleClose()
    }
    mapUserDetailesToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.website ? credentials.website : "",
            location: credentials.location ? credentials.location : "",

        })
    }
    
    render() {        
        return (
            <Fragment>
                <Tooltip title='Edit details' placement='top'>
                    <IconButton onClick={this.handleOpen} style={{marginTop: "20", position:'relative', float: 'right'}} >
                        <EditIcon color='primary' />
                    </IconButton>
                </Tooltip>    
                    <Dialog open={this.state.open} onClose={this.handleClose}
                    fullWidth maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="Bio" multiline rows="3"
                            placeholder="A short bio about yourself" value={this.state.bio}
                            onChange={this.handleChange} fullWidth />
                            <TextField name="website" type="text" label="Website"  
                            placeholder="your personal/professional website" value={this.state.website}
                            onChange={this.handleChange} fullWidth />
                            <TextField name="location" type="text" label="Location" 
                            placeholder="Wgere you live" value={this.state.location}
                            onChange={this.handleChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>                
            </Fragment>
        );
    }
}

EditDetails.propsTypes = {
    editUserDetails: PropTypes.func.isRequired   
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})


export default connect(mapStateToProps,{editUserDetails})(EditDetails);