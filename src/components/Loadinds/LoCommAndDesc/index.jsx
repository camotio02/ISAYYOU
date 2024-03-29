import React from 'react';
import { Container, Box, Typography, Stack, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import { Root } from '../../Global/Root/root_styles';

// Animação de troca de posição
const moveAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(-200%);
  }
  75% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;
const AnimatedBox = styled(Box)(({ theme, isMobileQuery }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: isMobileQuery ? '80px' : '100px',
    height: isMobileQuery ? '80px' : '100px',
    backgroundColor: Root.color_button_opacity,
    color: Root.color_button,
    borderRadius: '8px',
    fontSize: isMobileQuery ? 20 : 28,
    fontWeight: 900,
    margin: '16px',
}));

export const LoCommAndDesc = () => {
    const isMobileQuery = useMediaQuery('(max-width:600px)');
    return (
        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            minHeight: 600
        }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {[{
                    title: 'iSay',
                    time: '2s infinite'
                },
                {
                    title: 'You',
                    time: '4s infinite'
                },
                {
                    title: 'Do',
                    time: '5s infinite'
                }].map((item, index) => {
                    return (
                        <AnimatedBox
                            key={index}
                            isMobileQuery={isMobileQuery}
                            sx={{ animation: `${moveAnimation} ${item.time}`, }}>
                            {item.title}
                        </AnimatedBox>
                    )
                })}

            </div>
            <Stack sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: isMobileQuery ? 20 : 28,
                fontWeight: 900,
                color: Root.color_button,
                width: 'auto'
            }}>
                Carregando dados...
            </Stack>
        </Container>
    );
};
