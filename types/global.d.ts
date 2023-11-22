// types/global.d.ts

export {};

declare global {
  type PropsImage = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  };
}
