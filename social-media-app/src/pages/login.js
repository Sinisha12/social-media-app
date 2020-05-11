import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import image from '../images/icon.png'
import {Link} from 'react-router-dom'

import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'



class login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',            
            errors: {}
        }
    }
    componentDidUpdate(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData, this.props.history)
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })        
    }

    render() {    
        const { classes } = this.props.theme          
        const {  UI: {loading} } = this.props
        const { errors} = this.state
        return (
            <Grid container style={classes.form}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={4} />
                        <Grid item xs={4} >
                            <img src={image} alt='monkey' style={classes.image} />
                            <Typography variant="h4" style={classes.pageTitle}>Login</Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField id="email" name="email" type="email" label="Email"
                                style={classes.textField} value={this.state.email}
                                onChange={this.handleChange} fullWidth helperText={errors.email}
                                error={errors.email ? true: false}/>
                                <TextField id="password" name="password" type="password" label="Password"
                                style={classes.textField} value={this.state.password}
                                onChange={this.handleChange} fullWidth helperText={errors.password}
                                error={errors.password ? true: false}/>
                                {errors.general && (
                                    <Typography variant="body2" style={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                )}
                                <Button type='submit' variant='contained' color="primary" style={classes.button} disabled={loading}>
                                Login
                                    {loading && (
                                        <CircularProgress style={classes.progress} />
                                    )}
                                </Button>
                                <br />
                                <small>
                                    don't have an account? signup <Link to='/signup'>here</Link>
                                </small>                       
                            </form>
                        </Grid>
                        <Grid item xs={4} />
                    </Grid>
                </Grid>        
            </Grid>
        )
    }   
}

login.protoType = {
    classes: PropsTypes.object.isRequired,
    loginUser: PropsTypes.func.isRequired,
    user: PropsTypes.object.isRequired,
    UI: PropsTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withTheme(login))