import { alpha, Box, useColorScheme, useTheme } from '@mui/material';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import styles from './styles.module.css';

type BackgroundProps = {
  children: ReactNode;
  showLines?: boolean;
};

export const Background: FC<PropsWithChildren<BackgroundProps>> = ({
  children,
  showLines = false,
}) => {
  const theme = useTheme();
  const { mode } = useColorScheme();

  const lightPalette = theme.colorSchemes?.light?.palette ?? theme.palette;

  return (
    <Box
      className={styles.root}
      sx={{
        background:
          mode === 'dark'
            ? 'none'
            : `
          radial-gradient(circle at 18% 72%, ${alpha(lightPalette.primary.light, 0.15)}, transparent 40%),
          radial-gradient(circle at 78% 32%, ${alpha(lightPalette.primary.light, 0.1)}, transparent 45%),
          radial-gradient(circle at 45% 45%, ${alpha(lightPalette.secondary.light, 0.5)}, transparent 42%)
        `,
      }}
    >
      {showLines && (
        <Box
          className={styles.svg}
          component="svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <defs>
            <linearGradient
              gradientUnits="objectBoundingBox"
              id="flowLine"
              x1="0%"
              x2="1"
              y1="0%"
              y2="0%"
            >
              <stop offset="0" stopColor={alpha(lightPalette.primary.light, 0.6)} />

              <stop offset="0.6" stopColor={alpha(lightPalette.secondary.light, 0.6)} />

              <stop offset="0.7" stopColor={alpha(lightPalette.secondary.light, 0.3)} />

              <stop offset="0.9" stopColor={alpha(lightPalette.primary.light, 0.3)} />
            </linearGradient>

            <linearGradient href="#flowLine" id="flowLineFast">
              <animateTransform
                attributeName="gradientTransform"
                dur="2s"
                fill="freeze"
                from="-0.5,0"
                repeatCount={1}
                to="0.1,0"
                type="translate"
              />
            </linearGradient>

            <linearGradient href="#flowLine" id="flowLineMedium">
              <animateTransform
                attributeName="gradientTransform"
                dur="4s"
                fill="freeze"
                from="-0.5,0"
                repeatCount={1}
                to="0.1,0"
                type="translate"
              />
            </linearGradient>

            <linearGradient href="#flowLine" id="flowLineSlow">
              <animateTransform
                attributeName="gradientTransform"
                dur="6s"
                fill="freeze"
                from="-0.5,0"
                repeatCount={1}
                to="0.1,0"
                type="translate"
              />
            </linearGradient>

            <filter
              filterUnits="userSpaceOnUse"
              height="160%"
              id="neonGlow"
              width="160%"
              x="-30%"
              y="-30%"
            >
              <feGaussianBlur in="SourceGraphic" result="blurWide" stdDeviation="10" />

              <feGaussianBlur in="SourceGraphic" result="blurMid" stdDeviation="5" />

              <feGaussianBlur in="SourceGraphic" result="blurCore" stdDeviation="2" />

              <feMerge>
                <feMergeNode in="blurWide" />
                <feMergeNode in="blurMid" />
                <feMergeNode in="blurMid" />
                <feMergeNode in="blurCore" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              filterUnits="userSpaceOnUse"
              height="140%"
              id="softBlur"
              width="140%"
              x="-20%"
              y="-20%"
            >
              <feGaussianBlur stdDeviation="15" />
            </filter>
          </defs>

          <g className={styles.flowLayer}>
            {/* Основная яркая линия — идет выше и пересекает нижний поток, не параллельно */}
            <path
              d="M -180 675 C 80 520, 245 525, 390 610 C 520 686, 620 720, 760 650 C 925 568, 945 390, 1125 340 C 1300 292, 1450 375, 1600 320"
              fill="none"
              filter="url(#neonGlow)"
              opacity="0.85"
              stroke="url(#flowLineFast)"
              strokeLinecap="round"
              strokeWidth="5"
            />

            {/* Тонкая нижняя линия — начинается ниже, потом резко поднимается к центру */}
            <path
              d="M -120 835 C 120 730, 290 810, 440 780 C 630 742, 660 555, 830 520 C 1010 483, 1160 620, 1325 585 C 1440 560, 1515 485, 1600 470"
              fill="none"
              filter="url(#neonGlow)"
              opacity="0.55"
              stroke="url(#flowLineMedium)"
              strokeLinecap="round"
              strokeWidth="3"
            />

            {/* Правая вертикальная волна — чуть сильнее закручена */}
            <path
              d="M 1240 -120 C 1120 80, 1195 235, 1300 345 C 1420 470, 1395 595, 1330 730 C 1270 855, 1315 940, 1405 1030"
              fill="none"
              filter="url(#neonGlow)"
              opacity="0.42"
              stroke="url(#flowLineSlow)"
              strokeLinecap="round"
              strokeWidth="5"
            />

            {/* Правая тонкая линия — не параллельно первой, уходит наружу */}
            <path
              d="M 1425 -90 C 1320 115, 1385 270, 1470 405 C 1560 548, 1505 675, 1435 790 C 1375 890, 1410 970, 1510 1040"
              fill="none"
              filter="url(#neonGlow)"
              opacity="0.35"
              stroke={alpha(lightPalette.primary.light, 0.35)}
              strokeLinecap="round"
              strokeWidth="4"
            />
          </g>
        </Box>
      )}

      {children}
    </Box>
  );
};
