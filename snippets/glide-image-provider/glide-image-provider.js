import { joinURL, withQuery } from 'ufo'

function getImageURL(imageUrl, baseURL) {
  if (!imageUrl) return imageUrl

  imageUrl = /^https?:\/\//.test(imageUrl) ? imageUrl : baseURL + imageUrl
  let path = ''

  if (process.server) {
    path = '/img/http/' + Buffer.from(imageUrl).toString('base64')
  } else {
    path =
      '/img/http/' +
      btoa(
        // This is required as a fix for urls with umlaute (Source: https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings)
        encodeURIComponent(imageUrl).replace(
          /%([0-9A-F]{2})/g,
          function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1)
          }
        )
      )
  }

  return joinURL(baseURL, path)
}

export function getImage(src, { modifiers, baseURL } = {}) {
  const {
    width,
    height,
    fit,
    format,
    quality,
    background,
    ...providerModifiers
  } = modifiers

  const operations = Object.fromEntries(
    Object.entries({
      w: width,
      h: height,
      fit,
      fm: format,
      q: quality,
      bg: background,
      ...providerModifiers, // https://glide.thephpleague.com/2.0/api/quick-reference/
    }).filter(([key, value]) => value !== null && value !== undefined)
  )

  return {
    url: withQuery(getImageURL(src, baseURL), operations),
  }
}
