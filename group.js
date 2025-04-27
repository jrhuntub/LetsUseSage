
window.addEventListener("load", () => {
    // Initialize Sage cell
    sagecell.makeSagecell({
        inputLocation: '#sagecell',
        template: sagecell.templates.minimal,
        autoeval: false
    });

    function updateSageCode() {
        const varName = "G";
        const type = document.getElementById("groupType").value;
        const param = document.getElementById("groupParam").value;

        let code = "";
        if (type === "empty" || param == "" || param <= 0) {
            code = "# Please enter a valid group type and parameter";
        } else if (type === "Zmod") {
            code = `${varName} = Integers(${param})\nlist(${varName})`;
        } else if (type === "S") {
            code = `${varName} = SymmetricGroup(${param})\n${varName}.list()`;
        } else if (type === "D") {
            code = `${varName} = DihedralGroup(${param})\n${varName}.list()`;
        } else if (type === "A") {
            code = `${varName} = AlternatingGroup(${param})\n${varName}.list()`;
        } else {
            code = "# Please enter a valid group type and parameter";
        }

        const textarea = document.querySelector("#sagecell .sagecell_input textarea");
        if (textarea) {
            textarea.value = code;
        }
    }

    function updatePlaceholder() {
        const type = document.getElementById("groupType").value;
        const paramLabel = document.getElementById("paramLabel");

        if (type === "Zmod") {
            paramLabel.textContent = "n:";
        } else if (type === "S" || type === "D" || type === "A") {
            paramLabel.textContent = "n:";
        } else {
            paramLabel.textContent = "n:";
        }
    }

    // Attach input change listeners (AFTER page fully loads)
    document.getElementById("groupType").addEventListener("change", () => {
        updatePlaceholder();
        updateSageCode();
    });
    document.getElementById("groupParam").addEventListener("input", updateSageCode);

    // Initialize Sage code based on default values
    updateSageCode();
});
