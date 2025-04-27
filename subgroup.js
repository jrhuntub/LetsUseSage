function getGroupDefinition(type, n) {
    if (type === "Zmod") return `G = Zmod(${n}).additive_group()`; // additive Z mod n
    if (type === "S") return `G = SymmetricGroup(${n})`;
    if (type === "A") return `G = AlternatingGroup(${n})`;
    return "# Please select a valid group type";
}

// Initialize both SageCells
sagecell.makeSagecell({
    inputLocation: '#sagecell-subgroups',
    template: sagecell.templates.minimal,
    autoeval: false,
    code: ''
});

sagecell.makeSagecell({
    inputLocation: '#sagecell-cosets',
    template: sagecell.templates.minimal,
    autoeval: false,
    code: ''
});

// Update subgroup SageCell
function updateSubgroupCode() {
    const type = document.getElementById("groupTypeSubgroups").value;
    const n = parseInt(document.getElementById("nInputSubgroups").value);

    let code = "";

    if (type === "empty" || isNaN(n)) {
        code = "# Please select a valid group type and value of n";
    } else if (type === "Zmod") {
        code = `n = ${n}
def subgroup(d):
    return [(k*d)%n for k in range(n//d)]
    
divisors = [d for d in range(1, n+1) if n % d == 0]
["Order " + str(n//d) + ": " + str(subgroup(d)) for d in divisors]`;
    } else {
        code = `${getGroupDefinition(type, n)}
subgroups = G.subgroups()
[("Order " + str(H.order()) + ": " + str([g for g in H])) for H in subgroups]`;
    }

    const textarea = document.querySelector("#sagecell-subgroups .sagecell_input textarea");
    if (textarea) textarea.value = code;
}

// Update coset SageCell
function updateCosetCode() {
    const type = document.getElementById("groupTypeCosets").value;
    const n = parseInt(document.getElementById("nInputCosets").value);

    let code = "";

    if (type === "empty" || isNaN(n)) {
        code = "# Please select a valid group type and value of n";
    } else if (type == "S") {
        code = `${getGroupDefinition(type, n)}
H = G.subgroup([G.gen(0)])
left = G.cosets(H, side='left')
right = G.cosets(H, side='right')
"Left Cosets: " + str(left) + " \Right Cosets: " + str(right)`;
    }
    else {
        code = `${getGroupDefinition(type, n)}
H = G.subgroup([G.gen(0)])
left = G.cosets(H, side='left')
"Cosets: " + str(left)`;
    }

    const textarea = document.querySelector("#sagecell-cosets .sagecell_input textarea");
    if (textarea) textarea.value = code;
}


// Watch for input changes and update SageCells live
window.addEventListener("load", () => {
    updateSubgroupCode();
    updateCosetCode();

    document.getElementById("nInputSubgroups").addEventListener("input", updateSubgroupCode);
    document.getElementById("groupTypeSubgroups").addEventListener("change", updateSubgroupCode);

    document.getElementById("nInputCosets").addEventListener("input", updateCosetCode);
    document.getElementById("groupTypeCosets").addEventListener("change", updateCosetCode);
});