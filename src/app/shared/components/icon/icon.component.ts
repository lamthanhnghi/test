import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

type IconNamespace = 'normal' | 'color';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class IconComponent {
  _style: any = {};

  _size = '';

  @Input() classes = '';

  @Input() set size(value: string | number) {
    // accept regex 24x24, 24, 24px, 24em, 24rem, 24x25
    const regex = /(\d+)(?:x(\d+))?/;
    const match = value.toString().match(regex);
    if (match) {
      this._size = `${match[1]}x${match[2] || match[1]}`;
      // size to font size
      const fontSize = `${Number(match[1]) / 16}rem`;
      const width = `${Number(match[1]) / 16}rem`;
      const height = `${Number(match[2] || match[1]) / 16}rem`;
      this._style = {
        width,
        height,
        fontSize,
        color: this._colorStyle,
      };
    } else {
      throw new Error('Invalid size; \n Must be in the format of 24x24, 24, 24px, 24em, 24rem, 24x25');
    }
  }

  _name = '';

  @Input() set name(value: string) {
    // regex namespace:icon-name-any-characters
    const regex = /(?:([a-z0-9-]+):)?([a-z0-9-]+)/;
    const match = value.match(regex);
    if (!match) {
      throw new Error('Invalid name; \n Must be in the format of namespace:iconName or iconName');
    } else {
      const namespace: IconNamespace = match[1] as IconNamespace;
      const iconName = match[2] || match[1];
      if (namespace) {
        this._name = `assets/icons/${namespace}-icons.svg#${iconName}`;
      } else {
        this._name = `assets/icons/icons.svg#${iconName}`;
      }
    }
  }

  _colorStyle = '';
  _colorClass = '';
  @Input() set color(value: string) {
    // could be hex, rgb, rgba, hsl, hsla, class
    // regex hex , rgb, rgba, hsl, hsla
    const regex =
      /(?:#([a-f0-9]{3}|[a-f0-9]{6})|(?:rgb|hsl)a?\((\d+),\s*(\d+)%?,\s*(\d+)%?(?:,\s*(\d+(?:\.\d+)?%?))?\))/;
    const match = value.match(regex);
    if (match) {
      this._colorStyle = value;
      this._style = { ...this._style, color: value };
    } else if (value.startsWith('text-')) {
      this._colorClass = value;
    }
  }
}
