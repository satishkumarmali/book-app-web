import Vue from "vue";
import axios from "@/plugins/axios.js";
require("./shilp-vue");
//V-Date
// import VCalendar from "v-calendar";
// Vue.use(VCalendar);

//Vue2Datepicker

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
Vue.component("date-picker", DatePicker);

//Vue Multi Select
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
Vue.component('multiselect', Multiselect);

//Vue Select
import vSelect from "vue-select";
Vue.component("v-select", vSelect);

//Vue The Mask
import VueTheMask from "vue-the-mask";
Vue.use(VueTheMask);

/**
 * Portal Vue
 */

import PortalVue from "portal-vue";
Vue.use(PortalVue);

//Lodash
import _ from "lodash";

/**
 * Vee Validate
 */
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, numeric, email } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en";

const rules = {
  required,
  numeric,
  email,
};

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule], // add its message
  });
}

extend("url", {
  validate: (value) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return value.match(new RegExp(regex));
  },
});

extend("alpha_special", {
  validate: (value) => {
    const regex = /^([^0-9]*)$/g;
    return value.match(new RegExp(regex));
  },
});

extend("group_coder", {
  validate: (value) => {
    const regex = /^[a-zA-Z0-9]{5}$/g;
    return value.match(new RegExp(regex));
  },
  message: `Invalid Group Code. It must be a 5 digit unique code.`,
});

extend("max_length", {
  validate: (value) => {
    const regex = /^.{2,4}$/g;
    return value.match(new RegExp(regex));
  },
});

extend("dl", {
  params: ["target"],
  validate: (value, { target }) => {
    if (value && !target) {
      return "Please also upload other side of a Driving Licence";
    } else {
      return true;
    }
  },
});

extend("fix_code", {
  validate: (value) => {
    const regex = /^.{5}$/g;
    return value.match(new RegExp(regex));
  },
  message: `Please enter 5 digit zipcode.`,
});

extend("npi_number", {
  validate: (value) => {
    const regex = /^.[0-9]{9}$/g;
    return value.match(new RegExp(regex));
  },
  message: `Please enter only number with 10 digit.`,
});

extend("licence", {
  validate: (value) => {
    const regex = /^.[A-Z-0-9]*$/g;
    return value.match(new RegExp(regex));
  },
  message: `Please enter uppercase and number.`,
});

extend("strong_password", {
  validate: (value) => {
    const regex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})((?=.*[0-9]){1})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/g;
    return value.match(new RegExp(regex));
  },
  message: `Invalid Password: To meet the required security level, your password must be between 8 - 32 characters long and include at least 3 of the following character types: English alphabet uppercase letter (A-Z) English alphabet lowercase letter (a-z) Decimal digit number (0-9) and a special character (!"#$%&'()* +,-./:;<=>?@[\]^_{|}~)`,
});

extend("multiple_email", {
  validate: (value) => {
    const regex = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},*[\W]*)+$/g;
    return value.match(new RegExp(regex));
  },
  message: `Invalid E-mail Address`,
});

extend("price", {
  validate: (value) => {
    const regex = /^\d{0,8}(\.\d{1,4})?$/g;
    return value.match(new RegExp(regex));
  },
  message: `Invalid pricing`,
});

extend("check-primary-office", {
  validate: (value) => {
    return value.some((item) => item.is_preferred);
  },
  message: `Please select a primary office.`,
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
