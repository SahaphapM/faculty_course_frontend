import { defineStore } from 'pinia'

export const searchStore = defineStore('search-store', {
  state() {
    return {
      text: '',
      isDialogOpen: false
    }
  },
  actions: {
    switchToggle() {
      this.isDialogOpen = !this.isDialogOpen
    }
  }
})
