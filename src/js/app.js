import '../css/style.scss'
import { child, info } from './app.child';
import { common } from './common';
import '../vendor/css/a.css'
import $ from '../vendor/js/jquery'
const test = text => {
  console.log(text);
  console.log(`this i1s22 weq ${text}`)
}
$('body').css('background','red')
test('hi');
child.child();
common.common();
