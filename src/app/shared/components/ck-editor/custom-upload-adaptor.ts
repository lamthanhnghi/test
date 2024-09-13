import { HttpClient } from '@angular/common/http';
import { MediaService } from '@shared/services';

export class CustomUploadAdapter {
  loader: any; // CKEditor loader instance
  httpClient: HttpClient;

  constructor(
    loader: any,
    private http: HttpClient,
    private mediaService: MediaService,
  ) {
    // CKEditor 5 loader
    this.loader = loader;
    this.httpClient = http;
  }

  // Implement the upload method
  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then((file: File) => {
        this.mediaService.uploadCkEditor(file).subscribe({
          next: (response: any) => {
            console.log(' =>(custom-upload-adaptor.ts:34) response', response); // todo: remove this
            resolve({
              default: response.linkString,
            });
          },
          error: (err) => {
            console.log(err);
            reject(err);
          },
        });
      });
    });

    // return new Promise((resolve, reject) => {
    //   this.httpClient.post(ApiUtils.Media.UploadCkEditor, formData).subscribe({
    //     next: (response: any) => {
    //       console.log(' =>(custom-upload-adaptor.ts:34) response', response); // todo: remove this
    //       resolve({
    //         default: response.linkString,
    //       });
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       reject(err);
    //     },
    //   });
    // });
  }

  // Implement the abort method
  abort() {
    // Handle abort logic if needed
  }

  init(): void {}
}
