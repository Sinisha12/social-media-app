import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MyButton = ({children, onClick, btnClassName, tip}) => 
    (
        <Tooltip title={tip} placement="top">
        <IconButton onClick={onClick} style={btnClassName}>
            {children}
        </IconButton>                    
        </Tooltip>  
    )



export default MyButton



