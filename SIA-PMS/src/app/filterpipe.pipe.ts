import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(objects: any[]): any {
    if (objects) {
      return objects.filter(object => {
        return object.data.type === 1;
      });
    }
  }

}
