const view = (function () {
  let domStrings = {
    inputBTN: ".add__btn",
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    totalIncomeLbl: ".budget__income--value",
    totalExpenseLbl: ".budget__expenses--value",
    expencesPercentage: ".budget__expenses--percentage",
    expensesPercLbl: ".item__percentage",
  };

  return {
    getDOMStrings: function () {
      return domStrings;
    },
    getInput: function () {
      return {
        type: document.querySelector(domStrings.inputType).value,
        desc: document.querySelector(domStrings.inputDesc).value,
        value: document.querySelector(domStrings.inputValue).value,
      };
    },
    addListItem: function (obj, type) {
      let ispis = "";
      let element;

      if (type == "inc") {
        element = domStrings.incomeContainer;
        ispis += `
                <div class="item clearfix" id="inc-${obj.id}">
                <div class="item__description">${obj.desc}</div>
                <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn">
                            <i class="ion-ios-close-outline deleteItem${type}${obj.id}" data-id="${obj.id}" data-type="${type}"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
      } else {
        element = domStrings.expenseContainer;
        ispis += `
        <div class="item clearfix" id="exp-${obj.id}">
                            <div class="item__description">${obj.desc}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value}</div>
                                <div class="item__percentage">${obj.percentage}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn">
                                    <i class="ion-ios-close-outline deleteItem${type}${obj.id}" data-id="${obj.id}" data-type="${type}"></i></button>
                                </div>
                            </div>
                        </div>
        `;
      }

      document.querySelector(element).insertAdjacentHTML("beforeend", ispis);
    },

    clearFields: function () {
      type: document.querySelector(domStrings.inputType).value = "inc";
      desc: document.querySelector(domStrings.inputDesc).value = "";
      value: document.querySelector(domStrings.inputValue).value = "";
    },

    addToFront(data) {
      document.querySelector(domStrings.budgetLabel).textContent =
        data.budget.toFixed(2);
      document.querySelector(domStrings.totalIncomeLbl).textContent =
        data.totalInc.toFixed(2);
      document.querySelector(domStrings.totalExpenseLbl).textContent =
        data.totalExp.toFixed(2);

      if (data.percentage > 0) {
        document.querySelector(domStrings.expencesPercentage).textContent =
          data.percentage + "%";
      } else {
        document.querySelector(domStrings.expencesPercentage).textContent =
          "...";
      }
    },

    renderPercentages: function (percentages) {
      let stavke = document.querySelectorAll(domStrings.expensesPercLbl);
      console.log(stavke);
      stavke.forEach((element, index) => {
        element.textContent = percentages[index] + "%";
      });
    },

    deleteItem: function (id, type) {
      const element = document.querySelector(`#${type}-${id}`);
      element.parentElement.removeChild(element);
    },
  };
})();

export default view;
