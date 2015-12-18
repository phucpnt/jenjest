/**
 * Created by Phuc on 12/11/2015.
 */


export default () => (...availFun) => (src) => {
  return Function.prototype.constructor.call(null, ...availFun, `return (${src});`);
}
