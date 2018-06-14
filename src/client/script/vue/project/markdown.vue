<template>
    <div class="markdown-body" 
         v-html="compiledMarkdown"/>
</template>
<script>
// TODO: Use https://github.com/atom/markdown-preview
import marked from 'marked';

export default {
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        compiledMarkdown() {
            return marked(this.value, { sanitize: true });
        },
    },
};
</script>
<style lang="scss">
// Copy and modify from https://github.com/atom/markdown-preview/blob/master/styles/markdown-preview-github.less
@import 'primer-markdown/index.scss';

.markdown-body {
    font-weight: 400;
    padding: 20px;
    font-size: 18px;
    color: #333;
    background-color: #fff;

    a {
        color: #337ab7;
    }

    code {
        color: inherit;
    }

    pre {
        background: $dark-background;
        color: rgba(white, 0.7);
    }
}
</style>
