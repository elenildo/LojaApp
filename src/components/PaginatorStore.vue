<template>
  <div class="mt-2">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="prevPage">Anterior</a>
        </li>
        <li v-for="page, index in this.pages" :key="index" class="page-item" :class="{active: source.number == (page-1)}">
          <a class="page-link" href="#" @click.prevent="navigate(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click.prevent="nextPage">Próximo</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'PaginatorStore',
  props: ['source'],
  data() {
    return {
      pages: [],
      currentPage: 1
    }
  },
  watch: {
    source() {
      // const numbers = Array.from({ length: this.source.totalPages }, (_, i) => i + 1)
      this.pages = this.generatePagesArray(this.currentPage, this.source.totalElements, this.source.size, 6)
    }
  },
  methods: {
    navigate(page) {
      this.$emit('navigate', page)
      this.currentPage = page
    },
    nextPage() {
      if (this.source.last) return
      this.currentPage++
      this.navigate(this.currentPage)
    },
    prevPage() {
      if (this.source.first) return
      this.currentPage--
      this.navigate(this.currentPage)
    },
    generatePagesArray: function (currentPage, collectionLength, rowsPerPage, paginationRange) {
      var pages = [];
      var totalPages = Math.ceil(collectionLength / rowsPerPage);
      var halfWay = Math.ceil(paginationRange / 2);
      var position;

      if (currentPage <= halfWay) {
        position = 'start';
      } else if (totalPages - halfWay < currentPage) {
        position = 'end';
      } else {
        position = 'middle';
      }

      var ellipsesNeeded = paginationRange < totalPages;
      var i = 1;
      while (i <= totalPages && i <= paginationRange) {
        var pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
        var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
        var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
        if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
          pages.push('...');
        } else {
          pages.push(pageNumber);
        }
        i++;
      }
      return pages;
    },

    calculatePageNumber: function (i, currentPage, paginationRange, totalPages) {
      var halfWay = Math.ceil(paginationRange / 2);
      if (i === paginationRange) {
        return totalPages;
      } else if (i === 1) {
        return i;
      } else if (paginationRange < totalPages) {
        if (totalPages - halfWay < currentPage) {
          return totalPages - paginationRange + i;
        } else if (halfWay < currentPage) {
          return currentPage - halfWay + i;
        } else {
          return i;
        }
      } else {
        return i;
      }
    }
  },
}
</script>