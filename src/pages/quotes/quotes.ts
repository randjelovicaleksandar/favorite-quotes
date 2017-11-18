import { Component } from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {Quote} from "../quote/quote.interface";
import {QuotesService} from "../../services/quotes";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quoteGroup: { category: string, quotes: Quote[], icon: string }[];

  constructor(private navParams: NavParams, private alertCtrl: AlertController,
              private quoteService: QuotesService) {
  }

  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // } Lakse je da koristimo ngOnInit jer ce se html template ucitati nakon podataka
  // tako da nece bacati gresku sto moze da se desi sa ionViewDidLoad
  // Resenje za ovo bi bilo da se stavi ? nakon quoteGroup da mu da znak da treba da saceka podatke

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorite(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            console.log('Ok');
            this.quoteService.addQuoteToFavourites(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel', //feature: ovo dugme kaze ionicu kada ides na back dugme da ukloni alert
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    })

    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quoteService.removeQuoteFromFavourites(quote);
  }

  isFavorite(quote: Quote) {
    return this.quoteService.isQuoteFavourite(quote);
  }
}
