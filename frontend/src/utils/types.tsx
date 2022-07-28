export namespace rs {
  export interface UserAuth {
    access_token: string;
    refresh_token: string;
  }
  export interface TokenInfo {
    value: string;
    expiry: number;
  }
  export interface TokenDecode {
    alias: string;
    email: string;
    exp: number;
    name: string;
    token_type: string;
  }

  export interface Trash {
    created_at: Date;
    img: string;
    is_on_basket: boolean;
    trash_kind: string;
  }

  export interface TrashList {
    message: Array<Trash>;
  }

  export interface TrashResult {
    state: {
      trashName: string;
      throwWay: string;
      imgSrc: string;
    };
  }
}
