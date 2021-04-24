import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'likeIcon'
})
export class LikeIconPipe implements PipeTransform {

    transform(status: number): string {
        if (status) {
            return "favorite";
        } else {
            return "favorite_border";
        }
    }

}
