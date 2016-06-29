import Markdown from 'markdown-it';

const HEADING_OPEN = 'heading_open';
const HEADING_CLOSE = 'heading_close';
const INLINE = 'inline';

function mdToObject(mdString) {
  const parsedTokenList = Markdown().parse(mdString, {});
  let genObj = {};
  const availSections = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  function grapHeading(tokenList) {
    let potentialInSection = false;
    let headingOpen = false;
    let headingClose = false;
    let currentSection = null;
    let sectionPath = [];

    tokenList.reduce((accum, token) => {
      if (token.type === HEADING_OPEN) {
        headingOpen = true;
      }
      if (token.type === HEADING_CLOSE) {
        headingClose = true;
      }

      if (headingOpen && token.type === INLINE) {
        currentSection = token.content;
      }

      if (headingOpen && headingClose) {
        potentialInSection = true;
        headingOpen = headingClose = false;
      }

      if (potentialInSection && currentSection) {
        sectionPath = computeSectionPath(sectionPath, token);
        accum[currentSection] = [];
      }

      return accum;
    }, {});
  }

  function getSectionOrder(tag) {
    return availSections.findIndex(tag);
  }

  function computeSectionPath(sectionPath = [], token) {
    if (!sectionPath.length) {
      return [token.tag];
    }

    const path = [].concat(sectionPath);
    const foundIndex = path.findIndex(tag => getSectionOrder(token.tag) < getSectionOrder(tag));
    if (foundIndex === -1) {
      path.push(token.tag);
    } else {
      path.splice(foundIndex, path.length - foundIndex, token.tag);
    }

    return path;
  }
}

// function originAccumParseSection(currentSection, accum, token) {
//   return accum;
// }

// const makeProcessMD = (parseSection, initialData = {
//   request: [],
//   requestData: []
// }) => {
//
//   const finalParseSection = parseSection ? parseSection(originAccumParseSection) : originAccumParseSection;
//
//   return (schemaStr) => {
//     const parsedTokenList = Markdown().parse(schemaStr, {});
//
//     let potentialInSection = false;
//     let headingOpen = false;
//     let headingClose = false;
//     let currentSection = null;
//
//     const apiTestSchema = parsedTokenList.reduce((acc, token) => {
//
//       if (token.type === 'heading_open') {
//         headingOpen = true;
//       }
//       if (token.type === 'heading_close') {
//         headingClose = true;
//       }
//
//       if (headingOpen && token.type === 'inline') {
//         currentSection = token.content;
//       }
//
//       if (headingOpen && headingClose) {
//         potentialInSection = true;
//         headingOpen = headingClose = false;
//       }
//
//       if (potentialInSection && currentSection) {
//         console.log(currentSection);
//         return finalParseSection(currentSection, acc, token);
//       }
//       return acc;
//
//     }, Immutable.fromJS(initialData));
//
//     return apiTestSchema;
//   };
// };

