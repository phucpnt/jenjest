/**
 * Created by Phuc on 12/11/2015.
 */


export default () => (src) => {
  return eval(['(',src, ')'].join(''));
}
