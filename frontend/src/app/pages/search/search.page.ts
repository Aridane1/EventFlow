import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserSubscribeLocationService } from 'src/app/services/user-subscribe-location.service';
import { SwPush } from '@angular/service-worker';
import { DeviceService } from 'src/app/services/device.service';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  respuesta: any;
  locations: any;
  token: any;
  searcher: string;
  readonly PUBLIC_VAPID_KEY =
    'BMZ80ZRGERRFOYFrKBboF2T5g_sq-XTwZsWD49FYZelLjSN97B5570OmJKPm_GnIp_t_2lyw8NINyw2yfVFxxWw';

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private userSubLocationService: UserSubscribeLocationService,
    private deviceService: DeviceService,
    private storage: Storage,
    private swPush: SwPush
  ) {
    this.searcher = '';
  }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocation().subscribe((data: any) => {
      this.locations = data;
      for (let index = 0; index < this.locations.length; index++) {
        this.locations[index].showText = false;
      }
    });
  }
  async subscribeThisLocation(id: number) {
    let token = await this.storage.get('token');
    let user = jwtDecode(token) as any;
    this.swPush
      .requestSubscription({ serverPublicKey: this.PUBLIC_VAPID_KEY })
      .then((respuesta) => {
        this.respuesta = respuesta;

        let subscribe = {
          userId: user.id,
          locationId: id,
        };
        this.userSubLocationService
          .subscribeUserALocation(subscribe)
          .subscribe((data) => {
            this.deviceService
              .subscribeDevice({
                subscription: respuesta,
                userId: user.id,
              })
              .subscribe((data) => {});
          });
      })
      .catch((err) => {
        this.respuesta = err;
        console.log(err);
      });
  }

  onSearch() {
    if (this.searcher.trim() === '') return this.locations;
    return this.locations.filter((location: any) => {
      return location.name.toLowerCase().includes(this.searcher.toLowerCase());
    });
  }
}
