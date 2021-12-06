<template>
  <input
    type="text"
    v-model="valueInput"
    class="ui-money"
    @input="onInput"
  />
</template>

<script>
import dataFormattingMixin from '@/mixins/dataFormattingMixin.vue';

export default {

  name: 'UiMoney',

  mixins: [dataFormattingMixin],

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
      numberInput: '',
    };
  },

  methods: {
    onInput() {
      this.formatValue();
      this.updateFilter();
    },

    formatValue() {
      const parts = this.valueInput.replace(/,/g, '.').split('.');
      const onlyNumbersParts = parts.map((item, index) => {
        const onlyNumbers = item.replace(/[^0-9.]/g, '');
        return (index === 0 && item) || (index === 1) ? this.formatMoney(onlyNumbers) : onlyNumbers.substr(0, 2);
      });

      if (onlyNumbersParts.length === 1) {
        this.valueInput = `${onlyNumbersParts[0]}`;
      } else if (onlyNumbersParts[0] && !onlyNumbersParts[1]) {
        this.valueInput = `${onlyNumbersParts[0]}.`;
      } else if (onlyNumbersParts[0] && onlyNumbersParts[1]) {
        this.valueInput = `${onlyNumbersParts[0]}.${onlyNumbersParts[1].substr(0, 2)}`;
      } else if (!onlyNumbersParts[0]?.length && onlyNumbersParts[1]?.length) {
        this.valueInput = `${onlyNumbersParts[1]}`;
      }

      this.numberInput = this.valueInput.replace(/\s/g, '');
    },

    updateFilter() {
      this.$emit('input', this.numberInput ? Number(this.numberInput) : undefined);
    },
  },
};
</script>
