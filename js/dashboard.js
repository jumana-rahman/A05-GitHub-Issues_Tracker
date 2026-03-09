const allBtn = document.getElementById('allBtn');
const openBtn = document.getElementById('openBtn');
const closedBtn = document.getElementById('closedBtn');
const issuesContainer = document.getElementById('issuesContainer');

async function loadIssues() {
    showSpinner(true);

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayIssues(data.data);

    showSpinner(false);
}

function displayIssues(issues){

    const container = document.getElementById("issuesContainer");
    container.innerHTML = "";

    issues.forEach(issue => {

        const borderColor =
            issue.status === "open"
            ? "border-t-4 border-[#00A96E]"
            : "border-t-4 border-[#A855F7]";

        const card = document.createElement("div");

        card.className =
        `card bg-white shadow-sm p-4 cursor-pointer ${borderColor}`;

        card.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <img class="w-4" src="./assets/Open-Status.png" alt="Open-Status">
                    <div class="badge badge-soft badge-error rounded-full">HIGH</div>
                </div>
                
                <h2 class="card-title text-[14px] text-[#1F2937] pt-2">${issue.title}</h2>
                
                <p class="text-[12px] text-[#64748B]">${issue.description}</p>
                
                <div class="mt-3 flex gap-3">
                    <div class="badge badge-soft badge-error border border-[#EF4444] rounded-full inline-block"><i class="fa-solid fa-bug mr-1.5"></i>BUG</div>
                    
                    <div class="badge badge-soft badge-warning border border-[#D97706] rounded-full inline-block"><i class="fa-solid fa-globe mr-1.5"></i>HELP WANTED</div>
                </div>

                <div class="divider"></div>

                <p class="text-[12px] font-normal text-[#64748B]">${issue.author}</p>
                <p class="text-[12px] font-normal text-[#64748B]">1/15/2024</p>
            </div>
        `;

        container.appendChild(card);
    });
}