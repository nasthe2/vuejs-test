<script>
export default {
  methods: {
    formatDate(date) {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('ru');
    },

    formatMoney(money) {
      const parts = money.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    },
  },
};
</script>
