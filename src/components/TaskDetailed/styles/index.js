import { Box, Dialog, styled } from "@mui/material";
import { Root } from "../../Global/Root/root_styles";

export const DialogDetails = styled(Dialog)(({ theme, isMobileQuery }) => ({
    position: 'retalive',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all .3s',
}));
export const BoxItem = styled(Box)(({ theme, isMobileQuery }) => (
    {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    height: '2rem',
}));
