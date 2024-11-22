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

export interface IParamsProps {
  params: { id: string };
}

export type TMedia = {
  data: File | null;
  preview: string;
  fileType: string | null;
  fileName: string | null;
  mediaType?: string | null;
};
