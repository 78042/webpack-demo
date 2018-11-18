import '../css/style.scss'
import { child, info } from './app.child';
import { common } from './common';

const test = text => {
  console.log(text);
  console.log(`this is weq ${text}`)
}
test('hi');
child.child();
common.common();
