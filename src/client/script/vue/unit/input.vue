<template>
    <div :class="{ hasIcon: icon !== '', focus: focus }" 
         class="input">
        <input v-if="type === 'text'"
               ref="text"
               :value="value"
               :placeholder="placeholder"
               type="text"
               @focus="focus = true"
               @blur="focus = false"
               @input="$emit('input', $event.target.value)">
        <input v-else-if="type === 'number'"
               ref="number"
               :value="value"
               :min="min"
               :max="max"
               :placeholder="placeholder"
               type="number"
               @focus="focus = true"
               @blur="focus = false"
               @input="updateNumber()">
        <textarea v-else-if="type === 'textarea'"
                  ref="textarea"
                  :value="value"
                  :placeholder="placeholder"
                  rows="1"
                  @focus="focus = true"
                  @blur="focus = false"/>
        <div v-if="icon !== ''"
             class="icon">
            {{ icon }}
        </div>
        <slot/>
    </div>
</template>
<script>
import style, { getAttribute } from 'style';

export default {
    components: {
        ...'row',
    },
    props: {
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: 10,
        },
        type: {
            type: String,
            default: 'text',
            validator(value) {
                return ['text', 'number', 'textarea'].indexOf(value) !== -1;
            },
        },
    },
    data() {
        return {
            focus: false,
        };
    },
    updated() {
        // TODO fix textarea
        if (this.type === 'textarea') {
            const el = this.$el.querySelector('textarea');
            el.style.height = 'auto';
            el.style.height =
                Number(el.scrollHeight + el.offsetHeight - el.clientHeight) +
                'px';
        }
    },
    mounted() {
        const size = getAttribute('size', this, 40);
        style({
            [`[size="${size}"] > .input > input`]: {
                height: `${size}px`,
                padding: `0 ${size * 0.3}px`,
                fontSize: `${size * 0.2 + 6}px`,
            },
            [`[size="${size}"] > .input.hasIcon > input`]: {
                padding: `0 ${size}px 0 ${size * 0.3}px`,
            },
            [`[size="${size}"] > .input.square > input`]: {
                width: `${size}px`,
            },
            [`[size="${size}"] > .input > textarea`]: {
                padding: `${size * 0.3}px ${size * 0.3}px`,
                fontSize: `${size * 0.2 + 8}px`,
            },
            [`[size="${size}"] > .input > .icon`]: {
                minWidth: `${size}px`,
                minHeight: `${size}px`,
                lineHeight: `${size}px`,
                fontSize: `${size * 0.4}px`,
            },
        });
    },
    methods: {
        updateNumber() {
            this.$emit('input', Number(this.$refs.number.value));
        },
    },
};
</script>
<style lang="scss">
.light {
    .input > input,
    .input > textarea {
        &:hover {
            border-bottom-color: rgba($color, 0.3);
        }
        &:focus {
            border-bottom-color: $color;
        }
    }
}

.input {
    display: flex;
    position: relative;
    > input,
    > textarea {
        box-sizing: border-box;
        border-style: solid;
        border-color: transparent;
        border-width: 2px 0;
        background: transparent;
        &:focus {
            outline: 0;
        }
    }
    > input[type='text'],
    > input[type='number'] {
        font-family: 'Segoe UI', 'Segoe WP', Tahoma, Arial, sans-serif;
        min-width: 1em;
        width: 100%;
        text-overflow: ellipsis;
    }

    > textarea {
        font-family: 'Segoe UI', 'Segoe WP', Tahoma, Arial, sans-serif;
        width: 100%;
        resize: none;
        overflow: hidden;
        box-sizing: border-box;
    }
    > input[type='number'] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }

    > .icon {
        position: absolute;
        text-align: center;
        right: 0;
    }

    > .dropdown {
        position: absolute;
        top: 100%;
        height: 50px;
        width: 100%;
    }
}
</style>
