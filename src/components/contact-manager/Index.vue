<template>
  <div class="contact-manager">
    <h1>Contact manager exercise</h1>
    <div class="actions">
      <Search @change="handleSearchQuery" :query="searchQuery" />
    </div>
    <div class="body">
      <ContactCreate @create="create" />
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
import debounce from "lodash/debounce";

import ContactCreate from "@/components/contact-manager/Create";
import ContactShow from "@/components/contact-manager/Show";
import Search from "@/components/contact-manager/Search";

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
    },
    handleSearchQuery(event) {
      this.searchQuery = event.target.value;
    },
    filterContacts(query = "") {
      if (isEmpty(query)) {
        this.resetList();
      }
      const regExp = new RegExp(query, "gi");
      const results = Object.values(this.contacts).filter((contact) => {
        return regExp.test(contact.firstname) ||
          regExp.test(contact.lastname) ||
          regExp.test(contact.email)
      });
      this.orderedContacts = results;
    },
    sortContacts(contacts = []) {
      return contacts.sort((prev, next) =>
        prev.firstname.localeCompare(next.firstname) < 0 ? -1 : 1);
    },
    remove(obj = {}) {
      this.contacts = omit(this.contacts, obj.id);
    },
    resetSearch() {
      this.searchQuery = "";
    },
    resetList() {
      this.orderedContacts = this.sortContacts(Object.values(this.contacts));
    }
  },
  watch: {
    searchQuery: debounce(function(newVal) {
      this.filterContacts(newVal);
    }, 200),
    contacts() {
      this.filterContacts(this.searchQuery);
    }
  }
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
