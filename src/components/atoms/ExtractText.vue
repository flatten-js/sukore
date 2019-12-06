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
        HASHTAG: '#(?:[\\w]|[^\\x01-\\x7e])+',
        SCREEN_NAME: '@[\\w]+?',
        URL: 'https?:\\/\\/[\\w\\/\\$\\?\\.\\+\\-:%#&~=@]+…?'
      },
      FRONT_REAR: '[^\\x01-\\x7e]|[\\x09-\\x0c\\x20\\x21\\x28\\x29\\x2b-\\x2f\\x3a\\x3b\\x3d\\x3f\\x5b-\\x5e\\x60\\x7b-\\x7e]'
    }

    const combineRegExp = new RegExp(`(?<=^|${REG.FRONT_REAR})(${REG.KEYWORD.HASHTAG}|${REG.KEYWORD.SCREEN_NAME}|${REG.KEYWORD.URL})(?=$|&|${REG.FRONT_REAR})`, 'g')

    return (
      <div class="extract-text">
        {
          props.text.split(combineRegExp).map(word => {
            if (word.match(new RegExp(`^${REG.KEYWORD.HASHTAG}`))) {
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
            if (word.match(new RegExp(`^${REG.KEYWORD.SCREEN_NAME}`))) {
              return (
                <router-link
                  class="extract-text__link"
                  to={ `/${word.replace('@', '')}` }
                  exact>
                  { word }
                </router-link>
              )
            }
            if (word.match(new RegExp(`^${REG.KEYWORD.URL}`))) {
              const [ title, href, display, ...none ] = word.split('::')

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
    white-space: pre-line;
    word-wrap: break-word;

    &__link {
      color: #1b95e0;
      text-decoration: none;
    }
  }
</style>
