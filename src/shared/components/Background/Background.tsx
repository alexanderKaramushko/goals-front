import { alpha, Box, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

import styles from './Background.module.css';

type MelkorBackgroundProps = {
  children: ReactNode;
};

export function Background({ children }: MelkorBackgroundProps) {
  const theme = useTheme();

  return (
    <Box
      className={styles.root}
      style={{
        background: `
          radial-gradient(circle at 18% 72%, ${alpha(theme.palette.primary.light, 0.15)}, transparent 40%),
          radial-gradient(circle at 78% 32%, ${alpha(theme.palette.primary.light, 0.1)}, transparent 45%),
          radial-gradient(circle at 45% 45%, ${alpha(theme.palette.secondary.light, 0.5)}, transparent 42%)
        `,
      }}
    >
      <Box component="svg" viewBox="0 0 1440 900" preserveAspectRatio="none" className={styles.svg}>
        <defs>
          <linearGradient
            id="flowLine"
            gradientUnits="objectBoundingBox"
            x1="0%"
            y1="0%"
            x2="1"
            y2="0%"
          >
            <stop offset="0" stopColor={alpha(theme.palette.primary.light, 0.6)} />

            <stop offset="0.6" stopColor={alpha(theme.palette.secondary.light, 0.6)} />

            <stop offset="0.7" stopColor={alpha(theme.palette.secondary.light, 0.3)} />

            <stop offset="0.9" stopColor={alpha(theme.palette.primary.light, 0.3)} />
          </linearGradient>

          <linearGradient id="flowLineFast" href="#flowLine">
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-0.5,0"
              to="0.1,0"
              dur="2s"
              repeatCount={1}
              fill="freeze"
            />
          </linearGradient>

          <linearGradient id="flowLineMedium" href="#flowLine">
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-0.5,0"
              to="0.1,0"
              dur="4s"
              repeatCount={1}
              fill="freeze"
            />
          </linearGradient>

          <linearGradient id="flowLineSlow" href="#flowLine">
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-0.5,0"
              to="0.1,0"
              dur="6s"
              repeatCount={1}
              fill="freeze"
            />
          </linearGradient>

          <filter
            id="neonGlow"
            filterUnits="userSpaceOnUse"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blurWide" />

            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blurMid" />

            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blurCore" />

            <feMerge>
              <feMergeNode in="blurWide" />
              <feMergeNode in="blurMid" />
              <feMergeNode in="blurMid" />
              <feMergeNode in="blurCore" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter
            id="softBlur"
            filterUnits="userSpaceOnUse"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        <g className={styles.flowLayer}>
          {/* Основная яркая линия — идет выше и пересекает нижний поток, не параллельно */}
          <path
            d="M -180 675 C 80 520, 245 525, 390 610 C 520 686, 620 720, 760 650 C 925 568, 945 390, 1125 340 C 1300 292, 1450 375, 1600 320"
            fill="none"
            stroke="url(#flowLineFast)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            opacity="0.85"
          />

          {/* Тонкая нижняя линия — начинается ниже, потом резко поднимается к центру */}
          <path
            d="M -120 835 C 120 730, 290 810, 440 780 C 630 742, 660 555, 830 520 C 1010 483, 1160 620, 1325 585 C 1440 560, 1515 485, 1600 470"
            fill="none"
            stroke="url(#flowLineMedium)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            opacity="0.55"
          />

          {/* Правая вертикальная волна — чуть сильнее закручена */}
          <path
            d="M 1240 -120 C 1120 80, 1195 235, 1300 345 C 1420 470, 1395 595, 1330 730 C 1270 855, 1315 940, 1405 1030"
            fill="none"
            stroke="url(#flowLineSlow)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            opacity="0.42"
          />

          {/* Правая тонкая линия — не параллельно первой, уходит наружу */}
          <path
            d="M 1425 -90 C 1320 115, 1385 270, 1470 405 C 1560 548, 1505 675, 1435 790 C 1375 890, 1410 970, 1510 1040"
            fill="none"
            stroke={alpha(theme.palette.primary.light, 0.35)}
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#neonGlow)"
            opacity="0.35"
          />
        </g>
      </Box>

      <Box className={styles.content}>{children}</Box>
    </Box>
  );
}
