import "next";

declare module "next" {
  export type PageProps<TParams = object> = {
    params: TParams;
    searchParams?: { [key: string]: string | string[] | undefined };
  };
}
