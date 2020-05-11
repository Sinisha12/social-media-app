import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';
import {submitComment } from '../../redux/actions/dataActions'


import { withTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

export class CommentForm extends Component {

    state = {
        body: '',
        errors: {}

    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.screamId, {body: this.state.body})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body : ''})
        }
    }
    render() {
        const {classes} = this.props.theme
        const {authenticated} = this.props
        const errors = this.state.errors

        const commentFromMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                   <TextField name="body"  type="text" label="Comment on scream"
                   error={errors.comment ? true : false} helperText={errors.comment} value={this.state.body}
                   onChange={this.handleChange} style={classes.textField} />
                   <Button type='submit' variant='contained' color='primary' style={classes.button}> Submit</Button>
                   <hr style={classes.visibleSeparator} />
                </form>
            </Grid>
        ):(null)
        return commentFromMarkup
    }
}

CommentForm.propTypes ={
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})


export default connect(mapStateToProps,{submitComment})(withTheme(CommentForm))
