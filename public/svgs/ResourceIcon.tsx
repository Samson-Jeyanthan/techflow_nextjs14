import { TConvertedSvgJsxProps } from "@/types/utils.types";

function ResourceIcon({ fill, width, height }: TConvertedSvgJsxProps) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24px"}
      height={height || "24px"}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill={fill || "var(--dark-primary)"}
        stroke="none"
      >
        <path
          d="M2890 5106 c-378 -82 -642 -405 -640 -784 1 -43 5 -96 9 -119 l8 -42
-596 -3 c-579 -3 -597 -4 -631 -23 -19 -12 -43 -36 -55 -55 -19 -34 -20 -52
-23 -631 l-3 -596 -42 8 c-66 13 -188 10 -269 -5 -302 -58 -543 -284 -625
-586 -24 -89 -24 -299 1 -389 60 -218 215 -411 409 -506 140 -69 232 -88 394
-83 l132 5 3 -598 c3 -586 3 -598 24 -625 11 -15 33 -37 48 -48 27 -21 38 -21
739 -24 392 -2 727 0 745 3 47 9 98 57 110 106 11 45 6 73 -31 152 -152 323
86 698 442 697 137 -1 236 -39 332 -127 70 -65 110 -127 139 -213 19 -55 21
-81 18 -170 -4 -95 -8 -113 -42 -189 -43 -95 -45 -146 -8 -199 46 -64 17 -62
806 -62 699 0 718 1 756 20 26 13 47 34 60 60 19 38 20 57 20 756 0 789 2 760
-62 806 -53 37 -104 35 -199 -8 -76 -34 -94 -38 -189 -42 -89 -3 -115 -1 -170
18 -86 29 -148 69 -213 139 -88 96 -126 195 -127 332 -1 356 374 594 697 442
79 -37 107 -42 152 -31 49 12 97 63 106 110 3 18 5 353 3 745 -3 701 -3 712
-24 739 -11 15 -33 37 -48 48 -27 21 -39 21 -625 24 l-598 3 5 132 c4 112 1
146 -17 217 -70 283 -290 509 -566 585 -84 22 -273 28 -355 11z m252 -297
c319 -67 483 -423 332 -721 -42 -84 -24 -164 48 -208 32 -19 52 -20 666 -20
l632 0 0 -505 0 -505 -32 8 c-63 14 -269 6 -337 -12 -151 -41 -269 -113 -384
-236 -136 -145 -207 -326 -207 -529 0 -347 206 -636 537 -755 85 -30 93 -31
256 -31 l167 0 0 -497 0 -498 -497 0 -498 0 0 168 c0 157 -2 172 -28 247 -36
103 -82 183 -151 267 -283 342 -813 375 -1137 70 -182 -170 -269 -380 -256
-617 3 -55 8 -108 12 -117 7 -17 -21 -18 -499 -18 l-506 0 0 633 c0 613 -1
633 -20 665 -44 72 -124 90 -208 48 -77 -39 -150 -56 -238 -56 -368 0 -602
376 -440 705 122 246 420 345 667 219 64 -32 126 -34 171 -5 66 40 63 3 68
706 l5 640 640 5 c703 5 666 2 706 68 29 45 27 107 -5 171 -99 194 -62 422 92
577 115 114 286 166 444 133z"
        />
      </g>
    </svg>
  );
}

export default ResourceIcon;
