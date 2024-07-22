import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state() {
    return {
      isDrawerOpen: false
    }
  },
  actions: {
    switchDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    }
  }
})
