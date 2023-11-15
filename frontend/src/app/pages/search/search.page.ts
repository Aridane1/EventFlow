import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UserSubscribeLocationService } from 'src/app/services/user-subscribe-location.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  locations: any;
  token: any;
  searcher: string;

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private userSubLocationService: UserSubscribeLocationService,
    private storage: Storage
  ) {
    this.searcher = '';
  }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocation().subscribe((data) => {
      this.locations = data;
      for (let index = 0; index < this.locations.length; index++) {
        this.locations[index].showText = false;
      }
    });
  }
  async subscribeThisLocation(id: number) {
    let token = await this.storage.get('token');
    let user = await firstValueFrom(this.authService.getUserByToken(token));
    let subscribe = { userId: user.user.id, locationId: id };
    this.userSubLocationService
      .subscribeUserALocation(subscribe)
      .subscribe((data) => {});
  }

  onSearch() {
    if (this.searcher.trim() === '') return this.locations;
    return this.locations.filter((location: any) => {
      return location.name.toLowerCase().includes(this.searcher.toLowerCase());
    });
  }
}
