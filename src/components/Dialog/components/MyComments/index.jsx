import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { taskStatusBgcolor } from '../../../../pages/createTasks/quirys/taskStatus';

export const CommentArea = ({
    isMobileQuery
}) => {
    console.log(isMobileQuery)
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);
    return (
        <FormControl sx={{
            mt: 3, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: isMobileQuery?'90%': '100%'
        }}>
            <Textarea
                placeholder="Type something here…"
                minRows={3}
                endDecorator={
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 'var(--Textarea-paddingBlock)',
                            pt: 'var(--Textarea-paddingBlock)',
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            flex: 'auto',
                        }}
                    >
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <FormatBold />
                            <KeyboardArrowDown fontSize="md" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{ '--ListItemDecorator-size': '24px' }}
                        >
                            {['200', 'normal', 'bold'].map((weight) => (
                                <MenuItem
                                    key={weight}
                                    selected={fontWeight === weight}
                                    onClick={() => {
                                        setFontWeight(weight);
                                        setAnchorEl(null);
                                    }}
                                    sx={{ fontWeight: weight }}
                                >
                                    <ListItemDecorator>
                                        {fontWeight === weight && <Check fontSize="sm" />}
                                    </ListItemDecorator>
                                    {weight === '200' ? 'lighter' : weight}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                        >
                            <FormatItalic />
                        </IconButton>
                        <Box gap={2} sx={{ ml: 'auto' }}>
                            <Button disabled sx={{
                                backgroundColor: taskStatusBgcolor.Archived
                            }} variant='none'>#temaBom</Button>
                            <Button disabled sx={{
                                backgroundColor: 'rgba(0,0, 255, 0.2)'
                            }} variant='none'>@isayyoudo</Button>
                            <Button>Send</Button>
                        </Box>
                    </Box>
                }
                sx={{
                    width: isMobileQuery ? '100%' : '100%',
                    height: isMobileQuery ? 'auto' : 200,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial',
                }}
            />
        </FormControl>
    );
}