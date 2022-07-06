let axios = require('axios')

const action = 'ADD' // ADD, REMOVE
const types = ['FIRE', 'LAUGH', 'MINDBLOWN', 'LIKE'] // FIRE, LAUGH, MINDBLOWN, LIKE
const cookies = []

const usernameOrAddress = '' // https://deca.art/xxxx  取xxxx

;(async () => {
  const getGalleries = (usernameOrAddress, cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/graphql`,
      data: {
        query: "\n    query UserProfile($usernameOrAddress: String!, $listed: Boolean = false) {\n  me {\n    id\n    profile {\n      id\n      username\n      badges\n      addresses\n      pfp {\n        ...FullBareAsset\n      }\n      banner {\n        ...FullBareAsset\n      }\n      bio\n    }\n    following\n  }\n  profile(usernameOrAddress: $usernameOrAddress) {\n    id\n    username\n    pfp {\n      ...FullBareAsset\n    }\n    banner {\n      ...FullBareAsset\n    }\n    bio\n    twitterUsername\n    discordUsername\n    badges\n    showListings\n    addresses\n    followedByCount\n    followingCount\n    galleries {\n      ...FullGallery\n      coverNft {\n        id\n        contract\n        tokenId\n        mediaUrl\n        previewStorageKey\n        name\n      }\n    }\n    assets(listed: $listed) {\n      ...FullBareAsset\n    }\n    exists\n  }\n}\n    \n    fragment FullBareAsset on BareAsset {\n  id\n  provider\n  contract\n  tokenId\n  mediaUrl\n  previewStorageKey\n  previewMimeType\n  previewAspectRatio\n  storageKey\n  mimeType\n  tokenUrl\n  name\n  multimediaUrl\n  aspectRatio\n}\n    \n\n    fragment FullGallery on Gallery {\n  id\n  name\n  renderMode\n  showListings\n  showcase\n  views\n  sections {\n    ...FullSection\n  }\n}\n    \n\n    fragment FullSection on GallerySection {\n  id\n  position\n  simpleItems {\n    id\n    sectionId\n    asset {\n      ...FullBareAsset\n    }\n    position\n  }\n  simpleTitle\n  freestyleItems {\n    ...FullFreestyleLayoutItem\n  }\n  freestyleRows\n  freestyleColumns\n}\n    \n\n    fragment FullFreestyleLayoutItem on FreestyleLayoutItem {\n  id\n  sectionId\n  startRow\n  endRow\n  startColumn\n  endColumn\n  properties {\n    ...FullFreestyleProperties\n  }\n  asset {\n    ...FullBareAsset\n  }\n  text\n}\n    \n\n    fragment FullFreestyleProperties on FreestyleProperties {\n  objectFit\n  backgroundColor\n  zIndex\n  textColor\n  fontSize\n  relativeFontSize\n  fontName\n}\n    ",
        variables: {
          "usernameOrAddress": usernameOrAddress,
          "listed": true
        },
      },
      headers: {
        'authority': 'deca.art',
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': "application/json",
        'cookie': cookie,
        'origin': 'https://deca.art',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': "macOS",
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      }
    })
    return res
  }

  const addEmoji = (userId, reactableId, action, type, cookie) => {
    const res = axios({
      method: 'post',
      url: `https://deca.art/api/web/user/${userId}/reaction/${reactableId}?`,
      data: {
        action,
        reactableId,
        reactableType: 'GALLERY',
        type,
        userId
      },
      headers: {
        'authority': 'deca.art',
        'accept': '*/*',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'text/plain;charset=UTF-8',
        'cookie': cookie,
        'origin': 'https://deca.art',
        'pragma': 'no-cache',
        'referer': 'https://deca.art/0xDoge/gallery2',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': "macOS",
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      }
    })
    return res
  }

  for(let c = 0; c < cookies.length; c++) {
    const galleryInfo = await getGalleries(usernameOrAddress, cookies[c])
    if (galleryInfo && galleryInfo.data) {
      const info = galleryInfo.data
      const userId = info.data.me.id
      const galleries = info.data.profile.galleries
      for(let i = 0; i < galleries.length; i++) {
        for(let j = 0; j < types.length; j++) {
          const res = await addEmoji(userId, galleries[i].id, action, types[j], cookies[c])
          if (res && res.data && res.data.message === 'Ok') {
            if (action === 'ADD') {
              console.log(`🚀 ~ file: index.js ~ line 86 ~ main ~ 第${c + 1}个用户点击第${i + 1}个作品类型${types[j]}点赞成功`)
            }
          }
        }
      }
    }
  }
})();