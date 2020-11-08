import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'watchList'
})
export class WatchListPipe implements PipeTransform {

    transform(status: boolean): string {
        if (status) {
            return "turned_in";
        } else {
            return "turned_in_not";
        }
    }

}
