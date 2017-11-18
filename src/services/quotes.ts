import {Quote} from "../pages/quote/quote.interface";
import {Injectable} from "@angular/core";

@Injectable()
export class QuotesService {
  private favouriteQuotes: Quote[] = [];

  addQuoteToFavourites(quote: Quote) {
     this.favouriteQuotes.push(quote);
  }

  removeQuoteFromFavourites(quote: Quote) {
    const position = this.favouriteQuotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    })
    this.favouriteQuotes.splice(position, 1);
    // finIndex vrlo zanimljiva metoda za dobijanje indexa u nizu po zadatom kriterijumu,
    //pogledaj na netu, lagano je
  }

  getFavouriteQuotes() {
    return this.favouriteQuotes.slice();//vracamo ovo kako bi vratili kopiju, a ne original
  }

  isQuoteFavourite(quote: Quote) {
    return this.favouriteQuotes.find((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
  }
}
