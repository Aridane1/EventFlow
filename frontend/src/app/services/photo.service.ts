import { Injectable } from '@angular/core';
import { Camera, GalleryPhoto } from '@capacitor/camera';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor() {}
  public async pickImage(): Promise<GalleryPhoto> {
    const capturedPhotos = await Camera.pickImages({
      limit: 1,
      quality: 100,
    });

    return capturedPhotos.photos[0];
  }
}
