import { TConvertedSvgJsxProps } from "@/types/utils.types";

const SaveFillIcon = ({ fill, width, height }: TConvertedSvgJsxProps) => {
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
          d="M1340 4834 c-370 -79 -656 -346 -762 -709 l-23 -80 -3 -1642 c-3
-1825 -6 -1719 65 -1863 65 -133 188 -232 324 -261 88 -19 231 -6 325 28 44
17 329 168 633 337 597 332 614 340 714 319 37 -8 210 -98 617 -325 609 -338
648 -355 800 -365 213 -14 376 80 469 269 76 152 72 48 69 1868 l-3 1625 -23
79 c-29 104 -107 266 -166 343 -68 89 -191 201 -284 257 -90 54 -242 109 -342
125 -42 7 -462 11 -1205 10 -935 0 -1152 -3 -1205 -15z"
        />
      </g>
    </svg>
  );
};

export default SaveFillIcon;
