export type FileItem = { file: File; preview: string };

export type FilesState = {
  photo_product: FileItem[];
  photo_defect: FileItem[];
  video: FileItem[];
  photo_packaging: FileItem[];
};

export type FileFieldName = keyof FilesState;
