const model = (function () {
  const Income = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = parseFloat(value);
  };
  const Expense = function (id, desc, value) {
    this.id = id;
    this.desc = desc;
    this.value = parseFloat(value);
    this.percentage = -1;
  };

  Expense.prototype.calculatePercentage = function (totalExp) {
    if (totalExp > 0) {
      this.percentage = Math.round((this.value / totalExp) * 100);
    } else {
      this.percentage = -1;
    }
  };

  let state = {
    allObject: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    percentage: -1,
  };

  const calculateTotal = function (type) {
    let suma = 0;
    state.allObject[type].forEach((element) => {
      suma += element.value;
    });

    state.totals[type] = suma;
  };

  return {
    addItem: function (type, desc, value) {
      let id, objekat;
      if (state.allObject[type].length > 0) {
        id = state.allObject[type][state.allObject[type].length - 1].id + 1;
      } else {
        id = 1;
      }

      if (type == "inc") {
        objekat = new Income(id, desc, value);
      } else {
        objekat = new Expense(id, desc, value);
      }

      state.allObject[type].push(objekat);

      return objekat;
    },

    calculateBudget: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      state.budget = state.totals.inc - state.totals.exp;
      if (state.totals.inc > 0) {
        state.percentage = Math.round(
          (state.totals.exp / state.totals.inc) * 100
        );
      } else {
        state.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: state.budget,
        totalInc: state.totals.inc,
        totalExp: state.totals.exp,
        percentage: state.percentage,
      };
    },

    calculatePercentages: function () {
      state.allObject.exp.forEach((element) => {
        element.calculatePercentage(state.totals.exp);
      });
    },

    getPercentages: function () {
      const percentages = state.allObject.exp.map((elem) => elem.percentage);
      return percentages;
    },

    deleteItem: function (id, type) {
      let indexDel = -1;
      state.allObject[type].forEach((element, index) => {
        if (id == element.id) {
          indexDel = index;
        }
      });

      if (indexDel != -1) {
        state.allObject[type].splice(indexDel, 1);
      }

    },
  };
})();

export default model;
