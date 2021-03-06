let ArticleType = {
  ARTICLE: 'ARTICLE',
  DOCUMENT: 'DOCUMENT',
  DOCUMENT_PLACEHOLDER_ARTICLE: 'DOCUMENT_PLACEHOLDER_ARTICLE',
  DOCUMENT_ARTICLE: 'DOCUMENT_ARTICLE',
  DOCUMENT_BLANK: 'DOCUMENT_BLANK',
  DOCUMENT_URL: 'DOCUMENT_URL'
}
let ArticleTypeMap = {
  ARTICLE: {
    name: '文章',
    value: 'ARTICLE',
    style: 'info'
  },
  DOCUMENT: {
    name: '文档',
    value: 'DOCUMENT',
    style: 'success'
  },
  DOCUMENT_PLACEHOLDER_ARTICLE: {
    name: '文档-占位文章',
    value: 'DOCUMENT_PLACEHOLDER_ARTICLE',
    style: 'primary'
  },
  DOCUMENT_ARTICLE: {
    name: '文档-文章',
    value: 'DOCUMENT_ARTICLE',
    style: 'primary'
  },
  DOCUMENT_BLANK: {
    name: '文档-节点',
    value: 'DOCUMENT_BLANK',
    style: 'primary'
  },
  DOCUMENT_URL: {
    name: '文档-链接',
    value: 'DOCUMENT_URL',
    style: 'primary'
  }
}


let ArticleTypeList = [];
for (let key in ArticleTypeMap) {
  if (ArticleTypeMap.hasOwnProperty(key)) {
    ArticleTypeList.push(ArticleTypeMap[key]);
  }
}

export {ArticleType, ArticleTypeMap, ArticleTypeList}
