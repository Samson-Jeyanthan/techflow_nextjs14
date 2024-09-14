import { TConvertedSvgJsxProps } from "@/types/utils.types";

function SystemIcon({ fill, width, height }: TConvertedSvgJsxProps) {
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
        fill={fill}
        stroke="none"
      >
        <path
          d="M572 5051 c-205 -51 -369 -186 -457 -376 -68 -146 -65 -73 -65 -1530
0 -1457 -3 -1384 65 -1530 67 -145 169 -250 310 -321 140 -70 117 -67 773 -71
l593 -4 -5 -32 c-42 -262 -91 -483 -158 -712 l-24 -80 -174 -5 c-109 -3 -183
-10 -196 -17 -37 -21 -83 -81 -90 -118 -14 -77 31 -161 103 -191 48 -21 2578
-21 2626 0 72 30 117 114 103 191 -7 37 -53 97 -90 118 -13 7 -87 14 -195 17
l-174 5 -24 80 c-64 215 -116 447 -159 712 l-5 32 593 4 c656 4 633 1 773 71
141 71 243 176 310 321 68 146 65 73 65 1530 0 1469 4 1386 -70 1540 -72 149
-176 251 -325 320 -149 69 -8 65 -2122 64 -1797 0 -1912 -2 -1981 -18z m3973
-353 c68 -35 122 -92 154 -158 l26 -55 0 -1340 0 -1340 -26 -55 c-33 -70 -89
-126 -159 -159 l-55 -26 -1925 0 -1925 0 -55 26 c-66 32 -123 86 -158 154
l-27 50 0 1350 0 1350 26 50 c45 85 121 149 209 176 14 4 889 7 1945 6 l1920
-2 50 -27z m-1532 -3600 c24 -181 72 -425 112 -572 19 -71 34 -131 32 -133 -2
-2 -274 -2 -603 -1 l-600 3 38 140 c48 172 92 388 115 557 l17 128 436 0 436
0 17 -122z"
        />
      </g>
    </svg>
  );
}

export default SystemIcon;
