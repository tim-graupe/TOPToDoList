(()=>{"use strict";let t=JSON.parse(localStorage.getItem("tasks"))||[];const e=e=>{for(JSON.stringify(o);l.firstChild;)l.removeChild(l.firstChild);e.todos.forEach((i=>{const s=document.createElement("li"),n=document.createElement("div");n.setAttribute("class","material-icons"),n.textContent="delete";const r=document.createElement("div");r.setAttribute("class","material-icons"),r.textContent="edit";const a=document.createElement("div");a.setAttribute("class","material-icons"),a.textContent="priority_high";const c=document.createElement("div");c.setAttribute("class","material-icons"),c.textContent="done_outline";const d=document.createElement("date");d.setAttribute("class","material-icons"),d.textContent="event",s.textContent=i.title,s.className="addedTask",s.appendChild(r),s.appendChild(n),s.appendChild(a),s.appendChild(c),s.appendChild(d),l.appendChild(s),t.push(i),n.addEventListener("click",(()=>{for(var n=e.todos.length-1;n>=0;n--)e.todos[n].title===i.title&&(e.todos.splice(n,1),l.removeChild(s),localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o)))})),r.addEventListener("click",(()=>{if(i.title=prompt("Change name"),i.title.length>0)s.textContent=i.title,s.appendChild(r),s.appendChild(n),localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o));else if(null==i.title)return})),a.addEventListener("click",(()=>{"red"==a.style.color?(a.style.color="yellow",i.priority="Medium",localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o))):"yellow"==a.style.color?(a.style.color="green",i.priority="Low",localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o))):(a.style.color="red",i.priority="High",localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o)))})),c.addEventListener("click",(()=>{"none"==s.style.textDecoration?(s.style.textDecoration="line-through",localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o))):(s.style.textDecoration="none",localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o)))})),d.addEventListener("click",(()=>{let t=new Date;console.log(t)})),localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o))}))};function i(t,e,i,s){this.title=t,this.description=e,this.dueDate=i,this.priority=s}const s=document.getElementById("new-project-btn"),o=JSON.parse(localStorage.getItem("projects"))||[],n=document.getElementById("project-list"),l=document.getElementById("current-project-tasks"),r=document.getElementById("current-project-title");r.setAttribute("id","projectTitle"),s.addEventListener("click",(()=>{a()}),!1);const a=()=>{const t=prompt("Project name?");if(""==t)alert("Empty field!");else if(o.some((e=>e.title==t)))alert("Duplicate project name!");else{const e={title:t,todos:[]};o.push(e),c(e),localStorage.setItem("projects",JSON.stringify(o))}},c=s=>{const l=document.createElement("li"),a=document.createElement("div"),c=document.createElement("div");a.setAttribute("class","material-icons"),a.textContent="edit",c.textContent="delete",c.setAttribute("class","material-icons"),l.setAttribute("id","list-node"),l.textContent=s.title,l.appendChild(a),l.appendChild(c),n.appendChild(l),l.addEventListener("click",(()=>{r.textContent=s.title,(s=>{e(s);const o=document.createElement("input"),n=document.createElement("button");o.setAttribute("class","input-section"),n.setAttribute("class","input-section"),n.textContent="Send",projectTitle.appendChild(n),projectTitle.appendChild(o),o.addEventListener("keypress",(n=>{if("Enter"===n.key){n.preventDefault();const l=new i(o.value,"Add Description","Change Due Date","Set Priority");s.todos.push(l),e(s),localStorage.setItem("tasks",JSON.stringify(t)),o.value=""}})),n.addEventListener("click",(n=>{n.preventDefault();const l=new i(o.value,"Add Description","Change Due Date","Set Priority");s.todos.push(l),e(s),localStorage.setItem("tasks",JSON.stringify(t)),o.value=""})),localStorage.setItem("tasks",JSON.stringify(t))})(s)})),a.addEventListener("click",(e=>{if(e.stopPropagation(),s.title=prompt("Change name"),s.title.length>0)l.textContent=s.title,l.appendChild(a),l.appendChild(c),localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o));else if(null==s.title)return})),c.addEventListener("click",(e=>{e.stopPropagation();let i="Are you sure you wish to delete your "+s.title+" project?";if(1==confirm(i))for(var r=o.length-1;r>=0;r--)o[r].title===s.title&&(o.splice(r,1),n.removeChild(l),localStorage.setItem("tasks",JSON.stringify(t)),localStorage.setItem("projects",JSON.stringify(o)))}))};o.forEach(c)})();