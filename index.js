let axios = require('axios')

const action = 'ADD' // ADD, REMOVE
const types = ['FIRE', 'LAUGH', 'MINDBLOWN', 'LIKE'] // FIRE, LAUGH, MINDBLOWN, LIKE
const cookies = [
  '__Host-next-auth.csrf-token=7993a94285bed912afee738c4c67d8f4b7bedf6f1120a559343b79e9d726bff9%7Cbe86417afdcaa600150cdd78b35a3a610b09515be9ffaaaa5ab1745053957ba1; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art; _hp2_ses_props.3997967461=%7B%22ts%22%3A1657120132727%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fsushiswap%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%228152506278884986%22%2C%22pageviewId%22%3A%225526175741743024%22%2C%22sessionId%22%3A%221015441688158789%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..25JJMF0epahiQkN5.tAV72gE00CppGV3yhQCCEavGuiqMWIXHkiECaXPSBPvxvD4Ih9ai1GK-RnLomGwBBmt3BUcseXSTaOaD2gWfYTZZu_w4yKN4-o2qsny23gQi6SmLi781xnef_7gstlhaRN1BBe_AYaTepoimqXe9l2zOl8OalQzFij4iZLr-2uk.3jPBhpeixp9ybuG1vmmI1w',
  '__Host-next-auth.csrf-token=29be68f2dfc9b9ae8d0d99e30c3ac777e9ab41be80d7859594de59c161d79328%7Cf4625917e25bb84d9950d652ad652c2d9ce8fe3e8ae4d1209bc09911eb90cefc; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fupgrade; _hp2_ses_props.3997967461=%7B%22ts%22%3A1657123416302%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Famazing%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224864877018598754%22%2C%22pageviewId%22%3A%225603366261026664%22%2C%22sessionId%22%3A%22272125973596013%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..jHeVaOJTrFtpRRXm.hpE3QWiyqsYZwyVP1Mdg_TFPr5ZVZ1jKGp5OIPapZgaif8E3OvmdJ27LmSgpzX2yQAtvIl3FTk1dml3KQqyVZ6jPzN98xpaiEU9WYb7z8CCxrOhFiWLOCfCpPd2A6AHsWA4amQh-c9WxEA-ivmQ_nv5hIB69BuoicxYfeKhjA6v00tcA3mXTaDsFo5xQ6Dbgr8_gfwbKlDx-Bs1wgVZ6Nxv8RqP56Sw5.Q9qAJsxPZ3K3t2TFGiCMhg',
  '__Host-next-auth.csrf-token=26867a6914a791d11e25a68429a5616aea1ec20bb83689b99bf58a4ecc07d935%7Cade8cffe59370e8c8b8e46071c790833e902289a335fde82da7cc409386b1633; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fupgrade; _hp2_ses_props.3997967461=%7B%22ts%22%3A1657123157373%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Famazing%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%22872283510092711%22%2C%22pageviewId%22%3A%222637927232840709%22%2C%22sessionId%22%3A%228286688520606128%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..5Nd4vflE3_8Hak0u.4J_Te1xsruMvMbPpVNRZCegiGKCy0aJaVj6JJ5vcMrzR5olyjH_IEyHdk6VZYVC2snsoPVGpiv7_yAdzBIVHpNy434tpZnJKZaQVJoIqx0Oq64V6jx8kljjvoTivzvObqLv8V3yL-l-ieLiVjfajpkm_MAJytyyR6nZAMk6TryQQAqskD5vu939eadbiCHvwRwftdlkWJnRuDwzsJVrNfvTrn1No5AFW.KklSXPpXVBMG4jyJfKl9oA',
  '__Host-next-auth.csrf-token=33a40b410c33b27092c303be6ab82db5fccf28a711ce4dc4f787cc2fd16a9c6f%7Cdb08a60d549f78d65b2be12fb6701339cffab245cf5796091d7ccfdc7e442771; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fupgrade; _hp2_ses_props.3997967461=%7B%22ts%22%3A1657123958234%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fundefine%22%7D; _hp2_id.3997967461=%7B%22userId%22%3A%224345641330196707%22%2C%22pageviewId%22%3A%223648873756635010%22%2C%22sessionId%22%3A%225630913383761872%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..baX8Te9nBaWAAhbV.P_5S3xkFcAZa0MQpqVQSdgtJEWvGQWvb2YTKgZiJt17kb0WkmBvxtURa1JaxSPx725nbdwV66B67TPo0ISrL-0z0IBGhsQmSdk-jkWrL5Xcj9NgiZA7b_5fn8hOJqFXc_cQHces-f5omNrgnS7TKZi2V_QrIdWMDs2hZZZaIeJQJ9r1kCei2g-mLrUXpt9gj3QvIW4uEZrCH-J-EAgifGtxim78lq6ye.aTndk5WSDGt4ILn7YSUvGg',
  '__Host-next-auth.csrf-token=5d91219f007d5993a341da20a96d8b66fba26d759ee4a489804263f19a94fd56%7C9583fd33887a065640193d975531b882f75844350b74c4a6d423bfe89188ae1d; __Secure-next-auth.callback-url=https%3A%2F%2Fdeca.art%2Fdecagon%2Fupgrade; _hp2_id.3997967461=%7B%22userId%22%3A%225554369726775283%22%2C%22pageviewId%22%3A%223592904702960163%22%2C%22sessionId%22%3A%221499473463111617%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _hp2_ses_props.3997967461=%7B%22ts%22%3A1657124788404%2C%22d%22%3A%22deca.art%22%2C%22h%22%3A%22%2Fcashmoney%22%7D; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..aR67wote6yNndrne.HsAtlTzBFVm75h_p_IkKU_Hjn_onpdwayxls8LmJ3UeAQHVfgYF1Ox2zv1qmSrjX52c7YSHnyaU8cvuErU87s_7_Kz0Zwlbij4DwCQbjMQjbgoO6Cf7Yigy0L7SjY0Q4iOqncYrIevNFMithZI-_jCQI0jXMSr7USqAuFGw91seNWXz-BsHfFQ_4VXgGKz2hYwdenHu4ilW-4yJTgsd5rYisqF0cXmi7.DqEOIqbzn-QmMRHdnquASQ'
]

const usernameOrAddress = 'cashmoney' // https://deca.art/xxxx  取xxxx

const main = async () => {
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

}

main()
