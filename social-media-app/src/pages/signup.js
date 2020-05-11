import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import image from '../images/icon.png'
import {Link} from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

import { withTheme } from '@material-ui/core/styles';


class signup extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history)

    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })                
    }

    render() {
        const { classes } = this.props.theme 
        const { loading} = this.props
        const { errors} = this.state
        return (
            <Grid container style={classes.form}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={4} />
                        <Grid item xs={4} >
                            <img src={image} alt='monkey' style={classes.image} />
                            <Typography variant="h4" style={classes.pageTitle}>Signup</Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField id="email" name="email" type="email" label="Email"
                                style={classes.textField} value={this.state.email}
                                onChange={this.handleChange} fullWidth helperText={errors.email}
                                error={errors.email ? true: false}/>
                                <TextField id="password" name="password" type="password" label="Password"
                                style={classes.textField} value={this.state.password}
                                onChange={this.handleChange} fullWidth helperText={errors.password}
                                error={errors.password ? true: false}/>
                                <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm password"
                                style={classes.textField} value={this.state.Confirmpassword}
                                onChange={this.handleChange} fullWidth helperText={errors.confirmPassword}
                                error={errors.confirmPassword ? true: false}/>
                                <TextField id="handle" name="handle" type="handle" label="Handle"
                                style={classes.textField} value={this.state.handle}
                                onChange={this.handleChange} fullWidth helperText={errors.handle}
                                error={errors.handle ? true: false}/>
                                {errors.general && (
                                    <Typography variant="body2" style={classes.customError}>
                                        {errors.general}
                                    </Typography>
                                )}
                                <Button type='submit' variant='contained' color="primary" style={classes.button} disabled={loading}>
                                Signup
                                    {loading && (
                                        <CircularProgress style={classes.progress} />
                                    )}
                                </Button>
                                <br />
                                <small>
                                    Already have an account? login <Link to='/login'>here</Link>
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

signup.protoType = {
    classes: PropsTypes.object.isRequired,
    user: PropsTypes.object.isRequired,
    UI: PropsTypes.object.isRequired,
    signupUser: PropsTypes.func.isRequired

}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {    
    signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withTheme(signup))

