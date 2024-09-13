import { McUploadFile } from '@shared/models';

/**
 * Interface for the 'UploadProgress' data
 */
export interface UploadProgressEntity extends McUploadFile {
  id: string | number; // Progress ID
}
