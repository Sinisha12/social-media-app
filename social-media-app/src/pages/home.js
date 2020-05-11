import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getScreams} from '../redux/actions/dataActions'

import Grid from '@material-ui/core/Grid'

import Scream from "../components/scream/Scream"
import Profile from '../components/profile/Profile'
import ScreamSkeleton from '../util/ScreamSkeleton'



class home extends Component {
    state = {
        screams: null
    }
    componentDidMount(){ 
        this.props.getScreams()
    }
    render() {
        const { screams, loading} = this.props.data        
        let recentScreamsMarkUp = !loading ? (
            screams.map((scream, index) => <Scream scream={scream} key={index} />)
            ): <ScreamSkeleton />
        return (
            <Grid container spacing={2} style={{padding : "20px"}}>
                <Grid item sm={8} xs={12}>
                    <div>{recentScreamsMarkUp}</div>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps,{ getScreams})(home)
