window.addEventListener("load", () => {
    // Initialize the Sage Cell
    sagecell.makeSagecell({
        inputLocation: '#sagecell',
        template: sagecell.templates.minimal,
        autoeval: false
    });

    function updateSageCode() {
        const type = document.getElementById("groupType").value;
        const n = document.getElementById("groupParam").value;

        let code = "";

        if (type === "empty" || n === "" || n <= 0) {
            code = "# Please select a valid group type and a positive value of n.";
        } else {
            // Choose group definition
            let groupDef = "";
            let isZmod = false;  // NEW

            if (type === "Zmod") {
                groupDef = `G = Integers(${n})`;
                isZmod = true;
            } else if (type === "S") {
                groupDef = `G = SymmetricGroup(${n})`;
            } else if (type === "D") {
                groupDef = `G = DihedralGroup(${n})`;
            } else if (type === "A") {
                groupDef = `G = AlternatingGroup(${n})`;
            } else {
                groupDef = "# Invalid group type";
            }

            // Build the full Sage code
            code = `
    ${groupDef}
    
output = []
    
for g in G:
    cyclic_subgroup = []
    if ${isZmod}:
        cyclic_subgroup = [(k * g) for k in range(G.order())]
    else:
        cyclic_subgroup = [g^k for k in range(g.order())]

    cyclic_subgroup = list(set(cyclic_subgroup))
    cyclic_subgroup.sort()
    
    subgroup_elements = [str(elem) for elem in cyclic_subgroup]
    line = "Generator: " + str(g) + " Cyclic Subgroup: " + str(subgroup_elements)
    output.append(line)
    
output
        `.trim();
        }

        // Update the Sage cell input
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

    // Attach event listeners
    document.getElementById("groupType").addEventListener("change", () => {
        updatePlaceholder();
        updateSageCode();
    });

    document.getElementById("groupParam").addEventListener("input", updateSageCode);

    // Initial setup
    updateSageCode();
});
