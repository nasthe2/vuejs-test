<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>

    <div class="data-table__table _header" :style="{ gridTemplateColumns: getColumnsWidth }">
      <div class="cell" v-for="item in columns" :key="item.prop">
        <strong>{{ item.label }}</strong>
      </div>
    </div>
    <div v-if="rows.length">
      <div class="data-table__table _body" :style="{ gridTemplateColumns: getColumnsWidth }" v-for="item in rows" :key="item.id">
        <div class="cell">
          <div class="label"><strong>ID</strong></div>
          <span>{{ item.id }}</span>
        </div>
        <div class="cell">
          <div class="label"><strong>Date</strong></div>
          <span>{{ formatDate(item.date) }}</span>
        </div>
        <div class="cell">
          <div class="label"><strong>Name</strong></div>
          <span>{{ item.name }}</span>
        </div>
        <div class="cell">
          <div class="label"><strong>Money</strong></div>
          <span>{{ formatMoney(item.money) }}</span>
        </div>
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
import dataFormattingMixin from '../mixins/dataFormattingMixin.vue';

export default {

  name: 'DataTable',

  mixins: [dataFormattingMixin],

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

.label
  display: none

@media (max-width: 768px)
  .data-table__filter
    margin-bottom: 20px

  .data-table__table
    &._header
      display: none
    &._body
      display: flex
      flex-direction: column
      margin-bottom: 20px
      border: 1px solid #444
      .cell
        text-align: left
        border: none

  .cell
    padding: 10px 20px

  .label
    display: block

</style>
