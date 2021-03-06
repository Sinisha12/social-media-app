import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import { withTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

import DeleteOutline from '@material-ui/icons/DeleteOutline'

import {connect} from 'react-redux'
import { deleteScream} from '../../redux/actions/dataActions'




class DeleteScream extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({open: false})
    }
    render() {
        const { classes } = this.props.theme 
        return (
            <Fragment>
                <MyButton tip="Delete Scream" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth='sm'>
                    <DialogTitle> Are you sure you want to delete this scream?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.deleteScream} color='secondary'>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}
 DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired
 }


export default connect(null, {deleteScream})(withTheme(DeleteScream));