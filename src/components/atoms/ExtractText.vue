<script>
export default {
  functional: true,
  props: {
    text: {
      type: String,
      required: true
    }
  },
  render(h, { props }) {
    const REG = {
      KEYWORD: {
        HASHTAG: '(?<=^|[^&\\p{L}\\p{M}\\p{Nd}_\\u200c\\u200d\\ua67e\\u05be\\u05f3\\u05f4\\u309b\\u309c\\u30a0\\u30fb\\u3003\\u0f0b\\u0f0c\\u00b7])[#|\\uFF03](?!\\uFE0F|\\u20E3)[\\p{L}\\p{M}\\p{Nd}_\\u200c\\u200d\\ua67e\\u05be\\u05f3\\u05f4\\u309b\\u309c\\u30a0\\u30fb\\u3003\\u0f0b\\u0f0c\\u00b7]*[\\p{L}\\p{M}][\\p{L}\\p{M}\\p{Nd}_\\u200c\\u200d\\ua67e\\u05be\\u05f3\\u05f4\\u301c\\u309b\\u309c\\u30a0\\u30fb\\u3003\\u0f0b\\u0f0c\\u00b7]*',
        SCREEN_NAME: '(?<=^|[^@\\w])@\\w{1,15}\\b',
        URI: 'https?:\\/\\/[\\w\\/\\$\\?\\.\\+\\-:%#&~=@]+…?'
      }
    }

    const regexp = new RegExp(`(${REG.KEYWORD.HASHTAG}|${REG.KEYWORD.SCREEN_NAME}|${REG.KEYWORD.URI})`, 'u')

    return (
      <div class="extract-text">
        {
          props.text.split(regexp).filter(Boolean).map(word => {
            if (word.match(/^#/)) {
              const encoded = encodeURIComponent(word)

              return (
                <router-link
                  class="extract-text__link"
                  to={ `/search/${encoded}` }
                  exact>
                  { word }
                </router-link>
              )
            }
            if (word.match(/^@/)) {
              return (
                <router-link
                  class="extract-text__link"
                  to={ `/${word.replace('@', '')}` }
                  exact>
                  { word }
                </router-link>
              )
            }
            if (word.match(/^http/)) {
              const [ title, href, display ] = word.split('::')

              return (
                <a
                  class="extract-text__link"
                  title={ title }
                  href={ href }
                  target="_blank">
                  { display }
                </a>
              )
            }

            return <span>{ word }</span>
          })
        }
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
  .extract-text {
    color: #1a1a1a;
    white-space: pre-line;
    word-wrap: break-word;
    line-height: 1.3125;

    &__link {
      color: #1b95e0;
      text-decoration: none;
    }
  }
</style>
