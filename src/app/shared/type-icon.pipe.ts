import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeIcon'
})
export class TypeIconPipe implements PipeTransform {
    transform(status: string): string {
        switch (status) {
            case "article":
                return "";
            default:
                return "link";
        }
    }
}
