const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []
let currentTab = "all"

const container = document.getElementById("issuesContainer")

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// loader

function showLoader() {

    container.innerHTML = `
<div class="col-span-4 flex justify-center py-10">
<span class="loading loading-spinner loading-xl"></span>
</div>
`

}

// load issues

async function loadIssues() {

    showLoader()

    await delay(120)

    const res = await fetch(API)
    const data = await res.json()

    allIssues = data.data

    renderIssues(allIssues)

}

// priority function

function generatePriority(priority) {

    const p = priority.toUpperCase()

    let style = ""

    if (p === "HIGH") {
        style = "text-red-500 bg-red-100 rounded-lg px-3"
    }

    else if (p === "MEDIUM") {
        style = "text-yellow-500 bg-yellow-100 rounded-lg px-3"
    }

    else {
        style = "text-gray-500 bg-gray-200 rounded-lg px-3"
    }

    return `
<span class="text-xs font-semibold ${style}">
${p}
</span>
`

}

// labels function

function generateLabels(labels) {

    return labels.map(label => {

        if (label.toLowerCase() === "bug") {

            return `<span class="flex items-center gap-1 px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg">
<i class="fa-solid fa-virus text-red-600"></i>
BUG
</span>`
        }

        else if (label.toLowerCase() === "help wanted") {

            return `<span class="flex items-center gap-1 px-2.5 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-lg">
<i class="fa-solid fa-life-ring text-yellow-600"></i>
HELP WANTED
</span>`
        }

        else if (label.toLowerCase() === "enhancement") {

            return `<span class="flex items-center gap-1 px-2.5 py-1 text-xs bg-green-100 text-green-600 rounded-lg">
<i class="fa-solid fa-wand-magic-sparkles text-green-600"></i>
ENHANCEMENT
</span>`
        }

        else if (label.toLowerCase() === "good first issue") {

            return `<span class="text-xs bg-indigo-100 text-indigo-400 px-2 py-1 rounded-lg">
GOOD FIRST ISSUE
</span>`
        }

        return `<span class="flex items-center gap-1 px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
<i class="fa-solid fa-file-lines"></i>
${label.toUpperCase()}
</span>`

    }).join("")

}

// render issues

function renderIssues(list) {

    container.innerHTML = ""

    document.getElementById("issueCount").innerText = list.length + " Issues"

    if (list.length === 0) {

        container.innerHTML = `<p class="col-span-4 text-center text-gray-500">No Issues Found</p>`

        return
    }

    list.forEach(issue => {

        const border =
            issue.status === "open"
                ? "border-t-4 border-green-500"
                : "border-t-4 border-purple-500"

        const statusImage =
            issue.status === "open"
                ? "./assets/Open-Status.png"
                : "./assets/Closed-Status.png"

        const card = document.createElement("div")

        card.className = `bg-white py-4 rounded shadow cursor-pointer ${border}`

        const labelsHTML = generateLabels(issue.labels)

        card.innerHTML = `

<div class="flex justify-between px-4 mb-2">
<img src="${statusImage}" class="w-5 h-5" />
${generatePriority(issue.priority)}
</div>

<h3 class="font-semibold text-sm px-4 mb-1">
${issue.title}
</h3>

<p class="text-xs text-gray-500 px-4 mb-3">
${issue.description.slice(0, 70)}...
</p>

<div class="flex gap-2 px-4 mb-3">
${labelsHTML}
</div>

<hr class="border-1 text-gray-400 my-1">

<div class="flex justify-between px-4 text-right">

<p class="text-xs text-gray-500">
#${issue.id} by ${issue.author}
</p>

<div>
<p class="text-xs text-gray-400">
${issue.createdAt.split("T")[0]}
</p>

<p class="text-xs text-gray-400">
Updated: ${issue.updatedAt.split("T")[0]}
</p>
</div>

</div>
`

        card.onclick = () => openModal(issue)

        container.appendChild(card)

    })

}

// change tab

async function changeTab(type) {

    currentTab = type

    setActiveTab()

    showLoader()

    await delay(120)

    let filtered = allIssues

    if (type === "open") {
        filtered = allIssues.filter(i => i.status === "open")
    }

    if (type === "closed") {
        filtered = allIssues.filter(i => i.status === "closed")
    }

    renderIssues(filtered)

}

// active tab

function setActiveTab() {

    document.querySelectorAll(".tabBtn").forEach(btn => {

        btn.classList.remove("bg-[#4a00ff]", "text-white")

        btn.classList.add("border-1", "border-solid", "border-gray-300")

    })

    document.getElementById(currentTab + "Btn")
        .classList.add("bg-[#4a00ff]", "text-white")

}

// search

async function searchIssues() {

    const q = document.getElementById("searchInput").value

    showLoader()

    await delay(120)

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${q}`)

    const data = await res.json()

    renderIssues(data.data)

}

// modal function

function openModal(issue) {

    const status =
        issue.status === "open"
            ? "bg-green-100 text-green-600 px-2 rounded-lg"
            : "bg-purple-100 text-purple-600 px-2 rounded-lg"

    document.getElementById("modalTitle").innerText = issue.title
    document.getElementById("modalDesc").innerText = issue.description
    document.getElementById("openBy").innerText = " • Opened By " + issue.author
    document.getElementById("modalAuthor").innerText = issue.author
    document.getElementById("modalPriority").innerHTML = generatePriority(issue.priority)
    document.getElementById("modalDate").innerText = issue.createdAt.split("T")[0]
    document.getElementById("modalLabel").innerHTML = generateLabels(issue.labels)
    document.getElementById("modalStatus").innerText = issue.status
    document.getElementById("modalStatus").classList = status
    document.getElementById("issueModal").showModal()

}

loadIssues()