export namespace rs {
  export interface Trash {
    img: string;
    trash_kind: string;
    uploaded_trash_image_id: number;
  }

  export interface TrashList {
    trashList: Array<Trash>;
  }

  export interface TrashResult {
    state: {
      trashName: string;
      throwWay: string;
      imgSrc: string;
    };
  }
}
