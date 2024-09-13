export type UploadFileStatus = 'error' | 'success' | 'done' | 'uploading' | 'removed';

export interface McUploadFile {
  uid: string;
  size?: number;
  name: string;
  filename?: string;
  lastModified?: string;
  lastModifiedDate?: Date;
  url?: string; // link to media return from server
  mediaID?: string; // mediaID return from server
  status?: UploadFileStatus;
  originFileObj?: File;
  percent?: number;
  thumbUrl?: string;
  response?: any;
  error?: any;
  linkProps?: {
    download: string;
  };
  type?: string;
  [key: string]: any;
}

export interface IMediaUploadResponse {
  linkString: string;
  mediaID: string;
}
