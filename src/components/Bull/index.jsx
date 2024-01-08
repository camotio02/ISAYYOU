import { Box } from "@mui/material"

export const BullPoint = ()=> {
    return(
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    )
}