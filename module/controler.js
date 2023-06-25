var controler = function (model, view) {
  let postaviSlusaoce = function () {
    let DOM = view.getDOMStrings();

    document.querySelector(DOM.inputBTN).addEventListener("click", ctrlAddItem);
  };

  let postaviNaStavku = function (id, type) {
    document
      .querySelector(`.deleteItem${type}${id}`)
      .addEventListener("click", ctrlDeleteItem);
  };

  let ctrlDeleteItem = function () {
    let id = this.dataset.id;
    let type = this.dataset.type;

    model.deleteItem(id, type);
    view.deleteItem(id, type);
    updateBudget();
    updatePercentages();
  };

  let ctrlAddItem = function () {
    let vrednost = view.getInput();

    let noviObjekat = model.addItem(
      vrednost.type,
      vrednost.desc,
      vrednost.value
    );
    view.addListItem(noviObjekat, vrednost.type);
    postaviNaStavku(noviObjekat.id, vrednost.type);
    updateBudget();
    view.clearFields();
    updatePercentages();
  };

  let updateBudget = function () {
    model.calculateBudget();
    let budget = model.getBudget();
    view.addToFront(budget);
  };

  let updatePercentages = function () {
    model.calculatePercentages();
    let percentages = model.getPercentages();

    view.renderPercentages(percentages);
  };

  return {
    init: function () {
      postaviSlusaoce();
      view.addToFront({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
    },
  };
};

export default controler;
