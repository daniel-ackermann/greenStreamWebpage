import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewed'
})
export class ReviewedPipe implements PipeTransform {

    transform(status: number): string {
        if (status) {
            return "verified";
        } else {
            return "unpublished";
        }
    }

}
