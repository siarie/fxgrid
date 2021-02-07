import pkg from './package.json';

function fxgrid() {
  return `${pkg.name}:${pkg.version}`;
}

export default fxgrid;
