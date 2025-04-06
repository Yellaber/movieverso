import { Component } from '@angular/core';
import { BannerHeroPopularComponent } from '../../components/banner-hero-popular/banner-hero-popular.component';
import { BannerHeroRatedComponent } from "../../components/banner-hero-rated/banner-hero-rated.component";
import { TopPopularComponent } from "../../components/top-popular/top-popular.component";
import { TopVoteComponent } from "../../components/top-vote/top-vote.component";

@Component({
  imports: [
    BannerHeroPopularComponent,
    BannerHeroRatedComponent,
    TopPopularComponent,
    TopVoteComponent
],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent { }
