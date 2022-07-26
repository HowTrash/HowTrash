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
    img: string;
    trash_kind: string;
    uploaded_trash_image_id: number;
  }

  export interface TrashList {
    trashList: Array<Trash>;
  }
}
