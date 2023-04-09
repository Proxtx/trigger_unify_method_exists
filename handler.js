let appSelect = triggerGui.getElementsByClassName("appSelect")[0];
let methodSelect = triggerGui.getElementsByClassName("methodSelect")[0];

const applyOptionArray = async (elem, options) => {
  elem.innerHTML = "";
  for (let option of options) {
    let oElem = document.createElement("option");
    oElem.innerText = option;
    oElem.value = option;
    elem.appendChild(oElem);
  }
};

applyOptionArray(appSelect, Object.keys(triggerGuiData.apps));
applyOptionArray(
  methodSelect,
  Object.keys(triggerGuiData.apps[appSelect.value])
);
appSelect.addEventListener("change", () => {
  applyOptionArray(
    methodSelect,
    Object.keys(triggerGuiData.apps[appSelect.value])
  );
});

getTriggerConfiguration(() => {
  return {
    text: appSelect.value + " has method " + methodSelect.value,
    data: {
      app: appSelect.value,
      method: methodSelect.value,
    },
  };
});

if (triggerPresetData) {
  appSelect.value = triggerPresetData.app;
  applyOptionArray(
    methodSelect,
    Object.keys(triggerGuiData.apps[appSelect.value])
  );
  methodSelect.value = triggerPresetData.method;
}
