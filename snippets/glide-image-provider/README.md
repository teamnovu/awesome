Glide Image Provider
=================

This is just a custom provider to use nuxt-image with Statamic's [Glide](https://glide.thephpleague.com/) API.

Configure it in your `nuxt.config.js` as follows:

```javascript
export default {
  // ...
  image: {
    provider: 'glide',
    providers: {
      glide: {
        provider: '~/providers/glide-image-provider', // Path to custom provider
        options: {
          baseURL: process.env.API_BASE_URL,
        },
      },
    },
  },
}
```
