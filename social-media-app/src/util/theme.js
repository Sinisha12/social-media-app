export default {    
    palette: {
        primary: {
        light: '#33c9dc',
        main: '#00bcd4',
        dark: '#008394',
        contrastText: '#fff'
        },
        secondary: {
        light: '#ff6333',
        main: '#ff3d00',
        dark: '#b22a00',
        contrastText: '#fff'
        }
    },
    typography: {
        useNextVariants: true
    },
    classes:{    
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto 20px auto'
        },
        pageTitle: {
            margin: '10px auto 10px auto'
        },
        textField: {
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: 10
        },
        progress: {
            position: 'absolute'
        },
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            width: '100%',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            marginBottom: 20
        },
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        deleteButton:{
            position: 'absolute',
            left: '90%',
            top: '10%'
        },
        submitButton: {
            position: 'relative',
            float: 'right',
            marginTop: 10        
        },
        progressSpinner: {
            position: 'apsobule'
        },
        closeButton:{
            position: 'absolute',
            left: '91%',
            top: '6%'
        },
        profile_image:{
            maxWidth: 200,
            height: 200,
            borderRadius: '20%',
            objectFit: 'cover'
        },
        dialogContent: {
            padding: 20
        },
        expandButton: {
            position: 'absolute',
            left: '90%'
        },
        spinnerDiv: {
            textAlign: 'center',
            marginTop: 50,
            marginBottom: 50
        },
        commentImage: {
           maxWidth: "100%",
           height: 100,
           objectFit: 'cover',
           borderRadius: '20%' 
        },
        commentData: {
            marginLeft: 20
        },
        card: {
            display: "flex",
            marginBottom: 20
        },
        cardContent: {
            width: '100%',            
            flexDirection: 'column',
            padding: 25
        },
        cover: {
            minWidth: 200,
            objectFit: 'cover'
        },
        handle: {
            width: 60,
            height: 18,
            backgroundColor: '#00bcd4',
            marginBottom: 7
        },
        date: {
            height: 14,
            width: 100,
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginBottom: 10    
        },
        fullLine: {
            height: 15,
            width: '90%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            marginBottom: 10
        },
        halfLine: {
            height: 15,
            width: '90%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            marginBottom: 10
        },
        handleProfileSkeleton: {
            height: 20,
            width: 60,
            margin: '0 auto 7px auto',
            backgroundColor: '00bcd4'
        }
    }    
}