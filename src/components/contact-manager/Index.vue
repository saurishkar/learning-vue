<template>
  <div class="contact-manager">
    <h1>Contact manager exercise</h1>
    <div class="actions">
      <Search @change="handleSearchQuery" :query="searchQuery" />
    </div>
    <div class="body">
      <ContactCreate :create="create" />
      <div class="contact-list">
        <ContactShow
          v-for="contact in orderedContacts"
          :key="contact.id"
          :contact="contact"
          @remove="remove"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import omit from "lodash/omit";

import ContactCreate from "./Create";
import ContactShow from "./Show";
import Search from "./Search";

import { uniqIdGenerator } from "@/helpers/resource";
import { isEmpty } from "@/helpers/validate";

export default {
  name: "ContactManager",
  components: {
    ContactCreate,
    ContactShow,
    Search,
  },
  data() {
    return {
      contacts: {},
      searchQuery: "",
      orderedContacts: []
    };
  },
  methods: {
    create(obj = {}) {
      obj = { ...obj, id: uniqIdGenerator() };
      this.contacts = {
        ...this.contacts,
        [obj.id]: obj,
      };
      this.resetSearch();
      this.resetList();
    },
    handleSearchQuery(event) {
      this.searchQuery = event.target.value;
      this.filterContacts(this.searchQuery);
    },
    filterContacts(query = "") {
      if (isEmpty(query)) {
        this.resetList();
      }
      const regExp = new RegExp(query, "gi");
      const results = this.orderedContacts.filter((contact) => {
        return regExp.test(contact.firstname) ||
          regExp.test(contact.lastname) ||
          regExp.test(contact.email)
      });
      this.orderedContacts = results;
    },
    sortContacts(contacts = []) {
      this.orderedContacts = contacts.sort((prev, next) =>
        prev.firstname.localeCompare(next.firstname) < 0 ? -1 : 1);
    },
    remove(obj = {}) {
      this.contacts = omit(this.contacts, obj.id);
      this.sortContacts(Object.values(this.contacts));
    },
    resetSearch() {
      this.searchQuery = "";
    },
    resetList() {
      this.sortContacts(Object.values(this.contacts));
    }
  },
};
</script>

<style type="text/css" scoped>
  .contact-list {
    display: inline-flex;
    width: 100%;
  }
  .actions {
    padding: 0 2em;
    margin-top: 2em;
  }
</style>
