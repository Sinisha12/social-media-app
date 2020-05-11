import React, {Fragment} from 'react'
import noImg from '../images/noimg.png'
import { withTheme } from '@material-ui/core';

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'


const ScreamSkeleton = (props) => {
    const {classes} = props.theme
    const content = Array.from({ length: 5 }).map((item,index) => (
        <Card style={classes.card} key={index} >
            <CardMedia style={classes.cover} image={noImg} />
            <CardContent style={classes.cardContent}>
                <div style={classes.handle} />
                <div style={classes.date} />
                <div style={classes.fullLine} />                
                <div style={classes.halfLine} />
            </CardContent>
        </Card>
    ))
    return <Fragment>{content}</Fragment>
}


export default withTheme(ScreamSkeleton)

