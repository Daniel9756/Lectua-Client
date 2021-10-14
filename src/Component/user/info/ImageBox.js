import React from 'react'
import { Box, Grid, Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  

    image: {
        width: theme.spacing(22),
        height: theme.spacing(28),
    },


}));
export const ImageBox = ({ image }) => {

    console.log(image)
    const classes = useStyles();

    return (
        <Box>
            <Avatar
                variant="rounded"
                src={image}
                alt="company logo"
                className={classes.image}
            ></Avatar>
        </Box>
    )
}