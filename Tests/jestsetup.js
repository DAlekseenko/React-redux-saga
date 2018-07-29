import { shallow, render, mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.shallow = shallow;
global.render = render;
global.mount = mount;

configure({ adapter: new Adapter() });

console.error = message => {
    throw new Error(message);
};