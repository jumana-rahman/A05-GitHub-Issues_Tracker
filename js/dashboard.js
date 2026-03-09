const allBtn = document.getElementById('allBtn');
const openBtn = document.getElementById('openBtn');
const closedBtn = document.getElementById('closedBtn');

const labelStyles = {
  "bug": {
    class: "badge-error border border-[#EF4444]",
    icon: "fa-bug"
  },
  "help wanted": {
    class: "badge-warning border border-[#D97706]",
    icon: "fa-globe"
  },
  "enhancement": {
    class: "badge-success border border-[#16A34A]",
    icon: "fa-lightbulb"
  },
  "good first issue": {
    class: "badge-info border border-[#0EA5E9]",
    icon: "fa-star" 
  }
};

const priorityMap = {
    high: "badge-error",
    medium: "badge-primary",
    low: "badge-neutral"
}

async function loadIssues() {
    // showSpinner(true);

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    displayIssues(data.data);

    // showSpinner(false);
}

function displayIssues(issues){

    const container = document.getElementById("issuesContainer");
    container.innerHTML = "";

    issues.forEach(issue => {

        const borderColor =
            issue.status === "open"
            ? "border-t-4 border-[#00A96E]"
            : "border-t-4 border-[#A855F7]";

        const statusImage =
            issue.status === "open"
            ? "./assets/Open-Status.png"
            : "./assets/Closed- Status .png";

        let labelsArray = Array.isArray(issue.labels) ? issue.labels : [];

        const issuesLabels = labelsArray.map(label => {

        const style = labelStyles[label.toLowerCase()] || {
            class: "badge-neutral",
            icon: "fa-tag"
        };

        return `
            <div class="badge badge-soft ${style.class} rounded-full text-[10px] uppercase">
            <i class="fa-solid ${style.icon}"></i> ${label}
            </div>
        `;

        }).join("");

        let badgeClass = "";

        if(issue.priority.toUpperCase() === "HIGH"){
            badgeClass = "badge-error";
        }
        else if(issue.priority.toUpperCase() === "MEDIUM"){
            badgeClass = "badge-primary";
        }
        else if(issue.priority.toUpperCase() === "LOW"){
            badgeClass = "badge-neutral";
        }
        const card = document.createElement("div");

        card.className =
        `card bg-white shadow-sm max-w-90  cursor-pointer ${borderColor}`;

        card.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <img class="w-4" src="${statusImage}" alt="Status">
                    <div class="badge badge-soft ${badgeClass} rounded-full uppercase text-[12px]">${issue.priority}</div>
                </div>
                
                <h2 class="card-title text-[14px] text-[#1F2937] pt-2">${issue.title}</h2>
                
                <p class="text-[12px] text-[#64748B]">${issue.description}</p>
                
                <div class="mt-3 flex gap-3 flex-wrap">
                    ${issuesLabels}
                </div>

                <div class="divider"></div>

                <p class="text-[12px] font-normal text-[#64748B]">${issue.author}</p>
                <p class="text-[12px] font-normal text-[#64748B]">${new Date(issue.createdAt).toLocaleString()}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(issue.id));
        issuesContainer.appendChild(card);
        container.appendChild(card);
    });
}
loadIssues();

async function openModal(issueId) {
  const modal = document.getElementById("issueModal");
  const content = document.getElementById("modalContent");

  try {
    // Fetch single issue details
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
    const data = await res.json();
    const issue = data.data;

    // Status
    const statusText = issue.status === "open" ? "Opened" : "Closed";
    const statusColor = issue.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]";

    // Priority
    // const priority = issue.priority ? issue.priority.toLowerCase() : "low";
    // const priorityClass =
    //   priority.toUpperCase() === "high" ? "badge-error" :
    //   priority.toUpperCase() === "medium" ? "badge-primary" :
    //   "badge-neutral";

    const priorityClass = priorityMap[issue.priority.toLowerCase()] || "badge-neutral";

    // Labels
    let labelsArray = Array.isArray(issue.labels) ? issue.labels : [];
    const labelsHTML = labelsArray.map(label => {
      const style = labelStyles[label.toLowerCase()] || { class: "badge-neutral", icon: "fa-tag" };
      return `<div class="badge badge-soft ${style.class} rounded-full inline-block mr-2 mb-2">
                <i class="fa-solid ${style.icon} mr-1"></i> ${label}
              </div>`;
    }).join("");

    // Inject modal content
    content.innerHTML = `
      <h2 class="text-2xl font-bold text-[#1F2937]">${issue.title}</h2>

      <ul class="py-3 flex items-center gap-3 list-disc">
        <li class="btn ${statusColor} text-white rounded-full text-[12px] list-none mr-4">${statusText}</li>
        <li class="text-[12px] text-[#64748B] font-normal mr-4">Opened by ${issue.author}</li>
        <li class="text-[12px] text-[#64748B] font-normal">${new Date(issue.createdAt).toLocaleDateString()}</li>
      </ul>

      <div class="mt-2 flex gap-2">
        ${labelsHTML}
      </div>

      <p class="text-[16px] text-[#64748B] font-normal py-3">${issue.description}</p>

      <div class="bg-[#F8FAFC] rounded-md p-3 flex gap-6">
        <div>
          <p class="text-[16px] text-[#64748B] font-normal">Assignee:</p>
          <h3 class="text-[16px] text-[#64748B] font-semibold">${issue.assignee || "Not assigned"}</h3>
        </div>

        <div>
          <p class="text-[16px] text-[#64748B] font-normal">Priority:</p>
          <span class="btn ${priorityClass} text-white rounded-full text-[12px]">${issue.priority}</span>
        </div>
      </div>
    `;

    modal.showModal();

  } catch (error) {
    console.error("Failed to load issue details:", error);
    alert("Failed to load issue details.");
  }
}
