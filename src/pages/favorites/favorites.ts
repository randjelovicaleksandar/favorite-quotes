import { Component } from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {Quote} from "../quote/quote.interface";
import {QuotesService} from "../../services/quotes";
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings";

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(private quoteService: QuotesService, private modalCtrl: ModalController,
              private settingsService: SettingsService) {}

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavouriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if(remove) {
        this.onRemoveFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quoteService.removeQuoteFromFavourites(quote);
    // this.quotes = this.quoteService.getFavouriteQuotes();
    const position = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position, 1);
    //  Moze i kao ovo sto je zakomentarisano ali ovo je bolji nacin da samo izbacimo jednu iz niza
    // nego da updajtujemo ceo niz ponovo
  }

  getBacground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }
}
