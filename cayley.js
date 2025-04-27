
// Initialize SageCell
sagecell.makeSagecell({
    inputLocation: '#sagecell',
    template: sagecell.templates.minimal,
    autoeval: false
});

function updateSageCode() {
    const groupType = document.getElementById("groupType").value;
    const n = parseInt(document.getElementById("groupParam").value);

    let code = "";

    if (groupType === "empty" || isNaN(n) || n < 1) {
        code = "# Please select a valid group type and a positive integer n.";
    }
    // ℤ mod n (additive group)
    else if (groupType === "Zmod") {
        code = `n = ${n}
G = Integers(n)
elements = list(G)

# Top header
print("    |", end="")
for g in elements:
    print(f"{g}".rjust(4), end="")
print()
print("-" * (5 + 4 * len(elements)))

# Rows
for g1 in elements:
    print(f"{g1}".rjust(4), end=" |")
    for g2 in elements:
        product = g1 + g2  # Addition
        print(f"{product}".rjust(4), end="")
    print()
`;
    }
    // Symmetric group Sₙ
    else if (groupType === "S") {
        code = `G = SymmetricGroup(${n})
elements = G.list()

# Top header
print(" " * 10 + "|", end="")
for g in elements:
    print(f"{g}".center(10), end="")
print()
print("-" * (10 + 1 + 10 * len(elements)))

# Rows
for g1 in elements:
    print(f"{g1}".center(10), end="|")
    for g2 in elements:
        product = g1 * g2
        print(f"{product}".center(10), end="")
    print()
`;
    }
    // Dihedral group Dₙ
    else if (groupType === "D") {
        code = `G = DihedralGroup(${n})
elements = G.list()

# Top header
print(" " * 10 + "|", end="")
for g in elements:
    print(f"{g}".center(10), end="")
print()
print("-" * (10 + 1 + 10 * len(elements)))


# Rows
for g1 in elements:
    print(f"{g1}".center(10), end="|")
    for g2 in elements:
        product = g1 * g2
        print(f"{product}".center(10), end="")
    print()
`;
    }
    // Alternating group Aₙ
    else if (groupType === "A") {
        code = `G = AlternatingGroup(${n})
elements = G.list()

# Top header
print(" " * 10 + "|", end="")
for g in elements:
    print(f"{g}".center(10), end="")
print()
print("-" * (10 + 1 + 10 * len(elements)))


# Rows
for g1 in elements:
    print(f"{g1}".center(10), end="|")
    for g2 in elements:
        product = g1 * g2
        print(f"{product}".center(10), end="")
    print()
`;
    }
    else {
        code = "# Unsupported group type.";
    }

    // Update SageCell input
    const textarea = document.querySelector("#sagecell .sagecell_input textarea");
    if (textarea) {
        textarea.value = code;

        // Force SageCell to notice the update
        const event = new Event("input", { bubbles: true });
        textarea.dispatchEvent(event);
    }
}

// Attach input listeners
window.addEventListener("load", () => {
    document.getElementById("groupType").addEventListener("change", updateSageCode);
    document.getElementById("groupParam").addEventListener("input", updateSageCode);
    updateSageCode();  // Load initial
});
