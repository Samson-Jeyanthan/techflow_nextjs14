import { BADGE_CRITERIA } from "@/constants";

export type TConvertedSvgJsxProps = {
  height?: string;
  width?: string;
  fill?: string;
};

export type TURLProps = {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
};

export interface ISearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface IGlobalSearchParamsProps {
  query?: string | null;
  type?: string | null;
}

export interface IParamsProps {
  params: { id: string };
}

export interface IMediaProps {
  mediaType: string;
  mediaURL: string;
  thumbnailURL: string;
}

export interface IBadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;
