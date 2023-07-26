import icon from './icon.png';
import hawker from './harekmal_icon.png';
import kabbadiwala from './kabbadi_icon.png';
import sabjiwala from './sabjiwala_icon.png';
import logo from './logo.png';

const createCustomIcon = (color) => ({
    path: "M11.5 0C5.15 0 0 5.15 0 11.5C0 18.03 11.5 32 11.5 32C11.5 32 23 18.03 23 11.5C23 5.15 17.85 0 11.5 0ZM11.5 15.2C9.86 15.2 8.53 13.87 8.53 12.23C8.53 10.59 9.86 9.26 11.5 9.26C13.14 9.26 14.47 10.59 14.47 12.23C14.47 13.87 13.14 15.2 11.5 15.2ZM12.75 5.26H10.25L9.39 12.85H13.61L12.75 5.26ZM11.5 18.75C10.29 18.75 9.25 19.79 9.25 21C9.25 22.21 10.29 23.25 11.5 23.25C12.71 23.25 13.75 22.21 13.75 21C13.75 19.79 12.71 18.75 11.5 18.75Z",
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 0,
    rotation: 0,
    scale: 1,
    anchor: new window.google.maps.Point(11.5, 32),
  });

export {
    icon,
    hawker,
    kabbadiwala,
    sabjiwala,
    logo,
    createCustomIcon
}