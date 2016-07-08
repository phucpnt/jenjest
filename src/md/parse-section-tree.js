
import Markdown from 'markdown-it';
import _ from 'lodash';

const HEADING_OPEN = 'heading_open';
const HEADING_CLOSE = 'heading_close';
const INLINE = 'inline';

export default function mdToTree(pickFocusToken = () =>null, mdString) {
  const parsedTokenList = Markdown().parse(mdString, {});
  const availSections = ['h2', 'h3', 'h4', 'h5', 'h6'];

  function buildSectionTree(tokenList) {
    let potentialInSection = false;
    let headingOpen = false;
    let headingClose = false;
    let currentSection = null;
    let sectionPath = [];

    return tokenList.reduce((tree, token) => {
      if (token.type === HEADING_OPEN) {
        headingOpen = true;
      }
      if (token.type === HEADING_CLOSE) {
        headingClose = true;
      }

      if (headingOpen && token.type === INLINE) {
        currentSection = token.content;
      }

      if(headingOpen && headingClose && availSections.indexOf(token.tag) === -1){
        headingOpen = headingClose = false;
      }

      if (headingOpen && headingClose && availSections.indexOf(token.tag) >= 0) {
        potentialInSection = true;
        headingOpen = headingClose = false;
        sectionPath = computeSectionPath(sectionPath, {tag: token.tag, name: currentSection}, token);
      }

      if (potentialInSection && currentSection) {
        const focusToken = pickFocusToken(token);
        if (focusToken) {
          tree.push({ sectionPath: sectionPath.map(({name}) => _.snakeCase(name)).join('.'), focusToken });
        }
      }

      return tree;
    }, []);
  }

  function getSectionOrder(tag) {
    return availSections.findIndex(item => item === tag);
  }

  function computeSectionPath(sectionPath = [], section, token) {
    if (!sectionPath.length) {
      return [section];
    }

    const path = [].concat(sectionPath);
    const foundIndex = path.findIndex(({tag, name}) => getSectionOrder(token.tag) <= getSectionOrder(tag));
    if (foundIndex === -1) {
      path.push(section);
    } else {
      path.splice(foundIndex, path.length - foundIndex, section);
    }

    return path;
  }

  return buildSectionTree(parsedTokenList);
}
