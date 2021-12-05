<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>

    <div class="data-table__table" :style="{ gridTemplateColumns: getColumnsWidth }">
      <div class="cell" v-for="item in columns" :key="item.prop">
        <strong>{{ item.label }}</strong>
      </div>
    </div>
    <div v-if="rows.length">
      <div class="data-table__table _body" :style="{ gridTemplateColumns: getColumnsWidth }" v-for="item in rows" :key="item.id">
        <div class="cell">{{ item.id }}</div>
        <div class="cell">{{ item.date }}</div>
        <div class="cell">{{ item.name }}</div>
        <div class="cell">{{ item.money }}</div>
      </div>
    </div>

    <div class="data-table__paginator">
      <ui-pagination
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },

    getColumnsWidth() {
      return this.columns.reduce((acc, item) => {
        return acc + item.width;
      }, '');
    },
  },
};
</script>

<style lang="sass">

.data-table__filter
  display: flex
  justify-content: flex-end
  margin-bottom: 10px

.data-table__table
  display: grid
  color: #444
  &._body
    .cell
      border-top: none

.cell
  color: #444
  padding: 20px
  font-size: 150%
  text-align: center
  border: 1px solid #444
  &:not(:first-child)
    border-left: none
</style>
