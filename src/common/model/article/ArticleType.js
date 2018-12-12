let ArticleType = {
  DOCUMENT: 'DOCUMENT',
  ARTICLE: 'ARTICLE',
  DOCUMENT_ARTICLE: 'DOCUMENT_ARTICLE'
}
let ArticleTypeMap = {
  DOCUMENT: {
    name: '文档',
    value: 'DOCUMENT',
    style: 'success'
  },
  ARTICLE: {
    name: '文章',
    value: 'ARTICLE',
    style: 'info'
  },
  DOCUMENT_ARTICLE: {
    name: '文档中的文章',
    value: 'DOCUMENT_ARTICLE',
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
